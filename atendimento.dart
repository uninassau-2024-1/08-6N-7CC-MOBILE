class Atendimento {
  final int id;
  final String nomeCliente;
  final String motivoAtendimento;
  final DateTime dataHorario;
  final String _codigoAtendimento; // Campo privado para armazenar o código de atendimento

  Atendimento({
    required this.id,
    required this.nomeCliente,
    required this.motivoAtendimento,
    required this.dataHorario,
    required String codigoAtendimento, // Receber o código de atendimento como argumento
  }) : _codigoAtendimento = codigoAtendimento; // Inicializar o campo com o argumento recebido

  // Método getter para acessar o código de atendimento
  String get codigoAtendimento => _codigoAtendimento;
}
