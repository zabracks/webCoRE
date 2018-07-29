import CssBaseline from "@material-ui/core/CssBaseline";
import {
    //ConnectedRouter as Router, connectRouter,
} from "connected-react-router";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import * as Persist from "redux-persist";
import storage from "redux-persist/lib/storage";
import { ActionLogMiddleware } from "./middleware/ActionLogMiddleware";
import { ApiRelayMiddleware } from "./middleware/ApiRelayMiddleware";
import { reducers } from "./reducers";
import { ApplicationState } from "./store";
import LoadingOverlay from "./components/LoadingOverlay";

const createApplicationStore = (reducerSet: import("redux").Reducer<ApplicationState, import("redux").AnyAction>, middlewares: import("redux").StoreEnhancer) => {
    const persistConfig: Persist.PersistConfig = {
        key: "webcore",
        storage,
        whitelist: [
            "auth",
            "instance",
        ],
    };

    const store = createStore(
        Persist.persistReducer(persistConfig, reducerSet),
        middlewares);
    const persistor = Persist.persistStore(store);

    return { store, persistor };
};

export const init = async (attachElement: HTMLElement) => {
    const initialLocationData = Object.assign({}, window.location);

    const middleware = [
        //routerMiddleware(history),
        ActionLogMiddleware,
        ApiRelayMiddleware,
    ];

    const createdStore = createApplicationStore(reducers, applyMiddleware(...middleware));

    const Application = (await import("webcore/components/Application")).Application;
    const PersistGate = (await import("redux-persist/integration/react")).PersistGate;
    const React = await import("react")
    const ReactDOM = await import("react-dom");

    const { MuiThemeProvider } = await import("@material-ui/core/styles");

    ReactDOM.render(
        <React.Fragment>
            <MuiThemeProvider theme={await (await import("./utils/theme")).theme()}  >
                <CssBaseline />
                <Provider store={createdStore.store}>
                    <PersistGate loading={<LoadingOverlay />} persistor={createdStore.persistor}>
                        <Router>
                            <Route path="/" component={Application} />
                        </Router>
                    </PersistGate>
                </Provider>
            </MuiThemeProvider>
        </React.Fragment>,
        attachElement,
    );
};
