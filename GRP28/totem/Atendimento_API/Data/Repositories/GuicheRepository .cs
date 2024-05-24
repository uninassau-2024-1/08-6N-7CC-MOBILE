using Atendimento_API.Interfaces;
using Atendimento_API.Models;
using Dapper;
using System.Data;

namespace Atendimento_API.Data.Repositories
{
    public class GuicheRepository : IGuicheRepository
    {
        private readonly DatabaseContext _context;

        public GuicheRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Guiche>> GetAllAsync()
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            return await dbConnection.QueryAsync<Guiche>("SELECT TOP (1000) guiche_id AS id, numero_guiche AS numeroGuiche, status_disponibilidade AS statusDisponibilidade FROM atendimento.dbo.Guiches");
        }

        public async Task<Guiche> GetByIdAsync(int id)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            return await dbConnection.QueryFirstOrDefaultAsync<Guiche>("SELECT guiche_id AS id, numero_guiche AS numeroGuiche, status_disponibilidade AS statusDisponibilidade FROM atendimento.dbo.Guiches WHERE guiche_id = @Id", new { Id = id });
        }

        public async Task AddAsync(Guiche guiche)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            await dbConnection.ExecuteAsync("INSERT INTO atendimento.dbo.Guiches (numero_guiche, status_disponibilidade) VALUES (@numeroGuiche, @statusDisponibilidade)", guiche);
        }

        public async Task UpdateAsync(Guiche guiche)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            await dbConnection.ExecuteAsync("UPDATE atendimento.dbo.Guiches SET numero_guiche = @numeroGuiche, status_disponibilidade = @statusDisponibilidade WHERE guiche_id = @id", guiche);
        }

        public async Task DeleteAsync(int id)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            await dbConnection.ExecuteAsync("DELETE FROM atendimento.dbo.Guiches WHERE guiche_id = @Id", new { Id = id });
        }
    }
}
