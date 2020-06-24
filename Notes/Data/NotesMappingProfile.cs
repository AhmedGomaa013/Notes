using AutoMapper;
using Notes.Data.Entities;
using Notes.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Data
{
    public class NotesMappingProfile: Profile
    {
        public NotesMappingProfile()
        {
            CreateMap<Note, NoteViewModel>()
                .ReverseMap();

            CreateMap<NotesUser, RegisterUserViewModel>()
                .ReverseMap();
        }
    }
}
