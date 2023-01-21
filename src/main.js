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
      const cartItem = cartItems.find((item) => item.id === id);

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
  let selectedItem = id;
  let value = Number(selectedItem.textContent);
  value += 1;
  selectedItem.textContent = value;

  const existingItem = cartItems.find((item) => item.id === selectedItem.id);
  console.log(existingItem);

  if (!existingItem) {
    cartItems.push({ id: selectedItem.id, value });
  } else {
    existingItem.value = value;
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
}

const decrement = (id) => {
  let selectedItem = id;
  let value = Number(selectedItem.textContent);
  if (value !== 0) value -= 1;
  selectedItem.textContent = value;

  cartItems.find((item) => {
    if (item.id === selectedItem.id) {
      item.value = value;
    }
  });

  cartItems = cartItems.filter((item) => item.value !== 0);

  localStorage.setItem("cart", JSON.stringify(cartItems));
};
