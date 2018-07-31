import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { AppAction, ActionCreators } from "../actions";
import { ApplicationState } from "../store";
import { createStyles, Theme, withStyles, WithStyles, AppBar, Toolbar, IconButton, Typography, Hidden, Drawer, Divider, List, ListItem, ListItemIcon, ListItemText, Icon } from "@material-ui/core";
import { Switch, Route, Redirect, withRouter, RouteComponentProps } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import { WebcoreLogo } from "./WebcoreLogo";
import { icons } from "../utils/theme";
import { MainMenuItem } from "./MainMenuItem";
import { PistonsModule } from "./PistonsModule";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "./LoadingSpinner";
import { AppBarButtonSet } from "./AppBarButtonSet";

const mapState = (state: ApplicationState) => ({
    sidebarOpen: state.ui.sidebarOpen,
    asyncLoading: state.async.asyncActions.length > 0,
});

const mapDispatch = (dispatch: Dispatch<AppAction>) => ({
    toggleSidebar: () => dispatch(ActionCreators.toggleSidebar()),
});

const drawerWidth = 240;
const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: "hidden",
        position: "relative",
        display: "flex",
        width: "100%",
    },
    appBar: {
        position: "absolute",
        marginLeft: drawerWidth,
        [theme.breakpoints.up("md")]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },
    },
    navIconHide: {
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
    dividerShow: {
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    toolbar: Object.assign({}, {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    }, theme.mixins.toolbar),
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up("md")]: {
            position: "relative",
        },
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
});

class AppFrame extends React.Component<ReturnType<typeof mapState> & ReturnType<typeof mapDispatch> & WithStyles<typeof styles> & RouteComponentProps<any>> {
    public handleDrawerToggle = () => {
        this.props.toggleSidebar();
    }

    public render() {
        const { classes, theme } = this.props;

        const drawer = (
            <div>
                <div className={classes.toolbar}>
                    <Link to="/">
                        <WebcoreLogo maxWidth={drawerWidth - 40} />
                    </Link>
                </div>
                <Divider className={classes.dividerShow} />
                <List>
                    <MainMenuItem linkTo="/pistons" text="Pistonsb" icon={icons.Piston} />
                </List>
            </div>
        );

        return (
            <div className={classes.root}>
                <AppBar position="absolute" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle} >
                            <MenuIcon />
                        </IconButton>

                        <Typography variant="title" color="inherit" noWrap style={{ flexGrow: 1 }}>
                            <Switch>
                                <Route path="/pistons" render={() => "Pistons"} />
                            </Switch>
                        </Typography>

                        {
                            this.props.asyncLoading
                                ? <LoadingSpinner  size={40} />
                                : null
                        }

                        <AppBarButtonSet />
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        anchor={theme && theme.direction === "rtl" ? "right" : "left"}
                        open={this.props.sidebarOpen}
                        onClose={this.handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden smDown implementation="css">
                    <Drawer
                        variant="permanent"
                        open
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <Switch>
                        <Route path="/pistons" component={PistonsModule} />

                        <Redirect path="/" exact to="/pistons" push />

                    </Switch>
                </main>
            </div>
        );
    }
}

export default withRouter(connect(mapState, mapDispatch)(withStyles(styles)(AppFrame)));
