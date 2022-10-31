import React, { useState, useEffect } from "react";
import { getAllCharacters, getCharacters  } from "./services/api";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopUp from "../components/PopUp/PopUp";

const Data = () => {
  const [characterData, setCharacterData] = useState([]);
  const [characterInfo, setCharacterInfo] = useState();
  const [characterValue, setCharacterValue] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 48;
  const characterUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  useEffect(() => {
    async function fetchData() {
      const response = await getAllCharacters(characterUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      loadingCharacter(response.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllCharacters(nextUrl);
    await loadingCharacter(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllCharacters(prevUrl);
    await loadingCharacter(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingCharacter = async (data) => {
    let _character = await Promise.all(
      data.map(async (character) => {
        let characterRecord = await getCharacters(character.url);
        return characterRecord;
      })
    );
    setCharacterData(_character);
  };

  const charactersFilter = characterData.filter((char) => {
    return char.name.toLowerCase().includes(characterValue.toLowerCase());
  });

  return (
    <div className="wrapper">
      <PopUp data={characterInfo} />
      <div className="wrapper_container">
        <Header
          toSearch={setCharacterValue}
          characters={charactersFilter}
          value={characterValue}
        />
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            {charactersFilter.map((character, i) => {
              return (
                <Main
                  key={i}
                  character={character}
                  infoCharacter={(char) => setCharacterInfo(char)}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default Data;
