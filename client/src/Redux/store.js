import {createStore, applyMiddleware, compose} from 'redux';
//funciones y objetos de la libreria redux
import reducer from './reducer';
import thunkMiddleware from 'redux-thunk'


const composeEnhacer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhacer(applyMiddleware(thunkMiddleware))); 

//El middleware "redux-thunk" permite manejar acciones asincrónicas, y 
//la extensión Redux DevTools proporciona herramientas útiles para la depuración 
//de la aplicación.


export default store