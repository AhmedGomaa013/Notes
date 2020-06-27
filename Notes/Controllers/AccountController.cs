using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Notes.Data;
using Notes.Data.Entities;
using Notes.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Notes.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController: Controller
    {
        private readonly UserManager<NotesUser> _userManager;
        private readonly SignInManager<NotesUser> _signInManager;
        

        public AccountController(UserManager<NotesUser> userManager,
            SignInManager<NotesUser> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        [HttpPost]
        [Route("Register")]
        //Post => api/Account/register
        public async Task<ActionResult> Register(UserViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                        var applicationUser = new NotesUser()
                        {
                            UserName = model.UserName
                        };

                        var result = await _userManager.CreateAsync(applicationUser, model.Password);

                        return Ok(result);
                }
                else
                    return BadRequest(ModelState);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed To Register User");
            }
        }

        [HttpPost]
        [Route("Login")]
        //Post => api/Account/Login
        public async Task<ActionResult> Login(UserViewModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                var key = Environment.GetEnvironmentVariable("Token");
                if((user != null) && (await _userManager.CheckPasswordAsync(user,model.Password)))
                {
                    var tokenDecriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim("UserName", user.UserName)
                        }),
                        Expires = DateTime.Now.AddHours(2),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                        SecurityAlgorithms.HmacSha256Signature)
                    };

                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDecriptor);
                    var token = tokenHandler.WriteToken(securityToken);

                    return Ok(new { token });
                }
                else
                {
                    return BadRequest(new { message = "Username or password is incorrect." });
                }
            }
            catch (Exception e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, $"Failed to get user data, err:{e}");
            }
        }
    }
}
