import * as React from "react";
import * as Color from "../utils/Color";

interface OverlayProps {
    color: Color.Color;
}

class Overlay extends React.Component<OverlayProps> {
    private rgbColor = Color.asRgb(this.props.color);

    private readonly overlayStyle: React.CSSProperties = {
        position: "fixed",
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: Color.toCssColorString(this.rgbColor),
    };

    public render() {
        return (
            <div style={this.overlayStyle}>
                {this.props.children}
            </div>
        );
    }
}
/*

<div style="position: fixed; padding: 0px; margin: 0px; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgb(1, 1, 1);">Loading</div>
*/

export default Overlay;
