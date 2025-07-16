let categories = JSON.parse(localStorage.getItem("category")) || [];
let items = JSON.parse(localStorage.getItem("items")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

window.onload = function () {
  const user = localStorage.getItem("loggedInUser") || "Guest";
  document.getElementById("user-name").textContent = user;
  renderCategoryList();
  updateCartCount();
}

function logOut() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("userRole");
  window.location.href = "login.html";
}

function renderCategoryList() {
  const categoryContainer = document.getElementById("categoryContainer");
  categoryContainer.innerHTML = "";

  categories.forEach((cat, index) => {
    const div = document.createElement("div");
    div.className = "col-md-3 text-center";
    div.innerHTML = `
          <div class="p-3 border rounded category-list bg-white shadow-sm" onclick="selectCategory('${cat.category}')">
            <h6>${cat.category}</h6>
          </div>`;
    categoryContainer.appendChild(div);
  });
}

function selectCategory(name) {
  document.getElementById("itemSection").classList.remove("d-none");
  document.getElementById("selectedCategoryName").textContent = `Items in "${name}"`;
  showItems(name);
}

function showItems(category) {
  const container = document.getElementById("itemList");
  container.innerHTML = "";

  const filtered = items.filter(item => item.category === category);

  if (filtered.length === 0) {
    container.innerHTML = `<p class="text-muted text-center">No items available in this category.</p>`;
    return;
  }

  filtered.forEach(item => {
    const col = document.createElement("div");
    col.className = "col-md-6 col-sm-6 col-lg-4 mb-3";
    col.innerHTML = `
          <div class="card h-100">
            <img src="${item.image}" class="card-img-top" alt="Item Image">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text fw-bold">Rs. ${item.price}</p>
              <button class="btn order-btn text-light btn-sm" onclick='addToCart(${JSON.stringify(JSON.stringify(item))})'>Add to Cart</button>
            </div>
          </div>`;
    container.appendChild(col);
  });
}

function addToCart(itemStr) {
  var item = JSON.parse(itemStr);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Item added to cart!");
}

function updateCartCount() {
  document.getElementById("cart-count").textContent = cart.length;
}

function toggleCart() {
  document.getElementById("cartSidebar").classList.toggle("open");
  showCartItems();
}

function showCartItems() {
  const cartContainer = document.getElementById("cartItems");
  cartContainer.innerHTML = "";

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-muted">Your cart is empty.</p>`;
    return;
  }

  cart.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "card mb-2";
    div.innerHTML = `
          <div class="card-body p-2">
            <div class="d-flex justify-content-between">
              <div>
                <h6 class="mb-0">${item.name}</h6>
                <small>Rs. ${item.price}</small>
              </div>
              <button class="btn btn-sm btn-outline-danger" onclick="removeFromCart(${index})">Remove</button>
            </div>
          </div>`;
    cartContainer.appendChild(div);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showCartItems();
}

function placeOrder() {
  if (cart.length === 0) {
    alert("Cart is empty!");
    return;
  }
  cart = [];  
  localStorage.removeItem("cart");
  updateCartCount();
  toggleCart();
}