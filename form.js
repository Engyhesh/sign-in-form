const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePassword.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        togglePassword.classList.replace("fa-eye-slash", "fa-eye");
    }
});

function validateForm() {
    let isValid = true;

    const fields = [
        {
            input: document.getElementById("fullName"),
            emptyMessage: "Please enter your full name",
            invalidMessage: "Name must contain letters only",
            validate: (value) => /^[a-zA-Z\u0600-\u06FF\s]+$/.test(value)
        },
        {
            input: document.getElementById("email"),
            emptyMessage: "Please enter your email",
            invalidMessage: "Email must contain @ and end with .com",
            validate: (value) => {
                if (!value.includes("@")) {
                    return "Email must contain @";
                }
                if (!value.endsWith(".com")) {
                    return "Email must end with .com";
                }
                return /^[^\s@]+@[^\s@]+\.com$/.test(value);
            }
        },
        {
            input: document.getElementById("phone"),
            emptyMessage: "Please enter your phone number",
            invalidMessage: "Phone number must be exactly 11 digits",
            validate: (value) => /^\d{11}$/.test(value)
        },
        {
            input: document.getElementById("password"),
            emptyMessage: "Please enter your password",
            invalidMessage: "Password must be at least 8 characters",
            validate: (value) => value.length >= 8
        }
    ];

    fields.forEach((field) => {
        const input = field.input;
        const error = input.closest(".content > div").querySelector(".error");
        const value = input.value.trim();

        // Clear previous messages
        error.textContent = "";
        input.classList.remove("input-error", "input-success");

        if (value === "") {
            error.textContent = field.emptyMessage;
            input.classList.add("input-error");
            isValid = false;
        } else {
            const result = field.validate(value);

            if (typeof result === "string") {
                error.textContent = result;
                input.classList.add("input-error");
                isValid = false;
            } else if (result === false) {
                error.textContent = field.invalidMessage;
                input.classList.add("input-error");
                isValid = false;
            } else {
                input.classList.add("input-success");
            }
        }
    });

    return isValid;
}

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Stop the form from submitting normally

    if (validateForm()) {
        // Everything is correct → go to success page
        window.location.href = "success.html";
    }
    // If not valid, the error messages are already shown under the inputs
});