$(document).ready(function () {
    $(document).ready(function() {
        var $emailInput = $('#nl-email');
        var $submitButton = $('#ns-send-btn');
    
        function toggleSubmitButton() {
            var email = $emailInput.val();
            if (email && email.trim() !== '') {
                $submitButton.prop('disabled', false);
            } else {
                $submitButton.prop('disabled', true);
            }
        }
    
        function isValidEmail(email) {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailPattern.test(email);
        }
    
        // Initial check
        toggleSubmitButton();
    
        // On input
        $emailInput.on('input', function() {
            toggleSubmitButton();
        });
    
        $('#newsletter-form').on('submit', function(event) {
            event.preventDefault(); // Prevent the default form submission
    
            const form = $(this);
            const email = $emailInput.val();
    
            if (!email || email.trim() === '' || !isValidEmail(email)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Failed',
                    text: 'Please enter a valid email address.',
                    confirmButtonText: 'OK'
                });
                return;
            }
    
            const url = form.attr('action');
    
            $.ajax({
                type: 'POST',
                url: url,
                data: {
                    csrfmiddlewaretoken: form.find('input[name=csrfmiddlewaretoken]').val(),
                    email: email,
                },
                success: function(response) {
                    if (response.success) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Subscribed!',
                            text: response.message,
                            confirmButtonText: 'OK'
                        }).then(() => {
                            form[0].reset(); // Reset form fields
                            $emailInput.trigger('input'); // Update submit button state
                        });
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Failed',
                            text: 'Subscription failed: ' + response.message,
                            confirmButtonText: 'Try Again'
                        });
                    }
                },
                error: function(xhr) {
                    const response = xhr.responseJSON;
                    const errors = response && response.message ? response.message : 'An unexpected error occurred.';
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed',
                        text: 'Subscription failed! Error: ' + errors,
                        confirmButtonText: 'OK'
                    });
                }
            });
        });
    });
    
    // Enable button when there's text in the email field
    $('#nl-email').on('input', function () {
        const email = $(this).val().trim();
        $('#ns-send-btn').prop('disabled', email === '');
    });
})