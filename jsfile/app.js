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
  // document.getElementById("petsContainer").style.display = "block";
  document.getElementById("status").style.display = "none";

  makeShow("spiner");
  document.getElementById("petsContainer").style.display = "block";
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${categoryName}`
  );
  const data = await response.json();
  if (data.data) {
    displayPets(data.data);
    makeHide("spiner");
  }
};

const displayPets = (pets) => {
  if (pets.length < 1) {
    document.getElementById("petsContainer").style.display = "none";
    document.getElementById("status").style.display = "block";
  }

  pets.forEach((pet) => {
    // console.log(pets);
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
      <button class="btn select bg-red-500">Select</button>
      <button onclick="handelDetais('${pet.petId}')" class="btn select bg-green-400">Details</button>
    </div>
  </div>
</div>
  `;

    petsContainer.appendChild(div);
  });

  const allSelectButton = document.getElementsByClassName("select");
  for (const button of allSelectButton) {
    button.addEventListener("click", (event) => {
      const title = event.target.parentNode.parentNode.childNodes[1].innerText;
      console.log(title);

      const listConteiner = document.getElementById("selected-conteiner");
      const div = document.createElement("div");
      div.innerHTML = `
      <li class="text-red-500">${title}</li>
      <button class="btn">Delete</button>
      `;
      listConteiner.appendChild(div);

      const prevCount = getValueById("count");
      const sum = prevCount + 1;
      document.getElementById("count").innerText = sum;

      const prevCount2 = getValueById2("count2");
      const sum2 = prevCount + 1;
      document.getElementById("count2").innerText = sum2;
    });
  }
};

const makeHide = (id) => {
  document.getElementById(id).style.display = "none";
};

const makeShow = (id) => {
  document.getElementById(id).style.display = "block";
};

const getValueById2 = (id) => {
  const element = document.getElementById(id).innerText;
  const convertedValue = parseInt(element);
  return convertedValue;
};

const getValueById = (id) => {
  const element = document.getElementById(id).innerText;
  const convertedValue = parseInt(element);
  return convertedValue;
};

const handelDetais = async (petId) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${petId}`
  );
  const data = await response.json();
  console.log(data.petData);
};

loadPets("cat");

loadCategory();
