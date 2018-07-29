import * as React from "react";
import {
    ListItem, ListItemAvatar, Avatar, ListItemText,
    ListItemSecondaryAction, IconButton,
} from '@material-ui/core';
import DeleteIcon from "@material-ui/icons/Delete";

type Piston = import("webcore/models").PistonListing;

export class PistonListItem extends React.Component<{ piston: Piston }> {
    public render() {
        const secondaryText = (p => p.metadata.statusText.case === "some" ? p.metadata.statusText.val :
                                    p.metadata.automaticStatus.case === "some" ? p.metadata.automaticStatus.val : undefined
                                )(this.props.piston)
        return (
            <ListItem>
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: `hsl(${
                        (this.props.piston.categoryId 
                            ? (this.props.piston.categoryId * 22.5) //% 360
                            : 0 )
                        },${this.props.piston.categoryId ? 100 : 0}%,42%)` }}>
                        {this.props.piston.name.split(" ").map(s => s[0].toLowerCase())}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={this.props.piston.name}
                    secondary={secondaryText} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete">
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}