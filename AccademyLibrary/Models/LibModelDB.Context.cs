﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace AccademyLibrary.Models
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class AccademyLibraryEntities : DbContext
    {
        public AccademyLibraryEntities()
            : base("name=AccademyLibraryEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<Author> Author { get; set; }
        public virtual DbSet<Book> Book { get; set; }
        public virtual DbSet<BookAuth> BookAuth { get; set; }
        public virtual DbSet<BookGen> BookGen { get; set; }
        public virtual DbSet<Editorial> Editorial { get; set; }
        public virtual DbSet<Genre> Genre { get; set; }
        public virtual DbSet<ISBN> ISBN { get; set; }
    }
}