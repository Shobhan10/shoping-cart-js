const shop = document.getElementById("shop");
const cartAmount = document.getElementById("cartAmount");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

generateItems();
addToCart();

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
                    <div id=${id} class="quantity">
                      ${cartItem ? cartItem.value : 0}
                    </div>
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

  const existingItem = cartItems.find((item) => item.id === selectedItem.id);

  if (!existingItem) {
    cartItems.push({ id: selectedItem.id, value });
  } else {
    existingItem.value = value;
  }

  update(selectedItem, value);
}

const decrement = (id) => {
  let selectedItem = id;
  let value = Number(selectedItem.textContent);
  if (value !== 0) value -= 1;

  cartItems.find((item) => {
    if (item.id === selectedItem.id) {
      item.value = value;
    }
  });

  cartItems = cartItems.filter((item) => item.value !== 0);

  update(selectedItem, value);
};

function update(selectedItem, value) {
  selectedItem.textContent = value;
  localStorage.setItem("cart", JSON.stringify(cartItems));

  addToCart();
}

function addToCart() {
  const totalItems = cartItems.reduce((totalValue, currentItem) => {
    return totalValue + currentItem.value;
  }, 0);
  cartAmount.textContent = totalItems;
}
