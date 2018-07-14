import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction } from "webcore/actions";
import { ApplicationState } from "webcore/store";

const mapState = (state: ApplicationState) => ({
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
});

class AppFrame extends React.Component<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>> {
    private readonly containerStyle: React.CSSProperties = {
    };

    public render() {
        return (
            <div style={this.containerStyle}>
                // HEADER
                // dashboard
            </div>
        );
    }
}

export default connect(mapState, mapDispatch)(AppFrame);
