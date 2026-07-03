// Enhanced User Dropdown with Better Mobile Support
document.addEventListener('DOMContentLoaded', function() {
    const userMenuButton = document.getElementById('user-menu-button');
    const userDropdown = document.getElementById('user-dropdown');
    const dropdownArrow = document.getElementById('dropdown-arrow');

    if (!userMenuButton || !userDropdown) {
        // Dropdown elements not found - this is expected on pages without user dropdown
        return;
    }

    let isOpen = false;


    // Define a safe no-op click handler to prevent ReferenceError
    function debugClick(e) {}


    // Toggle dropdown
    function toggleDropdown() {
        isOpen = !isOpen;
        
        if (isOpen) {
            showDropdown();
        } else {
            hideDropdown();
        }
    }

    function showDropdown() {
        isOpen = true;
        
        // Remove hidden class first
        userDropdown.classList.remove('hidden');
        userMenuButton.setAttribute('aria-expanded', 'true');
        
        // Force immediate visibility and clickability - MUCH HIGHER z-index than backdrop
        userDropdown.style.display = 'block';
        userDropdown.style.visibility = 'visible';
        userDropdown.style.pointerEvents = 'auto';
        userDropdown.style.zIndex = '1000000'; // Much higher than backdrop
        userDropdown.style.position = window.innerWidth < 768 ? 'fixed' : 'absolute';
        
        // Remove any transforms that might interfere
        if (window.innerWidth < 768) {
            userDropdown.style.transform = 'none';
            userDropdown.style.webkitTransform = 'none';
            userDropdown.style.top = '70px';
            userDropdown.style.left = '10px';
            userDropdown.style.right = '10px';
            userDropdown.style.width = 'auto';
        }
        
        // Force all links to be clickable immediately
        const menuLinks = userDropdown.querySelectorAll('a');
        
        menuLinks.forEach((link, index) => {
            link.style.pointerEvents = 'auto';
            link.style.position = 'relative';
            link.style.zIndex = '1000000';
            link.style.display = 'block';
            link.style.visibility = 'visible';
            
            // Remove any existing click listeners and add new ones
            link.removeEventListener('click', debugClick);
            link.addEventListener('click', (e) => {
                debugClick(e);
                // Allow the link to work normally
            });
            
        });
        
        // TEMPORARILY DISABLE BACKDROP TO TEST CLICKS
        // const backdrop = document.createElement('div');
        // backdrop.id = 'dropdown-backdrop';
        // We'll add this back once the menu clicks work properly
        
        // Animate in
        setTimeout(() => {
            userDropdown.classList.remove('opacity-0', 'scale-95');
            userDropdown.classList.add('opacity-100', 'scale-100');
            if (dropdownArrow) {
                dropdownArrow.style.transform = 'rotate(180deg)';
            }
        }, 10);

        // Prevent body scrolling on mobile
        if (window.innerWidth < 768) {
            document.body.style.overflow = 'hidden';
        }

    }

    function hideDropdown() {
        isOpen = false;
        userMenuButton.setAttribute('aria-expanded', 'false');
        
        // Remove backdrop (if it exists)
        const backdrop = document.getElementById('dropdown-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        
        // Animate out
        userDropdown.classList.remove('opacity-100', 'scale-100');
        userDropdown.classList.add('opacity-0', 'scale-95');
        
        if (dropdownArrow) {
            dropdownArrow.style.transform = 'rotate(0deg)';
        }
        
        setTimeout(() => {
            userDropdown.classList.add('hidden');
        }, 200);

        // Restore body scrolling
        document.body.style.overflow = '';
    }

    // Toggle on button click
    userMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDropdown();
    });

    // Close when clicking outside
    document.addEventListener('click', function(e) {
        if (isOpen && !userDropdown.contains(e.target) && !userMenuButton.contains(e.target)) {
            hideDropdown();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isOpen) {
            hideDropdown();
            userMenuButton.focus();
        }
    });

    // Handle window resize
    window.addEventListener('resize', function() {
        if (isOpen && window.innerWidth >= 768) {
            // Remove mobile-specific styles when resizing to desktop
            document.body.style.overflow = '';
            const backdrop = document.getElementById('dropdown-backdrop');
            if (backdrop) {
                backdrop.remove();
            }
        }
    });

    // Add keyboard navigation for accessibility
    userDropdown.addEventListener('keydown', function(e) {
        const focusableElements = userDropdown.querySelectorAll('a[href]');
        const focusedIndex = Array.from(focusableElements).indexOf(document.activeElement);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (focusedIndex + 1) % focusableElements.length;
            focusableElements[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (focusedIndex - 1 + focusableElements.length) % focusableElements.length;
            focusableElements[prevIndex].focus();
        }
    });

    // Add touch event handling for better mobile interaction
    let touchStartY = 0;
    let touchStartTime = 0;

    userDropdown.addEventListener('touchstart', function(e) {
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
    }, { passive: true });

    userDropdown.addEventListener('touchend', function(e) {
        const touchEndY = e.changedTouches[0].clientY;
        const touchDuration = Date.now() - touchStartTime;
        const touchDistance = Math.abs(touchEndY - touchStartY);

        // If it's a quick tap (not a scroll), maintain the click behavior
        if (touchDuration < 300 && touchDistance < 10) {
            // Let the normal click event handle it
        }
    }, { passive: true });

    // Add ripple effect for better touch feedback on mobile
    function addRippleEffect(element) {
        element.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // Apply ripple effect to menu items
    const menuItems = userDropdown.querySelectorAll('a');
    menuItems.forEach(addRippleEffect);
});

// CSS for ripple effect - inject into head
const rippleCSS = `
<style>
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(2);
        opacity: 0;
    }
}

/* Enhanced dropdown positioning for mobile */
@media (max-width: 768px) {
    #user-dropdown {
        position: fixed !important;
        top: 70px !important;
        right: 10px !important;
        left: 10px !important;
        width: auto !important;
        max-height: calc(100vh - 80px);
        overflow-y: auto;
        margin-top: 0 !important;
        z-index: 1000000 !important;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        pointer-events: auto !important;
    }
    
    #user-dropdown.opacity-100 {
        transform: none !important;
        -webkit-transform: none !important;
    }
    
    #user-dropdown a {
        pointer-events: auto !important;
        position: relative;
        z-index: 1000001 !important;
    }
}

/* Smooth transitions for all interactive elements - optimized for mobile */
#user-menu-button,
#user-dropdown a {
    transition: all 0.2s ease-out;
    -webkit-tap-highlight-color: transparent;
}

/* Enhanced hover states - disabled on mobile for better performance */
@media (hover: hover) {
    #user-dropdown a:hover {
        transform: translateX(2px);
    }
}

/* Focus states for accessibility */
#user-menu-button:focus,
#user-dropdown a:focus {
    outline: 2px solid #3B82F6;
    outline-offset: 2px;
}

/* Mobile optimizations */
@media (max-width: 768px) {
    #user-dropdown {
        -webkit-overflow-scrolling: touch;
        will-change: transform, opacity;
    }
    
    #user-dropdown a {
        transition: background-color 0.15s ease-out;
    }
    
    #user-dropdown a:hover {
        transform: none;
    }
}

/* Loading state animation */
@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.loading {
    animation: pulse 1.5s infinite;
}
</style>
`;

// Inject CSS
document.head.insertAdjacentHTML('beforeend', rippleCSS);
