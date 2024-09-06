using System.ComponentModel.DataAnnotations;

namespace WebDevelopment.DB.Entities
{
    public class New
    {
        [Key]
        public int Id { get; set; }
        public string Linq { get; set; }
        public string Content { get; set; }
    }
}
