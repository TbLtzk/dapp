import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';

import drizzleOptions from './drizzleOption';
import {Drizzle, generateStore} from "@drizzle/store";
import {drizzleReactHooks} from "@drizzle/react-plugin";

import {store} from './store/index';

import App from './App';
import LoadingDrizzle from 'components/Custom/LoadingDrizzle';
import UserData from 'components/Custom/UserData';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const drizzle = new Drizzle(drizzleOptions);
const {DrizzleProvider} = drizzleReactHooks;

ReactDOM.render(
    <DrizzleProvider drizzle={drizzle}>
        <Provider store={store}>
            {/*<LoadingDrizzle>*/}
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            {/*</LoadingDrizzle>*/}
        </Provider>
    </DrizzleProvider>,

    document.getElementById('root')
);

// ReactDOM.render(
//     <DrizzleProvider drizzle={drizzle}>
//         <LoadingDrizzle children={"Testing"}/>
//         <UserData />
//         {/*<Provider store={store}>*/}
//         {/*    <BrowserRouter>*/}
//         {/*        <App/>*/}
//         {/*    </BrowserRouter>*/}
//         {/*</Provider>*/}
//     </DrizzleProvider>,
//
//     document.getElementById('root')
// );
