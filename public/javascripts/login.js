document.querySelector(".login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    let formData = {
        "email": document.querySelector("#email").value.trim(),
        "password": document.querySelector("#password").value.trim()
    };
    submitData(formData);

})

async function submitData(data){
    try{
        const response = await fetch("http://127.0.0.1:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: 'include'
        });
        if (!response.ok) {
            const error = await response.text();
            alert("Invalid email or password");
            throw new Error(`Error ${response.status}: ${error}`);
        }

        const result = await response.json();
        window.location.href = "../html/home.html";
    }
    catch(error){
        console.error(error);
    }
}