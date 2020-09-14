import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import {connect} from 'react-redux';
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";

const style = theme => ({
    textField: {
        width: "100%",
        marginBottom: 20
    },
    button: {
        marginTop: 20
    },
});

class CreateCourse extends Component {

    state = {
        categories: [],
        course: {
            title: '',
            description: '',
            tags: []
        },
        validation: {
            title: {
                error: false,
                errorMessage: ''
            },
            description: {
                error: false,
                errorMessage: ''
            },
        },
        openSnackbar: false
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + 'categories',{
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
                this.setState({categories: response.data});
            }
        )
    }

    handleTagChange = (event, value) => {
      const course = {...this.state.course};
      course.tags = value;
      this.setState({course});
    };

    handleOnTitleChange = (event) => {
        const course = {...this.state.course};
        course.title = event.target.value;
        this.setState({course});
    };

    handleOnDescriptionChange = (event) => {
        const course = {...this.state.course};
        course.description = event.target.value;
        this.setState({course});
    };

    handleSaveCourse = () => {
        if (this.validateFields()) {
            axios.post(process.env.REACT_APP_DOMAIN + 'course/save', {
                title: this.state.course.title,
                description: this.state.course.description,
                tags: this.state.course.tags,
                creator: this.props.user,
                slides: [],
                rating: Math.floor(Math.random() * Math.floor(5)),
                price: '0.00',
                instructors: []
            }, {
                headers: {
                    "Authorization": "Bearer " + this.props.token
                }
            }).then((response) => {
                console.log(response.data);
                this.setState({
                    course: {
                        title: '',
                        description: '',
                        tags: []
                    },
                    openSnackbar: true,
                });
            }).catch((error) => {
                console.log(error);
            });
        }
    };

    validateFields() {
        const validation = {...this.state.validation};
        if (this.state.course.title === '') {
            validation.title.error = true;
            validation.title.errorMessage = 'Title is empty';
        } else {
            validation.title.error = false;
            validation.title.errorMessage = '';
        }

        if (this.state.course.description === '') {
            validation.description.error = true;
            validation.description.errorMessage = 'Description is empty';
        } else {
            validation.description.error = false;
            validation.description.errorMessage = '';
        }

        this.setState({validation: validation});

        const title = validation.title.error;
        const description = validation.description.error;

        return !title && !description;
    }

    handleCloseSnackbar = () => {
        this.setState({openSnackbar: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid item xs={12} md={6} >
                <h1>Create Course</h1>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.openSnackbar}
                    autoHideDuration={3000}
                    onClose={this.handleCloseSnackbar}
                >
                    <Alert severity="success" onClose={this.handleCloseSnackbar}>Course created successfuly</Alert>
                </Snackbar>

                <Box display="block">
                    <TextField
                        label="Title"
                        variant="filled"
                        value={this.state.course.title}
                        error={this.state.validation.title.error}
                        helperText={this.state.validation.title.errorMessage}
                        onChange={this.handleOnTitleChange}
                        className={classes.textField}
                    />
                </Box>
                <Box display="block">
                    <TextField
                        label="Description"
                        multiline
                        variant="filled"
                        value={this.state.course.description}
                        error={this.state.validation.description.error}
                        helperText={this.state.validation.description.errorMessage}
                        onChange={this.handleOnDescriptionChange}
                        className={classes.textField}
                    />
                </Box>
                <Autocomplete
                    multiple
                    onChange={this.handleTagChange}
                    options={this.state.categories.map((option) => option.name)}
                    freeSolo
                    value={this.state.course.tags}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip variant="outlined" label={option} style={{marginTop: 10, marginBottom: 10}} {...getTagProps({ index })} />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField {...params} variant="filled" label="Category" placeholder="Add tag" />
                    )}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={this.handleSaveCourse}
                    className={classes.button}>Save</Button>
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
    }
};

export default connect(mapStateToProps)(withStyles(style)(CreateCourse));