document.getElementById("reportForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const stage = document.getElementById("stage").value;

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/cases/report?stage=${stage}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();

        const reportTableBody = document.getElementById("reportTable").querySelector("tbody");
        reportTableBody.innerHTML = '';

        if (data.length === 0) {
            reportTableBody.innerHTML = '<tr><td colspan="2">No data available</td></tr>';
        } else {
            data.forEach((item) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${item.stage}</td>
                    <td>${item.count}</td>
                `;
                reportTableBody.appendChild(row);
            });
        }
    } catch (error) {
        console.error('Failed to fetch report:', error);
    }
});

function generateReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text('Case Report', 105, 20, null, null, 'center');

    const stageFilter = document.getElementById('stage').value;
    if (stageFilter) {
        doc.setFontSize(12);
        doc.text(`Filter Applied: Stage - ${stageFilter}`, 20, 30);
    }

    const headers = ['Stage', 'Count'];
    const rows = [];

    const tableRows = document.querySelectorAll('#reportTable tbody tr');
    tableRows.forEach(row => {
        const stage = row.cells[0].textContent;
        const count = row.cells[1].textContent;
        rows.push([stage, count]);
    });

    doc.autoTable({
        head: [headers],
        body: rows,
        startY: 40,
        theme: 'grid',
        headStyles: { fillColor: [22, 160, 133] },
        styles: { fontSize: 10, cellPadding: 2 },
    });

    doc.save('case-report.pdf');
}

document.querySelector('button[onclick="generateReport()"]').addEventListener('click', generateReport);
