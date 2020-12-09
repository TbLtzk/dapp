import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store/index';
import drizzleOptions from './drizzleOption';
import {Drizzle} from "@drizzle/store";
import {drizzleReactHooks} from "@drizzle/react-plugin";

import {BrowserRouter} from 'react-router-dom';

import App from './App';
import LoadingDrizzle from 'components/Custom/LoadingDrizzle';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const drizzle = new Drizzle(drizzleOptions);
const {DrizzleProvider} = drizzleReactHooks;

// console.log('drizzle', drizzle);

ReactDOM.render(
    <DrizzleProvider drizzle={drizzle}>
        <Provider store={store}>
            <LoadingDrizzle>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </LoadingDrizzle>
        </Provider>
    </DrizzleProvider>,

    document.getElementById('root')
);

