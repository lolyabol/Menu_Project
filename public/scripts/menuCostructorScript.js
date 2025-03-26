async function fetchDishes() {
    const response = await fetch('/api/dishes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredientIds: selectedIngredients }),
    });
    
    if (!response.ok) {
        console.error('Ошибка при получении блюд:', response.statusText);
        return;
    }

    const dishes = await response.json();
    displayDishes(dishes);
}

function displayDishes(dishes) {
    const templateSource = document.getElementById('dishes-template').innerHTML;
    const template = Handlebars.compile(templateSource);
    
    const context = { dishes: dishes }; 
    const html = template(context);
    
    const dishesContainer = document.querySelector('.dishesContainer');
    dishesContainer.innerHTML = html; 
}
