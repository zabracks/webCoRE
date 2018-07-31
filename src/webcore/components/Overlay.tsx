import * as React from "react";
import * as Color from "../utils/Color";

interface OverlayProps {
    color: Color.Color;
}

class Overlay extends React.Component<OverlayProps> {
    private readonly rgbColor = Color.asRgb(this.props.color);

    private readonly flexContainerStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    };

    private readonly overlayStyle: React.CSSProperties = Object.assign({}, {
        position: "fixed",
        padding: 0,
        margin: 0,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: Color.toCssColorString(this.rgbColor),
    }, this.flexContainerStyle);

    private readonly itemStyle: React.CSSProperties = Object.assign({}, this.flexContainerStyle, {
        maxWidth: "50%",
    } as React.CSSProperties);

    private readonly preContentStyle: React.CSSProperties = Object.assign({}, this.itemStyle, {
        alignSelf: "flex-start",
    });

    private readonly postContentStyle: React.CSSProperties = Object.assign({}, this.itemStyle, {
        alignSelf: "flex-end",
    });

    public render() {
        return (
            <div style={this.overlayStyle}>
                <div style={this.preContentStyle} />
                <div style={this.itemStyle}>
                    {this.props.children}
                </div>
                <div style={this.postContentStyle} />
            </div>
        );
    }
}
/*

<div style="position: fixed; padding: 0px; margin: 0px; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgb(1, 1, 1);">Loading</div>
*/

export default Overlay;
