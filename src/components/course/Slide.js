import React, {Component} from 'react';
import Grid from "@material-ui/core/Grid/Grid";
import Box from "@material-ui/core/Box/Box";
import TextField from "@material-ui/core/TextField/TextField";
import Paper from "@material-ui/core/Paper/Paper";
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
    boxPadding: {
        padding: 10
    },
    paper: {
        backgroundColor: '#535353',
        padding: 20,
        height: '100%'
    },
    fullWidth: {
        width: '100%'
    }
});

class Slide extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Grid container
                  direction="row"
                  justify="flex-start"
                  alignItems="flex-start"

            >
                {this.props.content.videoUrl !== '' ?
                    <Grid item xs={12}>
                        <Box padding={3} height='80vh'>
                            <Paper elevation={5} className={classes.paper}>
                                {this.props.content.videoUrl.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/) ?
                                    <iframe
                                        className={classes.fullWidth}
                                        style={{height: '100%'}}
                                        src={this.props.content.videoUrl.replace("watch?v=", "embed/")}
                                        allowFullScreen
                                    />
                                    : null}
                            </Paper>
                        </Box>
                    </Grid> : null}
                {this.props.content.text !== '' ?
                    <Grid item xs={12}>
                        <Box padding={3}>
                            <Paper elevation={5} className={classes.paper}>
                                {this.props.content.text}
                            </Paper>
                        </Box>
                    </Grid> : null}
            </Grid>
        )
    }
}

export default withStyles(style)(Slide);