document.addEventListener('DOMContentLoaded', function() {
    const steps = document.querySelectorAll('.form-step');
    const nextBtns = document.querySelectorAll('.next-btn');
    const prevBtns = document.querySelectorAll('.prev-btn');
    const progressSteps = document.querySelectorAll('.step');
    const progressConnectors = document.querySelectorAll('.step-connector');

    let currentStep = 0;

    function updateProgress() {
        progressSteps.forEach((step, index) => {
            if (index < currentStep) {
                step.classList.add('completed');
                step.classList.remove('active');
            } else if (index === currentStep) {
                step.classList.add('active');
                step.classList.remove('completed');
            } else {
                step.classList.remove('active', 'completed');
            }
        });

        progressConnectors.forEach((connector, index) => {
            if (index < currentStep) {
                connector.classList.add('active');
            } else {
                connector.classList.remove('active');
            }
        });
    }

    function showStep(stepIndex) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === stepIndex);
        });
        updateProgress();
    }

    function validateStep(stepIndex) {
        const step = steps[stepIndex];
        const requiredFields = step.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const formField = field.closest('.form-field');
            const message = formField.querySelector('.validation-message');

            if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
                isValid = false;
                formField.classList.add('error');
                formField.classList.remove('valid');
                if (message) {
                    message.textContent = 'هذا الحقل مطلوب';
                    message.classList.remove('hidden');
                }
            } else {
                formField.classList.remove('error');
                formField.classList.add('valid');
                if (message) {
                    message.classList.add('hidden');
                }
            }
        });

        return isValid;
    }

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep(currentStep)) {
                if (currentStep < steps.length - 1) {
                    currentStep++;
                    showStep(currentStep);
                }
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (currentStep > 0) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    // Clear validation error on input change
    document.querySelectorAll('.form-field input, .form-field select, .form-field textarea').forEach(field => {
        field.addEventListener('input', function() {
            const formField = this.closest('.form-field');
            formField.classList.remove('error');
            const message = formField.querySelector('.validation-message');
            if (message) {
                message.classList.add('hidden');
            }
        });
    });
});
