using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.Yenilenebilir_Enerji_Sistemleri
{
    public class YenilenebilirEnerjiSistemleriController : Controller
    {
        // GET: YenilenebilirEnerjiSistemleri
        public ActionResult YenilenebilirEnerjiSistemleri()
        {
            return View();
        }
        public ActionResult RenewableEnergy()
        {
            return View();
        }
    }
}