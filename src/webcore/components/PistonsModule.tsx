import * as React from "react";
import { Switch, Route } from "react-router";
import { PistonList } from "webcore/components/PistonList";

export class PistonsModule extends React.Component {
    public render() {
        return (
            <Switch>
                <Route path="/pistons" exact component={PistonList} />
            </Switch>
        );
    }
}
