using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.Gizlilik_Politika
{
    public class GizlilikPolitikaController : Controller
    {
        // GET: GizlilikPolitika
        public ActionResult GizlilikPolitika()
        {
            return View();
        }
        public ActionResult PrivacyPolicy()
        {
            return View();
        }
    }
}