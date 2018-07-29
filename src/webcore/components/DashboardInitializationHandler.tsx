import * as React from "react";
import { connect } from "react-redux";
import { AppAction, ActionCreators } from "../actions";
import { ApplicationState } from "../store";

import { Route, RouteComponentProps, withRouter, Switch, Redirect } from "react-router";
import { Dispatch } from "redux";
import RegistrationHandler from "./RegistrationHandler";
import { isNone, isSome } from "../utils/option";
import LoadingOverlay from "./LoadingOverlay";

const mapState = (state: ApplicationState) => ({
    hasInstanceUri: state.auth.instanceUri.case === "some",
    hasToken: state.auth.token.case === "some",

    hasRemoteInstance: state.instance.case === "some",
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
    loadDashboard: () => dispatch(ActionCreators.loadDashboardDataRequest()),
});

export type IDashboardProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps<any>;

class DashboardInitializationHandler extends React.Component<IDashboardProps> {
    public render() {
        if (this.props.hasInstanceUri && this.props.hasToken && !this.props.hasRemoteInstance) {
            this.props.loadDashboard();
        }

        return (
            <Switch>
                <Route path={"/dashboard/register"} component={RegistrationHandler} />
                {
                    !this.props.hasInstanceUri
                        ? <Redirect push to="/dashboard/register" />
                        : !this.props.hasRemoteInstance ? <LoadingOverlay /> : <Redirect to="/" from="/dashboard" exact />
                }
            </Switch>
        );
    }
}

export default withRouter(connect(mapState, mapDispatch)(DashboardInitializationHandler));
