import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import HomePage from './components/HomePage';
import registerServiceWorker from './registerServiceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import reducer from './store/reducer';
import authReducer from './store/authReducer';
import enrollementReducer from './store/enrollementReducer';
import slideShowReducer from './store/slideShowReducer';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import grey from "@material-ui/core/colors/grey";
import green from "@material-ui/core/colors/green";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: '#BB86FC',
        },
        secondary: {
            main: '#03DAC5'
        },
        text: {
            primary: grey[300],
            secondary: grey[500],
            hint: '#F5F5F5',
            disabled: green[200]
        }
    },
    overrides: {
        MuiFilledInput: {
            root: {
                backgroundColor: '#424242',
                // color: '#212121'
            }
        },
        // MuiInputLabel: {
        //     filled: {
        //         color: '#848484'
        //     }
        // }
    }
});

const combinedReducers = combineReducers({
    root: reducer,
    auth: authReducer,
    enrollement: enrollementReducer,
    slideShow: slideShowReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combinedReducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <MuiThemeProvider theme={theme}>
            <Switch>
                <Route path="/home" component={HomePage}/>
                <Route path="/" component={App}/>
            </Switch>
            </MuiThemeProvider>
        </Provider>
    </Router>,
    document.getElementById('root'));
registerServiceWorker();
