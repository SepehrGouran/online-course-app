import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import * as actionTypes from "../store/action-types";
import {connect} from "react-redux";

const style = theme => ({
    textField: {
        width: "100%",
        marginBottom: 20
    },
    button: {
        width: "100%",
    }
});

class Signup extends Component {

    state = {
        username: '',
        email: '',
        password: '',
        validation: {
            username: {
                error: false,
                errorMessage: ''
            },
            email: {
                error: false,
                errorMessage: ''
            },
            password: {
                error: false,
                errorMessage: ''
            }
        },
        showPassword: false,
    };

    handleClickShowPassword = () => {
        this.setState({showPassword: !this.state.showPassword});
    };

    handleUsernameChange = (event) => {
        this.setState({username: event.target.value});
    };

    handleEmailChange = (event) => {
        this.setState({email: event.target.value});
    };

    handlePasswordChange = (event) => {
        this.setState({password: event.target.value});
    };

    handleSignup = () => {
        // validate fields
        if (this.validateFields()) {
            axios.post(process.env.REACT_APP_DOMAIN + 'auth/register', {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                enrollments: []
            }).then((response) => {
                if (response.data.username) {
                    const validation = {...this.state.validation};
                    validation.username.error = true;
                    validation.username.errorMessage = 'Username is already exist';
                    this.setState({validation: validation});
                }
                if (response.data.email) {
                    const validation = {...this.state.validation};
                    validation.email.error = true;
                    validation.email.errorMessage = 'Email is already exist';
                    this.setState({validation: validation});
                }

                if (response.data.user !== undefined) {
                    localStorage.setItem('userId', response.data.user.generated_keys[0]);
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
                }
            })
        }
    };

    validateFields = () => {
        // validate empty field
        this.setState({
            validation: {
                username: {
                    error: false
                }
            }
        });

        const validation = {...this.state.validation};
        if (this.state.username === '') {
            validation.username.error = true;
            validation.username.errorMessage = 'Username is empty';
        } else {
            validation.username.error = false;
            validation.username.errorMessage = '';
        }

        if (this.state.email === '') {
            validation.email.error = true;
            validation.email.errorMessage = 'Email is empty';
        } else if (!this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            validation.email.error = true;
            validation.email.errorMessage = 'Invalid email address';
        } else {
            validation.email.error = false;
            validation.email.errorMessage = '';
        }

        if (this.state.password === '') {
            validation.password.error = true;
            validation.password.errorMessage = 'Password is empty';
        } else if (!this.state.password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)) {
            validation.password.error = true;
            validation.password.errorMessage = 'Password must contain letters and numbers and at least 6 characters';
        } else {
            validation.password.error = false;
            validation.password.errorMessage = '';
        }

        this.setState({validation: validation});

        const username = validation.username.error;
        const email = validation.email.error;
        const password = validation.password.error;

        return !username && !email && !password;
    };

    render() {
        const {classes} = this.props;

        return (
            <form autoComplete="off">

                <TextField name="username"
                           label="Username"
                           variant="filled"
                           className={classes.textField}
                           value={this.state.username}
                           error={this.state.validation.username.error}
                           helperText={this.state.validation.username.errorMessage}
                           onChange={this.handleUsernameChange}/>
                <TextField label="Email"
                           variant="filled"
                           type="email"
                           onChange={this.handleEmailChange}
                           value={this.state.email}
                           error={this.state.validation.email.error}
                           helperText={this.state.validation.email.errorMessage}
                           className={classes.textField}/>
                <TextField label="Password"
                           variant="filled"
                           type={this.state.showPassword ? "text" : "password"}
                           onChange={this.handlePasswordChange}
                           value={this.state.password}
                           error={this.state.validation.password.error}
                           helperText={this.state.validation.password.errorMessage}
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
                <Button variant="contained"
                        color="primary"
                        onClick={this.handleSignup}
                        className={classes.button}>Sign up</Button>

            </form>
        )
    }
}

const mapStateToProps = state => {
    return {

    }
};

const mapDispatchToProps = dispatch => {
    return {
        onRegister: () => dispatch({type: actionTypes.REGISTER_SUCCESS}),
        onRegisterFail: () => dispatch({type: actionTypes.REGISTER_FAIL}),
        onLogin: (token) => dispatch({type: actionTypes.USER_LOADED, payload: token}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(style)(Signup)));