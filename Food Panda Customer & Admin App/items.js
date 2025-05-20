function addItem() {
    var itemName = document.getElementById("recipient-name").value;
    var itemImg = document.getElementById("img-path");
    var itemPrice = document.getElementById("post-price").value;
    var itemCaption = document.getElementById("caption-text").value;

    if (itemName == "" || itemImg == "" || itemPrice == "" || itemCaption == "") {
        alert("Please fill in all fields");
    } else {
        var reader = new FileReader();
        reader.onload = function (e) {
            var items = {
                name: itemName,
                img: e.target.result,
                price: itemPrice,
                caption: itemCaption
            }
            var allItems = JSON.parse(localStorage.getItem("items")) || [];
            allItems.push(items);
            localStorage.setItem("items", JSON.stringify(allItems));
            renderItems();
        }
        if (itemImg.files.length > 0) {
            reader.readAsDataURL(itemImg.files[0]);
        }
    }
}

function renderItems(usermode = false) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    const allItems = JSON.parse(localStorage.getItem('items')) || [];

    allItems.forEach((item, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mt-3 card-ha';

        const card = document.createElement('div');
        card.className = 'card product-card';

        const img = document.createElement('img');
        img.className = 'card-img-top';
        img.src = item.img;

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const title = document.createElement('h5');
        title.className = 'card-title';
        title.textContent = item.name;

        const text = document.createElement('p');
        text.className = 'card-text';
        text.textContent = item.caption;

        const price = document.createElement('p');
        price.innerHTML = `<strong>Price: </strong>Rs. ${item.price}`;

        cardBody.appendChild(title);
        cardBody.appendChild(text);
        cardBody.appendChild(price);

        if (!usermode) {
            
            const editBtn = document.createElement('button');
            editBtn.className = 'btn btn-sm btn-warning';
            editBtn.textContent = 'Edit';
            editBtn.onclick = () => editItems(index);
            
            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'btn btn-sm btn-danger me-2';
            deleteBtn.textContent = 'Delete';
            deleteBtn.onclick = () => deleteItems(index);

            cardBody.appendChild(deleteBtn);
            cardBody.appendChild(editBtn);
        }

        card.appendChild(img);
        card.appendChild(cardBody);
        col.appendChild(card);
        postsContainer.appendChild(col);
    });
    name = "";
    image = "";
    caption = "";
    price = "";

    var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
    modal.hide();
}

function editItems(index){
    var allItems = JSON.parse(localStorage.getItem("items")) || [];
    var item = allItems[index];

    document.getElementById("edit-index").value = index;
    document.getElementById("edit-name").value = item.name;
    document.getElementById("edit-img").value = "";
    document.getElementById("edit-price").value = item.price;
    document.getElementById("edit-caption").value = item.caption;

    var modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
}

function saveEdit(){
    var index = document.getElementById("edit-index").value;
    var itemName = document.getElementById("edit-name").value;
    var itemImg = document.getElementById("edit-img");
    var itemPrice = document.getElementById("edit-price").value;
    var itemCaption = document.getElementById("edit-caption").value;

    var allItems = JSON.parse(localStorage.getItem("items")) || [];
    if(itemName == "" || itemPrice == "" || itemCaption == "") {
        alert("Please fill in all fields");
        return;
    }
    if(itemImg.files.length > 0){
        var reader = new FileReader();
        reader.onload = function (e){
            allItems[index] = {
                name: itemName,
                img: e.target.result,
                price: itemPrice,
                caption: itemCaption
            }
            localStorage.setItem("items", JSON.stringify(allItems));
            renderItems();

            var modal = bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
        }
        reader.readAsDataURL(itemImg.files[0]);
    }else{
        allItems[index].name = itemName;
        allItems[index].price = itemPrice;
        allItems[index].caption = itemCaption;
        localStorage.setItem("items", JSON.stringify(allItems));
        renderItems();  
        var modal = bootstrap.Modal.getInstance(document.getElementById('editModal')).hide();
    }
}

function deleteItems(index) {
    var allItems = JSON.parse(localStorage.getItem("items")) || [];
    allItems.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(allItems));
    renderItems();
}

window.onload = function () {
    var userName = localStorage.getItem("loggedInUser");
    if (userName) {
        document.querySelector(".welcome-para").textContent = "Welcome, " + userName;
    }
};

