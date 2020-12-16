import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Drizzle} from '@drizzle/store';
import {drizzleReactHooks} from '@drizzle/react-plugin';

import {BrowserRouter} from 'react-router-dom';

import LoadingDrizzle from 'components/Custom/LoadingDrizzle';
import StyleLayout from 'components/Base/StyleLayout';
import Routes from './navigation/Routes';
import drizzleOptions from './drizzleOption';
import {store} from './store/index';

import 'bootstrap/dist/css/bootstrap.min.css';


const drizzle = new Drizzle(drizzleOptions);
const {DrizzleProvider} = drizzleReactHooks;

import 'assets/fonts/fonts.css'
// console.log('store', store.getState());

ReactDOM.render(
    <DrizzleProvider drizzle={drizzle}>
        <Provider store={store}>
            <StyleLayout>
                <LoadingDrizzle>
                    <BrowserRouter>
                        <Routes/>
                    </BrowserRouter>
                </LoadingDrizzle>
            </StyleLayout>
        </Provider>
    </DrizzleProvider>,

    document.getElementById('root'),
);
