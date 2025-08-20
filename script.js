const addFoodBtn = document.querySelector(".add-food-btn");
const popupOverlay = document.querySelector(".popup-overlay");
const submit = document.querySelector(".confirm");
const cardsContainer = document.querySelector(".cards-container");
const deletBtn = document.querySelectorAll(".delete-btn");
const cards = document.querySelectorAll(".card");

addFoodBtn.addEventListener("click", () => {
  popupOverlay.style.display = "flex";
});

const addNewFoodItem = () => {
  const newCard = document.createElement("div");
  const newFoodName = document.querySelector(".foodName").value;
  const newFoodPrice = document.querySelector(".foodPrice").value;
  const newFoodDescription = document.querySelector(".foodDescription").value;
  const newFoodURL = document.querySelector(".FoodURL").value;

  newCard.classList.add("card");
  newCard.innerHTML = `<img src="${newFoodURL}" alt="${newFoodName}" />
          <div class="card-body">
            <h3>${newFoodName}</h3>
            <span class="price">${newFoodPrice}</span>
            <p>${newFoodDescription}</p>
            <button class="delete-btn">Delete</button>`;

  cardsContainer.appendChild(newCard);

  // deleteFoodItem(newCard);

  popupOverlay.style.display = "none";
  document.querySelector("#popup-form").reset();
};
submit.addEventListener("click", (event) => {
  event.preventDefault();
  addNewFoodItem();
});

// DELETE using event delegation
cardsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const card = e.target.closest(".card");
    if (card) {
      const confirmDelete = confirm(
        "Are you sure you want to delete this food item?"
      );
      if (confirmDelete) {
        card.remove();
      }
    }
  }
});

const searchInput = document.querySelector(".search-input");

searchInput.addEventListener("input", function () {
  const searchInputValue = this.value.toLowerCase().trim();
  let firstMatch = null;

  cards.forEach((card) => {
    const foodName = card.querySelector("h3").textContent.toLowerCase();

    if (foodName.includes(searchInputValue) && searchInputValue !== "") {
      card.style.display = "block";
      if (!firstMatch) {
        firstMatch = card; // save the first matching card
      }
    } else if (searchInputValue === "") {
      card.style.display = "block"; // reset if input empty
    } else {
      card.style.display = "none";
    }
  });

  // Scroll to the first matching card
  if (firstMatch) {
    firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
  }
});

// function deletFoodItem(card) {
//   deletBtn.forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const confirmDelete = confirm(
//         "Are you sure want to delete this food item"
//       );
//       if (confirmDelete) {
//         card.remove();
//       }
//     });
//   });
// }

// cards.forEach((card) => deletFoodItem(card));
