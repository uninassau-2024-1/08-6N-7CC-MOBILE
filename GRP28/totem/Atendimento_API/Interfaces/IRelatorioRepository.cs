using Atendimento_API.Models;

namespace Atendimento_API.Interfaces
{
    public interface IRelatorioRepository
    {
        Task<IEnumerable<Relatorio>> GetAllAsync();
        Task<Relatorio> GetByIdAsync(int id);
        Task AddAsync();
        Task UpdateAsync(Relatorio relatorio);
        Task DeleteAsync(int id);
    }
}
