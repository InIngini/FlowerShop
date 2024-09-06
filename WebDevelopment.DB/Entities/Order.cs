using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace WebDevelopment.DB.Entities
{
    public class Order
    {
        [Key]
        public int Id { get; set; } 
        public string Name { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string PaymentType { get; set; }
        public string OrderText { get; set; } 
        public string Price { get; set; }

    }
}
