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
                <label>Update Stage:</label>
                <select data-id="${caseItem.id}" class="stage-select">
                    <option value="filing">Filing</option>
                    <option value="attendance">Attendance</option>
                    <option value="evidence">Evidence</option>
                    <option value="arguments">Arguments</option>
                    <option value="final_decision">Final Decision</option>
                </select>
                <button onclick="updateStage(${caseItem.id})">Update</button>
                <hr/>
            `;
            container.appendChild(div);
        });
    } catch (error) {
        console.error("Failed to load cases", error);
    }
}

async function updateStage(caseId) {
    const select = document.querySelector(`.stage-select[data-id="${caseId}"]`);
    const newStage = select.value;

    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/cases/${caseId}/stage`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ stage: newStage })
        });

        const result = await response.json();

        if (response.ok) {
            showMessage(result.message, "success");
            loadCases();
        } else {
            showMessage(result.error || "Failed to update", "error");
        }
    } catch (error) {
        showMessage("Something went wrong", "error");
    }
}
