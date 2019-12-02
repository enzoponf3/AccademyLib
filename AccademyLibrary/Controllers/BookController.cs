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

        [HttpPost]
        public ActionResult AddBook(Book book, IEnumerable<int> genres, int publiher) 
        {
            if (this.ModelState.IsValid)
            {
                foreach (var ind  in genres)
                {
                    book.Genre.Add(db.Genre.Find(ind));
                }
                book.PubId = publiher;
                db.Book.Add(book);
                db.SaveChanges();
                return View();
            }
            return Content("Algo salio mal!");
        }

        [HttpGet]
        public JsonResult getBooks() {               
            return Json(db.Book.Select(b=> new
            {
                Pub = b.Publisher.Name,
                Authors = b.Author.Select(a=>a.Name),
                Genres = b.Genre.Select(g=>g.Name),
                Id = b.Id, 
                Title = b.Title, 
                Subtitle = b.Subtitle, 
                ISBN = b.ISBN
            }).ToList(),JsonRequestBehavior.AllowGet);
        }
    }
}