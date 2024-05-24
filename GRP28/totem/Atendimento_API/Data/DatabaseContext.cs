using Atendimento_API.Infrastructure;
using System.Data;

namespace Atendimento_API.Data
{
    public class DatabaseContext
    {
        private readonly IDatabaseConnectionFactory _connectionFactory;

        public DatabaseContext(IDatabaseConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public IDbConnection Connection => _connectionFactory.CreateConnection();
    }
}
