import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import React from 'react';
import PokemonCard from './PokemonCard';
import { initial } from 'lodash';
const PokemonList = (props) => {
  const { pokemons, loadPokemons, isNext } = props;
  const loadMore = () => {
    loadPokemons();
  };
  return (
    <FlatList
      data={pokemons}
      renderItem={({ item }) => <PokemonCard pokemon={item} />}
      keyExtractor={(pokemon) => pokemon.id}
      numColumns={2}
      contentContainerStyle={styles.flatListContentContainer}
    />
    // <FlatList
    //   data={pokemons}
    //   numColumns={2}
    //   showsVerticalScrollIndicator={false}
    //   keyExtractor={(pokemon) => String(pokemon.id)}
    //   renderItem={({ item }) => <PokemonCard pokemon={item} />}
    //   contentContainerStyle={styles.flatListContentContainer}
    //   onEndReached={isNext && loadMore}
    //   onEndReachedThreshold={0.1}
    //   ListFooterComponent={
    //     isNext && (
    //       <ActivityIndicator
    //         size="large"
    //         style={styles.spinner}
    //         color="#AEAEAE"
    //       />
    //     )
    //   }
    // />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    height: '70%',
    paddingHorizontal: 5,
    marginTop: Platform.OS === 'android' ? 30 : 0,
  },
  spinner: {
    marginTop: 20,
    marginBottom: Platform.OS === 'android' ? 90 : 60,
  },
});

export default PokemonList;
