import {LoginReducer} from './reducer/loginReducer'
import {dietReducer} from './reducer/dietReducer'
import {itemReducer} from './reducer/itemReducer'
import {applyMiddleware,createStore,compose,combineReducers} from 'redux'
import thunk from 'redux-thunk'
const initalState={

}

const reducer=combineReducers({Login:LoginReducer,Diet:dietReducer,item:itemReducer})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer,initalState,composeEnhancer(applyMiddleware(thunk)));
export default store;