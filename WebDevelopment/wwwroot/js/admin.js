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
setInterval(updateDateTime, 1000);
updateDateTime();

let tokenExpired = false; // Флаг для отслеживания, истек ли токен
function updateTokenExpiryDisplay() {
    const tokenExpiry = localStorage.getItem('tokenExpiry');
    if (tokenExpiry) {
        const currentTime = Math.floor(Date.now() / 1000);
        const remainingTime = tokenExpiry - currentTime;

        // Обновляем интерфейс, отображая оставшееся время
        if (remainingTime > 0 || tokenExpired) {
            const remainingMinutes = Math.floor(remainingTime / 60); // Округляем до меньшего целого
            const remainingSeconds = remainingTime % 60;
            $('#tokenExpiryDisplay').text(`Осталось ${remainingMinutes}:${remainingSeconds} до истечения сессии.`);
            tokenExpired = false; // Сбрасываем флаг, если токен еще действителен
        } else {
            $('#tokenExpiryDisplay').text("Токен истек.");
            alert("Токен истек, перезайдите.");
            tokenExpired = true; // Устанавливаем флаг, что токен истек
            window.location.href = '/'; // Переход на главную страницу
        }
    }
}
updateTokenExpiryDisplay();
// Вызовите эту функцию через интервал для периодического обновления
setInterval(updateTokenExpiryDisplay, 1000); // Обновляем каждую минуту


