import React, {Component} from 'react';
import {connect} from 'react-redux';
import Card from "@material-ui/core/Card/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Button from "@material-ui/core/Button";
import AmpStories from "@material-ui/icons/AmpStories";
import CardContent from "@material-ui/core/CardContent/CardContent";
import Chip from "@material-ui/core/Chip/Chip";
import axios from 'axios';
import {withStyles} from '@material-ui/core/styles';
import {LOAD_USER_ENROLLEMENT, SET_SLIDE_SHOW_COURSE, UPDATE_TOOLBAR_TITLE} from "../../store/action-types";
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';

const style = theme => ({
    card: {
        marginBottom: 20,
    },
    chip: {
        marginRight: 5
    }
});

class Dashboard extends Component {

    state = {
        courses: []
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + 'enrollments/user', {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            this.props.onLoadUserEnrollments(response.data);
            axios.post(process.env.REACT_APP_DOMAIN + 'enrollments/courses', {
                enrollments: this.props.enrollements
            }, {
                headers: {
                    "Authorization": "Bearer " + this.props.token
                }
            }).then((response) => {
                this.setState({courses: response.data});
            });
        });
    }

    handleReadCourse = (courseId) => {
        const course = this.state.courses.find(c => c.id === courseId);
        this.props.onSetSlideShowCourse(course);
        this.props.history.push('home/course/' + courseId);
        this.props.updateTitle(course.title);
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                {this.state.courses.length > 0 ?
                    this.state.courses.map((course, index) => {
                        return (
                            <Card className={classes.card} key={course.id}>
                                <CardHeader
                                    title={course.title}
                                    subheader={course.description}
                                    action={
                                        <Button
                                            variant="outlined"
                                            startIcon={<AmpStories/>}
                                            onClick={() => this.handleReadCourse(course.id)}
                                            color="secondary"
                                        >View Slides</Button>
                                    }
                                />
                                <CardContent>
                                    {course.tags.map((tag, index) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.chip}
                                            />
                                        )
                                    })}
                                </CardContent>
                            </Card>
                        )
                    })
                    : <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item>You did not participate in any course yet</Grid>
                        <Grid item>Find courses in <Link style={{color: 'white'}} to='/home/search'>Search</Link></Grid>
                    </Grid>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        enrollements: state.enrollement.enrollements,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadUserEnrollments: (enrollments) => dispatch({type: LOAD_USER_ENROLLEMENT, payload: enrollments}),
        onSetSlideShowCourse: (course) => dispatch({type: SET_SLIDE_SHOW_COURSE, payload: course}),
        updateTitle: (title) => dispatch({type: UPDATE_TOOLBAR_TITLE, payload: title})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dashboard));