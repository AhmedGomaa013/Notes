using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data.Entities
{
    public class Note
    {
        public int NoteId { get; set; }
        public string NoteTitle { get; set; }
        public string NoteBody { get; set; }
        public DateTime NoteTime { get; set; }
        public NotesUser User { get; set; }

    }
}
