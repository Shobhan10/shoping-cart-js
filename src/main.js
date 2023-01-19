const shop = document.getElementById("shop");

generateItems();

function generateItems() {
  shop.innerHTML = shopItemsData
    .map((item) => {
      const { id, name, price, desc, img } = item;
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
                  <div id="${id}" class="quantity">0</div>
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
  let value = Number(id.textContent);
  value += 1;
  id.textContent = value;
}

const decrement = (id) => {
  let value = Number(id.textContent);
  value -= 1;
  if (value < 0) value = 0;
  id.textContent = value;
};
