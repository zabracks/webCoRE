import CssBaseline from "@material-ui/core/CssBaseline";
// import { createHashHistory as createHistory } from 'history';
import {
    ConnectedRouter as Router, connectRouter,
    routerMiddleware,
} from "connected-react-router";
import { createBrowserHistory as createHistory } from "history";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AnyAction, applyMiddleware, createStore, Reducer, StoreEnhancer } from "redux";
import * as Persist from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import storage from "redux-persist/lib/storage";
import Application from "webcore/components/Application";
import { ActionLogMiddleware } from "webcore/middleware/ActionLogMiddleware";
import { ApiRelayMiddleware } from "webcore/middleware/ApiRelayMiddleware";
import { reducers } from "webcore/reducers";
import { ApplicationState } from "webcore/store";

const history = createHistory();

const createApplicationStore = (reducerSet: Reducer<ApplicationState, AnyAction>, middlewares: StoreEnhancer) => {
    const persistConfig: Persist.PersistConfig = {
        key: "webcore",
        storage,
        whitelist: [
            "auth",
        ],
    };

    const store = createStore(
        connectRouter(history)(
            Persist.persistReducer(persistConfig, reducerSet),
        ),
        middlewares);
    const persistor = Persist.persistStore(store);

    return { store, persistor };
};

export const init = (attachElement: HTMLElement) => {
    const middleware = [
        routerMiddleware(history),
        ApiRelayMiddleware,
        ActionLogMiddleware,
    ];

    const createdStore = createApplicationStore(reducers, applyMiddleware(...middleware));

    ReactDOM.render(
        <React.Fragment>
            <CssBaseline />
            <Provider store={createdStore.store}>
                <Router history={history}>
                    <PersistGate loading={null} persistor={createdStore.persistor}>
                        <Application />
                    </PersistGate>
                </Router>
            </Provider>
        </React.Fragment>,
        attachElement,
    );
};
