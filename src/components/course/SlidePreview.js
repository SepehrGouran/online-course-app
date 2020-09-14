import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Delete from '@material-ui/icons/DeleteTwoTone';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
    card: {
        width: 170,
        height: 120,
        borderRadius: 10,
        cursor: 'pointer',
        marginRight: 30,
        marginBottom: 30,
    },
    grid: {
        paddingLeft: 10,
        paddingRight: 10
    },
});

class Slide extends Component {

    render() {
        const {classes} = this.props;

        return (
            <Card
                className={classes.card}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item xs={12} >
                        <IconButton className={classes.button} onClick={this.props.delete}>
                            <Delete/>
                        </IconButton>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        wrap="nowrap"
                        className={classes.grid}>
                        <Typography noWrap>{this.props.slide.title}</Typography>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(style)(Slide);