$(document).ready(function () {
    const token = localStorage.getItem('adminToken'); // Получаем токен из локального хранилища
    const adminId = 1;
    loadFlowers();
    loadBouquets();
    loadNews();
    loadOrders();
    loadAdmin(adminId);

    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        let username = $('#username').val().trim();
        let password = $('#password').val().trim();

        // Проверка на пустые поля
        if (!username || !password) {
            alert("Пожалуйста, введите логин и пароль.");
            return;
        }

        // Здесь должен быть ваш AJAX-запрос для аутентификации
        $.post('/admin/login', { id:1, username: username, password: password }, function (response) {
            // Предполагаем, что на сервере проверяется логин и пароль
            if (response.success) {
                alert("Успешный вход!"); // Уведомление об успешном входе
                loadFlowers(); // Загружаем цветы после входа
            } else {
                alert("Ошибка аутентификации: " + response.message);
            }
        });
    });

    // Flower CRUD
    $('#flowerForm').submit(function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        let id = $('#flowerId').val(); // Получаем ID цветка, если есть
        let name = $('#flowerName').val().trim(); // Получаем название и удаляем лишние пробелы
        let price = parseFloat($('#flowerPrice').val()); // Получаем цену

        // Проверяем, установлены ли название и цена
        if (!name || isNaN(price) || price < 0) { // Проверка на отрицательную цену
            alert("Пожалуйста, введите корректные название и цену."); // Если нет, выводим предупреждение
            return;
        }

        let url = id ? `/admin/flowers/${id}` : '/admin/flowers'; // URL
        let method = id ? 'PUT' : 'POST'; // Метод

        $.ajax({
            url: url, // Устанавливаем URL
            method: method, // Устанавливаем метод
            contentType: 'application/json',
            data: JSON.stringify({ id: id, name: name, price: price }), // Передаем данные
            success: function () {
                $('#flowerName').val(''); // Очищаем поле с названием
                $('#flowerPrice').val(''); // Очищаем поле с ценой
                $('#flowerId').val(''); // Очищаем ID
                loadFlowers(); // Обновляем список цветов
            },
            error: function (xhr, status, error) {
                console.error("Ошибка при добавлении или обновлении цветка:", error); // Логируем ошибку
                alert("Произошла ошибка при добавлении или обновлении цветка: " + xhr.responseText); // Уведомляем пользователя
            }
        });
    });

    // Bouquet CRUD
    $('#bouquetForm').submit(function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        let id = $('#bouquetId').val(); // Получаем ID букета, если есть
        let name = $('#bouquetName').val().trim(); // Получаем название и удаляем пробелы
        let price = parseFloat($('#bouquetPrice').val()); // Получаем цену

        // Проверяем, установлены ли название и цена
        if (!name || isNaN(price) || price < 0) {
            alert("Пожалуйста, введите корректное название и цену."); // Предупреждаем о неверных данных
            return;
        }

        let url = id ? `/admin/bouquets/${id}` : '/admin/bouquets'; // Формируем URL
        let method = id ? 'PUT' : 'POST'; // Определяем метод

        $.ajax({
            url: url, // Устанавливаем URL
            method: method, // Устанавливаем метод
            contentType: 'application/json',
            data: JSON.stringify({ id: id, name: name, price: price }), // Передаем данные
            success: function () {
                $('#bouquetName').val(''); // Очищаем поле с названием
                $('#bouquetPrice').val(''); // Очищаем поле с ценой
                $('#bouquetId').val(''); // Очищаем ID
                loadBouquets(); // Обновляем список букетов
            },
            error: function (xhr, status, error) {
                console.error("Ошибка при добавлении или обновлении букета:", error); // Логируем ошибку
                alert("Произошла ошибка при добавлении или обновлении букета: " + xhr.responseText); // Уведомляем пользователя об ошибке
            }
        });
    });

    // News CRUD
    $('#newsForm').submit(function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы
        let id = $('#newsId').val(); // Получаем ID новости, если он есть
        let content = $('#newsContent').val().trim(); // Получаем содержание и удаляем пробелы
        let imageUrl = $('#newsImage').val().trim(); // Получаем ссылку на изображение

        // Проверяем, установлено ли содержание
        if (!content) {
            alert("Пожалуйста, введите содержание новости."); // Предупреждаем о неверных данных
            return;
        }

        // Проверяем, установлена ли ссылка на изображение
        if (!imageUrl) {
            alert("Пожалуйста, введите ссылку на изображение."); // Предупреждаем о неверных данных
            return;
        }

        let url = id ? `/admin/news/${id}` : '/admin/news'; // Формируем URL
        let method = id ? 'PUT' : 'POST'; // Определяем метод

        $.ajax({
            url: url, // Устанавливаем URL
            method: method, // Устанавливаем метод
            contentType: 'application/json', // Указываем тип содержимого
            data: JSON.stringify({ id: id, content: content, linq: imageUrl }), // Передаем данные
            success: function () {
                $('#newsContent').val(''); // Очищаем поле с содержанием
                $('#newsImage').val(''); // Очищаем поле с изображением
                $('#newsId').val(''); // Очищаем ID
                loadNews(); // Обновляем список новостей
            },
            error: function (xhr, status, error) {
                console.error("Ошибка при добавлении или обновлении новости:", error); // Логируем ошибку
                alert("Произошла ошибка при добавлении или обновлении новости: " + xhr.responseText); // Уведомляем пользователя об ошибке
            }
        });
    });

    $('#adminForm').submit(function (event) {
        event.preventDefault(); // Предотвращаем перезагрузку страницы

        let id = $('#adminId').val(); // Получаем ID администратора
        let login = $('#adminLogin').val().trim(); // Получаем логин
        let password = $('#adminPassword').val(); // Получаем пароль

        // Проверка на корректность введенных данных
        if (!login || !password) {
            alert("Пожалуйста, введите логин и пароль.");
            return;
        }

        // Данные для сохранения
        let data = { id: id, login: login, password: password };

        // Отправка данных на сервер для обновления
        $.ajax({
            url: `/admin/${id}`,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: function () {
                alert("Данные администратора успешно обновлены.");
                loadAdmin(adminId); // Перезагружаем информацию об администраторе
            },
            error: function (xhr) {
                alert("Ошибка при обновлении данных администратора: " + xhr.responseText);
            }
        });
    });

});

function loadFlowers() {
    $.get('/admin/flowers', function (data) {
        let flowerList = '<ul>';
        data.forEach(function (flower) {
            flowerList += `<li class="flower-item" data-id="${flower.id}">
                    <span class="flower-name">${flower.name}</span>
                    <span class="flower-price">${flower.price}</span>
                    <button class="edit-button" onclick="editFlower(${flower.id}, '${flower.name}')">Изменить</button>
                    <button class="delete-button" onclick="deleteFlower(${flower.id})">Удалить</button>
                </li>`;
        });
        flowerList += '</ul>';
        $('#flowerList').html(flowerList);
    });
}

