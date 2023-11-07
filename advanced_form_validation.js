// File: advanced_form_validation.js

// This JavaScript code is an advanced form validation example.
// It validates a registration form with various input fields, including email, password, and phone number.
// The code demonstrates complex validation rules and uses regular expressions.

// Function to validate the email format
function validateEmail(email) {
  var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return emailRegex.test(email);
}

// Function to validate the password strength
function validatePassword(password) {
  var passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Function to validate the phone number
function validatePhoneNumber(num) {
  var phoneRegex = /^(\+\d{1,3}\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return phoneRegex.test(num);
}

// Function to validate the entire form
function validateForm() {
  var firstName = document.getElementById("first-name").value;
  var lastName = document.getElementById("last-name").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var confirmPassword = document.getElementById("confirm-password").value;
  var phoneNumber = document.getElementById("phone-number").value;
  
  var errors = [];
  
  // Validate first name
  if (firstName.length < 1) {
    errors.push("First name is required.");
  }
  
  // Validate last name
  if (lastName.length < 1) {
    errors.push("Last name is required.");
  }
  
  // Validate email
  if (!validateEmail(email)) {
    errors.push("Invalid email address.");
  }
  
  // Validate password
  if (!validatePassword(password)) {
    errors.push("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.");
  }
  
  // Validate confirm password
  if (confirmPassword !== password) {
    errors.push("Passwords do not match.");
  }
  
  // Validate phone number
  if (!validatePhoneNumber(phoneNumber)) {
    errors.push("Invalid phone number format.");
  }
  
  if (errors.length > 0) {
    // Display errors
    var errorList = errors.map(function(error) {
      return "<li>" + error + "</li>";
    }).join("");
    
    document.getElementById("error-message").innerHTML = "<ul>" + errorList + "</ul>";
    return false;
  }
  
  return true;
}

// Event listener for form submission
document.getElementById("registration-form").addEventListener("submit", function(event) {
  if (!validateForm()) {
    event.preventDefault();
  }
});