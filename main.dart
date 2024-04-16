import 'package:flutter/material.dart';

void main() {
  runApp(AtendimentoApp());
}

class AtendimentoApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Controle de Atendimento',
      home: AtendimentoListPage(),
    );
  }
}

class Atendimento {
  int id;
  String nomeCliente;
  String motivoAtendimento;
  DateTime dataHorario;
  String codigoAtendimento;

  Atendimento({
    required this.id,
    required this.nomeCliente,
    required this.motivoAtendimento,
    required this.dataHorario,
    required this.codigoAtendimento,
  });
}

class AtendimentoService {
  // Lista para armazenar os atendimentos
  List<Atendimento> atendimentos = [];

  // Mapeamento para manter uma contagem diária de atendimentos
  Map<String, int> contagemDiaria = {};

  // Método para gerar o código do atendimento
  String gerarCodigoAtendimento() {
    // Obter a data atual
    final agora = DateTime.now();

    // Formatar a data como YYMMDD
    final yy = agora.year.toString().substring(2);
    final mm = agora.month.toString().padLeft(2, '0');
    final dd = agora.day.toString().padLeft(2, '0');
    final dataFormatada = '$yy$mm$dd';

    // Obter a contagem para a data atual
    if (!contagemDiaria.containsKey(dataFormatada)) {
      contagemDiaria[dataFormatada] = 0;
    }
    contagemDiaria[dataFormatada] = contagemDiaria[dataFormatada]! + 1;

    // Gerar o PPSQ com a contagem diária
    final ppsq = contagemDiaria[dataFormatada]!.toString().padLeft(4, '0');

    // Combinar YYMMDD e PPSQ para formar o código do atendimento
    return '$dataFormatada-$ppsq';
  }

  // Método para adicionar um novo atendimento
  void adicionarAtendimento(String nomeCliente, String motivoAtendimento) {
    final novoAtendimento = Atendimento(
      id: atendimentos.length + 1,
      nomeCliente: nomeCliente,
      motivoAtendimento: motivoAtendimento,
      dataHorario: DateTime.now(),
      codigoAtendimento: gerarCodigoAtendimento(),
    );
    atendimentos.add(novoAtendimento);
  }
}

class AtendimentoListPage extends StatefulWidget {
  @override
  _AtendimentoListPageState createState() => _AtendimentoListPageState();
}

class _AtendimentoListPageState extends State<AtendimentoListPage> {
  final AtendimentoService atendimentoService = AtendimentoService();

  // Adiciona um novo atendimento para um cliente específico
  void adicionarAtendimento(String nomeCliente, String motivoAtendimento) {
    setState(() {
      atendimentoService.adicionarAtendimento(nomeCliente, motivoAtendimento);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Controle de Atendimento'),
      ),
      body: Column(
        children: [
          // Botões para adicionar atendimentos para tipos de clientes específicos
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              ElevatedButton(
                onPressed: () => adicionarAtendimento('SP', 'Atendimento - Senha Prioritária'),
                child: Text('SP'),
              ),
              ElevatedButton(
                onPressed: () => adicionarAtendimento('SG', 'Atendimento - Senha Geral'),
                child: Text('SG'),
              ),
              ElevatedButton(
                onPressed: () => adicionarAtendimento('SE', 'Atendimento - Retirada de Exames'),
                child: Text('SE'),
              ),
            ],
          ),
          // Lista de atendimentos
          Expanded(
            child: ListView.builder(
              itemCount: atendimentoService.atendimentos.length,
              itemBuilder: (context, index) {
                final atendimento = atendimentoService.atendimentos[index];
                return ListTile(
                  title: Text('${atendimento.nomeCliente} - Código: ${atendimento.codigoAtendimento}'),
                  subtitle: Text('Motivo: ${atendimento.motivoAtendimento}'),
                  trailing: Text('Data: ${atendimento.dataHorario}'),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}
