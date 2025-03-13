document.getElementById("status").style.display = "none";

const loadCategory = async () => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const data = await response.json();
  showCategory(data.categories);
};

const showCategory = (categories) => {
  categories.forEach((element) => {
    const categoryContainer = document.getElementById("category-container");

    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="loadPets('${element.category}')" class="btn">${element.category}
    <img class="w-8" src="${element.category_icon}" alt="" />
    </button>
    `;
    categoryContainer.appendChild(div);
  });
};

// banner section
const loadPets = async (categoryName) => {
  document.getElementById("petsContainer").style.display = "block";
  document.getElementById("status").style.display = "none";

  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  displayPets(data.data);
};

const displayPets = (pets) => {
  if (pets.length < 1) {
    document.getElementById("petsContainer").style.display = "none";
    document.getElementById("status").style.display = "block";
  }

  pets.forEach((pet) => {
    console.log(pets);
    const petsContainer = document.getElementById("petsContainer");
    petsContainer.innerHTML = "";
    const div = document.createElement("div");
    div.classList.add("mt-5");
    div.innerHTML = `
  <div class="card bg-base-100 w-96 shadow-sm">
  <figure>
    <img
      src="${pet.image}"
      alt="pets" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${pet.breed}</h2>
    <p>${pet.pet_details}</p>
    <div class="card-actions justify-end">
      <button class="btn bg-red-500">Select</button>
    </div>
  </div>
</div>
  `;

    petsContainer.appendChild(div);
  });
};

loadPets("cat");

loadCategory();
