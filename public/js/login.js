document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.token && data.user) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("role", data.user.role);

        document.getElementById("message").innerText = "Login successful!";

        setTimeout(() => {
            window.location.href = "/dashboard";
        }, 1000);
    } else {
        document.getElementById("message").innerText = data.error;
    }
});
