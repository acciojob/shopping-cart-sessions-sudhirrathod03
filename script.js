// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");

// 1. Maintain global state to survive Cypress test-block wipes
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Render product list
function renderProducts() {
  productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list from the global variable
function renderCart() {
  cartList.innerHTML = "";
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cart.push(product); // Update global memory state
    sessionStorage.setItem("cart", JSON.stringify(cart)); // Sync with storage
    renderCart();
  }
}

// Clear cart
function clearCart() {
  cart = []; // Wipe global memory state
  sessionStorage.removeItem("cart"); // Wipe storage
  renderCart();
}

// Event Listeners
clearBtn.addEventListener("click", clearCart);

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const id = Number(e.target.dataset.id);
    addToCart(id);
  }
});

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});