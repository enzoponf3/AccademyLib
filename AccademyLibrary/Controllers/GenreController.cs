using AccademyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccademyLibrary.Controllers
{
    public class GenreController : Controller
    {
        private AccademyLibraryEntities db;
        public GenreController()
        {
            db = new AccademyLibraryEntities();
        }
        // GET: Genre
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult Get()
        {
            return Json(db.Genre.Select(g => new { Id = g.Id, Name = g.Name, Description = g.Description }).ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult Add(string name, string description)
        {
            if(name.Length > 0 && description.Length > 0)
            {
                Genre g = new Genre();
                g.Name = name;
                g.Description = description;
                db.Genre.Add(g);
                db.SaveChanges();
                return Content("Genre added");

            }
            return new HttpStatusCodeResult(505, "Error alguna de las cadenas esta vacia!");
        }

        [HttpPost]
        public ActionResult Delete(int Genre)
        {
            Genre gen = db.Genre.Find(Genre);
            db.Genre.Remove(gen);
            db.SaveChanges();
            return Content("Genre deleted!");
        }
    }
}