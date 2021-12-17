import React, { useState, useEffect } from "react";
import Axios from "axios";

import Card from "./components/Card";

import CardHeader from "./components/PokemonDetailsCard/CardHeader";
import CardBody from "./components/PokemonDetailsCard/CardBody";
import CardImage from "./components/PokemonDetailsCard/CardImage";
import CardDescription from "./components/PokemonDetailsCard/CardDescription";
import CardTypesSize from "./components/PokemonDetailsCard/CardTypesSize";
import CardStats from "./components/PokemonDetailsCard/CardStats";
import CardMoves from "./components/PokemonDetailsCard/CardMoves";

import List from "./components/PokemonListCard/List";
import ListButtons from "./components/PokemonListCard/ListButtons";

import "./App.css";

function App() {
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=40"
  );
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [pokemonSelected, setPokemonSelected] = useState(false);

  const [pokemonName, setPokemonName] = useState([]);

  const [pokemon, setPokemon] = useState({
    pokemonName: "",
    pokemonId: "",
    pokeFrontImage: "",
    pokemonDescriptionOne: "",
    pokemonDescriptionTwo: "",
    pokemonWeight: "",
    pokemonHeight: "",
    pokemonHp: "",
    pokemonAttack: "",
    pokemonDefense: "",
    pokemonTypeOne: "",
    pokemonTypeTwo: "",
    pokemonMoveOne: "",
    pokemonMoveTwo: "",
    pokemonMoveThree: "",
  });

  const capitalize = (str) => str[0].toUpperCase() + str.substr(1);

  useEffect(() => {
    let cancel;
    Axios.get(currentPageUrl, {
      cancelToken: new Axios.CancelToken((c) => (cancel = c)),
    }).then((res) => {
      const { results, previous, next } = res.data;

      setPrevUrl(previous);
      setNextUrl(next);

      let nameArry = [];

      for (let i = 0; i < results.length; i++) {
        const resultData = results[i];

        if (resultData) {
          const { name, url } = resultData;
          const urlArray = url.split("/");
          const id = urlArray[urlArray.length - 2];
          //capitalize(name);

          nameArry.push(`${id}. ${capitalize(name)}`);
        } else {
          nameArry.push("null");
        }
      }

      setPokemonName(nameArry);
    });
    return () => cancel();
  }, [currentPageUrl]);

  const fetchPokeDetails = async (id) => {
    let desc1 = "";
    let desc2 = "";

    const descriptionResponse = await Axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    

    if(descriptionResponse.status === 404) {
      desc1 = "No Description";
      desc2 = "";
      return Promise.reject("error 404");
    }
    
    const description = await descriptionResponse.data;
    
    const flavourTextEntries = description["flavor_text_entries"];

        for (const flavourText of flavourTextEntries) {
          if (flavourText["language"]["name"] === "en") {
            const descriptionArray = flavourText["flavor_text"].split(".");
            desc1 = JSON.stringify(descriptionArray[0]).replace(
              /\\n|\\f|\\|"/g,
              " "
            );
            desc2 = JSON.stringify(descriptionArray[1]).replace(
              /\\n|\\f|\\|"/g,
              " "
            );

            break;
          }
        }
      
      

        const detailsResponse = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        
        const details = await detailsResponse.data;
        
        
      const dataImage =
      details["sprites"]["other"]["dream_world"]["front_default"];
      const dataSprite = details["sprites"]["front_default"];

      const strWeight = JSON.stringify(details["weight"]);
      let strWeightRes = strWeight.slice(0, -1) + "." + strWeight.slice(-1);

      const strHeight = JSON.stringify(details["height"]);
      let strHeightRes = strHeight.slice(0, -1) + "." + strHeight.slice(-1);

      setPokemon({
        pokemonName: capitalize(details["name"]),
        pokemonId: details["id"].toString().padStart(3, "0"),
        pokeFrontImage: dataImage ? dataImage : dataSprite,
        pokemonDescriptionOne: desc1,
        pokemonDescriptionTwo: desc2,
        pokemonWeight: strWeightRes,
        pokemonHeight: strHeightRes,
        pokemonHp: details["stats"][0]["base_stat"],
        pokemonAttack: details["stats"][1]["base_stat"],
        pokemonDefense: details["stats"][2]["base_stat"],
        pokemonTypeOne: capitalize(details["types"][0]["type"]["name"]),
        pokemonTypeTwo: details["types"][1]
          ? details["types"][1]["type"]["name"]
          : "",
        pokemonMoveOne: details["moves"][0]
          ? details["moves"][0]["move"]["name"]
          : "",
        pokemonMoveTwo: details["moves"][1]
          ? details["moves"][1]["move"]["name"]
          : "",
        pokemonMoveThree: details["moves"][2]
          ? details["moves"][2]["move"]["name"]
          : "",
      });
  };
  

  const gotoNextPage = () => {
    if (nextUrl) {
      setCurrentPageUrl(nextUrl);
    }
  };

  const gotoPrevPage = () => {
    if (prevUrl) {
      setCurrentPageUrl(prevUrl);
    }
  };

  const handlelistItemClick = (e) => {
    if (!e.target) {
      return;
    }

    const listItem = e.target;

    if (!listItem.textContent) {
      return;
    }

    const id = listItem.textContent.split(".")[0];

    setPokemonSelected(true);

    fetchPokeDetails(id);
  };

  return (
    <div className="App">
      <main className="container">
        <Card
          cname={`pokemon-card ${pokemonSelected ? "show" : "hide"}  ${
            pokemon.pokemonTypeOne
              ? pokemon.pokemonTypeOne.toLowerCase()
              : "hide"
          }`}
        >
          <CardHeader {...pokemon} />
          <CardBody>
            <CardImage {...pokemon} />
            <CardDescription {...pokemon} />
            <CardTypesSize {...pokemon} />
            <CardStats {...pokemon} />
            <CardMoves {...pokemon} />
          </CardBody>
        </Card>

        <Card cname={`pokemon-list`}>
          <h1>Pokemon List</h1>
          <List
            pokemonName={pokemonName}
            handlelistItemClick={handlelistItemClick}
          />
          <ListButtons
            gotoNextPage={nextUrl ? gotoNextPage : null}
            gotoPrevPage={prevUrl ? gotoPrevPage : null}
          />
        </Card>
      </main>
    </div>
  );
}

export default App;
