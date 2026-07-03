// Global password toggle function that handles all password visibility toggles
// This prevents conflicts between different implementations and provides error handling

(function() {
    'use strict';

    // Create a safe, global togglePassword function
    window.safeTogglePassword = function(fieldId, element) {
        try {
            // Get the password field
            const passwordField = document.getElementById(fieldId);
            if (!passwordField) {
                console.error(`Password field with ID '${fieldId}' not found`);
                return;
            }

            // Toggle the password visibility
            const isPassword = passwordField.type === 'password';
            passwordField.type = isPassword ? 'text' : 'password';

            // Handle different icon implementations
            if (element) {
                // Check if it's the SVG-based implementation (signin.html style)
                const eyeOpenPaths = element.querySelectorAll('.eye-open');
                const eyeClosedPath = element.querySelector('.eye-closed');
                
                if (eyeOpenPaths.length > 0 && eyeClosedPath) {
                    // SVG paths implementation
                    if (isPassword) {
                        eyeOpenPaths.forEach(path => path.classList.add('hidden'));
                        eyeClosedPath.classList.remove('hidden');
                    } else {
                        eyeOpenPaths.forEach(path => path.classList.remove('hidden'));
                        eyeClosedPath.classList.add('hidden');
                    }
                } else {
                    // innerHTML replacement implementation (change_password.html style)
                    element.innerHTML = isPassword ? 
                        '<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path></svg>' :
                        '<svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>';
                }
            }
        } catch (error) {
            console.error('Error in safeTogglePassword:', error);
        }
    };

    // Override any existing global togglePassword function with our safe version
    window.togglePassword = window.safeTogglePassword;

    // Also create a version for the togglePasswordVisibility function used in email campaigns
    window.togglePasswordVisibility = function(inputId) {
        try {
            const input = document.getElementById(inputId);
            if (!input) {
                console.error(`Input field with ID '${inputId}' not found`);
                return;
            }

            const icon = input.parentElement?.querySelector('button i');
            if (!icon) {
                console.error('Password toggle icon not found');
                return;
            }
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        } catch (error) {
            console.error('Error in togglePasswordVisibility:', error);
        }
    };

    // Prevent any other scripts from overriding our safe functions
    Object.defineProperty(window, 'togglePassword', {
        value: window.safeTogglePassword,
        writable: false,
        configurable: false
    });

    Object.defineProperty(window, 'togglePasswordVisibility', {
        value: window.togglePasswordVisibility,
        writable: false,
        configurable: false
    });

})();
