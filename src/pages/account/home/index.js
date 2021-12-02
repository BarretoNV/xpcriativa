import React from 'react';
import './styles.scss';

function Home() {
    return (
        <div className="homeBody">
            <section>
                <nav>
                    <h1>Compartilhando ideias</h1>
                    <h2>A rede social da criatividade.</h2>
                </nav>
                <article>
                    <a href="/cadastro">Se inscreva aqui</a>

                    <h4>
                        Ao se inscrever, você concorda com os Termos de Serviço
                        e a Política de Privacidade, incluindo o Uso de Cookies
                    </h4>

                    <h3>Ja tem uma conta? <a href="/login">Entre</a></h3>
                </article>
            </section>
        </div>
    )
}

export default Home;