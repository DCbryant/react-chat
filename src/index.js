import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './container/login/Login'
import Register from './container/register/Register'
import reducers from './reducers'
import AuthRoute from './components/authroute/AuthRoute'
import BossInfo from './container/bossinfo/BossInfo'
import GeniusInfo from './container/geniusinfo/GeniusInfo'
import Dashboard from './components/dashboard/Dashboard'
import Chat from './components/chat/Chat'
import './config'
import './index.css'

const reduxDevtools = window.devToolsExtension ? window.devToolsExtension() : f => f

const store = createStore(reducers,compose(
    applyMiddleware(thunk),
    reduxDevtools
))


ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                <Switch>
                    <Route path="/bossinfo" component={BossInfo} />
                    <Route path="/geniusinfo" component={GeniusInfo} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/chat/:user" component={Chat} />
                    <Route component={Dashboard}/>
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
)


