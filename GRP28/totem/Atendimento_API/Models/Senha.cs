namespace Atendimento_API.Models
{
    public class Senha
    {
        public int id { get; set; }
        public string tipoSenha { get; set; }
        public DateTime? dataHoraEmissao { get; set; }
        public DateTime? dataHoraAtendimento { get; set; }
        public string statusAtendimento { get; set; }
        public int? tempoMinuto { get; set; }
        public string numeroSenha { get; set; }
    }
}
