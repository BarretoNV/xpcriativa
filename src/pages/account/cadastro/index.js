import React from 'react';
import './styles.scss';
import InputMask from "react-input-mask";

function cadastro() {
    return (
        <div className="cadastroBody">
            <section>
                <form>
                    <input type="text" placeholder="Nome Completo:"></input>
                    <input type="text" placeholder="Email:"></input>
                    <input type="text" placeholder="Celular:"></input>
                    <input type="password" placeholder="Senha:"></input>
                    <InputMask mask="99/99/9999" maskPlaceholder="-" placeholder="Data de nascimento:"/>
                    <select name="Gênero">
                        <option disabled selected value=''>Gênero</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <select name="Eu sou">
                        <option disabled selected value=''>Eu sou</option>
                        <option value="Feminino">Feminino</option>
                        <option value="Masculino">Masculino</option>
                        <option value="Outro">Outro</option>
                    </select>
                    <button type="button" onclick="">Cadastrar</button>
                </form>
            </section>
        </div>
    )
}

export default cadastro;