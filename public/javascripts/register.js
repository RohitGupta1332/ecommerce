document.querySelector(".register-form").addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = {
        "name": document.querySelector("#name").value,
        "contact": document.querySelector("#contact").value,
        "email": document.querySelector("#email").value,
        "password": document.querySelector("#password").value
    };
    submitData(formData);

})

async function submitData(data) {
    try {
        const response = await fetch("http://localhost:3000/user/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.text();
            alert("Registration failed. Please try again.")
            throw new Error(`Error ${response.status}: ${error}`);
        }

        const result = await response.json();
        window.location.href = "../html/home.html";

    }
    catch (error) {
        console.error(error);
    }
}