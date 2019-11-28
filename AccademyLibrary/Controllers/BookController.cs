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
            return Json(db.Book.OrderBy(a => a.Title), JsonRequestBehavior.AllowGet);
        }
    }
}