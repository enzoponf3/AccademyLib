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
        public JsonResult getGenres()
        {
            return Json(db.Genre.Select(g => new { Id = g.Id, Name = g.Name, Description = g.Description }).ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}