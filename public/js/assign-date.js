async function loadCases() {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/cases", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const cases = await response.json();

        const caseList = document.getElementById("caseList");
        caseList.innerHTML = "";

        cases.forEach(c => {
            const caseDiv = document.createElement("div");
            caseDiv.className = "case-item";
            caseDiv.innerHTML = `
                <h3>${c.title}</h3>
                <p>Category: ${c.category} (${c.subcategory})</p>
                <p>Current Stage: ${c.stage}</p>
                <p>Filing Date: ${new Date(c.filingDate).toLocaleDateString()}</p>
                <p>Proceeding Date: ${c.proceedingDate ? new Date(c.proceedingDate).toLocaleDateString() : "Not Assigned"}</p>
                <label for="date-${c.id}">Set Next Proceeding Date:</label>
                <input type="date" id="date-${c.id}">
                <button onclick="updateProceedingDate(${c.id})">Update</button>
            `;
            caseList.appendChild(caseDiv);
        });
    } catch (err) {
        console.error(err);
        showMessage("Failed to load cases", "error");
    }
}

async function updateProceedingDate(caseId) {
    const input = document.getElementById(`date-${caseId}`);
    const proceedingDate = input.value;

    if (!proceedingDate) {
        showMessage("Please select a date.", "error");
        return;
    }

    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`/api/cases/${caseId}/date`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ proceedingDate })
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, "success");
            loadCases();
        } else {
            showMessage(result.error || "Failed to update", "error");
        }
    } catch (err) {
        console.error(err);
        showMessage("Error updating date", "error");
    }
}

window.onload = loadCases;
