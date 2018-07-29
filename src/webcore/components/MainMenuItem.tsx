import * as React from "react";
import { Link } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Icon } from "webcore/utils/theme";

export interface MainMenuItemProps {
    text: string;
    linkTo: string;
    icon: Icon;
}

export class MainMenuItem extends React.Component<MainMenuItemProps> {
    public render() {
        return (
            <Link to={this.props.linkTo} style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon>
                        <this.props.icon />
                    </ListItemIcon>
                    <ListItemText primary="Pistons" />
                </ListItem>
            </Link>
        );
    }
}