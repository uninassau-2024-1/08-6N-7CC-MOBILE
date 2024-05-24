namespace Atendimento_API.Models
{
    public class Relatorio
    {
        public int id { get; set; }
        public DateTime dataRelatorio { get; set; }
        public int qtdSenhasEmitidas { get; set; }
        public int qtdSenhasAtendidas { get; set; }
        public int qtdSenhasEmitidasSP { get; set; }
        public int qtdSenhasAtendidasSP { get; set; }
        public int qtdSenhasEmitidasSG { get; set; }
        public int qtdSenhasAtendidasSG { get; set; }
        public int qtdSenhasEmitidasSE { get; set; }
        public int qtdSenhasAtendidasSE { get; set; }
        public int tempoMedioAtendimentoSP { get; set; }
        public int tempoMedioAtendimentoSG { get; set; }
        public int tempoMedioAtendimentoSE { get; set; }
    }
}
