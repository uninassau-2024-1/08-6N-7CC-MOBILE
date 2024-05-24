using Atendimento_API.Interfaces;
using Atendimento_API.Models;

namespace Atendimento_API.Services
{
    public class GuicheService : IGuicheRepository
    {
        private readonly IGuicheRepository _repository;

        public GuicheService(IGuicheRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Guiche>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Guiche> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Guiche guiche)
        {
            await _repository.AddAsync(guiche);
        }

        public async Task UpdateAsync(Guiche guiche)
        {
            await _repository.UpdateAsync(guiche);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
