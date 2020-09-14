import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import AccessAlarm from '@material-ui/icons/AccessAlarm';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import {withStyles} from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import {connect} from 'react-redux';
import {
    addEnrollement,
    CLOSE_ENROLLEMENT_SNACKBAR,
    ENROLLEMENT_LOADING,
    LOAD_USER_ENROLLEMENT
} from "../../store/action-types";

import Masonry from 'react-masonry-css';

const style = theme => ({
    avatar: {
        color: theme.palette.getContrastText(grey[500]),
        backgroundColor: grey[500],
    },
    box: {
        marginBottom: 10
    },
    card: {
        marginTop: 15,
    },
    masonryGrid: {
        display: 'flex',
        marginLeft: '-30px',
        marginTop: 20,
        width: 'auto',
    },
    masonryColumn: {
        paddingLeft: 30,
        backgroundClip: 'padding-box',
    }
});


class Search extends Component {

    state = {
        search: '',
        courses: [],
        topCourses: []
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + 'enrollments/user', {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            this.props.onLoadUserEnrollments(response.data);
            // console.log(response.data);
            axios.get(process.env.REACT_APP_DOMAIN + 'search', {
                headers: {
                    "Authorization": "Bearer " + this.props.token
                }
            }).then((response) => {
                this.setState({courses: response.data})
                this.setState({topCourses: response.data})
            })
        });
    }

    handleSearchChange = (event) => {
        this.setState({search: event.target.value});
        this.setState({courses: []});

        if (event.target.value !== '') {
            axios.post(process.env.REACT_APP_DOMAIN + 'search', {
                title: event.target.value
            }, {
                headers: {
                    "Authorization": "Bearer " + this.props.token
                }
            }).then((response) => {
                this.setState({courses: response.data})
            })
        } else {
            this.setState({courses: this.state.topCourses});
        }
    };

    handleEnrolleNow = (courseId) => {
        this.props.onEnrollementLoading();
        this.props.onAddEnrollement(courseId, this.props.token);
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.props.enrollementAdded}
                >
                    <Alert severity="success" onClose={this.props.onCloseSnackbar}>Enrollement Added</Alert>
                </Snackbar>

                <TextField
                    variant="outlined"
                    label="Search Course"
                    value={this.state.search}
                    style={{width: '100%'}}
                    onChange={this.handleSearchChange}/>

                <Masonry
                    breakpointCols={
                        {default: 3,
                            1280: 2,
                            960: 2,
                            650: 1}
                    }
                    className={classes.masonryGrid}
                    columnClassName={classes.masonryColumn}>

                    {
                        this.state.courses.map((course, index) => {
                            return (
                                <Card className={classes.card} key={index}>
                                    <CardHeader
                                        action={
                                            <Rating readOnly value={parseInt(course.rating)}/>
                                        }
                                        title={course.title}
                                        subheader={course.description}
                                    />
                                    <CardContent>
                                        <Box className={classes.box}
                                             component="h3">Creator: {course.creator.username}</Box>
                                        {
                                            course.instructors.length > 0 ?
                                                <Box className={classes.box}>Instructor(s):
                                                    <AvatarGroup max={4}>
                                                        {course.instructors.map((instructor, index) => {
                                                            return (
                                                                <Avatar alt={instructor}
                                                                        className={classes.avatar}
                                                                        src='/'
                                                                        key={index}/>
                                                            )
                                                        })}
                                                    </AvatarGroup>
                                                </Box>
                                                : null
                                        }

                                        <Box>Price: {course.price === '0.00' ? 'Free' : course.price + '$'}</Box>
                                    </CardContent>
                                    <CardActions>
                                        {
                                            this.props.enrollements.includes(course.id) ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{width: '100%'}}
                                                    disabled
                                                >Already Enrolled</Button>
                                                : <Button
                                                    variant="contained"
                                                    color="primary"
                                                    style={{width: '100%'}}
                                                    onClick={() => this.handleEnrolleNow(course.id)}
                                                    disabled={this.props.enrollementLoading}
                                                >Enrolle Now</Button>
                                        }
                                    </CardActions>
                                </Card>
                            )
                        })
                    }

                </Masonry>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        enrollements: state.enrollement.enrollements,
        enrollementLoading: state.enrollement.isLoading,
        enrollementAdded: state.enrollement.added,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onAddEnrollement: (courseId) => dispatch({type: ADD_ENROLLEMENT, payload: courseId}),
        onAddEnrollement: (courseId, token) => dispatch(addEnrollement(courseId, token)),
        onEnrollementLoading: () => dispatch({type: ENROLLEMENT_LOADING}),
        onCloseSnackbar: () => dispatch({type: CLOSE_ENROLLEMENT_SNACKBAR}),
        onLoadUserEnrollments: (enrollments) => dispatch({type: LOAD_USER_ENROLLEMENT, payload: enrollments}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Search));