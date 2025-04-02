const selectedIngredients = [];
      let selectedMealType = '';

      async function renderIngredients() {
         const ingredientsContainer = document.getElementById('ingredients-container');
         ingredientsContainer.innerHTML = '';

         try {
             console.log('Запрос ингредиентов...');
             const response = await fetch('/ingredients');
             if (!response.ok) {
                 console.error('Ошибка при получении ингредиентов:', response.statusText);
                 throw new Error('Ошибка при получении ингредиентов');
             }
             const ingredients = await response.json();
             console.log('Ингредиенты получены:', ingredients);

             ingredients.forEach(ingredient => {
                 const card = document.createElement('div');
                 card.className = 'ingredient-card';
                 card.innerHTML = `
                     <label>${ingredient.name}</label>
                     <p>Калории: ${ingredient.calories}</p>
                     <img src="${ingredient.imageURL}" alt="${ingredient.name}" />
                     <input type="checkbox" onchange="toggleSelection(this)" value="${ingredient._id}" style="display:none;">
                 `;
                 card.onclick = function() {
                     const checkbox = card.querySelector('input[type="checkbox"]');
                     checkbox.checked = !checkbox.checked;
                     toggleSelection(checkbox); 
                     card.classList.toggle('selected'); 
                 };
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
             console.log(`Ингредиент добавлен: ${ingredientId}`);
         } else {
             const index = selectedIngredients.indexOf(ingredientId);
             if (index > -1) {
                 selectedIngredients.splice(index, 1);
                 console.log(`Ингредиент удален: ${ingredientId}`);
             }
         }
     }

     async function fetchDishes() {
         if (selectedIngredients.length === 0) {
             document.getElementById('dishes-container').innerHTML = 'Выберите ингредиенты!';
             return;
         }

         selectedMealType = document.getElementById('meal-type').value;

         try {
             const response = await fetch('/dishes/filter', { 
                 method: 'POST',
                 headers: { 'Content-Type': 'application/json' },
                 body: JSON.stringify({ ingredients: selectedIngredients, mealType: selectedMealType })
             });

             if (!response.ok) {
                 throw new Error(`Сервер вернул ошибку: ${response.statusText}`);
             }

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

         console.log('Полученные блюда:', dishes); 

         dishes.forEach(dish => { 
             const card = document.createElement('div'); 
             card.className = 'dish-card'; 

             const collapsedView = document.createElement('div');
             
             const mealTypeText = dish.mealType ? dish.mealType.charAt(0).toUpperCase() + dish.mealType.slice(1) : 'Неизвестный тип';
             
             collapsedView.innerHTML =
                 `<img src="${dish.imageURL}" alt="${dish.name}" style="max-height:100px;width:auto;border-radius=4px;margin-bottom=10px;" />  
                 <h3>${dish.name}</h3>
                 <p>Тип блюда: ${mealTypeText}</p>`; 

             collapsedView.style.cursor = "pointer"; 

             const detailsDiv = document.createElement('div');
             detailsDiv.className = 'dish-details';
             detailsDiv.style.display = 'none'; 
             
              detailsDiv.innerHTML =
    `<img src="${dish.imageURL}" alt="${dish.name}" style="max-height:100px;width:auto;border-radius=4px;margin-bottom=10px;" />
    <p>Калории: ${dish.calories}</p>  
    <p>${dish.description || 'Описание отсутствует.'}</p>  
    <h4>Рецепт:</h4>  
    <p>${dish.recipe}</p>  
    <h4>Ингредиенты:</h4>
    <p>${Array.isArray(dish.ingredientsList) && dish.ingredientsList.length > 0 
        ? dish.ingredientsList.map(item => `${item.quantity}г. ингредиента "${item.ingredientId.name}"`).join('<br>')
        : 'Ингредиенты отсутствуют.'}</p>`; 

              const addButton = document.createElement('button');
              addButton.textContent = 'Добавить';
              addButton.onclick = async function(event) { 
                  event.stopPropagation(); 
                  await addDishToMenu(dish._id); 
              };

              card.onclick = function() {
                  if (detailsDiv.style.display === 'none') { 
                      detailsDiv.style.display = 'block'; 
                      collapsedView.style.display = 'none'; 
                  } else { 
                      detailsDiv.style.display = 'none'; 
                      collapsedView.style.display = 'block'; 
                  }
              };

              card.appendChild(collapsedView); 
              card.appendChild(detailsDiv); 
              card.appendChild(addButton); 

              dishesContainer.appendChild(card); 
          }); 
      }

      async function addDishToMenu(dishId) { 
    try {
        const response = await fetch('/menu/addMenu', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dishId }) 
        });

        if (!response.ok) throw new Error(`Ошибка при добавлении блюда в меню: ${response.statusText}`);

        const data = await response.json();
        alert(data.message); 
    } catch (error) {
        console.error("Ошибка:", error);
        alert("Не удалось добавить блюдо в меню.");
    }
}
      renderIngredients(); 

      document.getElementById('fetch-dishes').addEventListener('click', fetchDishes); 

      document.getElementById('meal-type').addEventListener('change', fetchDishes);
