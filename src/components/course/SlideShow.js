import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    addEnrollement,
    CLOSE_ENROLLEMENT_SNACKBAR,
    ENROLLEMENT_LOADING,
    LOAD_USER_ENROLLEMENT, SET_SLIDE_SHOW_CURRENT_SLIDE_INDEX, SLIDE_SHOW_NEXT, SLIDE_SHOW_PREVIOUS
} from "../../store/action-types";
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ChevronRight from '@material-ui/icons/ChevronRight';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Slide from './Slide';

const style = theme => ({
    card: {
        marginBottom: 20,
    },
    chip: {
        marginRight: 5
    },
    controllButton: {
        height: '100%',
    }
});

class SlideShow extends Component {

    render() {
        const {classes} = this.props;

        return (
            <div>
                {
                    this.props.course !== null ?
                        this.props.course.slides.length > 0 ?
                        <Grid
                            container
                            direction="row"
                            spacing={2}
                        >
                            <Grid item xs={3}>
                                <List component="nav">
                                    {
                                        this.props.course.slides.map((slide, index) => {
                                            return (
                                                <ListItem
                                                    button
                                                    key={index}
                                                    selected={this.props.currentSlide === index}
                                                    onClick={() => this.props.onSetSlideIndex(index)}
                                                >
                                                    <ListItemText primary={slide.title}/>
                                                </ListItem>
                                            )
                                        })
                                    }
                                </List>
                            </Grid>
                            <Grid item xs={9} style={{height: '100%'}}>
                                <Grid container direction="row">
                                    <Grid container direction="row" justify="space-between"
                                          alignItems="center">
                                        <Grid item>
                                            <IconButton
                                                onClick={() => this.props.onPreviousSlide()}
                                                disabled={this.props.currentSlide === 0}
                                            >
                                                <ChevronLeft/>
                                            </IconButton>
                                        </Grid>
                                        <Grid item>
                                            <Grid
                                                container
                                                justify="center"
                                                alignItems="center">
                                                {this.props.currentSlide+1 + '/' + this.props.course.slides.length}
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Box>Time: {this.props.course.slides[this.props.currentSlide].estimatedTime}min</Box>
                                        </Grid>
                                        <Grid item>
                                            <IconButton
                                                onClick={() => this.props.onNextSlide()}
                                                disabled={this.props.currentSlide+1 === this.props.course.slides.length}
                                            >
                                                <ChevronRight/>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        {
                                            this.props.course.slides.length > 0 ?
                                                <Slide content={this.props.course.slides[this.props.currentSlide]} />
                                                :null
                                        }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid> :null
                        : null
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        course: state.slideShow.course,
        currentSlide: state.slideShow.currentSlide,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onNextSlide: () => dispatch({type: SLIDE_SHOW_NEXT}),
        onPreviousSlide: () => dispatch({type: SLIDE_SHOW_PREVIOUS}),
        onSetSlideIndex: (index) => dispatch({type: SET_SLIDE_SHOW_CURRENT_SLIDE_INDEX, payload: index})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(SlideShow));