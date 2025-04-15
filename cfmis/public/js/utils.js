function showMessage(text, type) {
    var messageElement = document.getElementById("message");
    messageElement.textContent = text;

    messageElement.className = "";
    messageElement.classList.add(type);
    messageElement.classList.add("show");
    messageElement.style.display = "block";

    setTimeout(function () {
        messageElement.style.display = "none";
    }, 3000);
}

function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (e) {
        return null;
    }
}

function getUserRole() {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = parseJwt(token);
    return decoded?.role || null;
}

function isAdmin() {
    return getUserRole() === "admin";
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    window.location.href = "/login";
}
