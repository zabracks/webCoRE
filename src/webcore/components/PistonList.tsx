import * as React from "react";
import { List, createStyles, Theme, WithStyles, withStyles, ListSubheader,
} from "@material-ui/core";
import { connect } from "react-redux";
import {PistonListItem} from "webcore/components/PistonListItem";

class PistonListItemCategory extends React.Component<{ category: import ("webcore/models").Category; pistons: Array<import ("webcore/models").PistonListing> }> {
    private readonly liStyle = {
        backgroundColor: "inherit",
    };
    private readonly ulStyle = {
        backgroundColor: "inherit",
        padding: 0,
    };

    public render() {
        return (
            <li key={this.props.category.categoryId} style={this.liStyle}>
                <ul style={this.ulStyle}>
                    <ListSubheader>{this.props.category.name}</ListSubheader>
                    {this.props.pistons.map(p =>
                        <PistonListItem key={p.pistonId} piston={p} />,
                    )}
                </ul>
            </li>
        );
    }
}

const mapState = (state: import ("../store").ApplicationState) => ({
    categories: state.instance.case === "some" ? state.instance.val.categories : [],
    pistons: state.instance.case === "some" ? state.instance.val.pistonsIndex : [],
});

const mapDispatch = (dispatch: import ("redux").Dispatch<import ("../actions").AppAction>) => ({

});

const pistonListStyles = (theme: Theme) => createStyles({
    root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        position: "relative",
        overflow: "auto",
    },
});

class PistonListComponent extends React.Component<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & WithStyles<typeof pistonListStyles>> {
    private static readonly uncategorizedCategory = {
        categoryId: -1,
        name: "Uncategorized",
        display: {
            hidden: false,
            details: true,
        },
    };

    private static readonly inactiveCategory = {
        categoryId: -2,
        name: "Inactive",
        display: {
            hidden: false,
            details: true,
        },
    };

    public render() {
        const activePistons = this.props.pistons.filter(p => p.metadata.active);
        const inactivePistons = this.props.pistons.filter(p => !activePistons.includes(p));

        return (
            <List dense className={this.props.classes.root} subheader={<li />}>
                {
                    this.props.categories.map(category =>
                        <PistonListItemCategory
                            key={category.categoryId}
                            category={category}
                            pistons={ activePistons.filter(p => p.categoryId === category.categoryId) } /> )
                }
                <PistonListItemCategory key="uncategorized"
                                        category={PistonListComponent.uncategorizedCategory}
                                        pistons={activePistons.filter(p => !p.categoryId)} />
                <PistonListItemCategory key="inactive"
                                        category={PistonListComponent.inactiveCategory}
                                        pistons={inactivePistons} />
            </List>
        );
    }
}

export const PistonList = connect(mapState, mapDispatch)(withStyles(pistonListStyles)(PistonListComponent));
