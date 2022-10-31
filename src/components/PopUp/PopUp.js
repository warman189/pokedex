import React from "react";
import typeColors from "../services/typeColors";
import "./PopUp.css";

const PopUp = ({ data }) => {
  const formatStatName = (statName) => {
    switch (statName) {
      case "hp":
        return "HP";
      case "attack":
        return "ATK";
      case "defense":
        return "DEF";
      case "special-attack":
        return "SATK";
      case "special-defense":
        return "SDEF";
      case "speed":
        return "SPD";
      default:
        return statName;
    }
  };

  const hideProfile = () => {
    const modalWindow = document.querySelector(".popUp_wrapper");
    modalWindow.classList.remove("popUp_wrapper_show");
    modalWindow.classList.add("popUp_wrapper_hide");

    const globalContent = document.querySelector(".wrapper_container");
    globalContent.style.filter = "brightness(100%)";
    globalContent.style.overflowY = "scroll";
    globalContent.style.pointerEvents = "auto";
  };

  return (
    <>
      {!data ? (
        ""
      ) : (
        <>
          <div className="popUp_wrapper">
            <div
              className="character_info"
              style={{ background: typeColors[data.types[0].type.name] }}
            >
              <div className="character_header">
                <div className="character_nav">
                  <img
                    className="backBtn"
                    alt="back_ico"
                    src={require("./images/nav-btns/arrow-leftClose.png")}
                    onClick={hideProfile}
                  />
                </div>
                <div className="character_name">
                  <h1 className="name_text">
                    {data.name[0].toUpperCase() + data.name.slice(1)}
                  </h1>
                </div>
                <div className="character_id">
                  <p className="id_text">
                    #{data.id.toString().padStart(3, "0")}
                  </p>
                </div>
              </div>

              <div className="character_template">
                <img
                  src={data.sprites.other["official-artwork"].front_default}
                  alt="Pokemon"
                  className="temp_img"
                />
              </div>

              <div className="character_nav_btns">
                <span
                  className="arrow_left"
                  style={{
                    position: "absolute",
                    left: 36,
                    top: 190,
                    cursor: "pointer",
                  }}
                >
                  <img
                    src={require("./images/nav-btns/arrow-left.png")}
                    alt="logo_arrow"
                    className="prev"
                    style={{ width: 8, height: 16 }}
                  ></img>
                </span>
                <span
                  className="arrow_right"
                  style={{
                    position: "absolute",
                    right: 36,
                    top: 190,
                    cursor: "pointer",
                    zIndex: 1,
                  }}
                >
                  <img
                    src={require("./images/nav-btns/arrow-right.png")}
                    alt="logo_arrow"
                    className="next"
                    style={{ width: 8, height: 16 }}
                  ></img>
                </span>
              </div>

              <div className="character_background">
                <img
                  src={require("./images/Pokeball_Invisible.png")}
                  alt="pokeboll_image"
                  className="background_image"
                />
              </div>

              <div className="character_main">
                <div className="character_types">
                  {data.types.map((type, i) => {
                    return (
                      <>
                        <span
                          className="type"
                          style={{
                            backgroundColor: typeColors[type.type.name],
                          }}
                          key={i}
                        >
                          <p className="type_text">
                            {type.type.name[0].toUpperCase() +
                              type.type.name.slice(1)}
                          </p>
                        </span>
                      </>
                    );
                  })}
                </div>
                <div className="character_about_tittle">
                  <h1
                    className="about_text"
                    style={{ color: typeColors[data.types[0].type.name] }}
                  >
                    About
                  </h1>
                </div>
                <div className="character_about">
                  <div className="character_weight">
                    <span className="char_weight">
                      <img
                        src={require("./images/Weight.png")}
                        alt="weight_image_"
                        className="weight_image"
                      />
                      <p className="weight_text">{`${data.weight / 10}`} kg</p>
                    </span>
                    <p className="weight_">Weight</p>
                  </div>
                  <hr
                    style={{ height: 48, order: 0, background: "#E0E0E0" }}
                  ></hr>
                  <div className="character_height">
                    <span className="character_height_">
                      <img
                        src={require("./images/Height.png")}
                        alt="height_image_"
                        className="height_image"
                      />
                      <p className="height_text">{`${data.height / 10}`} m</p>
                    </span>
                    <p className="height_">Height</p>
                  </div>
                  <hr
                    style={{ height: 48, order: 1, background: "#E0E0E0" }}
                  ></hr>
                  <div className="character_moves">
                    {data.abilities.map((poke, i) => {
                      return (
                        <>
                          <h3 className="character_move" key={i}>
                            {poke.ability.name}
                          </h3>
                        </>
                      );
                    })}
                    <p className="character_move_tittle">Moves</p>
                  </div>
                </div>
                <div className="character_text">
                  <p className="character_"></p>
                </div>
                <div className="character_stats_tittle">
                  <h1
                    className="stats_tittle"
                    style={{ color: typeColors[data.types[0].type.name] }}
                  >
                    Base Stats
                  </h1>
                </div>
                <div className="character_stats">
                  <div
                    className="character_stats_txt"
                    style={{ color: typeColors[data.types[0].type.name] }}
                  >
                    {data.stats.map((stat, i) => {
                      return (
                        <>
                          <p key={i}>{formatStatName(stat.stat.name)}</p>
                        </>
                      );
                    })}
                  </div>
                  <hr style={{ height: 100 }}></hr>
                  <div className="character_stats_num">
                    {data.stats.map((stat, i) => {
                      return (
                        <>
                          <p className="stats_num" key={i}>
                            {stat.base_stat.toString().padStart(3, "0")}
                          </p>
                        </>
                      );
                    })}
                  </div>
                  <div className="character_stats_range">
                    {data.stats.map((stat, i) => {
                      return (
                        <>
                          <div className="progressBar" key={i}>
                            <div
                              className="progressBarFill"
                              style={{
                                background: typeColors[data.types[0].type.name],
                                width: stat.base_stat,
                              }}
                            ></div>
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PopUp;
