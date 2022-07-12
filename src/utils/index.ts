import { getPreferenceValues } from "@raycast/api";
import pokemons from "../statics/pokemons.json";

const { style } = getPreferenceValues();

const formMap: { [key: string]: string } = {
  gmax: "gigantamax",
  alola: "alolan",
  galar: "galarian",
  hisui: "hisuian",
};

export function getImage(id: number, additional?: string | number) {
  const pokemon = pokemons.find((p) => p.id === id);

  switch (style) {
    case "home":
      return additional
        ? `https://img.pokemondb.net/sprites/home/normal/${
            pokemon && pokemon.icon_name
          }-${formMap[additional] || additional}.png`
        : `https://img.pokemondb.net/sprites/home/normal/${
            pokemon && pokemon.home_name
          }.png`;
    case "icon":
      return additional
        ? `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${
            pokemon && pokemon.icon_name
          }-${additional}.png`
        : `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${
            pokemon && pokemon.icon_name
          }.png`;
    default:
      return additional
        ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
            pokemon && pokemon.id.toString().padStart(3, "0")
          }_f${Number(additional) + 1}.png`
        : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${
            pokemon && pokemon.id.toString().padStart(3, "0")
          }.png`;
  }
}
