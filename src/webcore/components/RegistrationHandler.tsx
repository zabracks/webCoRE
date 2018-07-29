import { Button, DialogActions, DialogContent, DialogContentText, TextField } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction, ActionCreators } from "../actions";
import { ModalWindow } from "./ModalWindow";
import { ApplicationState } from "../store";
import { isSome, get } from "../utils/option";
import { Redirect, RouteComponentProps, withRouter } from "react-router";

const mapState = (state: ApplicationState) => ({
    code: state.ui.registration.registrationCode,
    password: state.ui.registration.password,
    hasSubmitted: !!state.async.asyncActions.find(a => ["API/dashboard-register", "API/authenticate"].includes(a.operation)),
    instanceBaseUrl: state.auth.instanceUri,
    registrationStringExists: isSome(state.auth.instanceUri),
    tokenExists: isSome(state.auth.token),
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
    update: {
        code: (code: string) => {
            dispatch(ActionCreators.registrationCodeChange(code));
        },
        password: (password: string) => {
            dispatch(ActionCreators.passwordFieldChange(password));
        },
    },
    submitCodeAndAuthenticate: (code: string) =>
        dispatch(ActionCreators.registerDashboardRequest(code)),
    authenticate: (baseUrl: string, password: string) =>
        dispatch(ActionCreators.authenticateApiRequest(baseUrl, password)),
});

type RegistrationHandlerProps = ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & RouteComponentProps<any>;

class RegistrationHandler extends React.Component<RegistrationHandlerProps> {
    private readonly onClickSubmit: React.MouseEventHandler = e => {
        if (!this.props.registrationStringExists) {
            this.props.submitCodeAndAuthenticate(this.props.code);
        } else if (!this.props.tokenExists) {
            this.props.authenticate(get(this.props.instanceBaseUrl), this.props.password);
        }
    }

    private readonly onChange: (t: "code" | "password") => React.FormEventHandler<HTMLInputElement> = t => e => {
        this.props.update[t](e.currentTarget.value);
    }

    public componentDidUpdate(oldProps: RegistrationHandlerProps) {
        if (oldProps.hasSubmitted && !this.props.hasSubmitted) {
            // We just finished an API call
            if (!oldProps.registrationStringExists && this.props.registrationStringExists && this.props.password.length > 0) {
                // We have successfully finished registration and still have a password remaining
                if (!this.props.tokenExists) {
                    // We haven't authenticated yet.
                    this.props.authenticate(get(this.props.instanceBaseUrl), this.props.password);
                }
            }
        }
    }

    public render() {
        const instructionText =
            !this.props.registrationStringExists
                ? "Enter your registration code from the webCoRE SmartApp and the instance's password to get started."
                : !this.props.tokenExists
                    ? "Enter your instance's password to authenticate."
                    : undefined;

        if (!instructionText) {
            return <Redirect push from="/dashboard/register" to="/" />;
        }

        if (!this.props.tokenExists && this.props.password.length > 0 && this.props.hasSubmitted) {
            if (this.props.registrationStringExists) {
                Promise.resolve().then(() => this.props.authenticate(get(this.props.instanceBaseUrl), this.props.password));
            }
        }

        return (
            <ModalWindow title="Register a New Instance" open={true}>
                <DialogContent>
                    <DialogContentText>{instructionText}</DialogContentText>
                    {
                        this.props.registrationStringExists ? null :
                            <TextField value={this.props.code}
                                autoFocus type="text"
                                disabled={this.props.hasSubmitted}
                                onChange={this.onChange("code")}
                                inputProps={({ maxLength: 4 })} fullWidth={true}
                                label="Registration code" />
                    }
                    <TextField value={this.props.password} type="password" disabled={this.props.hasSubmitted}
                        onChange={this.onChange("password")} fullWidth={true} label="Password" />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={(this.props.code.length < 4 && !this.props.registrationStringExists) || this.props.password.length < 1 || this.props.hasSubmitted} onClick={this.onClickSubmit}>Submit</Button>
                </DialogActions>
            </ModalWindow>
        );
    }
}

export default withRouter(connect(mapState, mapDispatch)(RegistrationHandler));
