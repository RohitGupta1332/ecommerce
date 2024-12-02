const urlParams = new URLSearchParams(window.location.search);
const value = urlParams.get('value');

if (value === "all-products") {
    getAllProducts();
}
else {
    getProductsByCategory(value);
}

async function getAllProducts() {
    try {
        const response = await fetch("http://127.0.0.1:3000/product", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const data = await response.json();
        createProductCards(data);
    }
    catch (error) {
        console.error(error);
    }
}

async function getProductsByCategory(category) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/category/${category}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        });
        const result = await response.json();
        createProductCards(result);
    }
    catch (error) {
        console.error(error);
    }
}

function createProductCards(data) {
    const categoriesSection = document.querySelector(".top-product-section");
console.log(data)
    categoriesSection.innerHTML = '';
    data.products.forEach(product => {
        // Create the product card container
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        // Create the product image
        const productImage = document.createElement("img");
        productImage.src = product.image; // Assuming the product object has an 'imageUrl' field
        productImage.alt = "Product Image";
        productImage.classList.add("product-image");

        // Create the product details container
        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        // Add product name
        const productName = document.createElement("h4");
        productName.classList.add("product-name");
        productName.textContent = product.name; // Assuming the product object has a 'name' field

        // Add product price
        const productPrice = document.createElement("p");
        productPrice.classList.add("product-price");
        productPrice.textContent = `$${product.price}`; // Assuming the product object has a 'price' field

        // Create action container
        const actionContainer = document.createElement("div");
        actionContainer.classList.add("action-container");

        // Create quantity container
        const quantityContainer = document.createElement("div");
        quantityContainer.classList.add("quantity-container");

        const quantityLabel = document.createElement("label");
        quantityLabel.setAttribute("for", "quantity");
        quantityLabel.textContent = "Qty:";

        const quantitySelect = document.createElement("select");
        quantitySelect.id = "quantity";
        quantitySelect.classList.add("product-quantity");

        // Add quantity options
        for (let i = 1; i <= 5; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = i;
            quantitySelect.appendChild(option);
        }

        quantityContainer.appendChild(quantityLabel);
        quantityContainer.appendChild(quantitySelect);

        // Add "Add to Cart" button
        const addToCartBtn = document.createElement("button");
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.addEventListener("click", () => {
            addToCart(product._id, quantitySelect.value); // Assuming there's a product 'id'
        });

        // Append elements to action container
        actionContainer.appendChild(quantityContainer);
        actionContainer.appendChild(addToCartBtn);

        // Append details to product details container
        productDetails.appendChild(productName);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(actionContainer);

        // Append all to product card
        productCard.appendChild(productImage);
        productCard.appendChild(productDetails);

        // Append product card to the categories section
        categoriesSection.appendChild(productCard);
    });
}

async function addToCart(productId, quantity) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/user/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
            credentials: 'include'
        });
        if (response.ok) {
            const result = await response.json();
        }
    }
    catch (error) {
        console.log(error);
    }
}