const { Router } = require("express");
const axios = require("axios");
const { Pokemon, Types } = require("../db");
const db = require("../db");
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
          image: p.sprites.other.home.front_default,
          types:
            p.types.length < 2
              ? [p.types[0].type.name]
              : [p.types[0].type.name, p.types[1].type.name],
        });
      });
      return arrDataPoke;
    });
    //console.log(infoLista);
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
      createdInDb: d.createdInDb,
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

const nameApi = async (name) => {
  //aca podria hacer una logica de si me pasan un nombre que exista sino tira array vacio ver como la hago
  //let arrNamesApi = [];
  try {
    const urlApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

    let urlData = await urlApi.data;
    // console.log(urlData);

    //arrNamesApi.push({
    urlData = [
      {
        id: urlData.id,
        name: urlData.name,
        types:
          urlData.types.length < 2
            ? [urlData.types[0].type.name]
            : [urlData.types[0].type.name, urlData.types[1].type.name],
        image: urlData.sprites.other.home.front_default,
        hp: urlData.stats[0].base_stat,
        attack: urlData.stats[1].base_stat,
        defense: urlData.stats[2].base_stat,
        speed: urlData.stats[5].base_stat,
        height: urlData.height,
        weight: urlData.weight,
      },
    ];
    //});
    //console.log(urlApi);
    // if (!urlData.name && !urlData.hp) {
    //   res.send("toni");
    // }
    return urlData;
  } catch (error) {
    console.log(error);
  }
};

const nameDb = async (name) => {
  try {
    const nombreDb = await Pokemon.findAll({
      where: {
        name: name,
      },
      include: {
        model: Types,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const pokemonDb = nombreDb.map((p) => {
      return {
        id: p.id,
        name: p.name,
        types: p.types.map((e) => e.name),
        image: p.image,
        hp: p.hp,
        attack: p.attack,
        defense: p.defense,
        speed: p.speed,
        height: p.height,
        weight: p.weight,
        createdInDb: p.createdInDb,
      };
    });
    // console.log(pokemonDb);
    return pokemonDb;
  } catch (error) {
    console.log(error);
  }
};

// const allNames = async (name) => {
//   const apiNames = await nameApi(name);
//   const dbName = await nameDb(name);
//   const todosNames = dbName.concat(apiNames);
//   return todosNames; modifico para no guardar esto
// };

router.get("/pokemons", async (req, res) => {
  const { name } = req.query;
  try {
    const infoTotal = await allPokemons();
    if (name) {
      const apiName = await nameApi(name);
      if (!apiName) {
        const dbName = await nameDb(name);
        if (!dbName) {
          res.status(404).send("This pokemon does not exist"); //no me toma esto siempre me devuelve 200, me tira Error: Request failed with status code 404
        } else {
          return res.send(dbName);
        }
      } else {
        return res.send(apiName);
      }
    }
    return res.status(200).send(infoTotal);
  } catch (error) {
    console.log(error);
  }
});
// router.get("/pokemons", async (req, res) => {
//   const { name } = req.query;
//   const dataName = await allNames(name);
//   try {
//     if (name) {
//       const nombre = await dataName.filter((d) =>
//         d.name.toLowerCase().includes(name.toLowerCase())
//       );
//       //  console.log(dataName); //array con undefined
//       nombre.length
//         ? res.send(nombre)
//         : res.status(404).send("This pokemon does not exist");
//       return;
//     } else {
//       res.status(200).send(dataName);
//       return;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });
// router.get("/dogs", async (req, res) => {
//   const {name} = req.query
//   let allDogs = await getAllData();
// // console.log("ESTO ME TRAE el get de /dogs:" , allDogs)

//     if (name) {
//     try {

//     const dogName = await allDogs.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));

//        if (dogName.length) return res.status(200).send(dogName)
//         return res.status(404).send("Dog not found")
//     } catch (error) {
//     console.error(error)

// router.get("/prueba", async (req, res) => {
//   const { name } = req.query;
//   const pokemonsApi = await nameApi(name);
//   //console.log(pokemonsApi);
//   //me tira undefined si le paso uno que no existe
//   return res.send(pokemonsApi);
//   // pokemonsApi ? res.send([pokemonsApi]) : res.send([]);
// });

// router.get("/prueba", async (req, res) => {
//   const { name } = req.query;
//   const pokemonsDb = await nameDb(name);
//   return res.send(pokemonsDb);
// });

const idApi = async (id) => {
  try {
    const apiId = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const apiData = await apiId.data;
    const detail = {
      id: apiData.id,
      name: apiData.name,
      types:
        apiData.types.length < 2
          ? [apiData.types[0].type.name]
          : [apiData.types[0].type.name, apiData.types[1].type.name],
      image: apiData.sprites.other.home.front_default,
      hp: apiData.stats[0].base_stat,
      attack: apiData.stats[1].base_stat,
      defense: apiData.stats[2].base_stat,
      speed: apiData.stats[5].base_stat,
      height: apiData.height,
      weight: apiData.weight,
    };
    //console.log(detail);
    return detail;
  } catch (error) {
    console.log(error);
  }
};

const idDb = async (id) => {
  try {
    const dbPoke = await Pokemon.findByPk(id, { include: Types });
    return {
      id: dbPoke.id,
      name: dbPoke.name,
      types: dbPoke.types.map((e) => e.name),
      image: dbPoke.image,
      hp: dbPoke.hp,
      attack: dbPoke.attack,
      defense: dbPoke.defense,
      speed: dbPoke.speed,
      height: dbPoke.height,
      weight: dbPoke.weight,
      createdInDb: dbPoke.createdInDb,
    };
  } catch (error) {
    console.log(error);
  }
};

const allId = async (id) => {
  const uuid = id.includes("-");
  if (uuid) {
    const pokeDb = await idDb(id);
    return pokeDb;
  } else {
    const pokeApi = await idApi(id);
    return pokeApi;
  }
};

router.get("/pokemons/:id", async (req, res) => {
  const { id } = req.params;
  const detailApi = await allId(id);
  detailApi ? res.send(detailApi) : res.send("This pokemon was not found");
  return;
});

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
    image:
      image || "https://pokemon-project.com/espadaescudo/img/pokemon/132.png",
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
      //console.log(dataTypes);
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

//no m funciona revisar
// const eliminarPoke = async (id) => {
//   try {
//     const buscarPoke = await Pokemon.findByPk(id);
//     if (buscarPoke) {
//       await Pokemon.destroy({ where: { id: id } });
//       res.send("Successfully eliminated Pokemon");
//     } else {
//       res.send("Please, try again");
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   const pokeEliminado = await eliminarPoke(id);
//   res.send(pokeEliminado);
// });

module.exports = router;
