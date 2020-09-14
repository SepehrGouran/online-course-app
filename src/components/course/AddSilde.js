import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Add from '@material-ui/icons/Add';
import {withStyles} from '@material-ui/core/styles';

const style = theme => ({
    card: {
        width: 170,
        height: 120,
        borderRadius: 10,
        cursor: 'pointer'
    },
    grid: {
        height: '100%'
    },
    icon: {
        width:70,
        height:70
    }
});

class AddSilde extends Component {

    handleAddSlide = () => {
        console.log('add Slide');
    };

    render() {
        const {classes} = this.props;

        return (
            <Card
                style={{border: '5px dashed white'}}
                className={classes.card}
                onClick={this.props.open}
            >
                <Grid
                    className={classes.grid}
                    container
                    direction="row"
                    justify="center"
                    alignItems="center">
                    <Add className={classes.icon}/>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(style)(AddSilde);