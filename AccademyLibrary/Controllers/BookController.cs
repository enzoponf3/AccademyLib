using AccademyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccademyLibrary.Controllers
{
    public class BookController : Controller
    {
        AccademyLibraryEntities db;
        public BookController()
        {
            db = new AccademyLibraryEntities();
        }
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public JsonResult getBooks()
        {
            return Json(db.Book.Select(b=> new {Title = b.Title, Subtitle = b.Subtitle, ISBN=b.ISBN, Pub = b.Author.ToList() }).ToList(),JsonRequestBehavior.AllowGet);
        }
    }
}