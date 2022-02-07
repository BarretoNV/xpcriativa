import React from "react";
import "./styles.scss";
import Sidebar from "../../components/barralateral";
import IMAGES from "../../images/images.js";

function descobrir() {
  return (
    <div className="descobrirBody">
      <Sidebar />
      <section className="descobrirSection">
        <div className="searchAndTags">
          <div className="searchBar">
            <img src={IMAGES.Lupa} alt="Lupa" />
            <input type="text" placeholder=""></input>
          </div>
        </div>
        <div className="postBody">
          <div className="postOwner">
            <img src={IMAGES.ProfilePic} alt="Profile Pic" />
            <div className="ownerInfo">
              <h1>@NOME</h1>
              <h2>Professora</h2>
            </div>
          </div>
          <div className="postContent">
            <p>lorem ipsum dolor sit amet, consectet</p>
            <img src={IMAGES.ExamplePic} alt="example pic" />
          </div>
          <div className="postInteractions">
            <div className="postReactions">
              <button type="button">
                <img src={IMAGES.HeartIcon} alt="heart icon" />
              </button>
              <p>20</p>
              <button type="button">
                <img src={IMAGES.CommentIcon} alt="comment icon" />
              </button>
              <p>20</p>
              <button type="button">
                <img src={IMAGES.SaveIcon} alt="save icon" />
              </button>
              <p>20</p>
            </div>
            <div className="postType">
              <img src={IMAGES.HashIcon} alt="hash icon" />
              <h3>Já testei!</h3>
            </div>
          </div>
          <div className="postComments">
            <p>
              <b>@NOME:</b> Amet duis sit cillum est. Consectetur amet excepteur
              enim dolor quis et do nisi enim. Eiusmod culpa amet eu laboris
              deserunt. Sit exercitation sunt id est ex ut laboris.
            </p>
          </div>
          <div className="leaveComment">
            <img src={IMAGES.ProfilePic} alt="ProfilePic" />
            <input type="text" placeholder="Deixe um comentário" />
          </div>
        </div>

      </section>
    </div>
  );
}

export default descobrir;
