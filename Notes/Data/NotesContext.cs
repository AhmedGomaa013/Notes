using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Notes.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data
{
    public class NotesContext : IdentityDbContext<NotesUser>
    {
        public NotesContext(DbContextOptions<NotesContext> options):base(options)
        {

        }
        
        public DbSet<Note> Notes { get; set; }

        
    }
}
