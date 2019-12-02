using AccademyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccademyLibrary.Controllers
{
    public class PublisherController : Controller
    {
        private AccademyLibraryEntities db;
        public PublisherController()
        {
            db = new AccademyLibraryEntities();
        }
        // GET: Publisher
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult getPublishers()
        {
            return Json(db.Publisher.Select(p => new { Id = p.Id, Name = p.Name }).ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Add(string name)
        {
            if(name.Length > 0)
            {
                Publisher p = new Publisher();
                p.Name = name;
                db.Publisher.Add(p);
                db.SaveChanges();
                return Content("Publisher Added");

            }
            return new HttpStatusCodeResult(505, "El nombre no puede estar vacio");
        }

        [HttpPost]
        public ActionResult Delete (int Publisher)
        {
            Publisher pub = db.Publisher.Find(Publisher);
            db.Publisher.Remove(pub);
            db.SaveChanges();
            return Content("Publisher deleted");
        }
    }
}