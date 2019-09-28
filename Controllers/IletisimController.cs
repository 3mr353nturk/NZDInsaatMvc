using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.İletişim
{
    public class IletisimController : Controller
    {
        // GET: Iletisim
        public ActionResult Iletisim()
        {
            return View();
        }
        public ActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        public ActionResult MailGonder()
        {
            return View();
        }
    }
}