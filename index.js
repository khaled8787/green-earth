let allPlant = []
const loadPlants = (id) => {
   const url =`https://openapi.programming-hero.com/api/plants`;
   fetch(url)
   .then(res => res.json())
   .then(data => {
    allPlant = data.plants;
    displayPlants(allPlant);
   })
}

const filterCategory = (name) =>{
    const matchPlants = allPlant.filter(plant => plant.category === name);
    displayPlants(matchPlants);
}

const displayPlants = (plants) =>{
    const plantContainer = document.getElementById('plant-container');
    plantContainer.innerHTML = '';
    plants.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('w-84', 'bg-white', 'shadow-2xl', 'm-4', 'p-4');
        div.innerHTML = `
          <img class="w-full h-[350px]" src="${element.image}" alt="">
          <br>
  <div>
  <h2 class="text-xl">${element.name}</h2>
  <p class="text-gray-600">${element.description}</p>
  <br>
  <div class="flex justify-between items-center">
    <p class="bg-green-200 p-2 rounded-lg">${element.category}</p>
    <p>৳${element.price}</p>
  </div>
  <br>
  <button class="btn btn-success w-full">Add to Cart</button>
  </div>
        `;
        plantContainer.appendChild(div);
    });
}

const highlightBtn = (btn) =>{
    const allBtns = document.querySelectorAll('.categoryBtn');
    allBtns.forEach(button => {
        button.classList.remove('bg-green-600', 'text-white');
    });
    btn.classList.add('bg-green-600', 'text-white');
};

const collectCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(ref => ref.json())
    .then(data =>{ addCategory(data.categories);
    });
};

const addCategory = (categories) =>{
    const getCategoryContainer = document.getElementById('category-container');
    const allBtn = document.createElement('button');
    allBtn.classList.add('btn-success', 'btn', 'btn-outline', 'mx-5', 'categoryBtn', 'bg-green-600', 'text-white');
    allBtn.innerText = 'All Trees';
    allBtn.addEventListener('click', () =>{
        highlightBtn(allBtn);
        displayPlants(allPlant);
    })
    getCategoryContainer.appendChild(allBtn)
    for(let category of categories){
        const p = document.createElement('button')
        p.classList.add('btn-success', 'btn', 'btn-outline', 'mx-5', 'categoryBtn')
        p.innerText = category.category_name;
        p.addEventListener('click', ()=>{
            filterCategory(category.category_name);
            highlightBtn(p);

        });
        getCategoryContainer.appendChild(p)
    };
};

collectCategory();
loadPlants();