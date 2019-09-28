using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.Yasal_Uyarı
{
    public class YasalUyariController : Controller
    {
        // GET: YasalUyari
        public ActionResult YasalUyari()
        {
            return View();
        }
        public ActionResult LegalWarning()
        {
            return View();
        }
    }
}