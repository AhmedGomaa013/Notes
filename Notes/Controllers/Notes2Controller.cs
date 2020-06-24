using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Notes.Data;
using Notes.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Notes.Controllers
{
    [Authorize]
    [Route("api/notes2/all/notes")]
    [ApiController]
    public class Notes2Controller: Controller
    {
        private readonly INotesRepository _notesRepository;
        private readonly UserManager<NotesUser> _userManager;

        public Notes2Controller(INotesRepository notesRepository,UserManager<NotesUser> userManager)
        {
            _notesRepository = notesRepository;
            _userManager = userManager;
        }
        
        [HttpDelete]
        public async Task<IActionResult> Delete()
        {
            try
            {
                string userId = User.Claims.First(o => o.Type == "UserID").Value;
                var notesUser = await _userManager.FindByIdAsync(userId);

                _notesRepository.DeleteAllEntities(notesUser.UserName);
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
