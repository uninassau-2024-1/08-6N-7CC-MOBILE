using Atendimento_API.Models;

namespace Atendimento_API.Interfaces
{
    public interface IGuicheRepository
    {
        Task<IEnumerable<Guiche>> GetAllAsync();
        Task<Guiche> GetByIdAsync(int id);
        Task AddAsync(Guiche guiche);
        Task UpdateAsync(Guiche guiche);
        Task DeleteAsync(int id);
    }
}
