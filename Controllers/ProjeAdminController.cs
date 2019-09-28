using NZDInsaatMvc.DbService;
using NZDInsaatMvc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace NZDInsaatMvc.Controllers
{
    public class ProjeAdminController : Controller
    {
        NZDInsaatDbEntities db = new NZDInsaatDbEntities();
        // GET: ProjeAdmin
        public ActionResult Ekle()
        {
            return View();
        }
        [HttpPost]
        public ActionResult Ekle(ProjeModel model)
        {
            return View();
        }
        public ActionResult Listele()
        {
            var liste = db.Projeler.ToList();
            return View(liste);
            //List<ProjeModel> projeList;
            //projeList = (from proje in db.Projeler
            //            select new ProjeModel
            //            {
            //                Id = proje.Id,
            //                Adi = proje.Adi,
            //                ResimYolu = proje.ResimYolu,
            //                Tamamlanan = (bool)proje.Tamamlanan
            //            }).ToList();
            //return View(projeList);
        }
        public ActionResult Sil(int Id)
        {
            var silProje = (from y in db.Projeler where y.Id == Id select y).FirstOrDefault();
            db.Projeler.Remove(silProje);
            db.SaveChanges();
            return RedirectToAction("Listele","ProjeAdmin");
        }
        public ActionResult CokluResimYukle(IEnumerable<HttpPostedFileBase> ResimDosya)
        {

            if (ResimDosya != null)
            {

                foreach (var item in ResimDosya)//kaç adet resim seçildiyse, o kadar kez çalışacak
                {
                    item.SaveAs(Server.MapPath($"~/Resim/{item.FileName}"));//resim klasörüne resimleri kaydetme
                    Resim resim = new Resim();

                    resim.Adi = item.FileName;
                    db.Resim.Add(resim);
                }

                db.SaveChanges();//veri tabanına kayıt işlemi

            }


            return View();
        }

    }
}