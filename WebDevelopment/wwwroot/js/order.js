document.getElementById("change-money").onclick = function (e) {
    // Запоминаем, какая валюта сейчас
    let currentCurrency = e.target.innerText;
    let newCurrency = "$";

    // Определяем, какую валюту устанавливаем
    if (currentCurrency === "$") {
        newCurrency = "₽";
    } else if (currentCurrency === "₽") {
        newCurrency = "BYN";
    } else if (currentCurrency === 'BYN') {
        newCurrency = '€';
    } else if (currentCurrency === '€') {
        newCurrency = '¥';
    }

    // Обновляем текст на кнопке
    e.target.innerText = newCurrency;

    if (document.getElementById("budget").style.display != "none") {
        // Получаем элемент с ценой
        let priceElement = document.getElementById("price");
        // Обновляем элемент с ценой
        priceElement.innerText = newCurrency;
    }

    //коэфф-т для перевода
    let coefficient = 1;

    if (currentCurrency === "$") {
        coefficient = 83;
    }
    else if (currentCurrency === "₽") {
        coefficient = 3;
    }
    else if (currentCurrency === 'BYN') {
        coefficient = 0.9;
    }
    else if (currentCurrency === '€') {
        coefficient = 6.9;
    }

    document.getElementById("money-text").innerText = +(document.getElementById("money-text").getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    document.getElementById("money-text").setAttribute("data-base-price", +(document.getElementById("money-text").getAttribute("data-base-price") * coefficient).toFixed(1));

    if (pricesBouquets.length > 0) {
        pricesBouquets.forEach((price, index) => {
            pricesBouquets[index] = price * coefficient; // Умножаем каждую цену букета на коэффициент и сохраняем обратно в массив
        });
    }

    if (pricesFlowers.length > 0) {
        pricesFlowers.forEach((price, index) => {
            pricesFlowers[index] = price * coefficient; // Умножаем каждую цену цветка на коэффициент и сохраняем обратно в массив
        });
    }

    if (document.getElementById("budget").style.display != "none") {
        // Получаем значение из инпута
        let inputElement = document.getElementById("amount");
        let inputValue = parseFloat(inputElement.value); // Преобразуем значение в число

        // Проверка, чтобы избежать NaN
        if (isNaN(inputValue)) {
            inputValue = 0; // Устанавливаем значение по умолчанию, если ввод не корректен
        }

        // Умножаем на коэффициент
        let result = inputValue * coefficient;

        // Округляем результат до двух знаков после запятой
        result = parseFloat(result.toFixed(2));
        inputElement.value = result;
    }
}


// Функция для отображения элементов в зависимости от выбранного букета
function showInputs() {
    const bouquetType = document.getElementById("bouquet-type").value;
    document.getElementById("preset-bouquets").style.display = "none";
    document.getElementById("custom-bouquet").style.display = "none";
    document.getElementById("budget").style.display = "none";
    changeMoneyText(0);
    if (bouquetType === "готовый") {
        document.getElementById("preset-bouquets").style.display = "block";
        addBouquet();
    } else if (bouquetType === "составить") {
        document.getElementById("custom-bouquet").style.display = "block";
        addFlowerInput(); // Автоматически добавляем первый селект с цветом и количеством
    } else if (bouquetType === "неважно") {
        document.getElementById("budget").style.display = "block";
    }
}

let presetBouquets = [];
let pricesBouquets = [];
let flowers = [];
let pricesFlowers = [];

// Функция для загрузки букетов и цветов
function loadBouquetsAndFlowers() {
    // Получаем готовые букеты
    $.get('/order/bouquets', function (data) {
        // Заполнение массивов букетов и цен
        data.forEach(function (bouquet) {
            presetBouquets.push(bouquet.name);
            pricesBouquets.push(bouquet.price);
        });
    });

    // Получаем цветы
    $.get('/order/flowers', function (flowerData) {
        // Заполнение массивов цветов и цен
        flowerData.forEach(function (flower) {
            flowers.push(flower.name);
            pricesFlowers.push(flower.price);
        });
    });
}
// Вызываем функцию загрузки данных при загрузке страницы
loadBouquetsAndFlowers();

function addBouquet() {
    const presetSelect = document.getElementById("preset-bouquet");
    presetSelect.innerHTML = ""; // Очищаем существующие варианты
    presetBouquets.forEach(bouquet => {
        const option = document.createElement("option");
        option.value = bouquet;
        option.textContent = bouquet;
        presetSelect.appendChild(option);
    });
    countMoneyBouquet();
}
function countMoneyBouquet() {

    const presetSelect = document.getElementById("preset-bouquet");
    const selectedIndex = presetSelect.selectedIndex; // Получаем индекс выбранного букета
    const money = pricesBouquets[selectedIndex]; // Получаем цену на основе индекса

    changeMoneyText(money); // Обновляем текст с ценой
}

function changeMoneyText(money) {

    const roundedMoney = parseFloat(money.toFixed(2)); // Преобразуем обратно в число после округления

    const moneyText = document.getElementById("money-text");
    moneyText.innerText = roundedMoney + " " + document.getElementById("change-money").innerText;
    moneyText.setAttribute("data-base-price", roundedMoney); // Храним округленное значение в атрибуте
}

let divsFlowers = [];
// Функция для добавления нового селекта с цветами и полем количества
function addFlowerInput() {

    const container = document.getElementById("flower-container");
    const flowerDiv = document.createElement("div");
    flowerDiv.className = "flower-input";

    // Создаём селект для выбора цвета
    const flowerSelect = document.createElement("select");
    flowers.forEach(flower => {
        const option = document.createElement("option");
        option.value = flower;
        option.textContent = flower;
        flowerSelect.appendChild(option);
    });

    // Создаём поле для ввода количества
    const quantityInput = document.createElement("input");
    quantityInput.type = "number";
    quantityInput.min = "1";
    quantityInput.placeholder = "Количество";

    // Добавляем событие изменения для селекта и инпута количества
    flowerSelect.onchange = updateTotalPrice;
    quantityInput.oninput = updateTotalPrice;

    // Создаем кнопку для удаления этого селекта
    const removeButton = document.createElement("button");
    removeButton.textContent = "Удалить";
    removeButton.onclick = function () {
        container.removeChild(flowerDiv);
        // Удаляем из массива divsFlowers
        divsFlowers = divsFlowers.filter(div => div !== flowerDiv);
        updateTotalPrice(); // Обновляем цену после удаления цветка
    };

    // Добавляем селект, поле ввода и кнопку удаления в контейнер
    flowerDiv.appendChild(flowerSelect);
    flowerDiv.appendChild(quantityInput);
    flowerDiv.appendChild(removeButton);
    container.appendChild(flowerDiv);

    // Добавляем созданный div в массив divsFlowers
    divsFlowers.push(flowerDiv);
    updateTotalPrice();
}

// Функция для обновления общей цены
function updateTotalPrice() {
    let totalPrice = 0;
    divsFlowers.forEach(div => {
        const flowerSelect = div.querySelector("select"); // Получаем селект внутри текущего div
        const quantityInput = div.querySelector("input[type='number']"); // Получаем инпут количества

        const selectedFlower = flowerSelect.value; // Получаем выбранный цветок
        const flowerIndex = flowers.indexOf(selectedFlower); // Находим индекс цветка в массиве
        const quantity = parseInt(quantityInput.value) || 0; // Получаем количество или 0, если не введено
        // Увеличиваем общую цену
        totalPrice += pricesFlowers[flowerIndex] * quantity;
    });
    changeMoneyText(totalPrice);
}

function updateAmount() {
    const amountInput = document.getElementById("amount");

    amountInput.value = amountInput.value.replace(/\D/g, '');

    let amount = parseFloat(amountInput.value);

    // Проверка для обработки NaN (если ввод не может быть преобразован в число)
    if (isNaN(amount)) {
        amount = 0; // Или какое-то другое значение по умолчанию
    }

    // Округляем сумму до двух знаков после запятой
    const roundedAmount = parseFloat(amount.toFixed(2));

    // Вы можете также вызвать эту функцию, если хотите обрабатывать сумму где-то еще, например, в вашей функции changeMoneyText
    changeMoneyText(roundedAmount);
}

// Добавляем глобальную функцию для добавления новых цветков
document.getElementById("add-flower-button").onclick = addFlowerInput;

function maskPhone(input) {
    // Убираем все не цифры
    let value = input.value.replace(/\D/g, '');

    // Применяем маску
    let maskedValue = '';

    if (value.length > 0) {
        maskedValue += '+7 '; // Код страны
    }
    if (value.length > 1) {
        maskedValue += '(' + value.substring(1, 4); // Добавляем скобки
    }
    if (value.length >= 4) {
        maskedValue += ') ' + value.substring(4, 7); // Добавляем цифры и пробел
    }
    if (value.length >= 7) {
        maskedValue += '-' + value.substring(7, 9); // Добавляем дефис
    }
    if (value.length >= 9) {
        maskedValue += '-' + value.substring(9, 11); // Добавляем дефис
    }

    input.value = maskedValue; // Устанавливаем отформатированное значение
}
function updateLastName() {
    const inputElement = document.getElementById("last-name");
    // Убираем все символы, кроме русских букв
    inputElement.value = inputElement.value.replace(/[^А-Яа-яЁё]/g, '');
}

function updateName() {
    const inputElement = document.getElementById("name");
    // Убираем все символы, кроме русских букв
    inputElement.value = inputElement.value.replace(/[^А-Яа-яЁё]/g, '');
}

function updateDateTime() {
    const now = new Date();

    const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
    const dayOfWeek = days[now.getDay()]; // Получаем день недели
    const day = now.getDate(); // Получаем день месяца
    const month = now.getMonth() + 1; // Получаем месяц (0-11, поэтому +1)
    const year = now.getFullYear(); // Получаем год
    const hours = String(now.getHours()).padStart(2, '0'); // Получаем часы и добавляем ноль в начале, если необходимо
    const minutes = String(now.getMinutes()).padStart(2, '0'); // Получаем минуты
    const seconds = String(now.getSeconds()).padStart(2, '0'); // Получаем секунды

    // Форматируем строку
    const dateTimeString = `${day}.${month}.${year}, ${dayOfWeek}<br>&nbsp;&nbsp;&nbsp;${hours}:${minutes}:${seconds}`;

    // Обновляем содержимое div
    document.getElementById("datetime").innerHTML = dateTimeString;
}

// Обновляем время каждые 1000 миллисекунд (1 секунда)
setInterval(updateDateTime, 1000);

// Первоначальный вызов функции для немедленного отображения
updateDateTime();


$('#order-action').click(function (event) {
    event.preventDefault(); // Предотвращаем перезагрузку страницы

    let orderDetails = {
        bouquetType: $('#bouquet-type').val(),
        presetBouquet: $('#preset-bouquet').val(),
        email: $('#email').val().trim(),
        name: $('#name').val().trim(),
        lastName: $('#last-name').val().trim(),
        phoneNumber: $('#phone').val().trim(),
        address: $('#address').val().trim(),
        paymentType: $('#payment-type option:selected').text(),
        orderText: getCustomBouquetDetails(), // Функция для получения деталей кастомного букета
        price: $('#money-text').text()
    };
    // Проверка обязательных полей
    if (!orderDetails.name || !orderDetails.phoneNumber || !orderDetails.address || !orderDetails.email) {
        alert("Пожалуйста, заполните все обязательные поля."); // Предупреждение о неверных данных
        return;
    }

    // Отправка заказа
    $.ajax({
        url: '/order/orders', // Убедитесь, что путь API написан правильно
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(orderDetails),
        success: function (result) {
            alert('Заказ успешно оформлен!'); // Сообщение пользователю о успешном заказе
            // Очистить форму или выполнить другие действия
            location.reload();
        },
        error: function (xhr, status, error) {
            console.error("Ошибка при оформлении заказа:", error); // Логируем ошибку
            alert("Произошла ошибка при оформлении заказа: " + xhr.responseText); // Уведомляем пользователя об ошибке
        }
    });
});

function getCustomBouquetDetails() {
    let details = [];
    const bouquetType = document.getElementById("bouquet-type").value;

    if (bouquetType === "готовый") {
        const presetBouquet = document.getElementById("preset-bouquet").value;
        details.push(`Готовый букет: ${presetBouquet}`);
    } else if (bouquetType === "составить") {
        divsFlowers.forEach(div => {
            const flowerSelect = div.querySelector("select"); // Получаем селект внутри текущего div
            const quantityInput = div.querySelector("input[type='number']"); // Получаем инпут количества

            const selectedFlower = flowerSelect.value; // Получаем выбранный цветок
            const quantity = parseInt(quantityInput.value) || 0; // Получаем количество или 0, если не введено

            if (details.length === 0) {
                selectedFlower = `$Собрать букет: {selectedFlower}`;
            }
            if (quantity > 0) { // Проверяем, что количество больше нуля
                details.push(`${selectedFlower}: ${quantity}`); // Формируем строку типа "Роза: 2"
            }
        });
    } else if (bouquetType === "неважно") {
        const amountValue = document.getElementById("amount").value; // Получаем значение из поля количества
        details.push(`Неважно: ${amountValue}`);
    }

    return details.join(", "); // Объединяем все детали в одну строку, разделяя запятыми
}

