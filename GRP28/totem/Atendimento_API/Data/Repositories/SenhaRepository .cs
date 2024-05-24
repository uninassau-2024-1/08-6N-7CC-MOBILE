using Atendimento_API.Interfaces;
using Atendimento_API.Models;
using Dapper;
using System.Data;

namespace Atendimento_API.Data.Repositories
{
    public class SenhaRepository : ISenhaRepository
    {
        private readonly DatabaseContext _context;

        public SenhaRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Senha>> GetAllAsync()
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            return await dbConnection.QueryAsync<Senha>("SELECT TOP (1000) ticket_id AS id, tipo_senha AS tipoSenha, data_hora_emissao AS dataHoraEmissao, data_hora_atendimento AS dataHoraAtendimento, status_atendimento AS statusAtendimento, numero_senha AS numeroSenha FROM atendimento.dbo.Senhas");
        }

        public async Task<IEnumerable<Senha>> GetAllNextFiveKeysAsync()
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            string query = @"
                            SELECT TOP (5) 
                                ticket_id AS id,
                                tipo_senha AS tipoSenha,
                                data_hora_emissao AS dataHoraEmissao,
                                data_hora_atendimento AS dataHoraAtendimento,
                                status_atendimento AS statusAtendimento,
                                tempo_minuto AS tempoMinuto,
                                numero_senha AS numeroSenha 
                            FROM 
                                atendimento.dbo.Senhas
                            WHERE 
                                CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE)  AND data_hora_atendimento is null 
                            ORDER BY 
                                CASE tipo_senha
                                    WHEN 'SP' THEN 1
                                    WHEN 'SE' THEN 2
                                    WHEN 'SG' THEN 3
                                    ELSE 4 
                                END,
                                data_hora_emissao ASC;";

            return await dbConnection.QueryAsync<Senha>(query);
        }

        public async Task<Senha> GetByIdAsync(int id)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            return await dbConnection.QueryFirstOrDefaultAsync<Senha>("SELECT ticket_id AS id, tipo_senha AS tipoSenha, data_hora_emissao AS dataHoraEmissao, data_hora_atendimento AS dataHoraAtendimento, status_atendimento AS statusAtendimento,tempo_minuto AS tempoMinuto,  numero_senha AS numeroSenha  FROM atendimento.dbo.Senhas WHERE ticket_id = @Id", new { Id = id });
        }

        public async Task AddAsync(Senha senha)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            try
            {

                await dbConnection.ExecuteAsync(@"INSERT INTO atendimento.dbo.Senhas 
                                    (tipo_senha, data_hora_emissao, data_hora_atendimento, 
                                     status_atendimento, tempo_minuto,  numero_senha) 
                                  VALUES 
                                    (@TipoSenha, @DataHoraEmissao, @DataHoraAtendimento, 
                                     @StatusAtendimento,@TempoMinuto,  @NumeroSenha)",
                                                 new
                                                 {
                                                     TipoSenha = senha.tipoSenha,
                                                     DataHoraEmissao = senha.dataHoraEmissao,
                                                     DataHoraAtendimento = senha.dataHoraAtendimento,
                                                     StatusAtendimento = senha.statusAtendimento,
                                                     TempoMinuto = senha.tempoMinuto,
                                                     NumeroSenha = senha.numeroSenha
                                                 });

            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task UpdateAsync(Senha senha)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            await dbConnection.ExecuteAsync(@"UPDATE atendimento.dbo.Senhas 
                                    SET 
                                        tipo_senha = @TipoSenha, 
                                        data_hora_emissao = @DataHoraEmissao, 
                                        data_hora_atendimento = @DataHoraAtendimento, 
                                        status_atendimento = @StatusAtendimento, 
                                        tempo_minuto = @TempoMinuto,
                                        numero_senha = @NumeroSenha
                                    WHERE 
                                        ticket_id = @Id",
                                             new
                                             {
                                                 TipoSenha = senha.tipoSenha,
                                                 DataHoraEmissao = senha.dataHoraEmissao,
                                                 DataHoraAtendimento = senha.dataHoraAtendimento,
                                                 StatusAtendimento = senha.statusAtendimento,
                                                 TempoMinuto = senha.tempoMinuto,
                                                 NumeroSenha = senha.numeroSenha,
                                                 Id = senha.id
                                             });
        }

        public async Task DeleteAsync(int id)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            await dbConnection.ExecuteAsync("DELETE FROM atendimento.dbo.Senhas WHERE ticket_id = @Id", new { Id = id });
        }
    }
}
