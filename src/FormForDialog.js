import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';

class FormForDialog extends Component {

    render() {
        const {handleSubmit, handleInputChange, handleMultipleInputChange, currentInputValue, currentMultipleValue} = this.props;
        return (
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <TextField
                  id="title"
                  label="Title"
                  value={currentInputValue}
                  onChange={handleInputChange}
                  margin="normal"
                  fullWidth
                  required
                />
                <TextField
                  id="standard-multiline-static"
                  label="Description"
                  value={currentMultipleValue}
                  onChange={handleMultipleInputChange}
                  multiline
                  rows="4"
                  margin="normal"
                  fullWidth
                />
              </form>
        );
    }
}
export default FormForDialog;