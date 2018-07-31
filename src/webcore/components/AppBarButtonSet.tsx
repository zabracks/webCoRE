import * as React from "react";
import {RouteComponentProps, Switch, Route, withRouter} from "react-router";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";

class AppBarButtonSetComponent extends React.Component<RouteComponentProps<any>> {
    public render() {
        return (
            <Switch>
                <Route path="/pistons" exact render={() =>
                    <IconButton color="inherit" >
                        <Add  />
                    </IconButton>
                } />
            </Switch>
        );
    }
}

export const AppBarButtonSet = withRouter(AppBarButtonSetComponent);
