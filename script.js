
let menu = [];
fetch('menu_data.json')
  .then(res => res.json())
  .then(data => {
    menu = data;
    populateCategories(menu);
    displayMenu(menu);
  });

function populateCategories(data) {
  const categories = [...new Set(data.map(item => item.category))];
  const filter = document.getElementById('categoryFilter');
  categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat;
    opt.textContent = cat;
    filter.appendChild(opt);
  });
}

function applyFilters() {
  const cat = document.getElementById('categoryFilter').value;
  const min = parseFloat(document.getElementById('minPrice').value) || 0;
  const max = parseFloat(document.getElementById('maxPrice').value) || Infinity;

  const filtered = menu.filter(item => {
    return (!cat || item.category === cat) && item.cost >= min && item.cost <= max;
  });

  displayMenu(filtered);
}

function displayMenu(data) {
  const container = document.getElementById('menuContainer');
  container.innerHTML = '';
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `<img src="${item.image}" class="dish-img" />
      <h3>${item.name}</h3>
      <p><strong>Категория:</strong> ${item.category}</p>
      <p><strong>Состав:</strong> ${item.ingredients}</p>
      <p><strong>Норма на порцию:</strong> ${item.portion}</p>
      <p><strong>Подача:</strong> ${item.serving}</p>
      <p><strong>Вес:</strong> ${item.weight}</p>
      <p><strong>Цена:</strong> ${item.cost} ₽</p>
      <p><strong>КБЖУ:</strong> ${item.calories} ккал / Б: ${item.protein} г / Ж: ${item.fat} г / У: ${item.carbs} г</p>`;
    container.appendChild(card);
  });
}


// Переключение темы
const themeToggle = document.createElement("button");
themeToggle.textContent = "Сменить тему";
themeToggle.style.position = "fixed";
themeToggle.style.bottom = "20px";
themeToggle.style.right = "20px";
themeToggle.style.zIndex = "1000";
themeToggle.onclick = () => {
  const current = document.body.getAttribute("data-theme");
  document.body.setAttribute("data-theme", current === "dark" ? "light" : "dark");
};
document.body.appendChild(themeToggle);
