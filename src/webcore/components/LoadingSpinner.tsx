import { createStyles, withStyles } from "@material-ui/core";
import * as React from 'react';
import * as Icons from "@material-ui/icons";

interface LoadingSpinnerProps {
    size?: number;
}

const spinnerStyles = ({ palette, spacing }: import("@material-ui/core").Theme) => createStyles({
    spinner: {
        animation: "spin 2s linear infinite",
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

class LoadingSpinnerComponent extends React.Component<import("@material-ui/core").WithStyles<typeof spinnerStyles> & LoadingSpinnerProps> {
    private spinnerStyle: React.CSSProperties = {
        width: this.props.size || 100,
        height: this.props.size || 100
    }
    
    public render() {
        return (
                <Icons.Cached className={this.props.classes.spinner} style = {this.spinnerStyle} />
        );
    }

}
export const LoadingSpinner = withStyles(spinnerStyles)(LoadingSpinnerComponent);