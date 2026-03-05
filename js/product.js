const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log("id:", id);

const productURL = "https://kea-alt-del.dk/t7/api/products/" + id;
const productcontainer = document.querySelector(".product_card");

function getData() {
  fetch(productURL).then((res) => res.json().then((data) => show(data)));
}

const html = String.raw;

function show(data) {
  productcontainer.innerHTML = html`
    <article>
      <h3 class="productName">${data.productdisplayname}</h3>
      <img src="https://kea-alt-del.dk/t7/images/webp/640/${id}.webp" alt="Produkt 1" />
    </article>
    <article class="card_info">
      <p class="price">${data.price} kr</p>
      <p class="discount">${data.discount} kr</p>
      <p class="soldout">${data.soldout}</p>
      <p class="brandname">${data.brandname}</p>
      <a class="knap" href="product.html">Køb nu</a>
    </article>
  `;
}

getData();
