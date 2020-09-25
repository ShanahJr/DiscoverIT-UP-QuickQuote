using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace QuickQuoteAPI.Models
{
    public class Applicance
    {
        [Key]
        public int ApplicanceID { get; set; }
        public string ApplicanceName { get; set; }
        public string ApplianceDescription { get; set; }
        public int ApplianceYear { get; set; }
        [Column(TypeName = "money")]
        public decimal AppliancePrice { get; set; }

        [ForeignKey("Quote")]
        public int QuoteID { get; set; }
        public Quote Quote { get; set; }
    }
}
