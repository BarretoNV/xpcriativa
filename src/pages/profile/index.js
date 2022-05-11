import React, { useState, useEffect } from "react";

import { Logoff } from '../../utils/signOut';

import "./styles.scss";
import Sidebar from "../../components/barralateral";
import IMAGES from "../../images/images.js";

export function Profile() {

  const [userIsLogged, setUserIsLogged] = useState(false);

  if (userIsLogged) {

    return (

      <div className="profileBody">
      <Sidebar />
      <section className="profileSection">
        <div className="profileMain">
          <main>
            <div className="profileInfos">
              <div class="profileResume">
                <img src={IMAGES.ProfilePic} alt="Profile Icon" />
                <div class="nameAndWork">
                  <h2>@NOME</h2>
                  <h3>Professora</h3>
                </div>
              </div>
              <div className="profileDescription">
                <p>
                  Professora na Escola Guadiões da Galáxia. Apaixonada por
                  livros e ideias criativas. #DIY #thinkoutsidethebox
                </p>
              </div>
            </div>
            <div className="profileFollows">
              <p>XX seguidores</p>
              <p>XX seguindo</p>
            </div>

            <button onClick={() => Logoff()}>Sair da conta</button>

          </main>
        </div>
        <div className="profilePosts">
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
                <b>@NOME:</b> Amet duis sit cillum est. Consectetur amet
                excepteur enim dolor quis et do nisi enim. Eiusmod culpa amet eu
                laboris deserunt. Sit exercitation sunt id est ex ut laboris.
              </p>
            </div>
            <div className="leaveComment">
              <img src={IMAGES.ProfilePic} alt="ProfilePic" />
              <input type="text" placeholder="Deixe um comentário" />
            </div>
          </div>
        </div>
      </section>
    </div>
      
    )
  } else {

    return null;

  }

}