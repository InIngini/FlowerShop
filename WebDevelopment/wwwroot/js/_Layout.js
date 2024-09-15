document.getElementById("adminLoginBtn").onclick = function () {
    document.getElementById("adminLoginForm").style.display = "block";
};

$('#cancelLogin').click(function () {
    $('#adminLoginForm').hide(); // Скрываем div с формой
});

document.getElementById("loginForm").onsubmit = async function (e) {
    e.preventDefault(); // Предотвращаем стандартное отправление формы

    const login = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Отправка запроса на получение токена
    const response = await fetch('/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ login, password })
    });

    if (response.ok) {
        const data = await response.json();
        const token = data.token; // Предполагаем, что токен возвращается в формате { token: "your_token" }
        if (!token) {
            alert("Ошибка: токен не получен.");
            return;
        }
        const payload = JSON.parse(atob(token.split('.')[1])); // Декодируем полезную нагрузку
        const exp = payload.exp; // Получаем время истечения в расположении UNIX

        // Сохраните токен в локальное хранилище или куки
        localStorage.setItem('adminToken', token);
        localStorage.setItem('tokenExpiry', exp);

        // Перенаправление на контроллер /admin
        window.location.href = `/admin?token=${token}`;
    } else {
        alert("Ошибка аутентификации. Пожалуйста, проверьте логин и пароль.");
    }
};