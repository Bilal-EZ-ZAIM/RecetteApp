import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddRecipeScreen = () => {
  const [recipe, setRecipe] = useState({
    name: '',
    ingredients: '',
    steps: '',
    category: '',
    preparationTime: '',
    difficulty: '',
  });

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem('recipes');
      if (storedRecipes) {
        setRecipes(JSON.parse(storedRecipes));
      }
    } catch (error) {
      console.error('Erreur de chargement des recettes:', error);
    }
  };

  const handleSaveRecipe = async () => {
    if (
      !recipe.name ||
      !recipe.ingredients ||
      !recipe.steps ||
      !recipe.category
    ) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }

    const newRecipes = [...recipes, recipe];

    try {
      await AsyncStorage.setItem('recipes', JSON.stringify(newRecipes));
      setRecipes(newRecipes);
      Alert.alert('Succès', 'Recette ajoutée avec succès.');

      // تفريغ الحقول بعد الحفظ
      setRecipe({
        name: '',
        ingredients: '',
        steps: '',
        category: '',
        preparationTime: '',
        difficulty: '',
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement:", error);
    }
  };

  const handleDeleteRecipe = async index => {
    const updatedRecipes = recipes.filter((_, i) => i !== index);
    try {
      await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
      setRecipes(updatedRecipes);
      Alert.alert('Succès', 'Recette supprimée avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.label}>Nom de la recette:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nom de la recette"
          value={recipe.name}
          onChangeText={text => setRecipe({...recipe, name: text})}
        />

        <Text style={styles.label}>Ingrédients:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 2 œufs, 200g de farine..."
          value={recipe.ingredients}
          onChangeText={text => setRecipe({...recipe, ingredients: text})}
          multiline
        />

        <Text style={styles.label}>Étapes:</Text>
        <TextInput
          style={styles.input}
          placeholder="Expliquer les étapes de préparation..."
          value={recipe.steps}
          onChangeText={text => setRecipe({...recipe, steps: text})}
          multiline
        />

        <Text style={styles.label}>Catégorie:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Pizza, Desserts..."
          value={recipe.category}
          onChangeText={text => setRecipe({...recipe, category: text})}
        />

        <TouchableOpacity style={styles.button} onPress={handleSaveRecipe}>
          <Text style={styles.buttonText}>Enregistrer la recette</Text>
        </TouchableOpacity>

        <Text style={styles.title}>📌 Liste des recettes</Text>
        <FlatList
          data={recipes}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.recipeCard}>
              <Text style={styles.recipeName}>{item.name}</Text>
              <Text style={styles.recipeCategory}>
                Catégorie: {item.category}
              </Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteRecipe(index)}>
                <Text style={styles.deleteButtonText}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {flexGrow: 1, paddingBottom: 20},
  container: {flex: 1, padding: 20, backgroundColor: '#fff'},
  label: {fontSize: 16, fontWeight: 'bold', marginTop: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#DC2626',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  title: {fontSize: 18, fontWeight: 'bold', marginTop: 20},
  recipeCard: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  recipeName: {fontSize: 16, fontWeight: 'bold'},
  recipeCategory: {fontSize: 14, color: '#555'},
  deleteButton: {
    marginTop: 10,
    backgroundColor: '#DC2626',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButtonText: {color: '#fff', fontSize: 14, fontWeight: 'bold'},
});

export default AddRecipeScreen;
