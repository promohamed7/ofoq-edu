document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector("header");
    
    // Initially set header to transparent on all pages
    header.classList.remove("bg-white/20");
    header.classList.add("bg-transparent");
    header.classList.remove("backdrop-blur-md");
    header.classList.add("backdrop-blur-0");
    header.classList.remove("shadow-sm");
    header.classList.remove("border-b");
    
    // Update navigation text color for better visibility on transparent background
    const navItems = header.querySelectorAll('.text-gray-600');
    navItems.forEach(item => {
        if (!item.closest('form')) { // Skip items inside forms
            item.classList.remove('text-gray-600');
            item.classList.add('text-gray-800');
        }
    });
    
    // Function to handle scroll
    function handleScroll() {
        if (window.scrollY > 0) {
            // Scrolled state - add gloss effect
            header.classList.remove("bg-transparent");
            header.classList.add("bg-white/80");
            header.classList.add("shadow-sm");
            header.classList.add("border-b");
            header.classList.remove("backdrop-blur-0");
            header.classList.add("backdrop-blur-md");
            
            // Restore original text colors when header has background
            const navItems = header.querySelectorAll('.text-gray-800');
            navItems.forEach(item => {
                if (!item.closest('form')) { // Skip items inside forms
                    item.classList.remove('text-gray-800');
                    item.classList.add('text-gray-600');
                }
            });
        } else {
            // Top state - transparent
            header.classList.remove("bg-white/80");
            header.classList.add("bg-transparent");
            header.classList.remove("shadow-sm");
            header.classList.remove("border-b");
            header.classList.remove("backdrop-blur-md");
            header.classList.add("backdrop-blur-0");
            
            // Higher contrast text on transparent header
            const navItems = header.querySelectorAll('.text-gray-600');
            navItems.forEach(item => {
                if (!item.closest('form')) { // Skip items inside forms
                    item.classList.remove('text-gray-600');
                    item.classList.add('text-gray-800');
                }
            });
        }
    }
    
    // Initial check and event listener
    handleScroll();
    window.addEventListener("scroll", handleScroll);
}); 