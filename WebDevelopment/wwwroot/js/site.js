//document.getElementsByClassName("main-title")[0].style.color = "red";
//обращение к текущему документу, получение всех элементов по определенному классу, первый элемент

//нажатие на кнопку + вывод на экран
//обработка событий
document.getElementById("main-action-button").onclick = function () {
    //перевод к соответствующему блоку
    //метод перевода + в скобках параметр плавного перевода
    document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

//размещаем все ссылки
let links = document.querySelectorAll(".menu-item > a");
//проходимся по всем ссылкам
for (let i = 0; i < links.length; i++) {
    links[i].onclick = function () {
        document.getElementById(links[i].getAttribute("data-link")).scrollIntoView({ behavior: "smooth" });
    }
}

let buttons = document.getElementsByClassName("product-button")
for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function () {
        document.getElementById("order").scrollIntoView({ behavior: "smooth" });
    }
}

//изменение курса валют
//ищем все блоки с ценами
let prices = document.getElementsByClassName("products-item-price");
document.getElementById("change-money").onclick = function (e) {
    //запоминаем, что вообще за валюта сейчас
    let currentCurrency = e.target.innerText;
    let newCurrency = "$";  
    //коэфф-т для перевода
    let coefficient = 1;

    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 83;
    }
    else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 3;
    }
    else if (currentCurrency === 'BYN') {
        newCurrency = '€';
        coefficient = 0.9;
    }
    else if (currentCurrency === '€') {
        newCurrency = '¥';
        coefficient = 6.9;
    }

    e.target.innerText = newCurrency;
    
    //ищем все элементы
    //меняем валюту
    for (let i = 0; i < prices.length; i++) {
        //"+" - для того, чтобы преобразовать в число
        prices[i].innerText = +(prices[i].getAttribute("data-base-price") * coefficient).toFixed(1) + " " + newCurrency;
    }
    
}

let newsItems = document.getElementById("news-item");

if (newsItems) {
    let currentIndex = 0;

    const news = [
        "Содержимое новости 1",
        "Содержимое новости 2",
        "Содержимое новости 3"
    ];

    function showNews(index) {
        newsItems.textContent = news[index];
        currentIndex = index;
    }

    document.getElementById("navigation-next").addEventListener("click", function () {
        const nextIndex = (currentIndex + 1) % news.length;
        showNews(nextIndex);
    });

    document.getElementById("navigation-prev").addEventListener("click", function () {
        const prevIndex = (currentIndex - 1 + news.length) % news.length;
        showNews(prevIndex);
    });

    showNews(currentIndex);
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
