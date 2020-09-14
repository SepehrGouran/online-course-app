import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import {withStyles} from '@material-ui/core/styles';
import {UPDATE_TOOLBAR_TITLE} from "../../store/action-types";
import Grid from "@material-ui/core/Grid/Grid";
import {Link} from "react-router-dom";

const style = theme => ({
    card: {
        marginBottom: 20
    },
    chip: {
        marginRight: 5
    }
});

class MyCourses extends Component {

    state = {
        courses: []
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + 'course/user', {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((respose) => {
            this.setState({courses: respose.data})
        })
    }

    handleEditCourse = (courseId) => {
        this.props.history.push(this.props.match.url + '/edit/' + courseId);
        this.props.updateTitle('Edit Course');
    };

    handleDeleteCourse = (courseId) => {
        axios.delete(process.env.REACT_APP_DOMAIN + 'course/' + courseId, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
           if (response.data.deleted > 0) {
               const courses = [...this.state.courses];
               this.setState({courses: courses.filter(c => c.id !== courseId)});
               // courses.splice(courses.filter(c => c.id === courseId),1);
               // this.setState({courses});
           } else {
               console.log(response.data)
           }
        });
    };


    render() {
        const {classes} = this.props;

        return (
            <div>
                <h1>My Courses</h1>
                {this.state.courses.length > 0 ?
                this.state.courses.map((course) => {
                    return (
                        <Card className={classes.card} key={course.id}>
                            <CardHeader
                                title={course.title}
                                subheader={course.description}
                                action={
                                    <div>
                                        <IconButton onClick={() => this.handleEditCourse(course.id)}>
                                            <Edit/>
                                        </IconButton>
                                        <IconButton onClick={() => this.handleDeleteCourse(course.id)}>
                                            <Delete/>
                                        </IconButton>
                                    </div>
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
                        <Grid item>You did not create any course</Grid>
                        <Grid item><Link style={{color: 'white'}} to='/home/create-course'>Start create your course</Link></Grid>
                    </Grid>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        user: state.auth.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTitle: (title) => dispatch({type: UPDATE_TOOLBAR_TITLE, payload: title})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(MyCourses));