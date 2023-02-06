const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");
const cartAmount = document.getElementById("cartAmount");

let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

generateBody();
addToCart();

function generateBody() {
  let totalAmountArray = [];
  let totalBill = 0;

  if (cartItems.length === 0) {
    console.log("object");
    label.innerHTML = `
        <h2>Cart is Empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to Home</button>
        </a>
    `;
    shoppingCart.innerHTML = ``;
  } else {
    shoppingCart.innerHTML = cartItems
      .map((item) => {
        const { id, value } = item;
        const itemObj = shopItemsData.find((itemData) => itemData.id === id);
        const { name, price, img } = itemObj;

        const itemTotalAmount = price * value;

        totalAmountArray.push(itemTotalAmount);
        totalBill = totalAmountArray.reduce((x, y) => x + y, 0);

        return `
            <div class="cart-item">
                <img width="100" src=${img} alt="${name}" />

                <div class="details">
                    <div class="title-price-x">
                        <h4 class="title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">$ ${price}</p>
                        </h4>
                        <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                    </div>

                    <div class="cart-buttons">
                        <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${value}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                        </div>
                    </div>

                    <h3>$ ${itemTotalAmount}</h3>
                </div>
            </div>
        `;
      })
      .join("");

    label.innerHTML = `
            <h2>Total Bill :$ ${totalBill} </h2>
            <button class="checkout">Checkout</button>
            <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
  }
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
  generateBody();
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
  generateBody();
};

const removeItem = (id) => {
  let selectedItem = id;
  cartItems = cartItems.filter((item) => item.id !== selectedItem.id);

  localStorage.setItem("cart", JSON.stringify(cartItems));
  addToCart();
  generateBody();
};

function clearCart() {
  cartItems = [];

  localStorage.setItem("cart", JSON.stringify(cartItems));
  addToCart();
  generateBody();
}

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
