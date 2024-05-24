using Dapper;
using System.Data.SqlClient;

namespace Atendimento_API.Infrastructure
{
    public class DatabaseInitializer
    {
        public static string TextCreateTables()
        {
          
               return @"
                   IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'atendimento')
                    CREATE DATABASE atendimento;

                   IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Senhas')
                    BEGIN
                        CREATE TABLE Senhas (
                            ticket_id INT PRIMARY KEY IDENTITY,
                            tipo_senha VARCHAR(2),
                            data_hora_emissao DATETIME,
                            data_hora_atendimento DATETIME,
                            status_atendimento CHAR(1),
                            tempo_minuto INT,
                            numero_senha VARCHAR(20)
                        );
                    END

                    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Guiches')
                    BEGIN
                        CREATE TABLE Guiches (
                            guiche_id INT PRIMARY KEY IDENTITY,
                            numero_guiche INT,
                            status_disponibilidade CHAR(1)
                        );
                    END

                    IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Relatorios')
                    BEGIN
                        CREATE TABLE Relatorios (
                            relatorio_id INT PRIMARY KEY IDENTITY,
                            data_relatorio DATE,
                            quant_senhas_emitidas INT,
                            quant_senhas_atendidas INT,
                            quant_senhas_emitidas_SP INT,
                            quant_senhas_atendidas_SP INT,
                            quant_senhas_emitidas_SG INT,
                            quant_senhas_atendidas_SG INT,
                            quant_senhas_emitidas_SE INT,
                            quant_senhas_atendidas_SE INT,
                            tempo_medio_atendimento_SP INT,
                            tempo_medio_atendimento_SG INT,
                            tempo_medio_atendimento_SE INT
                        );
                    END
                ";
        }
    }
}
