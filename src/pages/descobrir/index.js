import React from "react";
import "./styles.scss";
import Sidebar from "../../components/barralateral";
import IMAGES from "../../images/images.js";
import { PostBody } from "../../components/Post";

export function Descobrir() {
  return (
    <div className="descobrirBody">
      <Sidebar />
      <section className="descobrirSection">
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

        <PostBody />
        
      </section>
    </div>
  );
}