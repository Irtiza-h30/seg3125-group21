const products = {
  organic: [
    {
      name: "Organic Brocoli",
      vegetarian: true,
      glutenFree: true,
      price: 2.99,
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
    },
    {
      name: "Organic Bananas",
      vegetarian: true,
      glutenFree: true,
      price: 4.49,
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
      glutenFree: false,
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
      price: 10.0,
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
  document.getElementById("products").disabled = false;
  document.getElementById("sortBy").value = "priceAsc";
};

const getPersonalizedProducts = () => {
  const diet = [...document.querySelectorAll("input[name='diet']:checked")].map(
    (i) => i.value
  );

  const organicPreference = document.querySelector(
    'input[name="organic"]:checked'
  ).value;

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

  const organicPreference = document.querySelector(
    'input[name="organic"]:checked'
  ).value;

  const cart = [
    ...document.querySelectorAll("input[name='products']:checked"),
  ].map((i) => i.value);

  if (!cart.length) {
    const msg = document.createElement("h2");
    msg.innerHTML =
      "Cart is empty. Please go to the 'Products' page and add groceries.";
    list.appendChild(msg);
  }

  const ul = document.createElement("ul");

  cart.forEach((i) => {
    const li = document.createElement("li");
    li.innerHTML = i;
    ul.appendChild(li);
  });

  list.appendChild(ul);

  const price = products[organicPreference]
    .filter((i) => cart.includes(i.name))
    .reduce((acc, item) => (acc += item.price), 0)
    .toFixed(2);

  const priceMsg = document.createElement("h3");
  priceMsg.innerHTML = `Total price of groceries: $${price}`;
  list.appendChild(priceMsg);

  document.getElementById("cart").disabled = false;
};
