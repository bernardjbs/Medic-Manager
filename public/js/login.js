// This page will handle any login requests made from specified points on the 'view'.

// Handles login requests for users who have already signed up.
// Makes request to 'controllers/api/userRoutes' for this request
// Creates a new session
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to log in.');
    }
  }
};

// Handles signup requests for new users of the website
// Makes request to 'controllers/api/userRoutes' for this signup request
// Creates a new session
const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector('#firstName-signup').value.trim();
  const lastName = document.querySelector('#lastName-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// Listening for a click even on the login button
document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

// Listening for a click even on the signup button
document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
