using Atendimento_API.Interfaces;
using Atendimento_API.Models;
using Dapper;
using System;
using System.Data;

namespace Atendimento_API.Data.Repositories
{
    public class RelatorioRepository : IRelatorioRepository
    {
        private readonly DatabaseContext _context;

        public RelatorioRepository(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Relatorio>> GetAllAsync()
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            return await dbConnection.QueryAsync<Relatorio>("SELECT  relatorio_id AS id, data_relatorio AS dataRelatorio, quant_senhas_emitidas AS qtdSenhasEmitidas, quant_senhas_atendidas AS qtdSenhasAtendidas, quant_senhas_emitidas_SP AS qtdSenhasEmitidasSP, quant_senhas_atendidas_SP AS qtdSenhasAtendidasSP, quant_senhas_emitidas_SG AS qtdSenhasEmitidasSG, quant_senhas_atendidas_SG AS qtdSenhasAtendidasSG, quant_senhas_emitidas_SE AS qtdSenhasEmitidasSE, quant_senhas_atendidas_SE AS qtdSenhasAtendidasSE, tempo_medio_atendimento_SP AS tempoMedioAtendimentoSP, tempo_medio_atendimento_SG AS tempoMedioAtendimentoSG, tempo_medio_atendimento_SE AS tempoMedioAtendimentoSE FROM atendimento.dbo.Relatorios where CAST(data_relatorio AS DATE) = CAST(GETDATE() AS DATE)");
        }

        public async Task<Relatorio> GetByIdAsync(int id)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            return await dbConnection.QueryFirstOrDefaultAsync<Relatorio>("SELECT relatorio_id AS id, data_relatorio AS dataRelatorio, quant_senhas_emitidas AS qtdSenhasEmitidas, quant_senhas_atendidas AS qtdSenhasAtendidas, quant_senhas_emitidas_SP AS qtdSenhasEmitidasSP, quant_senhas_atendidas_SP AS qtdSenhasAtendidasSP, quant_senhas_emitidas_SG AS qtdSenhasEmitidasSG, quant_senhas_atendidas_SG AS qtdSenhasAtendidasSG, quant_senhas_emitidas_SE AS qtdSenhasEmitidasSE, quant_senhas_atendidas_SE AS qtdSenhasAtendidasSE, tempo_medio_atendimento_SP AS tempoMedioAtendimentoSP, tempo_medio_atendimento_SG AS tempoMedioAtendimentoSG, tempo_medio_atendimento_SE AS tempoMedioAtendimentoSE FROM atendimento.dbo.Relatorios WHERE relatorio_id = @Id", new { Id = id });
        }

        public async Task AddAsync()
        {
            try
            {
                List<Relatorio> rel = new List<Relatorio>();
                rel = (List<Relatorio>)await GetAllAsync();
                using IDbConnection dbConnection = _context.Connection;
                Relatorio relatorio = await atualizandoRelatorio();
                dbConnection.Close();
                if (rel.Count > 0)
                {
                    await UpdateAsync(relatorio);
                    return;
                }

                dbConnection.Open();





                await dbConnection.ExecuteAsync(@"INSERT INTO atendimento.dbo.Relatorios 
                                    (data_relatorio, quant_senhas_emitidas, quant_senhas_atendidas, 
                                     quant_senhas_emitidas_SP, quant_senhas_atendidas_SP, 
                                     quant_senhas_emitidas_SG, quant_senhas_atendidas_SG, 
                                     quant_senhas_emitidas_SE, quant_senhas_atendidas_SE, 
                                     tempo_medio_atendimento_SP, tempo_medio_atendimento_SG, 
                                     tempo_medio_atendimento_SE) 
                                 VALUES 
                                    (@DataRelatorio, @QtdSenhasEmitidas, @QtdSenhasAtendidas, 
                                     @QtdSenhasEmitidasSP, @QtdSenhasAtendidasSP, 
                                     @QtdSenhasEmitidasSG, @QtdSenhasAtendidasSG, 
                                     @QtdSenhasEmitidasSE, @QtdSenhasAtendidasSE, 
                                     @TempoMedioAtendimentoSP, @TempoMedioAtendimentoSG, 
                                     @TempoMedioAtendimentoSE)",
                                                 new
                                                 {
                                                     DataRelatorio = relatorio.dataRelatorio,
                                                     QtdSenhasEmitidas = relatorio.qtdSenhasEmitidas,
                                                     QtdSenhasAtendidas = relatorio.qtdSenhasAtendidas,
                                                     QtdSenhasEmitidasSP = relatorio.qtdSenhasEmitidasSP,
                                                     QtdSenhasAtendidasSP = relatorio.qtdSenhasAtendidasSP,
                                                     QtdSenhasEmitidasSG = relatorio.qtdSenhasEmitidasSG,
                                                     QtdSenhasAtendidasSG = relatorio.qtdSenhasAtendidasSG,
                                                     QtdSenhasEmitidasSE = relatorio.qtdSenhasEmitidasSE,
                                                     QtdSenhasAtendidasSE = relatorio.qtdSenhasAtendidasSE,
                                                     TempoMedioAtendimentoSP = relatorio.tempoMedioAtendimentoSP,
                                                     TempoMedioAtendimentoSG = relatorio.tempoMedioAtendimentoSG,
                                                     TempoMedioAtendimentoSE = relatorio.tempoMedioAtendimentoSE
                                                 });
            }
            catch (Exception)
            {

                throw;
            }

        }

