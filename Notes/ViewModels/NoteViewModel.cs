using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.ViewModels
{
    public class NoteViewModel
    {
        public int NoteId { get; set; }
        [Required]
        public string NoteTitle { get; set; }
        public string NoteBody { get; set; }
        public DateTime NoteTime { get; set; }
    }
}
