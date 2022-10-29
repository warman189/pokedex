import React, { useState } from "react";
import "./Header.css";

const Header = (props) => {
  const [search, setSearch] = useState("");
  const { onSearch } = props;

  const handleSearch = (e) => {
    setSearch(e.target.value.toLowerCase());
    if (e.target.value === 0) {
      onSearch(undefined);
    }
  };

  const onButtonClickHandle = (e) => {
    e.preventDefault();
    onSearch(search);
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
          <form onSubmit={onButtonClickHandle}>
            <input
              type="search"
              className="search_char"
              placeholder="Search..."
              onChange={handleSearch}
              spellCheck={"false"}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Header;
