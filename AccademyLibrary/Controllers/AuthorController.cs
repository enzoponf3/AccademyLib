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
        public ActionResult Add(string name, string nationality)
        {
            if (name.Length > 0 && nationality.Length == 3)
            {
                Author author = new Author();
                author.Name = name;
                author.Nationality = nationality;
                db.Author.Add(author);
                db.SaveChanges();
                return Content("Author added");

            }
            return new HttpStatusCodeResult(505, "El valor de las cadenas es invalido!");
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
        [HttpGet]
        public JsonResult getAuthors()
        {
            return Json(db.Author.Select(a => new { Id = a.Id, Name = a.Name, Nationality = a.Nationality}).ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Delete(int Author)
        {
            Author au = db.Author.Find(Author);
            db.Author.Remove(au);
            db.SaveChanges();
            return Content("Author deleted");

        }
    }
}