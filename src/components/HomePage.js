import React, {Component} from "react";
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import ExitToApp from '@material-ui/icons/ExitToApp';
import {withStyles} from '@material-ui/core/styles';
import * as actionTypes from "../store/action-types";
import {connect} from 'react-redux';
import axios from 'axios';
import {withTheme} from '@material-ui/core/styles';
import {MuiThemeProvider} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Dashboard from '@material-ui/icons/Dashboard';
import AddBox from '@material-ui/icons/AddBox';
import Search from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import {Route, Switch} from 'react-router-dom';
import MyCourse from './course/MyCourses';
import CreateCourse from "./course/CreateCourse";
import DashboardComponent from "./dashboard/Dashboard";
import SearchComponent from "./search/Search";
import EditCourse from "./course/EditCourse";
import SlideShow from "./course/SlideShow";
import {UPDATE_TOOLBAR_TITLE} from "../store/action-types";

const drawerWidth = 240;

const style = theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    logout: {
        position: 'absolute',
        right: theme.spacing(2),
    }
});

class HomePage extends Component {

    state = {
        open: false,
        page: 'Dashboard'
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + 'profile', {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            this.props.onUserUpdate(response.data);
        });
    }

    handleDrawerOpen = () => {
        // setOpen(true);
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        // setOpen(false);
        this.setState({open: false});
    };

    handleOnLogout = () => {
        this.props.onLogout();
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        this.props.history.push('/');
        this.props.updateTitle('Dashboard');
    };

    render() {
        const {classes} = this.props;

        return (
            /*<div>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Card>
                        <CardContent>
                            {this.props.user !== null ? <p>{this.props.user.userId}</p> : null}
                            {this.props.user !== null ? <p>{this.props.user.username}</p> : null}
                            <TextField variant="filled"/>
                        </CardContent>
                    </Card>
                </Grid>
                <Fab color="primary"
                     aria-label="add"
                     className={classes.fab}
                     onClick={this.handleOnLogout}>
                    <ExitToApp/>
                </Fab>
            </div>*/
            <div className={classes.root}>
                <CssBaseline/>
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: this.state.open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: this.state.open,
                            })}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            {this.props.toolbarTitle}
                        </Typography>
                        <Button
                            variant="outlined"
                            color="inherit"
                            onClick={this.handleOnLogout}
                            className={classes.logout}
                            endIcon={<ExitToApp/>}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: this.state.open,
                        [classes.drawerClose]: !this.state.open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: this.state.open,
                            [classes.drawerClose]: !this.state.open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.props.theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </div>
                    {this.state.open ?
                        <div>
                            <Divider/>
                            <div style={{padding: 15}}>
                                {this.props.user !== null ?
                                    <div>
                                        <Typography variant="h5">{this.props.user.username}</Typography>
                                        <Typography>{this.props.user.email}</Typography>
                                    </div>
                                    : null}
                            </div>
                        </div>
                        : null}

                    <Divider/>
                    <List>
                        <ListItem button onClick={() => {
                            this.props.history.push('/home');
                            this.props.updateTitle('Dashboard');
                        }}>
                            <ListItemIcon><Dashboard/></ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            this.props.history.push('/home/course');
                            this.props.updateTitle('Course');
                        }}>
                            <ListItemIcon><img src={require('../assest/img/course.png')}/></ListItemIcon>
                            <ListItemText primary="Course"/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            this.props.history.push('/home/search');
                            this.props.updateTitle('Search');
                        }}>
                            <ListItemIcon><Search/></ListItemIcon>
                            <ListItemText primary="Search"/>
                        </ListItem>
                        <ListItem button onClick={() => {
                            this.props.history.push('/home/create-course');
                            this.props.updateTitle('Create Course');
                        }}>
                            <ListItemIcon><AddBox/></ListItemIcon>
                            <ListItemText primary="Create Course"/>
                        </ListItem>
                    </List>
                    <Divider/>

                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar}/>
                    <Switch>
                        <Route path={this.props.match.url + '/course/edit/:id'} component={EditCourse}/>
                        <Route path={this.props.match.url + '/course/:id'} component={SlideShow}/>
                        <Route path={this.props.match.url + '/course'} component={MyCourse}/>
                        <Route path={this.props.match.url + '/search'} component={SearchComponent}/>
                        <Route path={this.props.match.url + '/create-course'} component={CreateCourse}/>
                        <Route path={this.props.match.url} component={DashboardComponent}/>
                    </Switch>
                </main>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
        toolbarTitle: state.root.toolbarTitle,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch({type: actionTypes.LOGOUT_SUCCESS}),
        onUserUpdate: (user) => dispatch({type: actionTypes.UPDATE_USER, payload: user}),
        updateTitle: (title) => dispatch({type: UPDATE_TOOLBAR_TITLE, payload: title}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(withTheme(HomePage)));