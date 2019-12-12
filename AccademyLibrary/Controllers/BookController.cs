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
        public ActionResult Add(string bookTitle, string bookSub, string ISBN, IEnumerable<int> authors, IEnumerable<int> genres, int publisher) 
        {
            if (bookTitle.Length > 0 && ISBN.Length != 13)
            {            
                var book = new Book();
                book.Title = bookTitle;
                book.Subtitle = bookSub;
                book.ISBN = ISBN;
                foreach (var ind  in genres)
                {
                    book.Genre.Add(db.Genre.Find(ind));
                }
                foreach(var ind in authors)
                {
                    book.Author.Add(db.Author.Find(ind));
                }
                book.Publisher = db.Publisher.Find(publisher);
                db.Book.Add(book);
                db.SaveChanges();
                return Content("Book added");
            }
            return new HttpStatusCodeResult(505, "Algo salio mal!");
        }

        [HttpGet]
        public JsonResult Get() {               
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

        [HttpPost]
        public ActionResult Delete (int Book)
        {
            Book book = db.Book.Find(Book);
            db.Book.Remove(book);
            db.SaveChanges();
            return Content("Book deleted!");
        }
    }
}