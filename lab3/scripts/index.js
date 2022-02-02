const products = {
  organic: [
    {
      name: "Organic Brocoli",
      vegetarian: true,
      glutenFree: true,
      price: 2.99,
      src: "https://spoonacular.com/cdn/ingredients_250x250/broccoli.jpg",
    },
    {
      name: "Organic Bread",
      vegetarian: true,
      glutenFree: false,
      price: 3.49,
    },
    {
      name: "Organic Apples",
      vegetarian: true,
      glutenFree: true,
      price: 4.25,
      src: "https://spoonacular.com/cdn/ingredients_250x250/apple.jpg",
    },
    {
      name: "Organic Bananas",
      vegetarian: true,
      glutenFree: true,
      price: 4.49,
      src: "https://spoonacular.com/cdn/ingredients_250x250/bananas.jpg",
    },
    {
      name: "Organic Lettuce",
      vegetarian: true,
      glutenFree: true,
      price: 4.59,
    },
    {
      name: "Organic Gluten-Free Bread",
      vegetarian: true,
      glutenFree: true,
      price: 4.99,
    },
    {
      name: "Organic Milk",
      vegetarian: true,
      glutenFree: true,
      price: 5.99,
    },
    {
      name: "Organic Eggs",
      vegetarian: false,
      glutenFree: true,
      price: 6.29,
    },
    {
      name: "Organic Butter",
      vegetarian: true,
      glutenFree: true,
      price: 6.59,
    },
    {
      name: "Organic Chicken",
      vegetarian: false,
      glutenFree: true,
      price: 7.99,
    },
    {
      name: "Organic Avacados",
      vegetarian: true,
      glutenFree: true,
      price: 8.59,
    },
  ],
  nonOrganic: [
    {
      name: "Brocoli",
      vegetarian: true,
      glutenFree: true,
      price: 1.99,
    },
    {
      name: "Bread",
      vegetarian: true,
      glutenFree: false,
      price: 2.35,
    },
    {
      name: "Gluten-Free Bread",
      vegetarian: true,
      glutenFree: true,
      price: 2.69,
    },
    {
      name: "Cereal",
      vegetarian: true,
      glutenFree: false,
      price: 2.99,
    },

    {
      name: "Eggs",
      vegetarian: false,
      glutenFree: true,
      price: 3.29,
    },
    {
      name: "Bananas",
      vegetarian: true,
      glutenFree: true,
      price: 3.54,
    },
    {
      name: "Lettuce",
      vegetarian: true,
      glutenFree: true,
      price: 2.99,
    },
    {
      name: "Apples",
      vegetarian: true,
      glutenFree: true,
      price: 3.99,
    },
    {
      name: "Butter",
      vegetarian: true,
      glutenFree: true,
      price: 4.39,
    },
    {
      name: "Pasta",
      vegetarian: true,
      glutenFree: false,
      price: 3.99,
    },
    {
      name: "Milk",
      vegetarian: true,
      glutenFree: true,
      price: 4.99,
    },
    {
      name: "Chicken",
      vegetarian: false,
      glutenFree: true,
      price: 7.99,
    },
    {
      name: "Salmon",
      vegetarian: false,
      glutenFree: true,
      price: 9.99,
    },
    {
      name: "Beef",
      vegetarian: false,
      glutenFree: true,
      price: 13.99,
    },
  ],
};

const populateListProductChoices = (arr) => {
  const list = document.getElementById("productList");

  list.innerHTML = "";

  arr.forEach((i) => {
    const div = document.createElement("div");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "products";
    checkbox.value = i.name;

    div.append(checkbox);

    const label = document.createElement("label");
    label.htmlFor = i.name;
    label.appendChild(document.createTextNode(`${i.name} - $${i.price}`));
    div.appendChild(label);
    list.appendChild(div);
  });
};

const onSubmitProfile = () => {
  populateListProductChoices(getPersonalizedProducts());
  document.getElementById("sortBy").value = "priceAsc";
  onSortByChange("priceAsc");
};

const onSortByChange = (e) => {
  const personalizedProducts = getPersonalizedProducts();

  if (e === "priceAsc") {
    personalizedProducts.sort((a, b) => a.price - b.price);
  } else if (e === "priceDesc") {
    personalizedProducts.sort((a, b) => b.price - a.price);
  } else {
    personalizedProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  populateListProductChoices(personalizedProducts);
};

const getPersonalizedProducts = () => {
  const diet = Array.from(document.getElementById("diet").selectedOptions).map(
    (o) => o.value
  );

  const organicPreference = document.querySelector('input[name="organic"]')
    .checked
    ? "organic"
    : "nonOrganic";

  return products[organicPreference].filter((i) => {
    if (!i.glutenFree && diet.includes("glutenFree")) {
      return false;
    }
    if (!i.vegetarian && diet.includes("vegetarian")) {
      return false;
    }
    return true;
  });
};

const onAddToCart = () => {
  const list = document.getElementById("shoppingCart");
  list.innerHTML = "";

  const organicPreference = document.querySelector('input[name="organic"]')
    .checked
    ? "organic"
    : "nonOrganic";

  const cart = [
    ...document.querySelectorAll("input[name='products']:checked"),
  ].map((i) => i.value);

  if (!cart.length) {
    const msg = document.createElement("h2");
    msg.innerHTML =
      "Cart is empty. Please go to the 'Products' page and add groceries.";
    list.appendChild(msg);
  } else {
    const ul = document.createElement("ul");

    cart.forEach((i) => {
      const price = products[organicPreference].find(
        (product) => product.name === i
      ).price;
      const li = document.createElement("li");
      li.innerHTML = `<div class="product"><span>${i}</span><span>$${price}</span></div>`;
      ul.appendChild(li);
    });

    list.appendChild(ul);

    const price = products[organicPreference]
      .filter((i) => cart.includes(i.name))
      .reduce((acc, item) => (acc += item.price), 0)
      .toFixed(2);

    const priceMsg = document.createElement("h3");
    priceMsg.innerHTML = `<div class="product borderTop">
    <span>Total:</span><span>$${price}</span></div>`;
    list.appendChild(priceMsg);
  }
};

window.onload = () => {
  populateListProductChoices(getPersonalizedProducts());
};
