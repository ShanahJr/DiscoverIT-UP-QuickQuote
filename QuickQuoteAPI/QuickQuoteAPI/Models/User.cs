using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.SqlTypes;
using System.Linq;
using System.Threading.Tasks;

namespace QuickQuoteAPI.Models
{
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string UserName { get; set; }
        public string UserSurname { get; set; }
        public string UserEmail { get; set; }
        public string UserPassword { get; set; }
        public string UserCellNo { get; set; }
        public string UserSuburb { get; set; }
        public int UserRiskFactor { get; set; }
        [Column(TypeName = "money")]
        public decimal UserMonthlyPremium { get; set; }
        public bool IsEmailConfirmed { get; set; }
    }
}