function loadBouquets() {
    $.get('/admin/bouquets', function (data) {
        let bouquetList = '<ul>';
        data.forEach(function (bouquet) {
            bouquetList += `<li class="bouquet-item" data-id="${bouquet.id}">
                    <span class="bouquet-name">${bouquet.name}</span>
                    <span class="bouquet-price">${bouquet.price}</span>
                    <button class="edit-button" onclick="editBouquet(${bouquet.id}, '${bouquet.name}')">Изменить</button>
                    <button class="delete-button" onclick="deleteBouquet(${bouquet.id})">Удалить</button>
                </li>`;
        });
        bouquetList += '</ul>';
        $('#bouquetList').html(bouquetList);
    });
}

function loadNews() {
    $.get('/admin/news', function (data) {
        let newsList = '<ul>';
        data.forEach(function (news) {
            let shortLink = news.linq ? news.linq.substring(0, 20) : '';
            newsList += `<li class="news-item" data-id="${news.id}">
                    <span class="news-content">${news.content}</span>
                    <span class="news-img">Ссылка: <a href="${news.linq}" target="_blank">${shortLink}...</a></span>
                    <button class="edit-button" onclick="editNews(${news.id}, '${news.content}', '${news.linq}')">Изменить</button>
                    <button class="delete-button" onclick="deleteNews(${news.id})">Удалить</button>
                </li>`;
        });
        newsList += '</ul>';
        $('#newsList').html(newsList);
    });
}

function loadOrders() {
    $.get('/admin/orders', function (data) {
        let ordersList = '<ul>';
        data.forEach(function (order) {
            ordersList += `<li class="order-item" data-id="${order.id}">
                    <span class="order-email">${order.email}</span>
                    <span class="order-name">${order.name} ${order.lastName}</span>
                    <span class="order-phone">${order.phoneNumber}</span>
                    <span class="order-address">${order.address}</span>
                    <span class="order-paymentType">${order.paymentType}</span>
                    <span class="order-text">${order.orderText}</span>
                    <span class="order-price">${order.price}</span>
                    <button class="delete-button" onclick="deleteOrder(${order.id})">Удалить</button>
                </li>`;
        });
        ordersList += '</ul>';
        $('#ordersList').html(ordersList);
    });
}

function loadAdmin(id) {
    $.get(`/admin/${id}`, function (data) {
        $('#adminId').val(data.id);
        $('#adminLogin').val(data.login);
        $('#adminPassword').val(data.password);
    }).fail(function () {
        alert("Ошибка при загрузке данных администратора.");
    });
}

function editFlower(id, name, price) {
    $('#flowerId').val(id);
    $('#flowerName').val(name);
    $('#flowerPrice').val(price); // Добавляем редактирование цены
}

function deleteFlower(id) {
    $.ajax({
        url: `/admin/flowers/${id}`, // Использование обратных кавычек
        method: 'DELETE',
        success: loadFlowers // Перезагрузка списка цветов
    });
}

function editBouquet(id, name, price) {
    $('#bouquetId').val(id);
    $('#bouquetName').val(name);
    $('#bouquetPrice').val(price); // Добавляем редактирование цены
}

function deleteBouquet(id) {
    $.ajax({
        url: `/admin/bouquets/${id}`,
        method: 'DELETE',
        success: loadBouquets
    });
}

function editNews(id, content, linq) {
    $('#newsId').val(id);
    $('#newsContent').val(content);
    $('#newsImage').val(linq); // Заполняем поле с изображением
}

function deleteNews(id) {
    $.ajax({
        url: `/admin/news/${id}`,
        method: 'DELETE',
        success: loadNews
    });
}

function deleteOrder(orderId) {
    $.ajax({
        url: '/admin/orders/' + orderId,
        type: 'DELETE',
        success: function () {
            loadOrders(); // Перезагрузить заказы после удаления
        },
        error: function (xhr, status, error) {
            console.error("Ошибка при удалении заказа:", error);
        }
    });
}

function validateRussianLetters(input) {
    // Заменяем все символы, кроме русских букв, пропусков и минимально необходимых символов
    input.value = input.value.replace(/[^а-яА-ЯёЁ\s]/g, '');
}

function validatePrice(input) {
    // Заменяем все символы, кроме цифр и точки
    input.value = input.value.replace(/[^0-9]/g, '');
}
