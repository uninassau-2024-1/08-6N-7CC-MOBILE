using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Atendimento_API.Data.Repositories;
using Atendimento_API.Interfaces;
using System.Data;
using System.Data.SqlClient;
using Dapper;
using Atendimento_API.Data;
using Atendimento_API.Infrastructure;

namespace Atendimento_API
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();

            // Configuração do Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Atedimento API", Version = "v1" });
            });

            // Registro do contexto do banco de dados
            services.AddScoped<DatabaseContext>();

            // Registro do repositório
            services.AddScoped<IRelatorioRepository, RelatorioRepository>();
            services.AddScoped<ISenhaRepository, SenhaRepository>();
            services.AddScoped<IGuicheRepository, GuicheRepository>();
       

            // Registro do DatabaseConnectionFactory
            services.AddScoped<IDatabaseConnectionFactory, DatabaseConnectionFactory>();

            // Configuração do banco de dados Dapper
            services.AddTransient<IDbConnection>(sp => new SqlConnection(_configuration.GetConnectionString("DefaultConnection")));

            // Configuração do CORS
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:8100")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthorization();

            // Middleware do Swagger
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Atedimento API V1");
            });

            // Inicialização do banco de dados
            InitializeDatabase();

            // Habilita CORS
            app.UseCors("AllowOrigin");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }

        private void InitializeDatabase()
        {
            // Recuperar a string de conexão do appsettings.json
            string connectionString = _configuration.GetConnectionString("DefaultConnection");

            // Script de criação das tabelas
            string createTablesScript = DatabaseInitializer.TextCreateTables();


            using (IDbConnection dbConnection = new SqlConnection(connectionString))
            {
                dbConnection.Open();
                dbConnection.Execute(createTablesScript);
            }
        }
    }
}
