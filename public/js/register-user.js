document.addEventListener("DOMContentLoaded", () => {
    loadUsers();
});

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const role = document.getElementById("role").value;

    try {
        const response = await fetch("/api/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify({ username, password, role })
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(data.message || "User registered successfully!", "success");
            document.getElementById("registerForm").reset();
            loadUsers();
        } else {
            showMessage(data.error || "Registration failed", "error");
        }
    } catch (error) {
        showMessage("Something went wrong!", "error");
    }
});

async function loadUsers() {
    try {
        const response = await fetch("/api/users", {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });

        const users = await response.json();
        const tbody = document.querySelector("#userTable tbody");
        tbody.innerHTML = "";

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.username}</td>
                <td>${user.role}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error("Failed to load users", error);
    }
}
