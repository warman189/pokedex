import React from "react";
import typeColors from "../services/typeColors";
import "./Main.css";

const Main = ({ character, infoCharacter }) => {

  const showInfo = () => {
    const modalWindow = document.querySelector(".popUp_wrapper");
    modalWindow && modalWindow.classList.add("popUp_wrapper_show");

    const globalContent = document.querySelector(".wrapper_container");
    globalContent.style.filter = "brightness(50%)";
    globalContent.style.overflow = "hidden";
    globalContent.style.pointerEvents = "none";
  };

  return (

    <div
      className="character_box"
      key={character.id}
      onClick={() => {
        infoCharacter(character);
        showInfo();
      }}
      style={{ borderColor: typeColors[character.types[0].type.name] }}
    >
      <div className="character_id">
        <p
          className="inner_id"
          style={{ color: typeColors[character.types[0].type.name] }}
        >
          #{character.id.toString().padStart(3, "0")}
        </p>
      </div>


      <div className="character_renders">
        <img
          src={character.sprites.other["official-artwork"].front_default}
          alt="char_img"
          className="character_image"
        />
      </div>


      <div
        className="character_name"
        style={{ background: typeColors[character.types[0].type.name] }}
      >
        <h1 className="character_text">
          {character.name[0].toUpperCase() + character.name.slice(1)}
        </h1>
      </div>


    </div>
  );
};

export default Main;
