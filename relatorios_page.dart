import 'package:flutter/material.dart';
import 'atendimento.dart';
import 'atendimento_service.dart';

class RelatorioPage extends StatelessWidget {
  final AtendimentoService atendimentoService;

  RelatorioPage({required this.atendimentoService});

  @override
  Widget build(BuildContext context) {
    // Agrupar atendimentos por tipo de cliente e data
    Map<String, Map<String, List<String>>> relatorio = {};

    for (Atendimento atendimento in atendimentoService.atendimentos) {
      // Obter data formatada
      final dataFormatada = '${atendimento.dataHorario.year.toString().substring(2)}${atendimento.dataHorario.month.toString().padLeft(2, '0')}${atendimento.dataHorario.day.toString().padLeft(2, '0')}';

      // Obter tipo de cliente
      final tipoCliente = atendimento.nomeCliente;

      // Criar entradas no relatório se não existirem
      if (!relatorio.containsKey(tipoCliente)) {
        relatorio[tipoCliente] = {};
      }
      if (!relatorio[tipoCliente]!.containsKey(dataFormatada)) {
        relatorio[tipoCliente]![dataFormatada] = [];
      }

      // Adicionar a senha (código) ao relatório
      relatorio[tipoCliente]![dataFormatada]!.add(atendimento.codigoAtendimento);
    }

    // Construir a lista de senhas diárias por tipo de cliente
    List<Widget> listaRelatorio = [];
    relatorio.forEach((tipo, datas) {
      listaRelatorio.add(Text(
        'Relatório para $tipo:',
        style: TextStyle(fontWeight: FontWeight.bold),
      ));

      datas.forEach((data, codigos) {
        listaRelatorio.add(
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('Data: $data'),
              ...codigos.map((codigo) => Text('- $codigo')),
              SizedBox(height: 10),
            ],
          ),
        );
      });
    });

    return Scaffold(
      appBar: AppBar(
        title: Text('Relatório de Senhas Diárias'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: SingleChildScrollView(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: listaRelatorio,
          ),
        ),
      ),
    );
  }
}
