/*
Author: Alex Nguyen
Program name: script.js
Date created: 03/22/2026
Date last edited: 03/27/2026
Version: 2.0
Descriptiton: Javescript for HW2
*/
function updateSlider(value) {
    document.getElementById("healthValue").textContent =
        "$" + Number(value).toLocaleString();
}

function clearReview() {
    document.getElementById("reviewOutput").innerHTML = "";
    document.getElementById("healthValue").textContent = "$50,000";
}

function reviewForm() {
    const form = document.getElementById("form");

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const firstName = document.getElementById("fname").value.trim();
    const middleInitial = document.getElementById("mi").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const dob = document.getElementById("dob").value;
    const idNumber = document.getElementById("ssn").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value;
    const zip = document.getElementById("zip").value.trim();
    const salary = document.getElementById("salary").value;
    const symptoms = document.getElementById("symptoms").value.trim();
    const userIdInput = document.getElementById("userid");
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    userIdInput.value = userIdInput.value.toLowerCase();
    const userId = userIdInput.value.trim();

    const today = new Date();
    const birthDate = new Date(dob);
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (birthDate > today) {
        alert("Date of birth cannot be in the future.");
        return;
    }

    if (birthDate < minDate) {
        alert("Date of birth cannot be more than 120 years ago.");
        return;
    }

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#%^&*()\-_\+=\\\/><\.,`~])[^\"]{8,30}$/;

    if (!passwordPattern.test(password)) {
        alert("Password must be 8 to 30 characters and include an uppercase letter, lowercase letter, number, and special character. Double quotes are not allowed.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        return;
    }

    const lowerPassword = password.toLowerCase();
    if (userId !== "" && lowerPassword.includes(userId.toLowerCase())) {
        alert("Password cannot contain your user ID.");
        return;
    }

    if (firstName !== "" && lowerPassword.includes(firstName.toLowerCase())) {
        alert("Password cannot contain your first name.");
        return;
    }

    if (lastName !== "" && lowerPassword.includes(lastName.toLowerCase())) {
        alert("Password cannot contain your last name.");
        return;
    }

    const checkedHistory = Array.from(document.querySelectorAll('input[name="history"]:checked'))
        .map(item => item.value);

    const gender = document.querySelector('input[name="gender"]:checked')?.value || "";
    const vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "";
    const insurance = document.querySelector('input[name="insurance"]:checked')?.value || "";

    const reviewHtml = `
        <strong>PLEASE REVIEW THIS INFORMATION</strong><br><br>

        <strong>Name:</strong> ${firstName} ${middleInitial} ${lastName}<br>
        <strong>Date of Birth:</strong> ${dob}<br>
        <strong>ID Number:</strong> ${idNumber}<br><br>

        <strong>Email Address:</strong> ${email}<br>
        <strong>Phone Number:</strong> ${phone}<br><br>

        <strong>Address:</strong><br>
        ${address1}<br>
        ${address2 ? address2 + "<br>" : ""}
        ${city}, ${state} ${zip.substring(0, 10)}<br><br>

        <strong>Medical History:</strong> ${checkedHistory.length ? checkedHistory.join(", ") : "None selected"}<br>
        <strong>Gender:</strong> ${gender}<br>
        <strong>Vaccinated:</strong> ${vaccinated}<br>
        <strong>Insurance:</strong> ${insurance}<br>
        <strong>Desired Salary:</strong> $${Number(salary).toLocaleString()}<br><br>

        <strong>Current Symptoms:</strong><br>
        ${symptoms ? symptoms : "No symptoms entered."}<br><br>

        <strong>User ID:</strong> ${userId}<br>
        <strong>Password:</strong> ${password}
    `;

    document.getElementById("reviewOutput").innerHTML = reviewHtml;
}
