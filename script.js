// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function () {
    // Get the contact form element
    const contactForm = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    // Add an event listener for form submission
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Clear previous response message
        responseMessage.innerText = '';

        // Create a FormData object to gather form data
        const formData = new FormData(contactForm);

        // Validate form data (basic validation)
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');

        if (!name || !email || !message) {
            responseMessage.innerText = 'Please fill in all fields.';
            return;
        }

        // Send the form data to the server using Fetch API
        fetch('submit_contact.php', { // Change to your server-side script
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Display the server response message
            responseMessage.innerText = data.message;
            contactForm.reset(); // Reset the form after successful submission
        })
        .catch(error => {
            console.error('Error:', error);
            responseMessage.innerText = 'There was a problem with your submission. Please try again.';
        });
    });
});