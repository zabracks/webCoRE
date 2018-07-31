import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { Dispatch } from "redux";
import { AppAction, ActionCreators } from "../actions";
import DashboardInitializationHandler from "./DashboardInitializationHandler";
import { ApplicationState } from "../store";
import AppFrame from "./AppFrame";
import { hot } from "react-hot-loader";

interface IApplicationProps {}

const mapState = (state: ApplicationState) => ({
    instance: state.instance.case === "some" ? state.instance.val : undefined,
    isAuthenticated: state.auth.instanceUri.case === "some" && state.auth.token.case === "some",
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
    doPing: () => dispatch(ActionCreators.ping()),
});

class ApplicationComponent extends React.Component<IApplicationProps & ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>> {
    public static timer: Promise<NodeJS.Timer>;

    public render() {
        if (!ApplicationComponent.timer) {
            ApplicationComponent.timer =
                Promise
                    .resolve(this.props.doPing())
                    .then(_ => setInterval(this.props.doPing, 60000));
        }

        if (!this.props.instance) {
            return <DashboardInitializationHandler />;
        }

        return (
            <Switch>
                <Route path="/dashboard" component={DashboardInitializationHandler} />
                <Route path="/" component={AppFrame} />

                <Route render={() => <Redirect to="/" /> } />
            </Switch>
        );
    }
}

export const Application = hot(module)(connect(mapState, mapDispatch)(ApplicationComponent));
