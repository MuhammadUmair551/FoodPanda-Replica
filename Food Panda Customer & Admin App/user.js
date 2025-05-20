let categories = JSON.parse(localStorage.getItem("category")) || [];
    let items = JSON.parse(localStorage.getItem("items")) || [];

    window.onload = function () {
      const user = localStorage.getItem("loggedInUser") || "Guest";
      document.getElementById("user-name").textContent = user;
      renderCategoryList();
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
        col.className = "col-md-4 mb-3";
        col.innerHTML = `
          <div class="card h-100">
            <img src="${item.image}" class="card-img-top" alt="Item Image">
            <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text fw-bold">Rs. ${item.price}</p>
            </div>
          </div>`;
        container.appendChild(col);
      });
    }