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
    hasInstanceUri: isSome(state.auth.instanceUri),
    hasToken: isSome(state.auth.token),

    remoteInstance: state.instance.remoteState,
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
    loadDashboard: () => dispatch(ActionCreators.loadDashboardDataRequest()),
});

export type IDashboardProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps<any>;

class Dashboard extends React.Component<IDashboardProps> {
    public render() {
        if (this.props.hasInstanceUri && this.props.hasToken && isNone(this.props.remoteInstance)) {
            this.props.loadDashboard();
        }

        return (
            <Switch>
                <Route path={this.props.match.url + "/register"} component={RegistrationHandler} />
                {
                    !this.props.hasInstanceUri
                        ? <Redirect to="/dashboard/register" />
                        : <Route path="/">
                            {
                                isNone(this.props.remoteInstance) ? <LoadingOverlay /> :
                                <div>
                                    Dashboard
                                </div>
                            }
                          </Route>
                }

            </Switch>
        );
    }
}

export default withRouter(connect(mapState, mapDispatch)(Dashboard));
