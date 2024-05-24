using Atendimento_API.Interfaces;
using Atendimento_API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Atendimento_API.Services
{
    public class RelatorioService : IRelatorioRepository
    {
        private readonly IRelatorioRepository _repository;

        public RelatorioService(IRelatorioRepository repository)
        {
            _repository = repository;
        }

        public async Task<IEnumerable<Relatorio>> GetAllAsync()
        {
            return await _repository.GetAllAsync();
        }

        public async Task<Relatorio> GetByIdAsync(int id)
        {
            return await _repository.GetByIdAsync(id);
        }

        public async Task AddAsync()
        {
            await _repository.AddAsync();
        }

        public async Task UpdateAsync(Relatorio relatorio)
        {
            await _repository.UpdateAsync(relatorio);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}
