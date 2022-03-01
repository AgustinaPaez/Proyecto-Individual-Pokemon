const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Types } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const apiInfo = async () => {
  let arrPokemons = []; //me traigo un array de objetos que tienen la url de cada pokemon
  let arrDataPoke = [];
  let urlApi = `https://pokeapi.co/api/v2/pokemon`;
  try {
    for (let i = 0; i < 2; i++) {
      const urlData = await axios.get(urlApi);
      urlData.data.results.map((e) => {
        arrPokemons.push({
          url: e.url,
        });
      });
      urlApi = urlData.data.next;
    }
    //console.log(arrPokemons);
    //return arrPokemons;
    const arrData = arrPokemons.map(async (el) => await axios.get(el.url)); //las promesas me quedan pendientes
    //console.log(arrData);
    let infoLista = await Promise.all(arrData).then((e) => {
      const pokes = e.map((e) => e.data);
      pokes.map((p) => {
        arrDataPoke.push({
          id: p.id,
          name: p.name,
          hp: p.stats[0].base_stat,
          attack: p.stats[1].base_stat,
          defense: p.stats[2].base_stat,
          speed: p.stats[5].base_stat,
          height: p.height,
          weight: p.weight,
          image: p.sprites.front_default,
          types:
            p.types.length < 2
              ? [p.types[0].type.name]
              : [p.types[0].type.name, p.types[1].type.name],
        });
      });
      return arrDataPoke;
    });
    console.log(infoLista);
    return infoLista;
  } catch (error) {
    console.log(error);
  }
};

const dbInfo = async () => {
  const arrInfo = await Pokemon.findAll({
    include: {
      model: Types,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
  const arrLista = await arrInfo.map((d) => {
    return {
      id: d.id,
      name: d.name,
      hp: d.hp,
      attack: d.attack,
      defense: d.defense,
      speed: d.speed,
      height: d.height,
      weight: d.weight,
      image: d.image,
      types: d.types.map((el) => el.name),
    };
  });
  return arrLista;
};
const allPokemons = async () => {
  const apiPokes = await apiInfo();
  const dbPokes = await dbInfo();
  const todosPokes = apiPokes.concat(dbPokes);
  return todosPokes;
};

// router.get("/prueba", async (req, res) => {
//   const pokemonsDb = await dbInfo();
//   res.send(pokemonsDb);
// });

router.get("/pokemons", async (req, res) => {
  const infoTotal = await allPokemons();
  res.send(infoTotal);
});

router.get("/pokemons/:id", async (req, res) => {});

router.post("/pokemon", async (req, res) => {
  const {
    name,
    types,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb,
  } = req.body;
  const crearPoke = await Pokemon.create({
    name,
    image,
    hp,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDb,
  });
  let dbTypes = await Types.findAll({
    where: {
      name: types,
    },
  });
  crearPoke.addTypes(dbTypes);
  res.send("Successfully created Pokemon");
});

const allTypes = async () => {
  try {
    const typesDb = await Types.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!typesDb.length) {
      const typesApi = await axios.get(`https://pokeapi.co/api/v2/type`);
      const dataTypes = await typesApi.data.results.map((e) => e.name);
      dataTypes.map(
        async (e) =>
          await Types.findOrCreate({
            where: {
              name: e,
            },
          })
      );
      console.log(dataTypes);
      return dataTypes;
    } else {
      return typesDb.map((e) => e.name);
    }
  } catch (error) {
    console.log(error);
  }
};

router.get("/types", async (req, res) => {
  const typesAll = await allTypes();
  res.send(typesAll);
});

module.exports = router;
