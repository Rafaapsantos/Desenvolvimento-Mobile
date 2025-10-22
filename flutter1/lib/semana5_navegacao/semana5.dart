import 'package:flutter/material.dart';

class Semana5 extends StatelessWidget {
  Semana5({super.key});

  final TextEditingController nomeController = TextEditingController();
  final TextEditingController emailController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Semana 5 - Tela Inicial")),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'Preencha seus dados',
              style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            TextField(
              controller: nomeController,
              decoration: InputDecoration(
                labelText: "Nome",
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 10),
            TextField(
              controller: emailController,
              decoration: InputDecoration(
                labelText: "E-mail",
                border: OutlineInputBorder(),
              ),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              child: Text("Avançar -> "),
              onPressed: () {
                String nome = nomeController.text.trim();
                String email = emailController.text.trim();
                if (nome.isNotEmpty && email.isNotEmpty) {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          TelaDetalhes(nome: nome, email: email),
                    ),
                  );
                }
              },
            ),
          ],
        ),
      ),
    );
  }
}

class TelaDetalhes extends StatelessWidget {
  final String nome;
  final String email;

  TelaDetalhes({required this.nome, required this.email});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("Semana 5 - Detalhes")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Olá, $nome!",
              style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 10),
            Text("Seu e-mail é $email", style: TextStyle(fontSize: 18)),
            ElevatedButton(
              child: Text("Voltar"),
              onPressed: () {
                Navigator.pop(context);
              },
            ),
          ],
        ),
      ),
    );
  }
}
