import 'atendimento.dart';

class AtendimentoService {
  // Lista para armazenar os atendimentos
  List<Atendimento> atendimentos = [];

  // Método para adicionar um novo atendimento
  void adicionarAtendimento(Atendimento atendimento, String motivoAtendimento) {
    atendimentos.add(atendimento);
  }

  // Método para editar um atendimento existente
  void editarAtendimento(int id, Atendimento novoAtendimento) {
    int index = atendimentos.indexWhere((atd) => atd.id == id);
    if (index != -1) {
      atendimentos[index] = novoAtendimento;
    }
  }

  // Método para excluir um atendimento
  void excluirAtendimento(int id) {
    atendimentos.removeWhere((atd) => atd.id == id);
  }

  // Método para buscar atendimentos por critério (por exemplo, nome do cliente)
  List<Atendimento> buscarAtendimentos(String nomeCliente) {
    return atendimentos
        .where((atd) => atd.nomeCliente.toLowerCase().contains(nomeCliente.toLowerCase()))
        .toList();
  }
}