using Atendimento_API.Models;

namespace Atendimento_API.Interfaces
{
    public interface ISenhaRepository
    {
        Task<IEnumerable<Senha>> GetAllAsync();
        Task<IEnumerable<Senha>> GetAllNextFiveKeysAsync();
        Task<Senha> GetByIdAsync(int id);
        Task AddAsync(Senha senha);
        Task UpdateAsync(Senha senha);
        Task DeleteAsync(int id);
    }
}
