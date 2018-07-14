import { combineReducers, Reducer } from "redux";
import { ApplicationState } from "../store";

import auth from "./auth";
import ui from "./ui";
import instance from "./instance";
import location from "./location";

export const reducers: Reducer<ApplicationState> = combineReducers<ApplicationState>({
    auth,
    ui,
    instance,
    location,
});
