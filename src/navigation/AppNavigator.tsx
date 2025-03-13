import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import AddRecipeScreen from '../screens/AddRecipeScreen';
import RecipeDetailScreen from '../screens/RecipeDetailScreen';
import {Text} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  RecipeDetails: {recipeId: string};
  Search: undefined;
  Favorites: undefined;
  AddRecipe: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#DC2626',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'Pepe Nero'}}
      />
      <Stack.Screen
        name="RecipeDetails"
        component={RecipeDetailScreen}
        options={({route}) => ({
          title: '', // سيتم تعيين العنوان بشكل ديناميكي في الشاشة نفسها
          headerTransparent: true,
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => {
            let iconName = '';

            if (route.name === 'Home') {
              iconName = '🏠';
            } else if (route.name === 'Favorites') {
              iconName = '❤️';
            } else if (route.name === 'AddRecipe') {
              iconName = '➕';
            }

            return <Text style={{fontSize: size, color}}>{iconName}</Text>;
          },
          tabBarActiveTintColor: '#DC2626',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{tabBarLabel: 'Accueil'}}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{
            tabBarLabel: 'Favoris',
            headerStyle: {
              backgroundColor: '#DC2626',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: 'Favoris',
            headerShown: true,
          }}
        />
        <Tab.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
          options={{
            tabBarLabel: 'Ajouter',
            headerStyle: {
              backgroundColor: '#DC2626',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: 'Ajouter une recette',
            headerShown: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
