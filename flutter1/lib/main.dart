import 'package:flutter/material.dart';
import 'package:flutter1/semana5_navegacao/exercicio.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: Tela1(), debugShowCheckedModeBanner: false);
  }
}
