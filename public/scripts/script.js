let dailyCalorieLimit = 0; 

window.onload = function() {
    document.getElementById("calculateCalories").addEventListener("click", () => {
        const weight = parseInt(document.getElementById("weightInput").value);
        const height = parseInt(document.getElementById("heightInput").value);
        const age = parseInt(document.getElementById("ageInput").value);
        const activityLevel = parseFloat(document.getElementById("activityLevel").value);

        if (isNaN(weight) || weight <= 0 || isNaN(height) || height <= 0 || isNaN(age) || age <= 0 || isNaN(activityLevel)) {
            alert("Пожалуйста, введите все значения корректно.");
            return;
        }

        const BMR = 10 * weight + 6.25 * height - 5 * age + 5;
        dailyCalorieLimit = Math.round(BMR * activityLevel); 
        document.getElementById("calorieResult").innerText = `Ваша рекомендуемая норма калорий: ${dailyCalorieLimit}`;
    });
};


    const header = document.querySelector('.ingredients-header');
    const list = document.getElementById('ingredientsList');
    document.getElementById("selectAllIngredients").addEventListener("click", () => {
    const ingredientCheckboxes = document.querySelectorAll("#ingredientsList input[type='checkbox']");
    const allChecked = Array.from(ingredientCheckboxes).every(checkbox => checkbox.checked);

    ingredientCheckboxes.forEach(checkbox => {
        checkbox.checked = !allChecked;
    });
});



header.addEventListener('click', () => {
    if (list.style.display === 'none' || list.style.display === '') {
        list.style.display = 'block';
    } else {
        list.style.display = 'none';
    }
});

const dishes = [
    { name: "Куриный салат", calories: 250, protein: 30, fats: 10, carbs: 15, recipe: "Смешайте курицу с овощами.", ingredients: ["курица", "овощи"], mealType: "lunch" },
    { name: "Рис с овощами", calories: 300, protein: 5, fats: 2, carbs: 65, recipe: "Отварите рис, добавьте овощи.", ingredients: ["рис", "овощи"], mealType: "lunch" },
    { name: "Омлет с помидорами", calories: 200, protein: 15, fats: 10, carbs: 5, recipe: "Сделайте омлет и добавьте нарезанные помидоры.", ingredients: ["яйцо", "помидор"], mealType: "breakfast" },
    { name: "Курица на ужин", calories: 400, protein: 40, fats: 20, carbs: 0, recipe: "Запеките курицу с приправами.", ingredients: ["курица"], mealType: "dinner" },
    { name: "Рис на завтрак", calories: 200, protein: 4, fats: 1, carbs: 44, recipe: "Приготовьте рис и подайте с яйцом.", ingredients: ["рис", "яйцо"], mealType: "breakfast" },
    { name: "Пирожки с картошкой", calories: 350, protein: 8, fats: 15, carbs: 50, recipe: "Приготовьте тесто и смешайте с картошкой, затем выпекайте.", ingredients: ["мука", "картофель", "масло"], mealType: "lunch" },
    { name: "Борщ", calories: 200, protein: 5, fats: 5, carbs: 30, recipe: "Сварите свеклу и капусту с мясом, приправьте сметаной.", ingredients: ["свекла", "капуста", "мясо", "сметана"], mealType: "lunch" },
    { name: "Пельмени", calories: 400, protein: 20, fats: 15, carbs: 50, recipe: "Сделайте тесто, фарш и отварите.", ingredients: ["мука", "мясо", "вода"], mealType: "dinner" },
    { name: "Каша овсяная", calories: 180, protein: 6, fats: 4, carbs: 30, recipe: "Залейте овсяные хлопья кипятком и дайте настояться.", ingredients: ["овсяные хлопья", "молоко", "сахар"], mealType: "breakfast" },
    { name: "Солянка", calories: 250, protein: 15, fats: 10, carbs: 20, recipe: "Сварите мясные продукты с солеными огурцами и специями.", ingredients: ["мясо", "огурцы", "томаты", "лимон"], mealType: "lunch" },
    { name: "Запеканка творожная", calories: 300, protein: 20, fats: 10, carbs: 35, recipe: "Смешайте творог, яйца и сахар, затем запекайте.", ingredients: ["творог", "яйца", "сахар"], mealType: "dinner" }
];

