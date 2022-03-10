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
        allPokemons: action.payload,
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
          : allPokemonsTypes.filter((e) => e.types?.includes(action.payload));
      console.log("tipos", typesFilter);
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
        action.payload === "createdInDb"
          ? allPokemonsOrigen.filter((e) => e.createdInDb)
          : allPokemonsOrigen.filter((e) => !e.createdInDb);
      console.log("duda", createdFilter);
      return {
        ...state,
        pokemons: createdFilter,
      };
    case "ORDER_BY_NAME":
      const sortArr =
        action.payload === "All"
          ? state.allPokemons
          : action.payload === "asc"
          ? state.pokemons.sort((a, b) => a.name.localeCompare(b.name))
          : state.pokemons.sort((a, b) => b.name.localeCompare(a.name));
      console.log("nombre", sortArr);
      return {
        ...state,
        pokemons: sortArr,
      };
    case "ORDER_BY_ATTACK":
      const arrSort =
        action.payload === "All"
          ? state.allPokemons
          : action.payload === "asc"
          ? state.pokemons.sort((a, b) => a.attack - b.attack)
          : state.pokemons.sort((a, b) => b.attack - a.attack);
      console.log("fuerza", arrSort);
      return {
        ...state,
        pokemons: arrSort,
      };
    default:
      return state;
  }
}

export default rootReducer;
