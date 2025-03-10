import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'AddRecipe'>;

const AddRecipeScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [difficulty, setDifficulty] = useState('Facile');

  const difficulties = ['Facile', 'Moyen', 'Difficile'];

  const saveRecipe = async () => {
    if (!name.trim() || !ingredients.trim() || !instructions.trim() || !prepTime.trim()) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    try {
      const newRecipe = {
        id: Date.now().toString(),
        name,
        ingredients: ingredients.split('\n'),
        instructions,
        prepTime: parseInt(prepTime),
        difficulty,
        createdAt: new Date().toISOString(),
      };

      const existingRecipes = await AsyncStorage.getItem('customRecipes');
      const recipes = existingRecipes ? JSON.parse(existingRecipes) : [];
      recipes.push(newRecipe);

      await AsyncStorage.setItem('customRecipes', JSON.stringify(recipes));
      Alert.alert('Succès', 'Recette ajoutée avec succès', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Erreur', "Impossible d'enregistrer la recette");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.field}>
          <Text style={styles.label}>Nom de la recette *</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Ex: Spaghetti Carbonara"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ingrédients *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Un ingrédient par ligne"
            multiline
            numberOfLines={4}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Instructions *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={instructions}
            onChangeText={setInstructions}
            placeholder="Étapes de préparation"
            multiline
            numberOfLines={6}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Temps de préparation (minutes) *</Text>
          <TextInput
            style={styles.input}
            value={prepTime}
            onChangeText={setPrepTime}
            placeholder="Ex: 30"
            keyboardType="numeric"
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Difficulté</Text>
          <View style={styles.difficultyContainer}>
            {difficulties.map((diff) => (
              <TouchableOpacity
                key={diff}
                style={[
                  styles.difficultyButton,
                  difficulty === diff && styles.difficultyButtonActive,
                ]}
                onPress={() => setDifficulty(diff)}>
                <Text
                  style={[
                    styles.difficultyButtonText,
                    difficulty === diff && styles.difficultyButtonTextActive,
                  ]}>
                  {diff}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={saveRecipe}>
          <Text style={styles.submitButtonText}>Ajouter la recette</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 16,
  },
  field: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  difficultyButton: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#DC2626',
    borderColor: '#DC2626',
  },
  difficultyButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#DC2626',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddRecipeScreen;