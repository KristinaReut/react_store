import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ButtonForAddTicket extends Component {

    render() {
        const { handleClickOpen } = this.props;
        return (
            <Button variant="outlined" color="primary" style={{ margin: '1% 45%' }} onClick={handleClickOpen}>
                Add to the Dashboard
            </Button>
        );
    }
}
export default ButtonForAddTicket;