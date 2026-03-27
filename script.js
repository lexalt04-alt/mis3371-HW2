/*
Author: Alex Nguyen
Program name: script.js
Date created: 03/22/2026
Date last edited: 03/27/2026
Version: 2.0
Descriptiton: Javescript for HW2
*/
function showDate()     
        {
            const d = new Date();
            document.getElementById("today").innerHTML =
                d.toLocaleDateString('en-US', 
                {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                }
            );
            const dobInput = document.getElementById("dob");

            const maxDate = new Date();
            const minDate = new Date();
            minDate.setFullYear(maxDate.getFullYear() - 120);

                dobInput.max = maxDate.toISOString().split("T")[0];
                dobInput.min = minDate.toISOString().split("T")[0];
        }        
function validatePassword()     
            {
                const pw = document.querySelector('input[name="password"]').value;
                const cpw = document.querySelector('input[name="confirm_password"]').value;
                const userId = document.querySelector('input[name="user_id"]').value.toLowerCase();
                const errorBox = document.getElementById("passwordError");

                errorBox.innerText = "";

                        if (!pw || !cpw)
                        {
                                errorBox.style.color = "red";  
                                errorBox.innerText = ("Password fields cannot be empty.");
                                  return false;      
                        }
                        if (pw !== cpw) 
                        {
                                errorBox.style.color = "red";
                                errorBox.innerText = ("Passwords do not match.");
                                  return false;
                        }
                        if (pw.toLowerCase() === userId)
                        {
                                errorBox.style.color = "red";
                                errorBox.innerText = ("Password cannot contain your User ID.");
                                  return false;
                        }
                        if (userId && pw.toLowerCase().includes(userId))
                        {
                                errorBox.style.color = "red";
                                errorBox.innerText = ("Password cannot contain your User ID.");
                                  return false;
                        }
                    
                errorBox.style.color = "green";
                errorBox.innerText = "Password match";
                return true;
            }
function formatDOB()
         {
                 return true;
         }        
     
function validateDOB()
        {
                const dobInput = document.getElementById("dob").value;
                if (!dobInput) 
                {
                        alert("Please enter your date of birth.");
                        return false;
                }
                

                const dob = new Date(dobInput);
                const today = new Date();
                today.setHours(0,0,0,0);
                const minDate = new Date();
                minDate.setFullYear(today.getFullYear() - 120);

                if (dob < minDate)
                        {
                                alert("Date of birth cannot be more than 120 years ago.");
                                return false;
                        }
                if (dob > today)
                        {
                                alert("Date of birth cannot be in the future.");
                                return false;
                        }
                return true;
        }
function validateForm()
        {
                return validatePassword() && validateDOB();
        }
window.onload = function()
{
        showDate();
        
document.querySelector('input[name="phone"]').addEventListener('input', function(e)
        {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 6)
                        e.target.value = value.slice(0,3) + '-' + value.slice(3,6) + '-' + value.slice(6,10);
                                else if (value.length >= 3)
                                        e.target.value = value.slice(0,3) + '-' + value.slice(3);
                                        
                else
                        e.target.value = value;                    
        });
document.getElementById("ssn").addEventListener("input", function(e)
        {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >=5)
                        e.target.value = value.slice(0,3) + '-' + value.slice(3,5) + '-' + value.slice(5,9);
                                else if (value.length >= 3)
                                        e.target.value = value.slice(0,3) + '-' + value.slice(3);
                else
                        e.target.value = value;
        });
        
document.querySelector('input[name="user_id"]').addEventListener('input', function(e)
        {
                e.target.value = e.target.value.toLowerCase();
        });
};    

function showReview()
{
        if (!validateForm())
        {
                return;
        }
        
        let content = "";

        const first = document.querySelector('[name="first_name"]').value;
        const mi = document.querySelector('[name="middle_initial"]').value;
        const last = document.querySelector('[name="last_name"]').value;
        const fullName = mi ? `${first} ${mi} ${last}` : `${first} ${last}`;
        content += `<strong>Name:</strong> ${fullName}<br>`;

        const dob = document.getElementById("dob").value;
        let formattedDOB = "";

                if (dob)
                {
                        const parts = dob.split("-");
                        formattedDOB = `${parts[1]}/${parts[2]}/${parts[0]}`;
                }
        content += `<strong>DOB:</strong> ${formattedDOB}<br>`;

        const email = document.querySelector('[name="email"]').value;
        const phone = document.querySelector('[name="phone"]').value;
        content += `<strong>Email:</strong> ${email}<br>`;
        content += `<strong>Phone:</strong> ${phone}<br>`;

        const address = document.querySelector('[name="address1"]').value;
        const city = document.querySelector('[name="city1"]').value;
        const state = document.querySelector('[name="state1"]').value;
        const zip = document.querySelector('[name="zip1"]').value;
        content += `<strong>Address:</strong> ${address}, ${city}, ${state} ${zip}<br>`;

        const gender = document.querySelector('input[name="gender"]:checked');
        content += `<strong>Gender:</strong> ${gender ? gender.value : ""}<br>`;

        const consent = document.querySelector('input[name="consent"]:checked');
        content += `<strong>Consent:</strong> ${consent ? consent.value : ""}<br>`;
        
        const insurance = document.querySelector('input[name="insurance"]:checked');
        content += `<strong>Insurance:</strong> ${insurance ? insurance.value : ""}<br>`;

        const conditions = document.querySelectorAll('input[name="conditions"]:checked');
        let condList = [];
        conditions.forEach(c => condList.push(c.value));

        content += `<strong>Medical History:</strong> ${condList.length ? condList.join(", ") : "None"}<br>`;
   
        const pain = document.querySelector('[name="pain_scale"]').value;
        content += `<strong>Pain Level:</strong> ${pain}<br>`;
    
        const user = document.querySelector('[name="user_id"]').value;
        content += `<strong>User ID:</strong> ${user}<br>`;

        const reason = document.querySelector('[name="reason_for_visit"]').value;
        content += `<strong>Reason:</strong> ${reason}<br>`;
        
        document.getElementById("reviewContent").innerHTML = content;
        document.getElementById("reviewSection").style.display = "block";
}

function updatePainValue()
{
        const value = document.getElementById("pain").value;
        document.getElementById("painValue").innerText = value;
}
