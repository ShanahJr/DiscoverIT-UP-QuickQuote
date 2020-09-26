using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using QuickQuoteAPI.Models;
using QuickQuoteAPI.ViewModels;

namespace QuickQuoteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly QuickQuoteContext _context;
        private readonly IConfiguration _config;

        public UserController(QuickQuoteContext context, IConfiguration config )
        {
            _context = context;
            _config = config;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserID)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/User
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {

            var SearchUser = await _context.User.Where(u => u.UserEmail.ToLower() == user.UserEmail.ToLower()).FirstOrDefaultAsync();

            if (SearchUser == null)
            {
                var random = new Random();
                int num = random.Next(6);
                user.IsEmailConfirmed = true;
                user.UserRiskFactor = num;
                await _context.User.AddAsync(user);
                await _context.SaveChangesAsync();

                //var emails = new List<string>
                //{
                //    user.UserEmail
                //};
                //string subject = "Welcome to Project Manager! Confirm your Email ";
                //await _emailSender.SendEmailAsync(emails, subject, "", user, "ConfirmEmail");

                return CreatedAtAction("GetUser", new { id = user.UserID }, user);
            }
            else
            {
                return Conflict();
            }

        }

        [HttpPost]
        [Route("[action]")]
        public IActionResult Login(LoginVM login)
        {
            IActionResult response = Unauthorized();
            var user = AuthenticateUser(login);

            if (user != null)
            {
                if (user.IsEmailConfirmed == true)
                {
                    var tokenString = GenerateJSONWebToken(user);
                    response = Ok(new { token = tokenString });
                }
                else
                {
                    return Conflict("You have not verified your email yet");
                }

            }

            return response;
        }//Login

        private User AuthenticateUser(LoginVM login)
        {
            User user = _context.User.Where(u => u.UserEmail.ToLower() == login.UserEmail.ToLower() && u.UserPassword == login.UserPassword).FirstOrDefault();

            //Validate the User Credentials      
            return user;
        }

        private string GenerateJSONWebToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(JwtRegisteredClaimNames.Email, user.UserEmail),
        };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
              _config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private static readonly DateTime epoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

        public static DateTime FromUnixTime(long unixTime)
        {
            return epoch.AddSeconds(unixTime);
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.UserID == id);
        }
    }
}
