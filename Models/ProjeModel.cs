using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NZDInsaatMvc.Models
{
    public class ProjeModel
    {
        public int Id { get; set; }
        public string Adi { get; set; }
        public string ResimYolu { get; set; }
        public bool Tamamlanan { get; set; }
    }
}