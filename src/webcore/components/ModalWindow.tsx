import { Dialog, DialogTitle } from "@material-ui/core";
import * as React from "react";

export interface IButton {

}

interface IModalWindowProps {
    title?: string;
    open: boolean;
}

export class ModalWindow extends React.Component<IModalWindowProps> {

    public render() {
        return (
            <Dialog open={this.props.open}>
                {this.props.title ? <DialogTitle>{this.props.title}</DialogTitle> : null}
                {this.props.children}
            </Dialog>
        );
    }
}
