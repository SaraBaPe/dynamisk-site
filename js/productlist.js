const params = new URLSearchParams(window.location.search);
const category = params.get("category");
const filterWomenBtn = document.querySelector("#filterWomenBtn");
const showAllBtn = document.querySelector("#showAllBtn");
const sortByPriceBtn = document.querySelector("#sortByPriceBtn");

const fetchUrl = category ? `https://kea-alt-del.dk/t7/api/products?category=${encodeURIComponent(category)}` : "https://kea-alt-del.dk/t7/api/products";

// const listURL = "https://kea-alt-del.dk/t7/api/products?category=" + category;
const listContainer = document.querySelector("main");

console.log("category:", category);

let allProducts = {};

let 

function getProducts() {
  fetch(fetchUrl).then((res) =>
    res.json().then((products) => {
      allProducts = products;
      showProducts(products);
    }),
  );
}

function showProducts(products) {
  listContainer.innerHTML = "";

  const container = document.createElement("div");
  container.classList.add("container");

  products.forEach((product) => {
    container.innerHTML += `
        <div class="product-gallery">
          <article class="product">
            <h2>${product.productdisplayname || "Produkt uden navn"}</h2>
            <h3>${product.brandname || "ukendt brand"}</h3>
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="Produkt 1" />
            <p class="price">${product.price || "Pris mangler"} Kr</p>
            <p class= "gender">${product.gender}</p>
            <p class="discount">${product.discount} Rabat</p>
            <p class="udsolgt">${product.soldout} Udsolgt</p>
            <a class="knap" href="product.html?id=${product.id}">Køb nu</a>
          </article>
      </div>
    `;
  });

  listContainer.appendChild(container);
}
function sortByPriceAsc() {
  const sorted = [...allProducts].sort((a, b) => a.price - b.price);
  showProducts(sorted);
}

sortByPriceBtn.addEventListener("click", sortByPriceAsc);
getProducts();

function filterByGender(targetGender) {
  const filtered = { ...allProducts }.filter((product) => (product.gender || "").toLowerCase() === targetGender.toLowerCase());
  showProducts(filtered);
}

filterWomenBtn.addEventListener("click", () => filterByGender("Women"));
showAllBtn.addEventListener("click", () => showProducts(allProducts));

getProducts();
