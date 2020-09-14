import React, {Component} from 'react';
import './App.css';
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import HomePage from './components/HomePage';
import {Provider} from 'react-redux'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles, withStyles} from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as actionTypes from './store/action-types';
import Signup from './components/Signup';
import Login from './components/Login';
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import {withRouter} from 'react-router-dom'


const styles = theme => ({
    root: {
        height: "100vh",
        backgroundColor: '#121212',
        color: '#06EB3E'
    },
    card: {
        backgroundColor: grey[900],
    },
    cardContent: {
        padding: 20,
        marginTop: 20
    },
    text: {
        color: '#ededed'
    },
    toggleButton: {
        width: "50%",
        height: 55
    },
    toggleButtonSelected: {
        backgroundColor: grey[800],
        borderRadius: 0
    }
});

class App extends Component {
    render() {
        const {classes} = this.props;

        const signupSelected = this.props.show !== actionTypes.ShowForm.SHOW_SIGNUP ? classes.toggleButtonSelected : null;
        const signinSelected = this.props.show !== actionTypes.ShowForm.SHOW_SIGNIN ? classes.toggleButtonSelected : null;

        return (
            <div className={classes.root}>
                <Container>
                    <Grid
                        className={classes.root}
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} sm={8} md={6} lg={4}>
                            <Card className={classes.card}>
                                <Grid item xs={12}>
                                    <Button className={`${classes.toggleButton} ${signupSelected}`} onClick={this.props.onShowSignup}>Sign-up</Button>
                                    <Button className={`${classes.toggleButton} ${signinSelected}`} onClick={this.props.onShowSignin}>Login</Button>
                                </Grid>
                                {this.props.isLoading ? <LinearProgress variant='indeterminate' /> : null}
                                <CardContent className={classes.cardContent}>
                                    {
                                        this.props.show === actionTypes.ShowForm.SHOW_SIGNUP ?
                                            <Signup/> :
                                            <Login />
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        show: state.root.showForm,
        isLoading: state.auth.isLoading,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onShowSignup: () => dispatch({type: actionTypes.SHOW_SIGNUP_FORM}),
        onShowSignin: () => dispatch({type: actionTypes.SHOW_SIGNIN_FORM}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(App)));
