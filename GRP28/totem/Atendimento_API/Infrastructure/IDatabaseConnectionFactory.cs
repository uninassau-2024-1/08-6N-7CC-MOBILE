using System.Data;

namespace Atendimento_API.Infrastructure
{
    public interface IDatabaseConnectionFactory
    {
        IDbConnection CreateConnection();
    }
}
