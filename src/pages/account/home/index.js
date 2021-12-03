import React from 'react';
import './styles.scss';
import LogoXP from '../../../images/Logo1.png';
import Ballons from '../../../images/ballons.png';


function Home() {
    return (
        <div className="homeBody">
            <div className="homeBackground"></div>
            <section>
                <img src={LogoXP} alt="logoXP"/>
                <nav>
                    <h1>Compartilhando ideias</h1>
                    <h2>A rede social da criatividade.</h2>
                </nav>
                <body>
                    <a className="buttonCadastro" href="/cadastro">Se inscreva aqui</a>

                    <h4>
                        Ao se inscrever, você concorda com os Termos de Serviço
                        e a Política de Privacidade, incluindo o Uso de Cookies
                    </h4>

                    <h3>Ja tem uma conta? <a href="/login">Entre</a></h3>
                </body>
                <div className="ballonsDiv">
                    <img src={Ballons} alt="Ballons" />
                </div>
            </section>
        </div>
    )
}

export default Home;