let selectedDishes = { breakfast: [], lunch: [], dinner: [] };

document.getElementById("findDishes").addEventListener("click", () => {
    const selectedIngredients = Array.from(document.querySelectorAll("#ingredientsList input:checked")).map(cb => cb.value);
    const mealType = document.getElementById("mealType").value;

    if (selectedIngredients.length === 0) {
        alert("Пожалуйста, выберите хотя бы один ингредиент.");
        return;
    }

    const availableDishes = dishes.filter(dish =>
        dish.mealType === mealType &&
        dish.ingredients && 
        selectedIngredients.some(ingredient => dish.ingredients.includes(ingredient))
    );

    const dishesContainer = document.getElementById("dishes");
    dishesContainer.innerHTML = '';
    availableDishes.forEach(dish => {
        const dishCard = document.createElement("div");
        dishCard.className = "card";
        dishCard.innerHTML = `<h3>${dish.name}</h3>
                             <p>Калории: ${dish.calories} ккал</p>
                             <p>Белки: ${dish.protein} г</p>
                             <p>Жиры: ${dish.fats} г</p>
                             <p>Углеводы: ${dish.carbs} г</p>
                             <p>Способ приготовления: ${dish.recipe}</p>
                             <button onclick="addDish('${mealType}', '${dish.name}')">Добавить</button>`;
        dishesContainer.appendChild(dishCard);
    });
});




window.addDish = function(mealType, dishName) {
    const dish = dishes.find(d => d.name === dishName);
    if (dish && selectedDishes[mealType] && !selectedDishes[mealType].some(d => d.dish.name === dishName)) {
        const currentCalories = calculateCurrentCalories(mealType);
        const newCalories = currentCalories + dish.calories;

        if (newCalories <= dailyCalorieLimit) {
            selectedDishes[mealType].push({ dish, portionCount: 1 });
            updateSelectedMenu(mealType);
        } else {
            alert(`Превышение калорийного лимита! Вы не можете добавить это блюдо. Текущие калории: ${currentCalories}, лимит: ${dailyCalorieLimit}`);
        }
    }
};
function calculateCurrentCalories(mealType) {
    return selectedDishes[mealType].reduce((total, item) => total + (item.dish.calories * item.portionCount), 0);
}

function updateSelectedMenu(mealType) {
    const selectedDishesContainer = document.getElementById("selectedDishes");
    selectedDishesContainer.innerHTML = ''; 
    let totalCalories = 0;

    selectedDishes[mealType].forEach(item => {
        const dish = item.dish;
        const portionCount = item.portionCount || 1; 
        totalCalories += dish.calories * portionCount;

        const dishCard = document.createElement("div");
        dishCard.className = "card";
        dishCard.innerHTML = `            <h3>${dish.name}</h3>
            <p>Калории: ${dish.calories * portionCount} ккал (для ${portionCount} порций)</p>
            <p>Белки: ${dish.protein * portionCount} г</p>
            <p>Жиры: ${dish.fats * portionCount} г</p>
            <p>Углеводы: ${dish.carbs * portionCount} г</p>
            <p>Способ приготовления: ${dish.recipe}</p>
            <label for="portionCount_${dish.name}">Количество порций:</label>
            <input type="number" id="portionCount_${dish.name}" value="${portionCount}" min="1" onchange="updatePortionCount('${mealType}', '${dish.name}', this.value)">
        `;
        selectedDishesContainer.appendChild(dishCard);
    });

    document.getElementById("totalCalories").innerText = `Суммарные калории в вашем меню (для ${mealType}): ${totalCalories}`;
}

window.updatePortionCount = function(mealType, dishName, newCount) {
    const dish = selectedDishes[mealType].find(selectedDish => selectedDish.dish.name === dishName);
    if (dish) {
        dish.portionCount = parseInt(newCount) || 1;
        updateSelectedMenu(mealType);
    }
};
