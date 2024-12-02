document.querySelector(".search").addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        const searchValue = document.querySelector(".search").value.trim();
        if(searchValue != ""){
            searchProduct(searchValue);
        }
    }
})

async function searchProduct(query){
    try{
        const response = await fetch(`http://127.0.0.1:3000/search?query=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        const data = await response.json();
        if(data.length > 0){
            document.location.href = `../html/products.html?search=${data}`;
        }
        else{
            alert("No product found");
        }
    }
    catch(error){
        console.error(error);
    }
}