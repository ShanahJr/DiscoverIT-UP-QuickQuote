using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickQuoteAPI.Models
{
    public class Quote
    {
        [Key]
        public int QuoteID { get; set; }
        [ForeignKey("User")]
        public int UserID { get; set; }
        public DateTime QuoteDate { get; set; }
        public User User { get; set; }
    }
}
