const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');

console.log(document.cookie);

if(value === "all-products"){
    getAllProducts();
}

async function getAllProducts(){
    try{
        const response = await fetch("http://localhost:3000/product",{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
    }
    catch(error){
        console.error(error);
    }
}