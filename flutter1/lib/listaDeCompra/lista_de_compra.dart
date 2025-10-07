import 'package:flutter/material.dart';

class ListaDeCompra extends StatefulWidget {
  const ListaDeCompra({super.key});

  @override
  State<ListaDeCompra> createState() => _ListaDeCompraState();
}

class _ListaDeCompraState extends State<ListaDeCompra> {
  final TextEditingController _productController = TextEditingController();
  final TextEditingController _quantityController = TextEditingController();
  final List<Map<String, String>> _shoppingItems = [];

  void _addItem() {
    final String product = _productController.text.trim();
    final String quantity = _quantityController.text.trim();

    if (product.isEmpty || quantity.isEmpty) {
      return;
    }

    setState(() {
      _shoppingItems.add({'product': product, 'quantity': quantity});
      _productController.clear();
      _quantityController.clear();
    });

    FocusScope.of(context).requestFocus(FocusNode());
  }

  void _removeItem(int index) {
    setState(() {
      _shoppingItems.removeAt(index);
    });
  }

  void _clearAllItems() {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: const Row(
            children: [
              Icon(Icons.warning, color: Colors.orange),
              SizedBox(width: 8),
              Text('Limpar Lista'),
            ],
          ),
          content: const Text(
            'Tem certeza que deseja remover todos os itens da lista?',
          ),
          actions: [
            TextButton(
              onPressed: () => Navigator.of(context).pop(),
              child: const Text('Cancelar'),
            ),
            ElevatedButton(
              onPressed: () {
                setState(() {
                  _shoppingItems.clear();
                });
                Navigator.of(context).pop();
              },
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
              child: const Text(
                'Limpar',
                style: TextStyle(color: Colors.white),
              ),
            ),
          ],
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Row(
          children: [
            Icon(Icons.shopping_cart_checkout, color: Colors.white),
            SizedBox(width: 12),
            Text(
              'Lista de Compras',
              style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
            ),
          ],
        ),
        backgroundColor: Colors.blue.shade700,
        elevation: 3,
      ),
      body: Column(
        children: [
          Container(
            margin: const EdgeInsets.all(16),
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: Colors.white,
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: Colors.grey.withValues(alpha: 0.2),
                  blurRadius: 8,
                  offset: const Offset(0, 2),
                ),
              ],
            ),
            child: Column(
              children: [
                TextField(
                  controller: _productController,
                  decoration: const InputDecoration(
                    labelText: 'Nome do produto',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(Icons.shopping_bag, color: Colors.blue),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.blue),
                    ),
                  ),
                  onSubmitted: (_) => _addItem(),
                ),
                const SizedBox(height: 16),
                TextField(
                  controller: _quantityController,
                  decoration: const InputDecoration(
                    labelText: 'Quantidade',
                    border: OutlineInputBorder(),
                    prefixIcon: Icon(
                      Icons.format_list_numbered,
                      color: Colors.green,
                    ),
                    focusedBorder: OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.pink),
                    ),
                  ),
                  keyboardType: TextInputType.number,
                  onSubmitted: (_) => _addItem(),
                ),
                const SizedBox(height: 20),
                ElevatedButton.icon(
                  onPressed: _addItem,
                  icon: const Icon(Icons.add_circle_outline),
                  label: const Text(
                    'Adicionar Item',
                    style: TextStyle(fontSize: 16),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.blue.shade600,
                    foregroundColor: Colors.white,
                    minimumSize: const Size(double.infinity, 55),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(12),
                    ),
                    elevation: 2,
                  ),
                ),
              ],
            ),
          ),
          const Divider(height: 1),
          Expanded(
            child: _shoppingItems.isEmpty
                ? Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(
                          Icons.shopping_basket_outlined,
                          size: 80,
                          color: Colors.grey.shade400,
                        ),
                        const SizedBox(height: 20),
                        Text(
                          'Nenhum item na lista de compras.',
                          style: TextStyle(
                            fontSize: 18,
                            color: Colors.grey.shade600,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Adicione itens usando o formulário acima.',
                          style: TextStyle(
                            fontSize: 14,
                            color: Colors.grey.shade500,
                          ),
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  )
                : Column(
                    children: [
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 20,
                          vertical: 12,
                        ),
                        color: Colors.grey.shade50,
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text(
                              'Itens na lista (${_shoppingItems.length})',
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                                color: Colors.grey,
                              ),
                            ),
                            Icon(Icons.list_alt, color: Colors.blue.shade600),
                          ],
                        ),
                      ),

                      Expanded(
                        child: ListView.builder(
                          itemCount: _shoppingItems.length,
                          itemBuilder: (context, index) {
                            final item = _shoppingItems[index];
                            final bool isEven = index.isEven;

                            return Container(
                              margin: const EdgeInsets.symmetric(
                                horizontal: 16,
                                vertical: 6,
                              ),
                              decoration: BoxDecoration(
                                color: isEven
                                    ? Colors.blue.shade50
                                    : Colors.pink.shade50,
                                borderRadius: BorderRadius.circular(12),
                                border: Border.all(
                                  color: isEven
                                      ? Colors.blue.shade100
                                      : Colors.pink.shade100,
                                  width: 1.5,
                                ),
                                boxShadow: [
                                  BoxShadow(
                                    color: Colors.grey.withValues(alpha: 0.1),
                                    blurRadius: 4,
                                    offset: const Offset(0, 1),
                                  ),
                                ],
                              ),
                              child: ListTile(
                                leading: CircleAvatar(
                                  backgroundColor: isEven
                                      ? Colors.blue.shade100
                                      : Colors.pink.shade100,
                                  child: Text(
                                    '${index + 1}',
                                    style: TextStyle(
                                      color: isEven
                                          ? Colors.blue.shade800
                                          : Colors.pink.shade800,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                                title: Text(
                                  item['product']!,
                                  style: const TextStyle(
                                    fontWeight: FontWeight.w600,
                                    fontSize: 16,
                                  ),
                                ),
                                subtitle: Text(
                                  'Quantidade: ${item['quantity']}',
                                  style: TextStyle(
                                    color: Colors.grey.shade700,
                                    fontWeight: FontWeight.w500,
                                  ),
                                ),
                                trailing: IconButton(
                                  onPressed: () => _removeItem(index),
                                  icon: const Icon(
                                    Icons.delete_outline,
                                    color: Colors.red,
                                  ),
                                  tooltip: 'Remover item',
                                  style: IconButton.styleFrom(
                                    backgroundColor: Colors.red.shade50,
                                    padding: const EdgeInsets.all(8),
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                      if (_shoppingItems.isNotEmpty)
                        Container(
                          padding: const EdgeInsets.all(16),
                          child: ElevatedButton.icon(
                            onPressed: _clearAllItems,
                            icon: const Icon(Icons.delete, size: 22),
                            label: const Text(
                              'Limpar Lista',
                              style: TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: Colors.red.shade600,
                              foregroundColor: Colors.white,
                              minimumSize: const Size(double.infinity, 55),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                              elevation: 2,
                            ),
                          ),
                        ),
                    ],
                  ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _productController.dispose();
    _quantityController.dispose();
    super.dispose();
  }
}
