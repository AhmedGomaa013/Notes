using Microsoft.EntityFrameworkCore;
using Notes.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data
{
    public class NotesRepository : INotesRepository
    {
        private readonly NotesContext _notesContext;

        public NotesRepository(NotesContext notesContext)
        {
            _notesContext = notesContext;
        }

        public IEnumerable<Note> GetAllUserNotes(string username)
        {
            try
            {
                return _notesContext.Notes
                    .Where(o => o.User.UserName == username)
                    .ToList();
            }
            catch (Exception)
            {

                return null;
            }
        }

        public Note GetNoteByUserAndId(int id,string username)
        {
            return _notesContext.Notes
                .Where(o => o.NoteId == id && o.User.UserName == username).FirstOrDefault();
        }

        public void AddEntity(Note note)
        {
            _notesContext.Add(note);
        }

        public void DeleteEntity(Note note)
        {
            _notesContext.Remove(note);
        }

        public void DeleteAllEntities(string username)
        {
            var all = _notesContext.Notes
                .Where(o => o.User.UserName == username);

            _notesContext.Notes.RemoveRange(all);
        }

        public bool SaveAll()
        {
            return _notesContext.SaveChanges() > 0;
        }
    }
}
