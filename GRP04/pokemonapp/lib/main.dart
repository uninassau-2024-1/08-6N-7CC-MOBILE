import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:math';

void main() {
  runApp(PokemonApp());
}

class PokemonApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Pokemon App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: PokemonHome(),
    );
  }
}

class PokemonHome extends StatefulWidget {
  @override
  _PokemonHomeState createState() => _PokemonHomeState();
}

class _PokemonHomeState extends State<PokemonHome> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  List<Map<String, dynamic>> _capturedPokemons = [];
  Map<String, dynamic>? _searchedPokemon;

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);
  }

  @override
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  void addCapturedPokemon(Map<String, dynamic> pokemon) {
    setState(() {
      _capturedPokemons.add(pokemon);
    });
  }

  void setSearchedPokemon(Map<String, dynamic> pokemon) {
    setState(() {
      _searchedPokemon = pokemon;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Pokemon App'),
        bottom: TabBar(
          controller: _tabController,
          tabs: [
            Tab(text: 'Buscar'),
            Tab(text: 'Batalhar'),
            Tab(text: 'Pokedex'),
          ],
        ),
      ),
      body: TabBarView(
        controller: _tabController,
        children: [
          PokemonSearchScreen(onCapture: (pokemon) {
            addCapturedPokemon(pokemon);
            setSearchedPokemon(pokemon);
          }),
          PokemonBattleScreen(onCapture: addCapturedPokemon, searchedPokemon: _searchedPokemon),
          PokedexScreen(capturedPokemons: _capturedPokemons),
        ],
      ),
    );
  }
}

class PokemonSearchScreen extends StatefulWidget {
  final Function(Map<String, dynamic>) onCapture;

  PokemonSearchScreen({required this.onCapture});

  @override
  _PokemonSearchScreenState createState() => _PokemonSearchScreenState();
}

class _PokemonSearchScreenState extends State<PokemonSearchScreen> {
  final TextEditingController _cepController = TextEditingController();
  String? _address;
  Map<String, dynamic>? _pokemonData;

  Future<void> _searchPokemon() async {
    String cep = _cepController.text;
    if (cep.isEmpty) {
      return;
    }

    // Buscar dados do endereço
    String addressUrl = 'https://viacep.com.br/ws/$cep/json/';
    http.Response addressResponse = await http.get(Uri.parse(addressUrl));
    if (addressResponse.statusCode == 200) {
      Map<String, dynamic> addressData = json.decode(addressResponse.body);
      setState(() {
        _address = '${addressData['logradouro']}, ${addressData['bairro']}, '
            '${addressData['localidade']}, ${addressData['uf']}';
      });

      // Gerar ID de Pokémon aleatório
      int pokemonId = Random().nextInt(100) + 1;

      // Buscar dados do Pokémon
      String pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/$pokemonId';
      http.Response pokemonResponse = await http.get(Uri.parse(pokemonUrl));
      if (pokemonResponse.statusCode == 200) {
        Map<String, dynamic> pokemonData = json.decode(pokemonResponse.body);
        setState(() {
          _pokemonData = {
            'name': pokemonData['name'],
            'image': pokemonData['sprites']['front_default'],
            'height': pokemonData['height'],
            'weight': pokemonData['weight'],
            'totalStats': pokemonData['stats'].fold(0, (sum, stat) => sum + stat['base_stat']),
            'wins': 0,
            'losses': 0,
            'ties': 0,
          };
        });

        widget.onCapture(_pokemonData!);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    // Tamanho base da imagem
    const double baseImageSize = 100.0;
    // Calcular o novo tamanho com 40% a mais
    final double newImageSize = baseImageSize * 1.4;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          TextField(
            controller: _cepController,
            decoration: InputDecoration(
              labelText: 'Digite o CEP',
              border: OutlineInputBorder(),
            ),
            keyboardType: TextInputType.number,
          ),
          SizedBox(height: 16.0),
          ElevatedButton(
            onPressed: _searchPokemon,
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.search),
                SizedBox(width: 8.0), // Espaço entre o ícone e o texto
                Text('Buscar Pokémon'),
              ],
            ),
          ),
          if (_address != null) ...[
            SizedBox(height: 16.0),
            Text('Endereço: $_address'),
          ],
          if (_pokemonData != null) ...[
            SizedBox(height: 16.0),
            Text(
              'Nome: ${_pokemonData!['name'].toUpperCase()}',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(
              width: newImageSize, // Nova largura
              height: newImageSize, // Nova altura
              child: Image.network(_pokemonData!['image']),
            ),
            Text('Habilidades: ${_pokemonData!['totalStats']}'),
            Text('Altura: ${_pokemonData!['height']}'),
            Text('Peso: ${_pokemonData!['weight']}'),
          ],
        ],
      ),
    );
  }
}

class PokemonBattleScreen extends StatefulWidget {
  final Function(Map<String, dynamic>) onCapture;
  final Map<String, dynamic>? searchedPokemon;

  PokemonBattleScreen({required this.onCapture, this.searchedPokemon});

  @override
  _PokemonBattleScreenState createState() => _PokemonBattleScreenState();
}

