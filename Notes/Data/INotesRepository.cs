using Notes.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data
{
    public interface INotesRepository
    {
        
        IEnumerable<Note> GetAllUserNotes(string username);
        Note GetNoteByUserAndId(int id,string username);

        bool SaveAll();
        void AddEntity(Note note);
        void DeleteEntity(Note note);
        void DeleteAllEntities(string username);
    }
}