        public async Task UpdateAsync(Relatorio relatorio)
        {
            using IDbConnection dbConnection = _context.Connection;
            dbConnection.Open();
            await dbConnection.ExecuteAsync(@"UPDATE atendimento.dbo.Relatorios 
                                    SET 
                                        data_relatorio = @DataRelatorio, 
                                        quant_senhas_emitidas = @QtdSenhasEmitidas, 
                                        quant_senhas_atendidas = @QtdSenhasAtendidas, 
                                        quant_senhas_emitidas_SP = @QtdSenhasEmitidasSP, 
                                        quant_senhas_atendidas_SP = @QtdSenhasAtendidasSP, 
                                        quant_senhas_emitidas_SG = @QtdSenhasEmitidasSG, 
                                        quant_senhas_atendidas_SG = @QtdSenhasAtendidasSG, 
                                        quant_senhas_emitidas_SE = @QtdSenhasEmitidasSE, 
                                        quant_senhas_atendidas_SE = @QtdSenhasAtendidasSE, 
                                        tempo_medio_atendimento_SP = @TempoMedioAtendimentoSP, 
                                        tempo_medio_atendimento_SG = @TempoMedioAtendimentoSG, 
                                        tempo_medio_atendimento_SE = @TempoMedioAtendimentoSE 
                                    WHERE 
                                        CAST(data_relatorio AS DATE) = CAST(GETDATE() AS DATE)",
                                             new
                                             {
                                                 DataRelatorio = relatorio.dataRelatorio,
                                                 QtdSenhasEmitidas = relatorio.qtdSenhasEmitidas,
                                                 QtdSenhasAtendidas = relatorio.qtdSenhasAtendidas,
                                                 QtdSenhasEmitidasSP = relatorio.qtdSenhasEmitidasSP,
                                                 QtdSenhasAtendidasSP = relatorio.qtdSenhasAtendidasSP,
                                                 QtdSenhasEmitidasSG = relatorio.qtdSenhasEmitidasSG,
                                                 QtdSenhasAtendidasSG = relatorio.qtdSenhasAtendidasSG,
                                                 QtdSenhasEmitidasSE = relatorio.qtdSenhasEmitidasSE,
                                                 QtdSenhasAtendidasSE = relatorio.qtdSenhasAtendidasSE,
                                                 TempoMedioAtendimentoSP = relatorio.tempoMedioAtendimentoSP,
                                                 TempoMedioAtendimentoSG = relatorio.tempoMedioAtendimentoSG,
                                                 TempoMedioAtendimentoSE = relatorio.tempoMedioAtendimentoSE,
                                                 RelatorioId = relatorio.id
                                             });
        }

        public async Task DeleteAsync(int id)
        {
            using IDbConnection dbConnection = _context.Connection;
            await dbConnection.ExecuteAsync("DELETE FROM atendimento.dbo.Relatorios WHERE relatorio_id = @Id", new { Id = id });
        }

