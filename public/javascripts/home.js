document.getElementById('hamburger-menu').addEventListener('click', function() {
    const mobileLinks = document.getElementById('mobile-links');
    mobileLinks.classList.toggle('active');
});

document.querySelector(".product-categories").addEventListener("change", (event) => {
    document.location.href = `../html/products.html?value=${event.target.value}`;
})