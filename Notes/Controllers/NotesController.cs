using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Notes.Data;
using Notes.Data.Entities;
using Notes.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController: Controller
    {
        private readonly INotesRepository _notesRepository;
        private readonly IMapper _mapper;
        private readonly UserManager<NotesUser> _userManager;

        public NotesController(INotesRepository notesRepository, IMapper mapper,
            UserManager<NotesUser> userManager)
        {
            _notesRepository = notesRepository;
            _mapper = mapper;
            _userManager = userManager;
        }


        [HttpGet]
        // Get => api/Notes
        public IActionResult Get()
        {
            try
            {
                string userName = User.Claims.First(o=> o.Type == "UserName").Value;

                var result = _notesRepository.GetAllUserNotes(userName);
                var notes = _mapper.Map<NoteViewModel[]>(result);
                
                return Ok(notes);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to retrieve data");
            }
            

        }

        [HttpPost]
        //Post => api/Notes
        public async Task<IActionResult> Post(NoteViewModel model)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    string userName = User.Claims.First(o => o.Type == "UserName").Value;
                    var notesUser = await _userManager.FindByNameAsync(userName);

                    var note = _mapper.Map<Note>(model);
                    if(note.NoteTime == DateTime.MinValue) {
                        note.NoteTime = DateTime.Now;
                    }
                    note.User = notesUser;

                    _notesRepository.AddEntity(note);
                    if (_notesRepository.SaveAll())
                    {
                        return Created($"/api/notes/", _mapper.Map<NoteViewModel>(note));
                    }
                    else
                    { 
                        return BadRequest("Failed to save a new note"); 
                    }
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,"Failed to get note");
            }
        }

        [HttpPut("{id:int}")]
        //Put => api/Notes/id
        public IActionResult Put(NoteViewModel model,int id) 
        {
            try
            {
                string userName = User.Claims.First(o => o.Type == "UserName").Value;
                
                var note = _notesRepository.GetNoteByUserAndId(id,userName);
                if (note == null) return NotFound("Couldn't find the note");
                
                note.NoteBody = model.NoteBody;

                if (_notesRepository.SaveAll())
                {
                    return Ok(_mapper.Map<NoteViewModel>(note));
                }
                else
                {
                    return BadRequest("Failed to update database");
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get note");
            }
        }
       
        [HttpDelete("{id:int}")]
        //Delete => api/Notes/id
        public IActionResult Delete(int id)
        {
            try
            {
                string userName = User.Claims.First(o => o.Type == "UserName").Value;

                var note = _notesRepository.GetNoteByUserAndId(id,userName);
                if (note == null) return NotFound("Couldn't find the note");

                _notesRepository.DeleteEntity(note);

                if (_notesRepository.SaveAll())
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Failed to delete the note");
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get note");
            }
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            try
            {
                string userName = User.Claims.First(o => o.Type == "UserName").Value;

                _notesRepository.DeleteAllEntities(userName);
                if (_notesRepository.SaveAll())
                {
                    return Ok();
                }
                else
                {
                    return BadRequest("Failed to delete All Notes");
                }
            }
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get note");
            }
        }

    }
}
