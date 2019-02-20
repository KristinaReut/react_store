import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ButtonsForSort extends Component {

    render() {
        const { sortByName, sortByDate, categories } = this.props;
        return (
            <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <Button variant="outlined" color="primary" onClick={() => sortByName(categories)}>
                    Sort by name
                </Button>
                <Button variant="outlined" color="primary" onClick={() => sortByDate(categories)}>
                    Sort by date
                </Button>
            </div>
        );
    }
}
export default ButtonsForSort;