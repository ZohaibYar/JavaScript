document.addEventListener("DOMContentLoaded", loadCases);

async function loadCases() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/cases", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const cases = await response.json();

        const container = document.getElementById("caseList");
        container.innerHTML = '';

        cases.forEach(caseItem => {
            const div = document.createElement("div");
            div.classList.add("case-item");
            div.innerHTML = `
                <h3>${caseItem.title}</h3>
                <p>Category: ${caseItem.category}</p>
                <p>Subcategory: ${caseItem.subcategory}</p>
                <p>Filing Date: ${new Date(caseItem.filingDate).toLocaleDateString()}</p>
                <p>Proceeding Date: ${caseItem.proceedingDate ? new Date(caseItem.proceedingDate).toLocaleDateString() : "Not Assigned"}</p>
                <p>Current Stage: <strong>${caseItem.stage}</strong></p>
                <button class="delete-btn" data-id="${caseItem.id}">Delete</button>
                <hr/>
            `;
            container.appendChild(div);
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', async function () {
                const caseId = this.getAttribute('data-id');
                if (confirm("Are you sure you want to delete this case?")) {
                    await deleteCase(caseId);
                    loadCases();
                }
            });
        });

    } catch (error) {
        console.error("Failed to load cases", error);
    }
}

async function deleteCase(caseId) {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/cases/${caseId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Delete failed");
        }

        alert("Case deleted successfully.");
    } catch (error) {
        console.error("Failed to delete case", error);
        alert("Error deleting case.");
    }
}