class _PokemonBattleScreenState extends State<PokemonBattleScreen> {
  Map<String, dynamic>? _pokemonData;

  Future<void> _loadRandomPokemon() async {
    int pokemonId = Random().nextInt(100) + 1;
    String pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/$pokemonId';
    http.Response pokemonResponse = await http.get(Uri.parse(pokemonUrl));
    if (pokemonResponse.statusCode == 200) {
      Map<String, dynamic> pokemonData = json.decode(pokemonResponse.body);
      setState(() {
        _pokemonData = {
          'name': pokemonData['name'],
          'image': pokemonData['sprites']['front_default'],
          'height': pokemonData['height'],
          'weight': pokemonData['weight'],
          'totalStats': pokemonData['stats'].fold(0, (sum, stat) => sum + stat['base_stat']),
        };
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    // Tamanho base da imagem
    const double baseImageSize = 100.0;
    // Calcular o novo tamanho com 40% a mais
    final double newImageSize = baseImageSize * 1.4;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        children: [
          ElevatedButton(
            onPressed: () async {
              await _loadRandomPokemon();
              if (_pokemonData != null && widget.searchedPokemon != null) {
                _comparePokemons();
              }
            },
            child: Row(
              mainAxisSize: MainAxisSize.min,
              children: [
                Icon(Icons.camera_alt),
                SizedBox(width: 8.0),
                Text('Ativar Câmera'),
              ],
            ),
          ),
          if (_pokemonData != null) ...[
            SizedBox(height: 16.0),
            _buildPokemonData(),
          ],
        ],
      ),
    );
  }

  void _comparePokemons() {
    int totalStatsSearched = widget.searchedPokemon?['totalStats'] ?? 0;
    int totalStatsBattle = _pokemonData?['totalStats'] ?? 0;
    String resultText;
    Color resultColor;

    if (totalStatsBattle > totalStatsSearched) {
      resultText = 'Ganhou';
      resultColor = Colors.green;
    } else if (totalStatsBattle < totalStatsSearched) {
      resultText = 'Perdeu';
      resultColor = Colors.red;
    } else {
      resultText = 'Empate';
      resultColor = Colors.yellow;
    }

    setState(() {
      _pokemonData!['resultText'] = resultText;
      _pokemonData!['resultColor'] = resultColor;
    });
  }

  Widget _buildPokemonData() {
    // Tamanho base da imagem
    const double baseImageSize = 100.0;
    // Calcular o novo tamanho com 40% a mais
    final double newImageSize = baseImageSize * 1.4;

    return Column(
      children: [
        Text(
          'Nome: ${_pokemonData!['name'].toUpperCase()}',
          style: TextStyle(
            fontWeight: FontWeight.bold,
            color: _pokemonData!['resultColor'] ?? Colors.black,
          ),
        ),
        SizedBox(
          width: newImageSize, // Nova largura
          height: newImageSize, // Nova altura
          child: Image.network(_pokemonData!['image']),
        ),
        Text('Habilidades: ${_pokemonData!['totalStats']}'),
        Text('Altura: ${_pokemonData!['height']}'),
        Text('Peso: ${_pokemonData!['weight']}'),
        if (_pokemonData!['resultText'] != null) ...[
          SizedBox(height: 16.0),
          Text(
            'Resultado: ${_pokemonData!['resultText']}',
            style: TextStyle(
              fontWeight: FontWeight.bold,
              color: _pokemonData!['resultColor'],
            ),
          ),
        ],
      ],
    );
  }
}

class PokedexScreen extends StatelessWidget {
  final List<Map<String, dynamic>> capturedPokemons;

  PokedexScreen({required this.capturedPokemons});

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      padding: const EdgeInsets.all(16.0),
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16.0,
        mainAxisSpacing: 16.0,
      ),
      itemCount: capturedPokemons.length,
      itemBuilder: (context, index) {
        final pokemon = capturedPokemons[index];
        final battleResults = _calculateBattleResults(pokemon, capturedPokemons);

        return Card(
          child: Padding(
            padding: const EdgeInsets.all(8.0),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  pokemon['name'].toUpperCase(),
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                Image.network(pokemon['image'], height: 100.0, width: 100.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Text(
                      'V: ${battleResults['wins']}',
                      style: TextStyle(color: Colors.green),
                    ),
                    Text(
                      'D: ${battleResults['losses']}',
                      style: TextStyle(color: Colors.red),
                    ),
                    Text(
                      'E: ${battleResults['ties']}',
                      style: TextStyle(color: Colors.yellow),
                    ),
                  ],
                ),
              ],
            ),
          ),
        );
      },
    );
  }

  Map<String, int> _calculateBattleResults(Map<String, dynamic> pokemon, List<Map<String, dynamic>> allPokemons) {
    int wins = 0;
    int losses = 0;
    int ties = 0;

    for (var opponent in allPokemons) {
      if (pokemon == opponent) continue;

      if (pokemon['totalStats'] > opponent['totalStats']) {
        wins++;
      } else if (pokemon['totalStats'] < opponent['totalStats']) {
        losses++;
      } else {
        ties++;
      }
    }

    return {'wins': wins, 'losses': losses, 'ties': ties};
  }
}
