using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuickQuoteAPI.Models;

namespace QuickQuoteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicancesController : ControllerBase
    {
        private readonly QuickQuoteContext _context;

        public ApplicancesController(QuickQuoteContext context)
        {
            _context = context;
        }

        // GET: api/Applicances
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Applicance>>> GetApplicance()
        {
            return await _context.Applicance.ToListAsync();
        }

        // GET: api/Applicances/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Applicance>> GetApplicance(int id)
        {
            var applicance = await _context.Applicance.FindAsync(id);

            if (applicance == null)
            {
                return NotFound();
            }

            return applicance;
        }

        // PUT: api/Applicances/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutApplicance(int id, Applicance applicance)
        {
            if (id != applicance.ApplicanceID)
            {
                return BadRequest();
            }

            _context.Entry(applicance).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ApplicanceExists(id))
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

        // POST: api/Applicances
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Applicance>> PostApplicance(Applicance applicance)
        {
            _context.Applicance.Add(applicance);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetApplicance", new { id = applicance.ApplicanceID }, applicance);
        }

        // DELETE: api/Applicances/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Applicance>> DeleteApplicance(int id)
        {
            var applicance = await _context.Applicance.FindAsync(id);
            if (applicance == null)
            {
                return NotFound();
            }

            _context.Applicance.Remove(applicance);
            await _context.SaveChangesAsync();

            return applicance;
        }

        private bool ApplicanceExists(int id)
        {
            return _context.Applicance.Any(e => e.ApplicanceID == id);
        }
    }
}
