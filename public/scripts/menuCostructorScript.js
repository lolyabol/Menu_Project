const selectedIngredients = [];

async function renderIngredients() {
    const ingredientsContainer = document.getElementById('ingredients-container');
    ingredientsContainer.innerHTML = ''; 

    try {
        const response = await fetch('/ingredients');
        const ingredients = await response.json();

        ingredients.forEach(ingredient => {
            const card = document.createElement('div');
            card.className = 'ingredient-card';
            card.innerHTML = `
                <label>
                    <input type="checkbox" onchange="toggleSelection(this)" value="${ingredient._id}"> ${ingredient.name}
                </label>
                <p>Калории: ${ingredient.calories}</p>
                <img src="${ingredient.imageURL}" alt="${ingredient.name}" />
            `;
            ingredientsContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Ошибка при получении ингредиентов:', error);
        ingredientsContainer.innerHTML = 'Ошибка при получении ингредиентов.';
    }
}

function toggleSelection(checkbox) {
    const ingredientId = checkbox.value;
    if (checkbox.checked) {
        selectedIngredients.push(ingredientId);
    } else {
        const index = selectedIngredients.indexOf(ingredientId);
        if (index > -1) {
            selectedIngredients.splice(index, 1);
        }
    }
}

async function fetchDishes() {
    if (selectedIngredients.length === 0) {
        document.getElementById('dishes-container').innerHTML = 'Выберите ингредиенты!';
        return;
    }

    try {
        const response = await fetch('/dishes/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: selectedIngredients }),
        });

        const dishes = await response.json();
        renderDishes(dishes);
    } catch (error) {
        console.error('Ошибка при получении блюд:', error);
        document.getElementById('dishes-container').innerHTML = 'Ошибка при получении блюд.';
    }
}

function renderDishes(dishes) {
    const dishesContainer = document.getElementById('dishes-container');
    dishesContainer.innerHTML = '';

    if (dishes.length === 0) {
        dishesContainer.innerHTML = 'Нет блюд для выбранных ингредиентов.';
        return;
    }

    dishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish-card';
        card.innerHTML = `
            <h3>${dish.name}</h3>
            <p>Калории: ${dish.calories}</p>
            <p>${dish.description}</p>
            <h4>Ингредиенты:</h4>
            <ul>
                ${dish.ingredients.map(ingredient => `<li>${ingredient.name}</li>`).join('')}
            </ul>
        `;
        dishesContainer.appendChild(card);
    });
}

renderIngredients();
document.getElementById('fetch-dishes').addEventListener('click', fetchDishes);