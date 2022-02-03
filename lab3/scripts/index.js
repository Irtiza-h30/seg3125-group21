const products = {
  organic: [
    {
      name: "Organic Brocoli",
      vegetarian: true,
      glutenFree: true,
      price: 2.99,
      src: "images/broccoli.png",
      category: "vegetables",
    },
    {
      name: "Organic Bread",
      vegetarian: true,
      glutenFree: false,
      price: 3.49,
      src: "images/bread.png",
      category: "grains",
    },
    {
      name: "Organic Apples",
      vegetarian: true,
      glutenFree: true,
      price: 4.25,
      src: "images/apple.png",
      category: "fruits",
    },
    {
      name: "Organic Bananas",
      vegetarian: true,
      glutenFree: true,
      price: 4.49,
      src: "images/banana.png",
      category: "fruits",
    },
    {
      name: "Organic Lettuce",
      vegetarian: true,
      glutenFree: true,
      price: 4.59,
      src: "images/lettuce.png",
      category: "vegetables",
    },
    {
      name: "Organic Gluten-Free Bread",
      vegetarian: true,
      glutenFree: true,
      price: 4.99,
      src: "images/bread.png",
      category: "grains",
    },
    {
      name: "Organic Milk",
      vegetarian: true,
      glutenFree: true,
      price: 5.99,
      src: "images/milk.png",
      category: "dairy and eggs",
    },
    {
      name: "Organic Eggs",
      vegetarian: false,
      glutenFree: true,
      price: 6.29,
      src: "images/eggs.png",
      category: "dairy and eggs",
    },
    {
      name: "Organic Butter",
      vegetarian: true,
      glutenFree: true,
      price: 6.59,
      src: "images/butter.png",
      category: "dairy and eggs",
    },
    {
      name: "Organic Chicken",
      vegetarian: false,
      glutenFree: true,
      price: 7.99,
      src: "images/chicken.png",
      category: "meats",
    },
    {
      name: "Organic Avacados",
      vegetarian: true,
      glutenFree: true,
      price: 8.59,
      src: "images/avocado.png",
      category: "fruits",
    },
  ],
  nonOrganic: [
    {
      name: "Brocoli",
      vegetarian: true,
      glutenFree: true,
      price: 1.99,
      src: "images/broccoli.png",
      category: "vegetables",
    },
    {
      name: "Bread",
      vegetarian: true,
      glutenFree: false,
      price: 2.35,
      src: "images/bread.png",
      category: "grains",
    },
    {
      name: "Gluten-Free Bread",
      vegetarian: true,
      glutenFree: true,
      price: 2.69,
      src: "images/bread.png",
      category: "grains",
    },
    {
      name: "Cereal",
      vegetarian: true,
      glutenFree: false,
      price: 2.99,
      src: "images/cereal.png",
      category: "grains",
    },

    {
      name: "Eggs",
      vegetarian: false,
      glutenFree: true,
      price: 3.29,
      src: "images/eggs.png",
      category: "dairy and eggs",
    },
    {
      name: "Bananas",
      vegetarian: true,
      glutenFree: true,
      price: 3.54,
      src: "images/banana.png",
      category: "fruits",
    },
    {
      name: "Lettuce",
      vegetarian: true,
      glutenFree: true,
      price: 2.99,
      src: "images/lettuce.png",
      category: "vegetables",
    },
    {
      name: "Apples",
      vegetarian: true,
      glutenFree: true,
      price: 3.99,
      src: "images/apple.png",
      category: "fruits",
    },
    {
      name: "Butter",
      vegetarian: true,
      glutenFree: true,
      price: 4.39,
      src: "images/butter.png",
      category: "dairy and eggs",
    },
    {
      name: "Pasta",
      vegetarian: true,
      glutenFree: false,
      price: 3.99,
      src: "images/pasta.png",
      category: "grains",
    },
    {
      name: "Milk",
      vegetarian: true,
      glutenFree: true,
      price: 4.99,
      src: "images/milk.png",
      category: "dairy and eggs",
    },
    {
      name: "Chicken",
      vegetarian: false,
      glutenFree: true,
      price: 7.99,
      src: "images/chicken.png",
      category: "meats",
    },
    {
      name: "Salmon",
      vegetarian: false,
      glutenFree: true,
      price: 9.99,
      src: "images/salmon.png",
      category: "meats",
    },
    {
      name: "Beef",
      vegetarian: false,
      glutenFree: true,
      price: 13.99,
      src: "images/beef.png",
      category: "meats",
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
    checkbox.id = i.name;
    const image = document.createElement("img");
    image.src = i.src;
    image.alt = i.name;

    div.append(checkbox);

    const label = document.createElement("label");
    const figure = document.createElement("figure");
    const caption = document.createElement("figcaption");
    caption.innerHTML = `${i.name} - $${i.price}`;

    figure.appendChild(image);
    figure.appendChild(caption);
    label.htmlFor = i.name;
    label.appendChild(figure);
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
