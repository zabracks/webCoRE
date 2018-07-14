import * as React from "react";
import * as Color from "webcore/utils/Color";
import Overlay from "./Overlay";
import { WithStyles, createStyles, withStyles } from "../../../node_modules/@material-ui/core";

interface LoadingOverlayProps {}

const styles = createStyles({
    spinner: {
        display: "block",
        position: "relative",
        left: "50%",
        top: "60%",
        width: "100px",
        height: "100px",
        margin: "-50 -50 0 0",
        borderRadius: "50%",
        border: "3px solid transparent",
        borderTopColor: "#0090c6",
        animation: "spin 2s linear infinite",
        "&::before": {
            content: "",
            position: "absolute",
            top: 5,
            left: 5,
            right: 5,
            bottom: 5,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#32b3e3",
            animation: "spin 3s linear infinite",
        },
        "&::after": {
            content: "",
            position: "absolute",
            top: 15,
            left: 15, 
            right: 15,
            bottom: 15,
            borderRadius: "50%",
            border: "3px solid transparent",
            borderTopColor: "#32b3e3",
            animation: "spin 1.5s linear infinite",
        },
    },
    "@keyframes spin": {
        "0%": {
            transform: "rotate(0deg)",
        },
        "100%": {
            transform: "rotate(360deg)",
        },
    },
});

class LoadingOverlay extends React.Component<LoadingOverlayProps & WithStyles<keyof typeof styles>> {
    private static backgroundColor: Color.Color = {
        alpha: 1, h: 0, s: 0, l: 0,
    };

    public render() {
        return (
            <Overlay color={LoadingOverlay.backgroundColor}>
                <div className={this.props.classes.spinner} />
            </Overlay>
        );
    }
}

export default withStyles(styles)(LoadingOverlay);
/*
@-webkit-keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
@keyframes spin {
    0%   {
        -webkit-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}*/
