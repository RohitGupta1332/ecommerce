
document.addEventListener('DOMContentLoaded', () => {
    viewCart();
});

async function viewCart() {
    try {
        const response = await fetch("http://127.0.0.1:3000/user/view-cart", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });
        if (response.ok) {
            const cart = await response.json();
            console.log(cart)
            createCart(cart);
        } else {
            console.error("Failed to fetch cart:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching cart:", error);
    }
}

function createCart(data) {
    const emptyCart = document.querySelector(".empty-cart");
    const tbody = document.querySelector(".cart-table tbody");
    const summaryTotal = document.querySelector(".cart-summary .summary-row:nth-child(1) span:nth-child(2)");
    const shippingCharges = document.querySelector(".cart-summary .summary-row:nth-child(2) span:nth-child(2)");
    const grandTotal = document.querySelector(".cart-summary .grand-total span:nth-child(2)");

    tbody.innerHTML = ""; // Clear the table body for fresh data

    let total = 0;
    let allZero = true;

    data.forEach(product => {
        product.products.forEach(p => { // Loop through all products in each cart item
            const subtotal = p.quantity * p.productId.price; // Assuming `productId` has `price`
            total += subtotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div class="product-details">
                        <button class="remove-btn">❌</button>
                        <img src="${p.productId.image}" alt="${p.productId.name}" class="product-image">
                        <span class="product-name">${p.productId.name}</span>
                    </div>
                </td>
                <td>$${p.productId.price}</td>
                <td>
                    <input type="number" min="1" max="10" value="${p.quantity}" class="quantity-input">
                </td>
                <td>$${subtotal}</td>
            `;
            tbody.appendChild(row);

            // Attach the event listener to the remove button
            row.querySelector(".remove-btn").addEventListener('click', () => {
                removeProduct(p.productId._id);
            });
        });
    });

    if (total === 0) {
        document.querySelector(".cart-table").style.display = "none";
        document.querySelector(".cart-summary").style.display = "none"; 
        document.querySelector(".cart-actions").style.display = "none"; 
        emptyCart.style.display = "block";
        console.log(emptyCart)
        return; // Exit early if the total is 0 (i.e., no items)
    }
    
    document.querySelector(".cart-table").style.display = "table"; // Ensure the table is displayed correctly
    document.querySelector(".cart-summary").style.display = "block"; 
    document.querySelector(".cart-action").style.display = "block"; 
    document.querySelector(".empty-cart").style.display = "none"; // Hide the empty cart message
    
    const shipping = 50; // Static shipping charge
    summaryTotal.textContent = `$${total}`;
    shippingCharges.textContent = `$${shipping}`;
    grandTotal.textContent = `$${total + shipping}`;
}

async function removeProduct(productId) {
    try {
        const response = await fetch(`http://127.0.0.1:3000/user/remove-item`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId: productId }),
            credentials: 'include'
        });
        if (response.ok) {
            window.location.reload();
        } else {
            console.error("Failed to remove product:", result.message);
        }
    } catch (error) {
        console.error("Error removing product:", error);
    }
}
