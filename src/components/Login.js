import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import InputAdornment from "@material-ui/core/InputAdornment/InputAdornment";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton/IconButton";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import * as actionTypes from "../store/action-types";
import {connect} from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

const style = theme => ({
    textField: {
        width: "100%",
        marginBottom: 20
    },
    button: {
        width: "100%",
    },
    errorText: {
        marginBottom: 20
    }
});

class Login extends Component {

    state = {
        username: '',
        password: '',
        validation: {
            username: {
                valid: false,
                errorMessage: ''
            },
            email: {
                valid: false,
                errorMessage: ''
            },
            password: {
                valid: false,
                errorMessage: ''
            }
        },
        showPassword: false,
        showError: false
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleOnUsernameChange = (event) => {
        this.setState({username: event.target.value});
    };

    handleOnPasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleLogin = () => {
        this.setState({showError: false});
        this.props.onLoading();
        axios.post(process.env.REACT_APP_DOMAIN + 'auth/login', {
            username: this.state.username, password: this.state.password
        })
            .then((response) => {
                console.log(response.data);
                this.props.onLogin(response.data.access_token);
                localStorage.setItem('token', response.data.access_token);
                this.props.history.push('/home');
            })
            .catch((error) => {
                this.setState({showError: true});
                this.props.onLoginFail();
            })
    };

    render() {
        const {classes} = this.props;

        return (
            <form autoComplete="off">

                <TextField label="Username or Email"
                           variant="filled"
                           value={this.state.username}
                           onChange={this.handleOnUsernameChange}
                           className={classes.textField}/>
                <TextField label="Password" variant="filled"
                           type={this.state.showPassword ? "text" : "password"}
                           value={this.state.password}
                           onChange={this.handleOnPasswordChange}
                           className={classes.textField}
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <IconButton
                                           aria-label="toggle password visibility"
                                           onClick={this.handleClickShowPassword}
                                           color="primary"
                                       >
                                           {this.state.showPassword ? <Visibility/> : <VisibilityOff/>}
                                       </IconButton>
                                   </InputAdornment>
                               ),
                           }}/>

                {this.state.showError ?
                    <Typography
                        className={classes.errorText}
                        color="error">Invalid Username or Password</Typography>
                    : null}

                <Button variant="contained" color="primary" className={classes.button}
                        onClick={this.handleLogin}
                        disabled={this.props.isLoading}
                >Login</Button>

            </form>
        )
    }
}

const mapStateToProps = state => {
    return {
        isLoading: state.auth.isLoading
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (token) => dispatch({type: actionTypes.USER_LOADED, payload: token}),
        onLoginFail: () => dispatch({type: actionTypes.LOGIN_ERROR}),
        onLoading: () => dispatch({type: actionTypes.USER_LOADING}),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(style)(Login)));