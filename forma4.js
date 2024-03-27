document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const themeToggleCheckbox = document.getElementById('theme-toggle-checkbox');

    // Load theme from local storage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggleCheckbox.checked = true;
    }

    // Theme toggle
    themeToggleCheckbox.addEventListener('change', function () {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', themeToggleCheckbox.checked ? 'dark' : 'light');
    });

    // Form validation
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            submitForm();
        }
    });

    function validateForm() {
        const name = document.getElementById('name-input').value.trim();
        const password = document.getElementById('password-input').value.trim();
        const confirmPassword = document.getElementById('confirm-password-input').value.trim();
        const email = document.getElementById('email-input').value.trim();

        if (name === '' || password === '' || confirmPassword === '' || email === '') {
            alert('All fields are required.');
            return false;
        }

        if (password.length < 6) {
            alert('Password must be at least 6 characters long.');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return false;
        }

        // Add email validation here if needed

        return true;
    }

    function submitForm() {
        const formData = new FormData(form);
        fetch('/register', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(() => {
                alert('Registration successful!');
                form.reset();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Registration failed. Please try again later.');
            });
    }
});