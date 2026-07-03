tippy('#copyButton', {
    content: 'Link Copied!',
    theme: 'light',
    trigger: 'click',
    onShow(instance) {
        setTimeout(() => {
            instance.hide()
        }, 1500) // Hide the tooltip after 1.5 seconds
    }
})

function copyLink() {
    // Get the button element by its ID
    const button = $('#copyButton');

    // Retrieve the 'data-url' attribute from the button
    const linkToCopy = button.attr('data-url');

    // Check if the linkToCopy is valid
    if (linkToCopy) {
        // Create a temporary input element
        const tempInput = document.createElement('input');
        tempInput.value = linkToCopy;

        // Append the input element to the body
        document.body.appendChild(tempInput);

        // Select the value in the input element
        tempInput.select();
        tempInput.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');

        // Remove the temporary input element from the body
        document.body.removeChild(tempInput);
    } else {
        console.error('No URL found to copy');
    }
}

