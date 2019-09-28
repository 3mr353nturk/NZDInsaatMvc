using NZDInsaatMvc.DbService;
using NZDInsaatMvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers.Yonetim
{
    public class AdminController : Controller
    {
        NZDInsaatDbEntities db = new NZDInsaatDbEntities();
        // GET: Admin
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Login(LoginModel model)
        {
            Kullanici kul = new Kullanici();
            var kullanici = db.Kullanici.FirstOrDefault(x => x.Email == model.Email && x.Sifre == model.Sifre);
            if (kullanici!= null)
            {
                kul.OturumId = Guid.NewGuid().ToString();
                db.SaveChanges();
                Session["OturumID"] = kul.OturumId;
                Session["KullaniciID"] = kul.Id.ToString();
                Session.Add("Kullanici", kul.AdiSoyadi);

                HttpCookie OTURUM = new HttpCookie("OTURUM", model.Oturum);
                OTURUM.Expires = DateTime.Now.AddDays(40);
                HttpContext.Response.Cookies.Add(OTURUM);
                return RedirectToAction("Index", "Admin");
                //önbellekten dolayı olabilir mi
            }
            else
            {
                return RedirectToAction("Login", "Admin");
                //return Json(new
                //{
                //    redirectUrl = Url.Action("Login", "Admin"),
                //    isRedirect = true
                //});
            }
        }
        public ActionResult Logout()
        {
            Session["Kullanici"] = null;
            Session.Abandon();
            return RedirectToAction("Login", "Admin");
        }
    }
}