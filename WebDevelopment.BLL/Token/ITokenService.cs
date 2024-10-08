﻿using WebDevelopment.DB.Entities;

namespace WebDevelopment.BLL.Token
{
    /// <summary>
    /// Интерфейс для работы с токенами JWT.
    /// </summary>
    public interface ITokenService
    {
        /// <summary>
        /// Создает JWT токен для указанного пользователя.
        /// </summary>
        /// <param name="user">Пользователь, для которого создается токен.</param>
        /// <returns>Сгенерированный JWT токен в виде строки.</returns>
        string CreateToken(Admin user);
    }

}
