import 'package:flutter/material.dart';
import 'package:flutter1/semana6/lista_postagem_api.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: PostsListScreen(),
      debugShowCheckedModeBanner: false,
    );
  }
}
