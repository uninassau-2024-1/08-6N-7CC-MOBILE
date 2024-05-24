using Atendimento_API.Interfaces;
using Atendimento_API.Models;

namespace Atendimento_API.Services
{
    public class SenhaService : ISenhaRepository
    {
        private readonly ISenhaRepository _repository;

        public SenhaService(ISenhaRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Senha>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<IEnumerable<Senha>> GetAllNextFiveKeysAsync()
        {
            return await _repository.GetAllNextFiveKeysAsync();
        }

        public async Task<Senha> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync(Senha senha)
        {
            await _repository.AddAsync(senha);
        }

        public async Task UpdateAsync(Senha senha)
        {
            await _repository.UpdateAsync(senha);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
