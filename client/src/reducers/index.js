const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_TYPES":
      return {
        ...state,
        types: action.payload,
      };
    case "FILTER_BY_TYPES":
      const allPokemonsTypes = state.allPokemons;
      const typesFilter =
        action.payload === "All"
          ? allPokemonsTypes
          : allPokemonsTypes.filter((e) => e.types.includes(action.payload));
      return {
        ...state,
        pokemons: typesFilter,
      };
    case "GET_NAME_POKEMONS":
      return {
        ...state,
        pokemons: action.payload,
      };
    case "GET_DETAIL":
      return {
        ...state,
        detail: action.payload,
      };
    case "FILTER_CREATED":
      const allPokemonsOrigen = state.allPokemons;
      const createdFilter =
        action.payload === "created"
          ? allPokemonsOrigen.filter((e) => e.createdInDb)
          : allPokemonsOrigen.filter((e) => !e.createdInDb);
      return {
        ...state,
        pokemons: action.payload === "All" ? state.allPokemons : createdFilter,
      };
    case "ORDER_BY_NAME":
      let sortArr =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
          : state.pokemons.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        pokemons: action.payload === "none" ? state.allPokemons : sortArr,
      };
    case "ORDER_BY_ATTACK":
      let arrSort =
        action.payload === "asc"
          ? state.pokemons.sort((a, b) => a.attack - b.attack)
          : state.pokemons.sort((a, b) => b.attack - a.attack);
      return {
        ...state,
        pokemons: arrSort,
      };
    default:
      return state;
  }
}

export default rootReducer;
