namespace WebDevelopment.BLL.Errors
{
    /// <summary>
    /// Статический класс с типами ошибок
    /// </summary>
    public static class TypesOfErrors
    {

        /// <summary>
        /// Для ошибки, когда объект не найден.
        /// </summary>
        /// <param name="objName">Название объекта, который не найден.</param>
        /// <param name="genderOrNumber">Род или число, чтобы склонять сообщение (0 - ж род, 1 - м род, 2 - ср род, 3 - мн число).</param>
        /// <returns>Строка с пояснением ошибки.</returns>
        public static string NotFoundById(string objName,int genderOrNumber)
        {
            switch (genderOrNumber)
            {
                case 0: return $"{objName} не найдена."; //ж род, ед число
                case 1: return $"{objName} не найден.";  //м род, ед число 
                case 2: return $"{objName} не найдено."; //ср род, ед число
                case 3: return $"{objName} не найдены."; //мн число
                default: return $"Объект не найден."; 
            }
            
        }

        /// <summary>
        /// Для ошибки, когда что-то пошло не так.
        /// </summary>
        /// <param name="message">Сообщение об ошибке в качестве детали.</param>
        /// <returns>Строка с пояснением ошибки.</returns>
        public static ApiError SomethingWentWrong(string message)
        {
            return new ApiError
            {
                Message = "Что-то пошло не так...",
                Code = "InternalServerError",
                Details = new List<string>
                {
                    message
                }
            };
        }
    }
}
