import { Button, DialogActions, DialogContent, DialogContentText, TextField } from "@material-ui/core";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction, ActionCreators } from "webcore/actions";
import { ModalWindow } from "webcore/components/ModalWindow";
import { ApplicationState } from "webcore/store";
import { isSome, get } from "../utils/option";
import { Redirect } from "react-router";

const mapState = (state: ApplicationState) => ({
    code: state.ui.registration.registrationCode,
    password: state.ui.registration.password,
    hasSubmitted: state.ui.registration.submitted,
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
    submitCode: (code: string) =>
        dispatch(ActionCreators.registerDashboardRequest(code)),
    authenticate: (baseUrl: string, password: string) =>
        dispatch(ActionCreators.authenticateRequest(baseUrl, password)),
});

class RegistrationHandler extends React.Component<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch>> {
    private readonly onClickSubmit: React.MouseEventHandler = e => {
        if (!this.props.registrationStringExists) {
            this.props.submitCode(this.props.code);
        } else if (isSome(this.props.instanceBaseUrl) && !this.props.tokenExists) {
            this.props.authenticate(get(this.props.instanceBaseUrl), this.props.password);
        }
    }

    private readonly onChange: (t: "code" | "password") => React.FormEventHandler<HTMLInputElement> = t => e => {
        this.props.update[t](e.currentTarget.value);
    }
    public render() {
        const instructionText =
            !this.props.registrationStringExists
                ? "Enter your registration code from the webCoRE SmartApp and the instance's password to get started."
                : !this.props.tokenExists
                    ? "Enter your instance's password to authenticate."
                    : undefined;

        if (!instructionText) {
            return <Redirect to="/" />;
        }

        if (!this.props.tokenExists && this.props.password.length > 0 && this.props.hasSubmitted) {
            if (isSome(this.props.instanceBaseUrl)) {
                Promise.resolve(1).then(() => this.props.authenticate(get(this.props.instanceBaseUrl), this.props.password));
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
                                onChange={this.onChange("code")}
                                inputProps={({ maxLength: 4 })} fullWidth={true}
                                label="Registration code" />
                    }
                    <TextField value={this.props.password} type="password"
                        onChange={this.onChange("password")} fullWidth={true} label="Password" />
                </DialogContent>
                <DialogActions>
                    <Button color="primary" disabled={(this.props.code.length < 4 && !this.props.registrationStringExists) || this.props.password.length < 1} onClick={this.onClickSubmit}>Submit</Button>
                </DialogActions>
            </ModalWindow>
        );
    }
}

export default connect(mapState, mapDispatch)(RegistrationHandler);
