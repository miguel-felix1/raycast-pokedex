import {
  Action,
  ActionPanel,
  getPreferenceValues,
  Grid,
  Icon,
} from "@raycast/api";
import { useMemo, useState } from "react";
import groupBy from "lodash.groupby";
import PokemonDetail from "./components/detail";
import TypeDropdown from "./components/type_dropdown";
import { getImage } from "./utils";

import pokemons from "./statics/pokemons.json";

const { style } = getPreferenceValues();

export default function SearchPokemon() {
  const [type, setType] = useState<string>("all");

  const listing = useMemo(() => {
    return type != "all"
      ? pokemons.filter((p) => p.types.includes(type))
      : pokemons;
  }, [type]);

  return (
    <Grid
      throttle
      searchBarPlaceholder="Search Pokémon by name or number..."
      searchBarAccessory={
        <TypeDropdown type="grid" command="Pokémon" onSelectType={setType} />
      }
      itemSize={style === "icon" ? Grid.ItemSize.Small : Grid.ItemSize.Medium}
    >
      {Object.entries(groupBy(listing, "generation")).map(
        ([generation, pokemonList]) => {
          return (
            <Grid.Section title={generation} key={generation}>
              {pokemonList.map((pokemon) => {
                return (
                  <Grid.Item
                    key={pokemon.id}
                    content={getImage(pokemon.id)}
                    title={pokemon.name}
                    subtitle={`#${pokemon.id.toString().padStart(3, "0")}`}
                    keywords={[pokemon.id.toString(), pokemon.name]}
                    actions={
                      <ActionPanel>
                        <Action.Push
                          title="Show Details"
                          icon={Icon.Sidebar}
                          target={<PokemonDetail id={pokemon.id} />}
                        />
                      </ActionPanel>
                    }
                  />
                );
              })}
            </Grid.Section>
          );
        }
      )}
    </Grid>
  );
}
