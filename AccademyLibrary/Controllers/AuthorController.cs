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
       AccademyLibraryEntities db;
        public AuthorController()
        {
            db = new AccademyLibraryEntities();
        }
        public ActionResult show()
        {
            List<Author> authors = db.Author.OrderBy(g => g.Name).ToList();
            return View(authors);

        }
        public ActionResult addAuthor(string name, string nationality)
        {
            Author au = new Author()
            {
                Name = name,
                Nationality = nationality
            };
            return View(au);
        }
        [HttpPost]
        public ActionResult addAuthor(Author author)
        {
            db.Author.Add(author);
            db.Entry(author).State = System.Data.Entity.EntityState.Added;
            db.SaveChanges();
            return RedirectToAction("show"); 

        }

        public ActionResult Edit(int id)
        {
            Author author = db.Author.Find(id);
            ViewBag.PageTitle = "Author";
            return View(author);

        }

        [HttpPost]
        public ActionResult Edit(Author auth)
        {
            db.Author.Attach(auth);
            db.Entry(auth).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("show");
        }

        public JsonResult getAuthors()
        {
            return Json(db.Author.OrderBy(a => a.Name), JsonRequestBehavior.AllowGet);
        }
    }
}