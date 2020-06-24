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
        private readonly ApplicationSettings appsettings;

        public AccountController(UserManager<NotesUser> userManager,
            SignInManager<NotesUser> signInManager,
            IOptions<ApplicationSettings> appsettings)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this.appsettings = appsettings.Value;
        }

        [HttpPost]
        [Route("Register")]
        //Post => api/Account/register
        public async Task<ActionResult> Register(RegisterUserViewModel model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    if (model.Password == model.ConfirmPassword)
                    {
                        var applicationUser = new NotesUser()
                        {
                            UserName = model.UserName
                        };

                        var result = await _userManager.CreateAsync(applicationUser, model.Password);

                        return Ok(result);
                    }
                    else
                        return BadRequest("Password and Confirm Password don't match");
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
        public async Task<ActionResult> Login(LoginUserViewModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.UserName);
                if((user != null) && (await _userManager.CheckPasswordAsync(user,model.Password)))
                {
                    var tokenDecriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                            new Claim("UserID", user.Id.ToString())
                        }),
                        Expires = DateTime.Now.AddHours(2),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appsettings.Key)),
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
            catch (Exception)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get user data");
            }
        }

        [HttpGet]
        [Route("Logout")]
        //Get => api/Account/Logout
        public async Task<ActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync();
                return Ok();
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to get user data");
            }
        }
    }
}
