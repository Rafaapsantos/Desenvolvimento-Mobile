import 'package:flutter/material.dart';

class Contador extends StatefulWidget {
  const Contador({super.key});

  @override
  State<Contador> createState() => _ContadorState();
}

class _ContadorState extends State<Contador> {
  int contador = 0;
  String nome = "";
  final TextEditingController _controller = TextEditingController();

  void incrementar() {
    setState(() {
      nome = _controller.text;
      contador++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Semana 2 - Contador")),
      body: Padding(
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            TextField(
              controller: _controller,
              decoration: InputDecoration(labelText: "Digite seu nome"),
            ),
            SizedBox(height: 20),
            ElevatedButton(onPressed: incrementar, child: Text('Clique aqui')),
            SizedBox(height: 20),
            Text(
              nome.isEmpty
                  ? "Nenhum nome digitado"
                  : "$nome, você clicou $contador vezes",
              style: TextStyle(fontSize: 18),
            ),
          ],
        ),
      ),
    );
  }
}
