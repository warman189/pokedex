import React, { useState } from "react";
import typeColors from "../services/typeColors";
import "./Header.css";

const Header = ({ toSearch, characters, value }) => {
  const [isOpen, setIsOpen] = useState(true);

  const clickHandler = (e) => {
    toSearch(e.target.textContent);
    setIsOpen(!isOpen);
  };
  const inputClickHandler = () => {
    setIsOpen(true);
  };

  const onClickRefreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="header_wrapper">
      <div className="header_container">
        <div
          className="header_tittle"
          style={{ cursor: "pointer" }}
          onClick={onClickRefreshPage}
        >
          <img
            className="tittle_logo"
            src={require("./images/pokeboll.png")}
            alt="logo"
          />
          <h1 className="tittle_logo_text">Pokédex</h1>
        </div>

        <div className="header_sort" style={{ zIndex: 1 }}>
          <span className="sort_by">
            <img
              className="sort_ico"
              src={require("./images/Property 1=Number.png")}
              alt=""
            />
          </span>
        </div>

        <div className="header_search">
          <input
            type="search"
            className="search_char"
            placeholder="Search..."
            value={value}
            onChange={(event) => toSearch(event.target.value)}
            onClick={inputClickHandler}
          />
          <ul
            style={{
              position: "absolute",
              left: 0,
              width: "100%",
              background: "#ffff",
              margin: 0,
              padding: 0,
              zIndex: 1,
              boxShadow: "1px 1px 5px rgba(0, 0, 0, 0.15)",
              maxHeight: 240,
              height: "auto",
              overflow: "auto",
              borderRadius: 12,
            }}
          >
            {value && isOpen ? (
              <>
                {characters.map((character, i) => {
                  return (
                    <li
                      key={i}
                      className="item"
                      style={{
                        padding: 10,
                        cursor: "pointer",
                        color: typeColors[character.types[0].type.name],
                      }}
                      onClick={clickHandler}
                    >
                      {character.name}
                    </li>
                  );
                })}
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
