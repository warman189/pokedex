import React, { useState, useEffect } from "react";
import { getAllCharacters, getCharacters, searchCharacter } from "./services/api";
import Header from "../components/Header/Header";
import Main from "../components/Main/Main";
import PopUp from "../components/PopUp/PopUp";

const Data = () => {
  const [characterData, setCharacterData] = useState([]);
  const [characterInfo, setCharacterInfo] = useState();
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const limit = 21;
  const characterUrl = `https://pokeapi.co/api/v2/pokemon?limit=${limit}`;

  useEffect(() => {
    async function fetchData() {
      const response = await getAllCharacters(characterUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      const character = loadingCharacter(response.results);
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

  const onSearchHandler = async (character) => {
    if (!character) return getAllCharacters();
    setLoading(true);
    const result = await searchCharacter(character);
    if (!result) {
      setLoading(true);
    } else {
      setCharacterData([result]);
    }
    setLoading(false);
  };

  return (
    <div className="wrapper">
      <PopUp data={characterInfo} />
      <div className="wrapper_container">
        <Header onSearch={onSearchHandler} />
        <span
          style={{
            position: "absolute",
            display: "flex",
            background:
              "linear-gradient(270deg, rgba(29, 29, 29, 0) 0.04%, rgb(202 202 202 / 40%) 99.5%)",
            width: "7%",
            height: "145%",
            left: 0,
            top: 0,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={prev}
        >
          <img
            src={require("./PopUp/images/arrow.png")}
            alt=""
            style={{
              position: "sticky",
              width: 8,
              height: 16,
              top: "calc(50% - 30px/2)",
              left: -7,
              transform: "rotate(180deg)",
            }}
          ></img>
        </span>
        <span
          style={{
            position: "absolute",
            display: "flex",
            background:
              "linear-gradient(90deg, rgba(29, 29, 29, 0) 0.04%, rgb(202 202 202 / 40%) 99.5%)",
            width: "7%",
            height: "145%",
            right: 0,
            top: 0,
            zIndex: 1,
            cursor: "pointer",
          }}
          onClick={next}
        >
          <img
            src={require("./PopUp/images/arrow.png")}
            alt=""
            style={{
              position: "sticky",
              width: 8,
              height: 16,
              top: "calc(50% - 40px/2)",
              right: -7,
            }}
          ></img>
        </span>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            {characterData.map((character, i) => {
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
