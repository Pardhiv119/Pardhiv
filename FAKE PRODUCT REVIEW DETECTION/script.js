const products = [
    { name: "Laptop", price: 50000, image: "https://sm.mashable.com/t/mashable_in/article/i/ive-review/ive-reviewed-over-59-laptops-and-this-is-the-best-windows-la_rzds.2496.jpg" },
    { name: "Headphones", price: 2000, image: "https://blaupunktaudio.in/cdn/shop/files/Group_1_3.jpg?v=1730279162" },
    { name: "Smartphone", price: 30000, image: "https://opsg-img-cdn-gl.heytapimg.com/epb/202412/19/AceLeaXtntKw1AZf.png" },
    { name: "Smartwatch", price: 10000, image: "https://m.media-amazon.com/images/I/41zSb8-SITL._SX300_SY300_QL70_FMwebp_.jpg" }
];

function displayProducts(filteredProducts) {
    const grid = document.getElementById("productGrid");
    grid.innerHTML = "";

    filteredProducts.forEach(product => {
        const productElement = `
            <div class="product" onclick="handleProductClick('${product.name}')">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>₹${product.price}</p>
            </div>
        `;
        grid.innerHTML += productElement;
    });
}

function handleProductClick(productName) {
    if (productName === 'Laptop') {
        window.location.href = 'index2.html';
    }
}

function applyFilters() {
    const maxPrice = document.getElementById("price").value;
    const filtered = products.filter(p => p.price <= maxPrice || maxPrice === "");
    displayProducts(filtered);
}

document.getElementById("search").addEventListener("input", function () {
    const searchValue = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(searchValue));
    displayProducts(filtered);
});

// Initial Display
displayProducts(products);
