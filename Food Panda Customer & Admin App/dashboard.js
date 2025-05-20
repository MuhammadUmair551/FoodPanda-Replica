function logOut() {
    window.location.href = "./login.html";
}

window.onload = function () {
    var userName = localStorage.getItem("loggedInUser");
    if (userName) {
        document.querySelector(".welcome-para").textContent = "Welcome, " + userName;
    }
    showCategoryList();
};

var categories = JSON.parse(localStorage.getItem("category")) || [];
var items = JSON.parse(localStorage.getItem("items")) || [];

function saveCategories() {
    localStorage.setItem("category", JSON.stringify(categories));
}

function saveItems() {
    localStorage.setItem("items", JSON.stringify(items));
}

function createCategory() {
    var name = document.getElementById("category-name").value.trim();
    if (name === "") {
        alert("Please enter a category name.");
        return;
    }

    for (var i = 0; i < categories.length; i++) {
        if (categories[i].category === name) {
            alert("This category already exists.");
        }
    }

    var newCategory = {
        category: name
    };
    categories.push(newCategory);
    saveCategories();
    showCategoryList();

    document.getElementById("category-name").value = "";
    var modal = bootstrap.Modal.getInstance(document.getElementById("exampleModal"));
    modal.hide();
}


function showCategoryList() {
    var list = document.getElementById("unordered-list");
    list.innerHTML = "";

    categories.forEach((item, index) => {
        list.innerHTML += `
      <li class="list-item-none category d-flex justify-content-between align-items-center p-3 bg-white mb-2 shadow-sm" data-index="${index}">
        <p style="margin: 0;"><a href="#" class="text-dark" onclick="selectCategory('${item.category}')">${item.category}</a></p>
        <div>
          <button class="btn btn-sm btn-danger" onclick="deleteCategory(${index})">Delete</button>
        </div>
      </li>`;
    });
}

function deleteCategory(index) {
    var itemSec = document.getElementById("itemSection");
    alert("Category deleted successfully.");

    var categoryName = categories[index].category;
    categories.splice(index, 1);
    items = items.filter(function (item) {
        return item.category !== categoryName;
    });
    saveCategories();
    saveItems();
    showCategoryList();
    itemSec.classList.add("d-none");
}

function selectCategory(name) {
    document.getElementById("selectedCategoryName").textContent = `Items in "${name}"`;
    document.getElementById("itemForm").setAttribute("data-category", name);
    document.getElementById("itemSection").classList.remove("d-none");
    showItems(name);
}

document.getElementById("itemForm").addEventListener("submit", function (e) {
    e.preventDefault();
    var category = this.getAttribute("data-category");
    var name = document.getElementById("itemName").value.trim();
    var description = document.getElementById("itemDescription").value.trim();
    var price = parseFloat(document.getElementById("itemPrice").value.trim());
    var image = document.getElementById("itemImage").value.trim();

    if (!name || !description || !price || !image) {
        alert("Please fill all fields");
        return;
    }

    items.push({ category, name, description, price, image });
    saveItems();
    showItems(category);
    this.reset();
});

function showItems(category) {
    var container = document.getElementById("itemList");
    container.innerHTML = "";
    var filtered = items.filter(function (item) {
        return item.category === category;
    })
    if (filtered.length === 0) {
        container.innerHTML = "<p>No items in this category.</p>";
    }

    filtered.forEach((item, index) => {
        container.innerHTML += `
      <div class="col-md-4 mb-3">
        <div class="card">
          <img src="${item.image}" class="card-img-top" style="height: 200px; object-fit: cover;" />
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="card-text">${item.description}</p>
            <p class="card-text fw-bold">Rs. ${item.price}</p>
            <button class="btn btn-sm btn-danger" onclick="deleteItem('${category}', ${index})">Delete</button>
          </div>
        </div>
      </div>`;
    });
}

function deleteItem(category, index) {
    var filtered = items.filter(function (item) {
        return item.category === category;
    });
    var itemToDelete = filtered[index];
    items = items.filter(function (item) {
        return item !== itemToDelete;
    });
    saveItems();
    showItems(category);
}
