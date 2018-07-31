import { createMuiTheme } from "@material-ui/core";
import {trimDef} from "webcore/utils";
import SettingsIcon from "@material-ui/icons/Settings";

export const icons = {
    Piston: SettingsIcon,
};

export type Icon = typeof icons[keyof typeof icons];

export const theme = async () => createMuiTheme({
    palette: {
        primary: await import("@material-ui/core/colors/blue").then(trimDef),
    },
});
