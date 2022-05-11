import React from 'react';
import {Route, BrowserRouter} from 'react-router-dom';

import { Home } from './pages/account/home/index.js';
import { Cadastro } from './pages/account/cadastro/index.js';
import { Login } from './pages/account/login/index.js';
import { Feed } from './pages/feed/index.js';
import { Descobrir } from './pages/descobrir/index.js';
import { Chat } from './pages/chat/index.js';
import { VerMelhor } from './pages/verMelhor/index.js';
import { Profile } from './pages/profile/index.js';

const Routes = () => {
    return (
        <BrowserRouter>

            <Route component={Home} path='/' exact />
            <Route component={Cadastro} path='/cadastro' exact />
            <Route component={Login} path='/login' exact />
            <Route component={Feed} path='/feed' exact />
            <Route component={Descobrir} path='/descobrir' exact />
            <Route component={Chat} path='/chat' exact />
            <Route component={VerMelhor} path='/verMelhor' exact />
            <Route component={Profile} path='/profile' exact />

        </BrowserRouter>
    )
}

export default Routes;