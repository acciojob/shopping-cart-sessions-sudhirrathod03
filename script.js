// This is the boilerplate code given for you
// You can modify this code
// Product data

const cartList = document.getElementById("cart-list");
const clearBtn = document.getElementById("clear-cart-btn");
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");

// Render product list
function renderProducts() {
productList.innerHTML = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

function getCart() {
  const cart = sessionStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}
function saveCart(cart){
	sessionStorage.setItem("cart", JSON.stringify(cart))
}
// Render cart list
function renderCart() {
	  let cart = JSON.parse(sessionStorage.getItem("cart")) || [];


  cartList.innerHTML = "";

  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
	let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

	const product=products.find(p=>p.id === productId) ;
	cart.push(product)
	saveCart(cart)
	renderCart()
}

// Remove item from cart
function removeFromCart(productId) {}
// Clear cart
clearBtn.addEventListener("click", clearCart);
function clearCart() {
sessionStorage.removeItem("cart");
  renderCart();
}
productList.addEventListener("click",(e)=>{
	if(e.target.classList.contains("add-to-cart-btn")){
		const id = Number(e.target.dataset.id)
		addToCart(id)
	}
});

clearBtn.addEventListener("click", clearCart);


document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  renderCart();
});
