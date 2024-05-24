using Atendimento_API.Interfaces;
using Atendimento_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Atendimento_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GuicheController : ControllerBase
    {
        private readonly IGuicheRepository _guicheService;

        public GuicheController(IGuicheRepository guicheService)
        {
            _guicheService = guicheService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Guiche>>> GetAll()
        {
            var guiches = await _guicheService.GetAllAsync();
            if (guiches == null)
            {
                return NotFound();
            }
            return Ok(guiches);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Guiche>> GetById(int id)
        {
            var guiche = await _guicheService.GetByIdAsync(id);
            if (guiche == null)
            {
                return NotFound();
            }
            return Ok(guiche);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Guiche>> Create(Guiche guiche)
        {
            try
            {
                await _guicheService.AddAsync(guiche);
                return CreatedAtAction(nameof(GetById), new { id = guiche.id }, guiche);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(int id, Guiche guiche)
        {
            if (id != guiche.id)
            {
                return BadRequest();
            }

            try
            {
                await _guicheService.UpdateAsync(guiche);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Delete(int id)
        {
            var guiche = await _guicheService.GetByIdAsync(id);
            if (guiche == null)
            {
                return NotFound();
            }

            try
            {
                await _guicheService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
