document.addEventListener('DOMContentLoaded', function () {
    const searchForm = document.getElementById('searchForm');
    const resultsContainer = document.getElementById('resultsContainer');
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/login';
        return;
    }

    searchForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(searchForm);
        const params = new URLSearchParams();

        // Add only non-empty values to the query
        formData.forEach((value, key) => {
            if (value.trim() !== '') {
                params.append(key, value.trim());
            }
        });

        try {
            const response = await fetch(`/api/cases/search?${params.toString()}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(await response.text());
            }

            const cases = await response.json();
            displayResults(cases);
        } catch (error) {
            console.error('Search failed:', error);
            resultsContainer.innerHTML = `
                <div class="alert alert-danger">
                    Failed to search cases: ${error.message}
                </div>
            `;
        }
    });

    function displayResults(cases) {
        if (cases.length === 0) {
            resultsContainer.innerHTML = '<div class="alert alert-info">No cases found matching your criteria.</div>';
            return;
        }

        let html = `
            <div class="table-responsive">
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th>Case ID</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Subcategory</th>
                            <th>Stage</th>
                            <th>Filing Date</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        cases.forEach(caseItem => {
            html += `
                <tr>
                    <td>${caseItem.id || 'N/A'}</td>
                    <td>${caseItem.title}</td>
                    <td>${caseItem.category}</td>
                    <td>${caseItem.subcategory}</td>
                    <td>${caseItem.stage}</td>
                    <td>${new Date(caseItem.filingDate).toLocaleDateString()}</td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        resultsContainer.innerHTML = html;
    }
});