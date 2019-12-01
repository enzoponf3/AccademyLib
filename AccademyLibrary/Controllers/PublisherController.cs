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
    }
}