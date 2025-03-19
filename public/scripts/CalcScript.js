
document.getElementById("calculateCalories").addEventListener("click", function() {
    // Получаем значения из полей ввода
    const weight = parseFloat(document.getElementById("weightInput").value);
    const height = parseFloat(document.getElementById("heightInput").value);
    const age = parseInt(document.getElementById("ageInput").value);
    const gender = document.getElementById("gender").value;
    const activityLevel = parseFloat(document.getElementById("activityLevel").value);

    let bmr;

    // Рассчитываем базальный метаболизм (BMR) в зависимости от пола
    if (gender === "male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Рассчитываем калории с учетом уровня активности
    const calories = bmr * activityLevel;

    // Выводим результат
    document.getElementById("calorieResult").textContent = `Ваша суточная норма калорий: ${Math.round(calories)} калорий`;
});

