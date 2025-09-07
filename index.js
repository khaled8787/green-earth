let allPlant = []
const loadPlants = (id) => {
   const url =`https://openapi.programming-hero.com/api/plants`;
   fetch(url)
   .then(res => res.json())
   .then(data => {
    allPlant = data.plants;
    filterCategory(id);
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
        div.classList.add('w-84', 'bg-white', 'shadow-2xl', 'm-4');
        div.innerHTML = `
          <img class="w-80" src="${element.image}" alt="">
<div>
  <h2 class="text-xl">${element.name}</h2>
  <p class="text-gray-600">${element.description}</p>
  <div class="flex justify-between">
    <p class="bg-green-200 p-2 rounded-lg">${element.category}</p>
    <p>৳${element.price}</p>
  </div>
  <button class="btn btn-success w-full">Add to Cart</button>
</div>
        `;
        plantContainer.appendChild(div);
    });
}

const collectCategory = () =>{
    const url = 'https://openapi.programming-hero.com/api/categories';
    fetch(url)
    .then(ref => ref.json())
    .then(data =>{ addCategory(data.categories);
    });
};

const addCategory = (categories) =>{
    const getCategoryContainer = document.getElementById('category-container');
    for(let category of categories){
        const p = document.createElement('button')
        p.classList.add('btn-success', 'btn', 'btn-outline', 'mx-5', 'categoryBtn')
        p.innerText = category.category_name;
        p.addEventListener('click', ()=>{
            loadPlants(category.category_name)
            
        });
        getCategoryContainer.appendChild(p)
    };
};

collectCategory();
