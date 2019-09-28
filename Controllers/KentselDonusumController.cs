using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.Kentsel_Dönüşüm
{
    public class KentselDonusumController : Controller
    {
        // GET: KentselDonusum
        public ActionResult KentselDonusum()
        {
            return View();
        }
        public ActionResult UrbanTransformation()
        {
            return View();
        }
    }
}