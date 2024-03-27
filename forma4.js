document.getElementById('theme-toggle-checkbox');
document.getElementById('main-container');
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

        // Send theme change request to the server
        const theme = themeToggleCheckbox.checked ? 'dark' : 'light';
        fetch('/theme', {
            method: 'POST',
            body: JSON.stringify({ theme }),
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
            .then(data => {
                console.log(data); // Optional: Handle response from the server
            })
            .catch(error => {
                console.error('Error:', error);
                // Optional: Handle error
            });
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
        const userType = document.getElementById('user-type-input').value;

        if (name === '' || password === '' || userType === '') {
            alert('All fields are required.');
            return false;
        }

        // Add more validation rules if needed

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


