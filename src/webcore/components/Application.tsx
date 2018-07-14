import * as React from "react";
import { connect } from "react-redux";
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router";
import { Dispatch } from "redux";
import { AppAction } from "webcore/actions";
import Dashboard from "webcore/components/Dashboard";
import { ApplicationState } from "webcore/store";

const mapState = (state: ApplicationState) => ({
    currentPath: window.location.pathname,
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
});

class ApplicationComponent extends React.Component<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps<any>> {
    public render() {
        return (
            <div>
                <Switch>
                    <Redirect from="/" exact to="/dashboard" />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route render={() => <h1>404</h1>} />
                </Switch>
            </div>
        );
    }
}

export default withRouter(connect(mapState, mapDispatch)(ApplicationComponent));