        private async Task<Relatorio> atualizandoRelatorio()
        {
            Relatorio relatorio = new Relatorio();
            var timeZoneInfo = TimeZoneInfo.FindSystemTimeZoneById("E. South America Standard Time");
            relatorio.dataRelatorio = TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, timeZoneInfo);
            relatorio.qtdSenhasEmitidas = await TotalSenhasEmitidas();
            relatorio.qtdSenhasAtendidas = await TotalSenhasAtendidas();
            relatorio.qtdSenhasEmitidasSP = await TotalSenhasEmitidasSP();
            relatorio.qtdSenhasAtendidasSP = await TotalSenhasAtendidasSP();
            relatorio.qtdSenhasAtendidasSG = await TotalSenhasAtendidasSG();
            relatorio.qtdSenhasEmitidasSG = await TotalSenhasEmitidasSG();
            relatorio.qtdSenhasAtendidasSE = await TotalSenhasAtendidasSE();
            relatorio.qtdSenhasEmitidasSE = await TotalSenhasEmitidasSE();
            relatorio.tempoMedioAtendimentoSP = await MediaTempoSP();
            relatorio.tempoMedioAtendimentoSG = await MediaTempoSG();
            relatorio.tempoMedioAtendimentoSE = await MediaTempoSE();
            return relatorio;
        }

        private async Task<int> TotalSenhasEmitidas()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasEmitidas  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE)");
            return Convert.ToInt32(total.qtdSenhasEmitidas);
        }

        private async Task<int> TotalSenhasAtendidas()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasAtendidas  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND data_hora_atendimento IS NOT NULL;");
            return Convert.ToInt32(total.qtdSenhasAtendidas);
        }
        private async Task<int> TotalSenhasEmitidasSP()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasEmitidasSP  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND tipo_senha LIKE 'SP';");
            return Convert.ToInt32(total.qtdSenhasEmitidasSP);
        }
        private async Task<int> TotalSenhasAtendidasSP()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasAtendidasSP FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND data_hora_atendimento IS NOT NULL AND tipo_senha LIKE 'SP';");
            return Convert.ToInt32(total.qtdSenhasAtendidasSP);
        }
        private async Task<int> TotalSenhasEmitidasSE()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasEmitidasSE  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND tipo_senha LIKE 'SE';");
            return Convert.ToInt32(total.qtdSenhasEmitidasSE);
        }
        private async Task<int> TotalSenhasAtendidasSE()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasAtendidasSE  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND data_hora_atendimento IS NOT NULL AND tipo_senha LIKE 'SE';");
            return Convert.ToInt32(total.qtdSenhasAtendidasSE);
        }
        private async Task<int> TotalSenhasEmitidasSG()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasEmitidasSG  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND tipo_senha LIKE 'SG';");
            return Convert.ToInt32(total.qtdSenhasEmitidasSG);
        }
        private async Task<int> TotalSenhasAtendidasSG()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT COUNT(*) AS qtdSenhasAtendidasSG  FROM atendimento.dbo.Senhas where CAST(data_hora_emissao AS DATE) = CAST(GETDATE() AS DATE) AND data_hora_atendimento IS NOT NULL AND tipo_senha LIKE 'SG';");
            return Convert.ToInt32(total.qtdSenhasAtendidasSG);
        }
        private async Task<int> MediaTempoSG()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT AVG(tempo_minuto) AS tempoMedioAtendimentoSG FROM atendimento.dbo.Senhas WHERE data_hora_atendimento IS NOT NULL AND status_atendimento LIKE 'A' AND tipo_senha LIKE 'SG';");
            return Convert.ToInt32(total.tempoMedioAtendimentoSG);
        }
        private async Task<int> MediaTempoSP()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT AVG(tempo_minuto) AS tempoMedioAtendimentoSP FROM atendimento.dbo.Senhas WHERE data_hora_atendimento IS NOT NULL AND status_atendimento LIKE 'A' AND tipo_senha LIKE 'SP';");
            return Convert.ToInt32(total.tempoMedioAtendimentoSP);
        }
        private async Task<int> MediaTempoSE()
        {
            using IDbConnection dbConnection = _context.Connection;
            var total = await dbConnection.QueryFirstOrDefaultAsync<dynamic>("SELECT AVG(tempo_minuto) AS tempoMedioAtendimentoSE FROM atendimento.dbo.Senhas WHERE data_hora_atendimento IS NOT NULL AND status_atendimento LIKE 'A' AND tipo_senha LIKE 'SE';");
            return Convert.ToInt32(total.tempoMedioAtendimentoSE);
        }
    }
}
