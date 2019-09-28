using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NZDInsaatMvc.Models
{
    public class KullaniciModel
    {
        public int Id { get; set; }
        public string AdiSoyadi { get; set; }
        public string Email { get; set; }
        public string Sifre { get; set; }
        public DateTime EklenmeTarihi { get; set; }
        public string EkleyenKisi { get; set; }
        public DateTime DegistirilmeTarihi { get; set; }
        public string DegistirenKisi { get; set; }
        public string Resim { get; set; }
        public string Role { get; set; }
        public string OturumId { get; set; }
    }
}