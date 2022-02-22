import React from "react";
import "./styles.scss";
import Sidebar from "../../components/barralateral";
import IMAGES from "../../images/images.js";

function VerMelhor() {
  return (
    <div className="verMelhorBody">
      <Sidebar />
      <section className="verMelhorSection">
        <div className="searchAndTags">
          <div className="searchBar">
            <button>
              <img src={IMAGES.Lupa} alt="Lupa" />
            </button>
            <input type="text" placeholder=""></input>
          </div>
          <div className="tagsBar">
            <a href="/">#TAGNAME</a>
            <a href="/">#TAGNAME</a>
            <a href="/">#TAGNAME</a>
            <a href="/">#TAGNAME</a>
          </div>
        </div>
        <h1>Embed do Google</h1>
      </section>
    </div>
  );
}

export default VerMelhor;
