
// Отримання елементів HTML-сторінки
const button = document.getElementById("download");
const status = document.getElementById("status");
const users = document.getElementById("users");

// Обробник натискання кнопки Download
button.addEventListener("click", function () {

    // Очищення попередніх результатів
    users.replaceChildren();

    status.textContent = "Loading...";
    status.className = "";
    button.disabled = true;

    // Отримання п'яти випадкових користувачів
    fetch("https://randomuser.me/api/?results=5")

        // Перевірка відповіді сервера
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error: " + response.status);
            }

            // Перетворення JSON у JavaScript-об'єкт
            return response.json();
        })

        // Обробка отриманих даних
        .then(function (data) {

            console.log(data);

            data.results.forEach(function (user) {

                // Створення картки користувача
                const card = document.createElement("div");
                card.className = "card";

                // 1. Фотографія
                const picture = document.createElement("img");
                picture.src = user.picture.large;
                picture.alt = "User photo";

                card.appendChild(picture);

                const info = document.createElement("div");
                info.className = "card-info";

                // Поля відповідно до варіанта №9
                const fields = [
                    ["City", user.location.city],
                    ["Postcode", user.location.postcode],
                    ["Cell", user.cell],
                    ["Name", user.name.first + " " + user.name.last]
                ];

                // Виведення інформації
                fields.forEach(function (field) {
                    const p = document.createElement("p");
                    p.textContent = field[0] + ": " + field[1];
                    info.appendChild(p);
                });

                card.appendChild(info);
                users.appendChild(card);
            });

            // Повідомлення про успішне завантаження
            status.textContent = "success!";
            status.className = "success";
        })

        // Обробка можливих помилок
        .catch(function (error) {
            status.textContent = "Error: " + error.message;
            status.className = "error";

            console.error(error);
        })

        // Повторна активація кнопки
        .finally(function () {
            button.disabled = false;
        });
});
