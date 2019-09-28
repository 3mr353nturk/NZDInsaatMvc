using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.Gayrimenkul_Gelistirme
{
    public class GayrimenkulController : Controller
    {
        // GET: Gayrimenkul
        public ActionResult Gayrimenkul()
        {
            return View();
        }
        public ActionResult RealEstateDevelopment()
        {
            return View();
        }
    }
}