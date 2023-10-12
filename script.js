"use strict";
fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    const productContent = document.querySelector(".top-content");
    console.log(data);
    // Формирование карточек товаров
    data.forEach(
      ({
        idProduct,
        imgUrl,
        linkProduct,
        nameProduct,
        textProduct,
        priceProduct,
        cartImg,
      }) => {
        const productElem = `
                <div class="product" id=${idProduct}>
                    <img
                    src="${imgUrl}"
                    alt="product"
                    class="product__img"/>
                    <div class="product__content">
                    <a href="${linkProduct}" class="product__heading"
                        >${nameProduct}</a>
                    <p class="product__text">
                        ${textProduct}
                    </p>
                    <p class="product__price">${priceProduct}</p>
                    </div>
                    <button class="product__add" type="button"><img src="${cartImg}" alt="cart">
                    <p>Add to Cart</p></button>
                    
                </div>`;
        productContent.insertAdjacentHTML("beforeend", productElem);
      }
    );

    // Получение id элемента, по которому "кликнули",
    // формирование массива объкта с данным id (из файла data.json)
    // получение констант с характеристиками объека
    // вызов фукции формирования карточки объекта с данными характеристиками
    let basket = {};
    let id = 0;
    const addToCart1 = document.querySelectorAll(".product__add");
    addToCart1.forEach((el) => {
      el.addEventListener("click", () => {
        const classProduct = el.closest(".product");
        id = classProduct.id;
        basket = findId(id);
        const imgUrlCard = basket.imgUrl;
        const nameProductCard = basket.nameProduct;
        const priceProductCard = basket.priceProduct;
        const colorProductCard = basket.color;
        const sizeProductCard = basket.size;
        const quantityProductCard = basket.quantity;
        const maxProductCard = basket.max;
        cardData(
          imgUrlCard,
          nameProductCard,
          priceProductCard,
          colorProductCard,
          sizeProductCard,
          quantityProductCard,
          maxProductCard
        );
      });
    });

    // Функция формирования массива объекта с данным id (из файла data.json)
    function findId(idToLook) {
      const categoryArray = data;
      for (var i = 0; i < categoryArray.length; i++) {
        if (categoryArray[i].idProduct == idToLook) {
          return categoryArray[i];
        }
      }
    }
  });

// Функция формирования корзины при добавдении товара
function cardData(
  imgUrl,
  nameProduct,
  priceProduct,
  color,
  size,
  quantity,
  max
) {
  const trueCard = document.querySelectorAll(".cards__item");
  const cardsDiv = document.querySelector(".cards");
  if (trueCard.length === 0) {
    const divElem = document.createElement("div");
    divElem.classList.add("cart-item");
    cardsDiv.append(divElem);
    const cartItem = document.createElement("p");
    cartItem.classList.add("top-product__title");
    cartItem.textContent = "Cart Items";
    divElem.appendChild(cartItem);
  }

  const productElem = `
      <div class="container">
      <div class="cards__item">
          <button class="cards__close"></button>
          <img class="cards__img" src="${imgUrl}" alt="${nameProduct}">
          <div class="cards__desc">
          <h3 class="cards__heading">${nameProduct}</h3>
          <p class="cards__txt">Price: <span>${priceProduct}</span></p>
          <p class="cards__txt">Color: ${color}</p>
          <p class="cards__txt">Size: ${size}</p>
          <p class="cards__txt">
            Quantity:<input class="cards__input" type="number" name="quantity" value="${quantity}" min="1" max="${max}">
          </p>
        </div>
      </div>
    </div>`;
  cardsDiv.insertAdjacentHTML("beforeend", productElem);

  // Удаление карточки товара из корзины при нажатии на card__close
  const closeCard = document.querySelectorAll(".cards__close");
  closeCard.forEach((elem) => {
    elem.addEventListener("click", function () {
      const divRemoved = elem.closest(".container");
      divRemoved.remove();

      // Удаление раздела корзина при отсутствии товаров
      const availabilProduct = document.querySelectorAll(".cards__item");
      if (availabilProduct.length === 0) {
        const divElem = document.querySelector(".cart-item");
        divElem.remove();
      }
    });
  });
}
