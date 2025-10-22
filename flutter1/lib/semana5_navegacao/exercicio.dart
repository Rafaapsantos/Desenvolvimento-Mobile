import 'package:flutter/material.dart';

class Tela1 extends StatelessWidget {
  const Tela1({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.pink.shade100,
      appBar: AppBar(
        backgroundColor: Colors.pink.shade100,
        title: const Text('Tela 1 - Boas-vindas'),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.person_add, size: 100, color: Colors.pink),
              const SizedBox(height: 20),
              const Text(
                'Bem-vindo ao App de Cadastro 👋',
                textAlign: TextAlign.center,
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 30),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.pink,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (context) => const Tela2()),
                    );
                  },
                  child: const Text(
                    'Iniciar Cadastro',
                    style: TextStyle(fontSize: 20),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Tela2 extends StatefulWidget {
  final String? nome;
  final String? idade;
  final String? email;
  final String? telefone;

  const Tela2({super.key, this.nome, this.idade, this.email, this.telefone});

  @override
  State<Tela2> createState() => _Tela2State();
}

class _Tela2State extends State<Tela2> {
  final _formKey = GlobalKey<FormState>();

  late TextEditingController nomeController;
  late TextEditingController idadeController;
  late TextEditingController emailController;
  late TextEditingController telefoneController;

  @override
  void initState() {
    super.initState();
    nomeController = TextEditingController(text: widget.nome ?? '');
    idadeController = TextEditingController(text: widget.idade ?? '');
    emailController = TextEditingController(text: widget.email ?? '');
    telefoneController = TextEditingController(text: widget.telefone ?? '');
  }

  @override
  void dispose() {
    nomeController.dispose();
    idadeController.dispose();
    emailController.dispose();
    telefoneController.dispose();
    super.dispose();
  }

  void _avancar() {
    if (_formKey.currentState!.validate()) {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (context) => Tela3(
            nome: nomeController.text,
            idade: idadeController.text,
            email: emailController.text,
            telefone: telefoneController.text,
          ),
        ),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.deepPurple.shade100,
      appBar: AppBar(
        backgroundColor: Colors.deepPurple.shade100,
        title: const Text('Tela 2 - Cadastro'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Form(
          key: _formKey,
          child: ListView(
            children: [
              const Icon(Icons.edit, size: 100, color: Colors.deepPurple),

              const SizedBox(height: 20),
              TextFormField(
                controller: nomeController,
                decoration: const InputDecoration(labelText: 'Nome'),
                validator: (value) => value!.isEmpty ? 'Preencha o nome' : null,
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: idadeController,
                decoration: const InputDecoration(labelText: 'Idade'),
                keyboardType: TextInputType.number,
                validator: (value) =>
                    value!.isEmpty ? 'Preencha a idade' : null,
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: emailController,
                decoration: const InputDecoration(labelText: 'E-mail'),
                keyboardType: TextInputType.emailAddress,
                validator: (value) =>
                    value!.isEmpty ? 'Preencha o e-mail' : null,
              ),
              const SizedBox(height: 10),
              TextFormField(
                controller: telefoneController,
                decoration: const InputDecoration(labelText: 'Telefone'),
                keyboardType: TextInputType.phone,
                validator: (value) =>
                    value!.isEmpty ? 'Preencha o telefone' : null,
              ),
              const SizedBox(height: 30),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: _avancar,
                  child: const Text('Próximo', style: TextStyle(fontSize: 20)),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class Tela3 extends StatelessWidget {
  final String nome;
  final String idade;
  final String email;
  final String telefone;

  const Tela3({
    super.key,
    required this.nome,
    required this.idade,
    required this.email,
    required this.telefone,
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.green.shade200,
      appBar: AppBar(
        backgroundColor: Colors.green.shade200,
        title: const Text('Tela 3 - Resumo do Cadastro'),
        centerTitle: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(24.0),
        child: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.check_circle, size: 100, color: Colors.green),
              const SizedBox(height: 20),
              Text('Nome: $nome', style: const TextStyle(fontSize: 22)),
              Text('Idade: $idade', style: const TextStyle(fontSize: 22)),
              Text('E-mail: $email', style: const TextStyle(fontSize: 22)),
              Text('Telefone: $telefone', style: const TextStyle(fontSize: 22)),
              const SizedBox(height: 30),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.deepPurple,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () {
                    Navigator.pushReplacement(
                      context,
                      MaterialPageRoute(
                        builder: (context) => Tela2(
                          nome: nome,
                          idade: idade,
                          email: email,
                          telefone: telefone,
                        ),
                      ),
                    );
                  },
                  icon: const Icon(Icons.edit),
                  label: const Text('Editar', style: TextStyle(fontSize: 20)),
                ),
              ),
              const SizedBox(height: 10),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                  ),
                  onPressed: () {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Cadastro finalizado com sucesso! 🎉'),
                        duration: Duration(seconds: 2),
                      ),
                    );
                    Navigator.popUntil(context, (route) => route.isFirst);
                  },
                  icon: const Icon(Icons.done),
                  label: const Text(
                    'Finalizar',
                    style: TextStyle(fontSize: 20),
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
