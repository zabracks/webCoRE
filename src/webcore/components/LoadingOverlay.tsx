import * as React from "react";
import Overlay from "./Overlay";
import { withStyles, Typography, Paper, withTheme } from "@material-ui/core";
import { WebcoreLogo } from "./WebcoreLogo";
import * as Color from "../utils/Color";
import { LoadingSpinner } from "./LoadingSpinner";

const loadingOverlayStyles = {};
class LoadingOverlay extends React.Component<import ("@material-ui/core").WithStyles<typeof loadingOverlayStyles> & import ("@material-ui/core").WithTheme> {
    private readonly alpha = 1;

    private readonly backgroundColor: Color.Color = Color.fromHex(this.props.theme.palette.background.default);

    public render() {
        return (
            <Overlay color={this.backgroundColor}>
                <WebcoreLogo />
                <Typography variant="subheading" style={({ alignSelf: "end", marginBottom: 25 })}>v{VERSION}</Typography>
                <LoadingSpinner />
            </Overlay>
        );
    }
}

export default withTheme()(withStyles(loadingOverlayStyles)(LoadingOverlay));
