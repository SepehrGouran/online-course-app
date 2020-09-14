import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import EditTwoTone from '@material-ui/icons/EditTwoTone';
import CloseIcon from '@material-ui/icons/Close';
import axios from 'axios';
import {connect} from 'react-redux';
import Chip from "@material-ui/core/Chip/Chip";
import {withStyles} from '@material-ui/core/styles';
import AddSilde from "./AddSilde";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Slide from "./SlidePreview";
import Autocomplete from "@material-ui/lab/Autocomplete/Autocomplete";
import AvatarGroup from "@material-ui/lab/AvatarGroup/AvatarGroup";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {UPDATE_TOOLBAR_TITLE} from "../../store/action-types";
import * as _ from 'lodash';

const style = theme => ({
    chip: {
        marginRight: 5
    },
    slidePanel: {
        marginTop: 20
    },
    div: {
        border: '3px dashed',
        borderColor: '#cccccc',
        borderRadius: 15,
        marginBottom: 15
    },
    boxPadding: {
        padding: 10
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    paper: {
        backgroundColor: '#535353',
        marginTop: 15,
        padding: 20,
        height: '90%'
    },
    fullWidth: {
        width: '100%'
    },
    textField: {
        width: "100%",
        marginBottom: 20
    },
});

class EditCourse extends Component {

    state = {
        course: null,
        dialogOpen: false,
        editTitleDialogOpen: false,
        editDescriptionDialogOpen: false,
        editTagsDialogOpen: false,
        editPriceDialogOpen: false,
        editInstructorsDialogOpen: false,
        title: 'Slide Title',
        videoUrl: '',
        text: '',
        estimatedTime: '0',
        updatedTitle: '',
        updatedDescription: '',
        updatedTags: [],
        updatedPrice: '',
        updatedInstructors: [],
    };

    componentDidMount() {
        axios.get(process.env.REACT_APP_DOMAIN + 'course/' + this.props.match.params.id, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            this.setState({course: response.data});
            this.setState({
                updatedTitle: response.data.title,
                updatedDescription: response.data.description,
                updatedTags: response.data.tags,
                updatedPrice: response.data.price,
                updatedInstructors: response.data.instructors,
            })
        });

        this.props.updateTitle('Edit Course');
    }

    handleDialogClose = () => {
        this.setState({dialogOpen: false});
    };

    handleDialogOpen = () => {
        this.setState({dialogOpen: true});
    };

    handleAddSlide = () => {
        const slide = {
            title: this.state.title,
            videoUrl: this.state.videoUrl,
            text: this.state.text,
            estimatedTime: this.state.estimatedTime
        };
        axios.post(process.env.REACT_APP_DOMAIN + 'course/edit/add-slide', {
            courseId: this.state.course.id, slide
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.slides.push(slide);
            this.setState({course});
            this.setState({
                title: 'Slide Title',
                videoUrl: '',
                text: '',
                estimatedTime: '0'
            });
            this.handleDialogClose();
        })
    };

    handleTitleChange = (event) => {
        this.setState({title: event.target.value});
    };

    handleVideoUrlChange = (event) => {
        this.setState({videoUrl: event.target.value});
    };

    handleTextChange = (event) => {
        this.setState({text: event.target.value});
    };

    handleTimeChange = (event) => {
        this.setState({estimatedTime: event.target.value});
    };

    handleEditTitle = () => {
        this.setState({editTitleDialogOpen: true});
    };

    handleEditDesctiption = () => {
        this.setState({editDescriptionDialogOpen: true});
    };

    handleEditTags = () => {
        this.setState({editTagsDialogOpen: true});
    };

    handleEditPrice = () => {
        this.setState({editPriceDialogOpen: true});
    };

    handleEditInstructors = () => {
        this.setState({editInstructorsDialogOpen: true});
    };

    handleCloseEditTitle = () => {
        this.setState({editTitleDialogOpen: false});
    };

    handleCloseEditDesctiption = () => {
        this.setState({editDescriptionDialogOpen: false});
    };

    handleCloseEditTags = () => {
        this.setState({editTagsDialogOpen: false});
    };

    handleCloseEditPrice = () => {
        this.setState({editPriceDialogOpen: false});
    };

    handleCloseEditInstructors = () => {
        this.setState({editInstructorsDialogOpen: false});
    };

    handleOnTitleChange = (event) => {
        this.setState({updatedTitle: event.target.value});
    };

    handleOnDescriptionChange = (event) => {
        this.setState({updatedDescription: event.target.value});
    };

    handleOnTagsChange = (event, value) => {
        this.setState({updatedTags: value});
    };

    handleOnPriceChange = (event) => {
        this.setState({updatedPrice: event.target.value});
    };

    handleOnInstructorsChange = (event, value) => {
        this.setState({updatedInstructors: value});
    };

    handleOnTitleSave = () => {
        axios.post(process.env.REACT_APP_DOMAIN + 'course/update/title', {
            courseId: this.state.course.id,
            title: this.state.updatedTitle,
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.title = this.state.updatedTitle;
            this.setState({course});
            this.handleCloseEditTitle();
        });
    };

    handleOnDescriptionSave = () => {
        axios.post(process.env.REACT_APP_DOMAIN + 'course/update/description', {
            courseId: this.state.course.id,
            description: this.state.updatedDescription,
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.description = this.state.updatedDescription;
            this.setState({course});
            this.handleCloseEditDesctiption();
        });
    };

    handleOnTagsSave = () => {
        axios.post(process.env.REACT_APP_DOMAIN + 'course/update/tags', {
            courseId: this.state.course.id,
            tags: this.state.updatedTags,
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.tags = this.state.updatedTags;
            this.setState({course});
            this.handleCloseEditTags();
        });
    };

    handleOnPriceSave = () => {
        axios.post(process.env.REACT_APP_DOMAIN + 'course/update/price', {
            courseId: this.state.course.id,
            price: this.state.updatedPrice,
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.price = this.state.updatedPrice;
            this.setState({course});
            this.handleCloseEditPrice();
        });
    };

    handleOnInstructorsSave = () => {
        axios.post(process.env.REACT_APP_DOMAIN + 'course/update/instructors', {
            courseId: this.state.course.id,
            instructors: this.state.updatedInstructors,
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.instructors = this.state.updatedInstructors;
            this.setState({course});
            this.handleCloseEditInstructors();
        });
    };

    handleDeleteSlide = (slide) => {
        axios.post(process.env.REACT_APP_DOMAIN + 'course/edit/remove-slide', {
            courseId: this.state.course.id,
            slide: slide
        }, {
            headers: {
                "Authorization": "Bearer " + this.props.token
            }
        }).then((response) => {
            const course = {...this.state.course};
            course.slides = course.slides.filter(s => !_.isEqual(s, slide));
            this.setState({course});
        })
    };

    render() {
        const {classes} = this.props;

        return (
            <Grid item xs={12}>

                <Dialog fullScreen onClose={this.handleDialogClose} open={this.state.dialogOpen}>
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={this.handleDialogClose}
                                        aria-label="close">
                                <CloseIcon/>
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                                Slide Editor
                            </Typography>
                            <Button variant="outlined" color="inherit" onClick={this.handleAddSlide}>
                                save
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container
                          direction="row"
                          justify="flex-start"
                          alignItems="flex-start"

                    >

                        <Grid item xs={12}>
                            <Box padding={3}>
                                <TextField label="Title" value={this.state.title}
                                           onChange={this.handleTitleChange}/>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={8} style={{padding: 10}}>
                            <Box padding={3} height='70vh' className={classes.div}>
                                Video
                                <Paper elevation={5} className={classes.paper}>
                                    <TextField
                                        className={classes.fullWidth}
                                        style={{marginBottom: 10}}
                                        label="Video url"
                                        value={this.state.videoUrl}
                                        onChange={this.handleVideoUrlChange}
                                        placeholder="Enter the video URL"/>

                                    {this.state.videoUrl.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) ?
                                        <iframe
                                            className={classes.fullWidth}
                                            style={{height: '80%'}}
                                            src={this.state.videoUrl.replace("watch?v=", "embed/")}
                                            allowFullScreen
                                        />
                                        : null}
                                </Paper>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4} style={{padding: 10}}>
                            <Box padding={3} className={classes.div}>
                                Text
                                <Paper elevation={5} className={classes.paper}>
                                    <TextField
                                        className={classes.fullWidth}
                                        multiline
                                        rows={6}
                                        placeholder="Slide Content"
                                        value={this.state.text}
                                        onChange={this.handleTextChange}
                                        label="Content"
                                    />
                                </Paper>
                            </Box>
                            <Box padding={3} className={classes.div}>
                                Estimated Reading Time
                                <Paper elevation={5} className={classes.paper}>
                                    <TextField
                                        className={classes.fullWidth}
                                        placeholder="Reading Time"
                                        label="Time (minute)"
                                        type="number"
                                        value={this.state.estimatedTime}
                                        onChange={this.handleTimeChange}
                                    />
                                </Paper>
                            </Box>
                        </Grid>
                    </Grid>
                </Dialog>

                {/*<p>Edit Course</p>*/}
                {/*<p>{this.props.match.params.id}</p>*/}

                {this.state.course !== null ?
                    <Dialog
                        open={this.state.editTitleDialogOpen}
                        onClose={this.handleCloseEditTitle}
                    >
                        <DialogTitle>{"Edit Title"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Title"
                                variant="filled"
                                value={this.state.updatedTitle}
                                onChange={this.handleOnTitleChange}
                                className={classes.textField}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEditTitle}>
                                Close
                            </Button>
                            <Button onClick={this.handleOnTitleSave} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog> : null}

                {this.state.course !== null ?
                    <Dialog
                        open={this.state.editDescriptionDialogOpen}
                        onClose={this.handleCloseEditDesctiption}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>{"Edit Description"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Description"
                                variant="filled"
                                value={this.state.updatedDescription}
                                onChange={this.handleOnDescriptionChange}
                                className={classes.textField}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEditDesctiption}>
                                Close
                            </Button>
                            <Button onClick={this.handleOnDescriptionSave} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog> : null}

                {this.state.course !== null ?
                    <Dialog
                        open={this.state.editTagsDialogOpen}
                        onClose={this.handleCloseEditTags}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle>{"Edit Tags"}</DialogTitle>
                        <DialogContent>
                            <Autocomplete
                                multiple
                                onChange={this.handleOnTagsChange}
                                options={[]}
                                value={this.state.updatedTags}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option}
                                              style={{marginTop: 10, marginBottom: 10}} {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} variant="filled" label="Category" placeholder="Add tag"/>
                                )}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEditTags}>
                                Close
                            </Button>
                            <Button onClick={this.handleOnTagsSave} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog> : null}

                {this.state.course !== null ?
                    <Dialog
                        open={this.state.editPriceDialogOpen}
                        onClose={this.handleCloseEditTitle}
                    >
                        <DialogTitle>{"Edit Price"}</DialogTitle>
                        <DialogContent>
                            <TextField
                                label="Price"
                                variant="filled"
                                value={this.state.updatedPrice}
                                onChange={this.handleOnPriceChange}
                                className={classes.textField}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEditPrice}>
                                Close
                            </Button>
                            <Button onClick={this.handleOnPriceSave} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog> : null}

                {this.state.course !== null ?
                    <Dialog
                        open={this.state.editInstructorsDialogOpen}
                        onClose={this.handleCloseEditTitle}
                    >
                        <DialogTitle>{"Edit Instructors"}</DialogTitle>
                        <DialogContent>
                            <Autocomplete
                                multiple
                                onChange={this.handleOnInstructorsChange}
                                options={[]}
                                value={this.state.updatedInstructors}
                                freeSolo
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip variant="outlined" label={option}
                                              style={{marginTop: 10, marginBottom: 10}} {...getTagProps({index})} />
                                    ))
                                }
                                renderInput={(params) => (
                                    <TextField {...params} variant="filled" label="Instructors" placeholder="Add tag"/>
                                )}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseEditInstructors}>
                                Close
                            </Button>
                            <Button onClick={this.handleOnInstructorsSave} color="primary" autoFocus>
                                Save
                            </Button>
                        </DialogActions>
                    </Dialog> : null}

                {this.state.course !== null ?
                    <Box>
                        <Box>
                            <Box display="inline">
                                <IconButton onClick={this.handleEditTitle}>
                                    <EditTwoTone/>
                                </IconButton>
                            </Box>
                            <Box display="inline" component="h3">
                                {this.state.course.title}
                            </Box>
                        </Box>

                        <Box>
                            <Box display="inline">
                                <IconButton onClick={this.handleEditDesctiption}>
                                    <EditTwoTone/>
                                </IconButton>
                            </Box>
                            <Box display="inline">
                                {this.state.course.description}
                            </Box>
                        </Box>

                        <Box>
                            <Box display="inline">
                                <IconButton onClick={this.handleEditTags}>
                                    <EditTwoTone/>
                                </IconButton>
                            </Box>
                            <Box display="inline">
                                {this.state.course.tags != null ?
                                    this.state.course.tags.map((tag, index) => {
                                        return (
                                            <Chip
                                                key={index}
                                                label={tag}
                                                variant="outlined"
                                                color="secondary"
                                                className={classes.chip}
                                            />
                                        )
                                    }) : null}
                            </Box>
                        </Box>

                        <Box>
                            <Box display="inline">
                                <IconButton onClick={this.handleEditPrice}>
                                    <EditTwoTone/>
                                </IconButton>
                            </Box>
                            <Box display="inline" component="h3">
                                {this.state.course.price} $
                            </Box>
                        </Box>

                        <Box>
                            <Box display="inline">
                                <IconButton onClick={this.handleEditInstructors}>
                                    <EditTwoTone/>
                                </IconButton>
                            </Box>
                            <Box display="inline" component="h3">
                                {
                                    this.state.course.instructors.length > 0 ?
                                        <Box display="inline">Instructor(s):
                                            <AvatarGroup max={4}>
                                                {this.state.course.instructors.map((instructor, index) => {
                                                    return (
                                                        <Avatar alt={instructor}
                                                                className={classes.avatar}
                                                                src='/'
                                                                key={index}/>
                                                    )
                                                })}
                                            </AvatarGroup>
                                        </Box>
                                        : <Box display="inline">Add Instructors</Box>
                                }
                            </Box>
                        </Box>

                        <Box className={classes.slidePanel}>
                            <Box component="h2">Slides:</Box>
                            <Grid container>
                                {this.state.course.slides != null ?
                                    this.state.course.slides.length > 0 ?
                                        this.state.course.slides.map((slide, index) => {
                                            return (
                                                <Box display="inline" key={index}>
                                                    <Slide
                                                        delete={() => this.handleDeleteSlide(slide)}
                                                        scale='scale(1)'
                                                        slide={slide}/>
                                                </Box>
                                            )
                                        }) : null
                                    : null}

                                <AddSilde open={this.handleDialogOpen}/>
                            </Grid>
                        </Box>
                    </Box>

                    : null}
            </Grid>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token
    }
};

const mapDispatchToProps = dispatch => {
    return {
        updateTitle: (title) => dispatch({type: UPDATE_TOOLBAR_TITLE, payload: title}),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(EditCourse));