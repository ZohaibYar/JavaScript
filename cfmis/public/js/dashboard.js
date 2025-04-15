document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.role) {
        window.location.href = "/login";
        return;
    }

    switch (user.role) {
        case "admin":
            document.getElementById("adminSection").classList.remove("hidden");
            break;
        case "clerk":
            document.getElementById("clerkSection").classList.remove("hidden");
            break;
        case "registrar":
            document.getElementById("registrarSection").classList.remove("hidden");
            break;
        case "judge":
            document.getElementById("judgeSection").classList.remove("hidden");
            break;
        default:
            logout();
            break;
    }
});
