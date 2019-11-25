using AccademyLibrary.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace AccademyLibrary.Controllers
{
    public class AuthorController : Controller
    {
        AccademyLibraryEntities db = new AccademyLibraryEntities();
        public ActionResult show()
        {
            AccademyLibraryEntities db = new AccademyLibraryEntities();

            List<Author> authors = db.Author.OrderBy(g => g.AuthorName).ToList();
            return View(authors);

        }
        public ActionResult addAuthor()
        {
            return View();
        }
        [HttpPost]
        public ActionResult addAuthor(string name, string nationality)
        {
            AccademyLibraryEntities db = new AccademyLibraryEntities();


            if (name == null || name.Length == 0)
            {
                return Content("Can't add empty Author");
            }

            Author author = new Author() { AuthorName = name, Nationality = nationality };

            db.Author.Add(author);
            db.SaveChanges();
            return RedirectToAction("show"); 

        }
    }
}