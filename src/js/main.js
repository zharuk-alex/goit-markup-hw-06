window.addEventListener("load", () => {
    const currentPage = window.location.pathname.split("/").pop(); 
    const navLinks = document.querySelectorAll(".nav-link") ?? []; 

    navLinks.forEach(link => {
        if (link.getAttribute("data-href") === currentPage) {
            link.classList.add("active");
        }
    });
});

