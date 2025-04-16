const Case = require('../models/Case');
const sequelize = require('../config/database');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const { Sequelize, Op } = require('sequelize');



exports.createCase = async (req, res) => {
    try {
        const { caseId, title, category, subcategory } = req.body;
        // Validation: Check if title contains only letters and spaces
        if (!/^[A-Za-z\s]+$/.test(title)) {
            return res.status(400).json({
                error: 'Title can only contain alphabets and spaces'
            });
        }
        const newCase = await Case.create({
            caseId,
            title,
            category,
            subcategory,
            stage: 'filing'
        });
        res.status(201).json({ message: 'Case registered', case: newCase });
    } catch (err) {
        res.status(500).json({ error: 'Failed to register case' });
    }
};

exports.assignDate = async (req, res) => {
    try {
        const { id } = req.params;
        const { proceedingDate } = req.body;
        const caseToUpdate = await Case.findByPk(id);
        if (!caseToUpdate) return res.status(404).json({ error: 'Case not found' });

        caseToUpdate.proceedingDate = proceedingDate;
        await caseToUpdate.save();
        res.json({ message: 'Date assigned', case: caseToUpdate });
    } catch (err) {
        res.status(500).json({ error: 'Failed to assign date' });
    }
};

exports.updateCaseStage = async (req, res) => {
    try {
        const { id } = req.params;
        const { stage } = req.body;
        const caseToUpdate = await Case.findByPk(id);
        if (!caseToUpdate) return res.status(404).json({ error: 'Case not found' });

        caseToUpdate.stage = stage;
        await caseToUpdate.save();
        res.json({ message: 'Stage updated', case: caseToUpdate });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update stage' });
    }
};

exports.getAllCases = async (req, res) => {
    try {
        const { stage } = req.query;
        const whereClause = stage ? { stage } : {};
        const cases = await Case.findAll({
            where: whereClause,
            order: [['title', 'ASC']] // Sort by title in ascending order
        });
        res.json(cases);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cases' });
    }
};

exports.generateReports = async (req, res) => {
    try {
        const stageFilter = req.query.stage;
        const whereCondition = stageFilter ? { stage: stageFilter } : {};

        const casesCount = await Case.findAll({
            attributes: [
                'stage',
                [sequelize.fn('COUNT', sequelize.col('stage')), 'count']
            ],
            group: ['stage'],
            where: whereCondition,
            raw: true
        });

        if (casesCount.length === 0) {
            return res.status(404).json({ message: 'No cases found for the specified filter.' });
        }

        return res.json(casesCount);
    } catch (err) {
        console.error('Error generating report:', err);
        return res.status(500).json({ error: 'Failed to generate report', message: err.message });
    }
};

exports.deleteCase = async (req, res) => {
    const caseId = req.params.id;

    try {
        const caseRecord = await Case.findByPk(caseId);

        if (!caseRecord) {
            return res.status(404).json({ message: "Case not found." });
        }

        await caseRecord.destroy();

        return res.json({ message: "Case deleted successfully." });
    } catch (error) {
        console.error("Delete Error:", error);
        return res.status(500).json({ error: "Failed to delete case." });
    }
};


exports.exportCasesToPDF = async (req, res) => {
    try {
        // 1. Fetch cases (sorted alphabetically)
        const cases = await Case.findAll({
            order: [['title', 'ASC']]
        });

        // 2. Create PDF document
        const doc = new PDFDocument();

        // 3. Set response headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=cases-export.pdf');

        // 4. Pipe PDF to response
        doc.pipe(res);

        // 5. Add content to PDF
        doc.fontSize(20).text('Case Management System Report', { align: 'center' });
        doc.moveDown();

        doc.fontSize(12).text(`Generated on: ${new Date().toLocaleString()}`, { align: 'right' });
        doc.moveDown(2);

        // Table header
        const headerY = 150;
        doc.font('Helvetica-Bold')
            .fontSize(14)
            .text('Title', 50, headerY)
            .text('Stage', 250, headerY)
            .text('Category', 350, headerY);

        // Table rows
        let y = headerY + 30;
        cases.forEach((caseItem, index) => {
            doc.font('Helvetica')
                .fontSize(12)
                .text(caseItem.title, 50, y)
                .text(caseItem.stage, 250, y)
                .text(caseItem.category, 350, y);

            y += 30;
            if (index % 10 === 9) {
                doc.addPage();
                y = 100;
            }
        });


        // 6. Finalize PDF
        doc.end();

    } catch (err) {
        console.error('PDF generation error:', err);
        res.status(500).json({ error: 'Failed to generate PDF' });
    }
};
//case search part
exports.searchCases = async (req, res) => {
    try {
        const { query, category, stage } = req.query;

        // Build the where clause dynamically
        const whereClause = {};

        // Text search across multiple fields if query exists
        if (query) {
            whereClause[Op.or] = [
                { title: { [Op.like]: `%${query}%` } }, // Case-insensitive search
                { category: { [Op.like]: `%${query}%` } },
                { subcategory: { [Op.like]: `%${query}%` } },
                { stage: { [Op.like]: `%${query}%` } }
            ];
        }

        // Add category filter if provided
        if (category) {
            whereClause.category = category;
        }

        // Add stage filter if provided
        if (stage) {
            whereClause.stage = stage;
        }

        const cases = await Case.findAll({
            where: whereClause,
            order: [['title', 'ASC']] // Sort results alphabetically
        });

        if (cases.length === 0) {
            return res.status(404).json({ message: 'No cases found matching your search criteria' });
        }

        res.json(cases);
    } catch (err) {
        console.error('Search error:', err);
        res.status(500).json({
            error: 'Failed to search cases',
            details: err.message
        });
    }
};