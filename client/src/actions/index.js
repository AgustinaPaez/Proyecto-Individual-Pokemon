import axios from "axios";
const BACK_URL = "https://pokepage.herokuapp.com";

export function getPokemons() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BACK_URL}/pokemons`);
      return dispatch({
        type: "GET_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getTypes() {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BACK_URL}/types`);
      return dispatch({
        type: "GET_TYPES",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function postPokemon(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.post(`${BACK_URL}/pokemon/` + payload);
      return dispatch({
        type: "POST_POKEMON",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getDetail(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BACK_URL}/pokemons/` + payload);
      return dispatch({
        type: "GET_DETAIL",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getNamePokemons(payload) {
  return async function (dispatch) {
    try {
      const json = await axios.get(`${BACK_URL}/pokemons?name=` + payload);
      return dispatch({
        type: "GET_NAME_POKEMONS",
        payload: json.data,
      });
    } catch (error) {
      alert("No pokemon found with that name");
      console.log(error);
    }
  };
}

export function filterByTypes(payload) {
  return {
    type: "FILTER_BY_TYPES",
    payload,
  };
}

export function filterCreated(payload) {
  return {
    type: "FILTER_CREATED",
    payload,
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function orderByAttack(payload) {
  return {
    type: "ORDER_BY_ATTACK",
    payload,
  };
}

export function cleanDetail() {
  return {
    type: "CLEAN_DETAIL",
    payload: {},
  };
}

export function deletePokemon(id) {
  return async function (dispatch) {
    try {
      const json = await axios.delete(`${BACK_URL}/pokemons/delete/` + id);
      return dispatch({
        type: "DELETE_POKEMON",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
