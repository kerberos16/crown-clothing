import { compose, legacy_createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// import { loggerMiddleware } from './middleware/logger';

import logger from 'redux-logger';

import { rootReducer } from './root-reducer';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(Boolean); // pass in loggerMiddleware if you want to use customer middleware instead

const composeEnhancer =
    (process.env.NODE_ENV !== 'production' &&
        window &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
    compose;

const composedEnhancers = composeEnhancer(applyMiddleware(...middleWares));

// root-reducer

export const store = legacy_createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store)