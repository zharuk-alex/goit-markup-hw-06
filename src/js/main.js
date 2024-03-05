(() => {
    const currentPage = window.location.pathname.split("/").pop(); 
    const navLinks = document.querySelectorAll(".nav-link") ?? []; 
    const isIndex = window.location.pathname === '/' || currentPage === "index.html";
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        if (
            link.getAttribute("data-href") === currentPage ||
            isIndex && link.getAttribute("data-href") === "index.html"
        ) {
            link.classList.add("active");
        }
    });
})();