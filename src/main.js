const shop = document.getElementById("shop");

let cartItems = [];
const previousItems = localStorage.getItem("cart");
if (!previousItems) {
  cartItems = [];
} else {
  cartItems = JSON.parse(previousItems);
}

generateItems();

function generateItems() {
  shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
      let cartItem = cartItems.find((item) => item.id === id);

      return `
        <div id="product-id-${id}" class="item">
            <img src=${img} alt="${name}" width="220" />
            <div class="details">
              <h3>${name}</h3>
              <p>${desc}</p>
              <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                  <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${
        cartItem ? cartItem.value : 0
      }</div>
                  <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
        </div>
    `;
    })
    .join("");

  //   let items = "";
  //   shopItemsData.forEach((item) => {
  //     const { id, name, price, desc, img } = item;
  //     items += `
  //         <div id="product-id-${id}" class="item">
  //             <img src=${img} alt=${name} width="220" />
  //             <div class="details">
  //               <h3>${name}</h3>
  //               <p>${desc}</p>
  //               <div class="price-quantity">
  //                 <h2>$ ${price}</h2>
  //                 <div class="buttons">
  //                   <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
  //                   <div id="" class="quantity">0</div>
  //                   <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
  //                 </div>
  //               </div>
  //             </div>
  //         </div>
  //     `;
  //   });
  //   shop.innerHTML = items;
}

function increment(id) {
  let quantity = id;
  let value = Number(quantity.textContent);
  value += 1;
  quantity.textContent = value;

  cartItems.find((item) => {
    if (item.id === quantity.id) {
      item.value = value;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
  });

  let item = cartItems.find((item) => item.id === quantity.id);

  if (!item) {
    cartItems.push({ id: quantity.id, value });
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

const decrement = (id) => {
  let value = Number(id.textContent);
  value -= 1;
  if (value < 0) value = 0;
  id.textContent = value;
};
