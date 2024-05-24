using Atendimento_API.Interfaces;
using Atendimento_API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Atendimento_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SenhaController : ControllerBase
    {
        private readonly ISenhaRepository _senhaService;

        public SenhaController(ISenhaRepository senhaService)
        {
            _senhaService = senhaService;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Senha>>> GetAll()
        {
            var senhas = await _senhaService.GetAllAsync();
            if (senhas == null)
            {
                return NotFound();
            }
            return Ok(senhas);
        }

        [HttpGet("painel")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<Senha>>> GetAllNextFiveKeysAsync()
        {
            var senhas = await _senhaService.GetAllNextFiveKeysAsync();
            if (senhas == null)
            {
                return NotFound();
            }
            return Ok(senhas);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Senha>> GetById(int id)
        {
            var senha = await _senhaService.GetByIdAsync(id);
            if (senha == null)
            {
                return NotFound();
            }
            return Ok(senha);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Senha>> Create(Senha senha)
        {
            try
            {
                if (senha.dataHoraEmissao == null)
                {
                    var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
                    senha.dataHoraEmissao = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneInfo);
                }
                await _senhaService.AddAsync(senha);
                return CreatedAtAction(nameof(GetById), new { id = senha.id }, senha);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(int id, Senha senha)
        {
            if (id != senha.id)
            {
                return BadRequest();
            }

            if (senha.dataHoraAtendimento == null)
            {
                var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
                senha.dataHoraAtendimento = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneInfo);
            }

            try
            {
                await _senhaService.UpdateAsync(senha);
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
            var senha = await _senhaService.GetByIdAsync(id);
            if (senha == null)
            {
                return NotFound();
            }

            try
            {
                await _senhaService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
