document.addEventListener("DOMContentLoaded", function () {
    const subcategories = {
        civil: ["Property Dispute", "Contract Dispute", "Family Law"],
        criminal: ["Assault", "Fraud", "Theft"]
    };

    const categorySelect = document.getElementById("category");
    const subcategorySelect = document.getElementById("subcategory");

    function updateSubcategories() {
        const selectedCategory = categorySelect.value;
        subcategorySelect.innerHTML = "";

        subcategories[selectedCategory].forEach(sub => {
            const option = document.createElement("option");
            option.value = sub;
            option.textContent = sub;
            subcategorySelect.appendChild(option);
        });
    }

    updateSubcategories();
    categorySelect.addEventListener("change", updateSubcategories);
    loadCaseList();
});

document.getElementById("caseForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const subcategory = document.getElementById("subcategory").value;
    const filingDate = document.getElementById("filingDate").value;

    const token = localStorage.getItem("token");

    try {
        const response = await fetch("/api/cases/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title, category, subcategory, filingDate, stage: "filing" })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message, "success");
            loadCaseList();
        } else {
            showMessage(data.error || "Failed to register case", "error");
        }
    } catch (error) {
        showMessage("Failed to register case", "error");
    }
});

async function loadCaseList() {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch("/api/cases", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const cases = await response.json();
        const caseListContainer = document.getElementById("caseList");
        caseListContainer.innerHTML = '';

        cases.forEach((caseItem) => {
            const caseElement = document.createElement("div");
            caseElement.classList.add("case-item");
            caseElement.innerHTML = `
                <h3>${caseItem.title}</h3>
                <p>Category: ${caseItem.category}</p>
                <p>Subcategory: ${caseItem.subcategory}</p>
                <p>Stage: ${caseItem.stage}</p>
                <p>Filing Date: ${new Date(caseItem.filingDate).toLocaleDateString()}</p>
            `;
            caseListContainer.appendChild(caseElement);
        });
    } catch (error) {
        console.error('Failed to load case list:', error);
    }
}
