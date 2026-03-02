const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const fetchUrl = category ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}` : "https://kea-alt-del.dk/t7/api/products";

const listURL = "https://kea-alt-del.dk/t7/api/products?category=" + category;
const listContainer = document.querySelector("main");

console.log("category:", category);

function getProducts() {
  fetch(listURL).then((res) => res.json().then((products) => showProducts(products)));
}

function showProducts(products) {
  // Start med tom container
  listContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("container");

  // products er et array af objekter
  products.forEach((product) => {
    container.innerHTML += `
        <div class="product-gallery">
          <article class="product">
            <h2>${product.productdisplayname}</h2>
            <h3>${product.brandname}</h3>
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Produkt 1" />
            <p class="price">${product.price} Kr</p>
            <p class="discount">${product.discount} Rabat</p>
            <p class="udsolgt">${product.soldout} Udsolgt</p>
            <a class="knap" href="product.html?id=${product.id}">Køb nu</a>
          </article>
      </div>
    `;
  });

  listContainer.appendChild(container);
}

getProducts();
