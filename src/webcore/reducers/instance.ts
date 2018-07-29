import { reduce } from "./core";
import defaults from "../store/defaults";
import { some } from "../utils/option";
import { mappers } from '../models/mapper';

export default reduce(defaults.instance, (state, init, mutate) => ({
    "ASYNC/response": action => {
        if (action.operation === "API/dashboard-load") {
            return some({
                categories: action.response.instance.settings.categories.map(c => mappers.category.toLocal(c)),
                pistonsIndex: action.response.instance.pistons.map(mappers.piston.toLocal),
            })
        }
        else {
            return state;
        }
    }
}));
