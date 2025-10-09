import 'package:flutter/material.dart';

class ListaNotasPage extends StatefulWidget {
  const ListaNotasPage({super.key});

  @override
  State<ListaNotasPage> createState() => _ListaNotasPageState();
}

class _ListaNotasPageState extends State<ListaNotasPage> {
  List<String> _notas = [];
  List<String> _armazenamentoSimulado = [];
  final TextEditingController _controller = TextEditingController();

  void carregarNotas() {
    setState(() {
      _notas = List.from(_armazenamentoSimulado);
    });
  }

  void addNota() {
    String texto = _controller.text.trim();
    if (texto.isNotEmpty) {
      setState(() {
        _notas.add(texto);
        _armazenamentoSimulado = List.from(_notas);
        _controller.clear();
      });
    }
  }

  void removerNota(int index) {
    setState(() {
      _notas.removeAt(index);
      _armazenamentoSimulado = List.from(_notas);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Semana 4 - notas salvas'),
        actions: [
          IconButton(
            onPressed: carregarNotas,
            icon: Icon(Icons.download),
            tooltip: 'Carregar notas',
          ),
        ],
      ),
      body: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(
                labelText: 'Digite uma nota',
                suffixIcon: IconButton(
                  onPressed: addNota,
                  icon: Icon(Icons.add),
                ),
              ),
              onSubmitted: (_) => addNota(),
            ),
            SizedBox(height: 20),
            Expanded(
              child: _notas.isEmpty
                  ? Center(
                      child: Text(
                        'nenhumas nota salva ainda',
                        style: TextStyle(color: Colors.grey),
                      ),
                    )
                  : ListView.builder(
                      itemCount: _notas.length,
                      itemBuilder: (context, index) {
                        return Card(
                          child: ListTile(
                            title: Text(_notas[index]),
                            trailing: IconButton(
                              onPressed: () => removerNota(index),
                              icon: Icon(Icons.delete, color: Colors.red),
                            ),
                          ),
                        );
                      },
                    ),
            ),
          ],
        ),
      ),
    );
  }
}
