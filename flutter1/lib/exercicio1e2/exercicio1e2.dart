import 'package:flutter/material.dart';

class Exercicio1e2 extends StatefulWidget {
  const Exercicio1e2({super.key});

  @override
  State<Exercicio1e2> createState() => _Exercicio1e2State();
}

class _Exercicio1e2State extends State<Exercicio1e2> {
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _ageController = TextEditingController();

  String _message = "";
  IconData? _icon;
  Color _backgroundColor = Colors.white;

  void _showData() {
    final name = _nameController.text;
    final ageText = _ageController.text;

    if (name.isEmpty || ageText.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Por favor, preencha todos os campos!")),
      );
      return;
    }

    final int? age = int.tryParse(ageText);
    if (age == null) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(const SnackBar(content: Text("Digite uma idade válida!")));
      return;
    }

    setState(() {
      _message = "Olá, $name! Você tem $age anos.";

      if (age < 12) {
        _icon = Icons.child_care;
        _backgroundColor = Colors.lightBlueAccent;
      } else if (age >= 12 && age <= 21) {
        _icon = Icons.school;
        _backgroundColor = Colors.greenAccent;
      } else if (age >= 22 && age <= 60) {
        _icon = Icons.work;
        _backgroundColor = Colors.orangeAccent;
      } else {
        _icon = Icons.elderly;
        _backgroundColor = Colors.grey;
      }
    });
  }

  void _clearData() {
    setState(() {
      _nameController.clear();
      _ageController.clear();
      _message = "";
      _icon = null;
      _backgroundColor = Colors.white;
    });

    ScaffoldMessenger.of(
      context,
    ).showSnackBar(const SnackBar(content: Text("Campos limpos!")));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: _backgroundColor,
      appBar: AppBar(
        title: const Text("Exercício Semanas 1 e 2"),
        centerTitle: true,
        backgroundColor: _backgroundColor,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              TextField(
                controller: _nameController,
                decoration: const InputDecoration(
                  labelText: "Digite seu nome",
                  border: OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 12),
              TextField(
                controller: _ageController,
                decoration: const InputDecoration(
                  labelText: "Digite sua idade",
                  border: OutlineInputBorder(),
                ),
                keyboardType: TextInputType.number,
              ),
              const SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ElevatedButton(
                    onPressed: _showData,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                    ),
                    child: const Text("Mostrar dados"),
                  ),
                  const SizedBox(width: 12),
                  ElevatedButton(
                    onPressed: _clearData,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.red,
                      foregroundColor: Colors.white,
                    ),
                    child: const Text("Limpar"),
                  ),
                ],
              ),
              const SizedBox(height: 30),
              Text(
                _message,
                style: const TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: Colors.black87,
                ),
                textAlign: TextAlign.center,
              ),
              const SizedBox(height: 16),
              if (_icon != null) Icon(_icon, size: 80, color: Colors.black87),
            ],
          ),
        ),
      ),
    );
  }
}
