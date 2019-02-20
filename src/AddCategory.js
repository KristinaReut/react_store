import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonForAddCategory from './ButtonForAddCategory';
import FormForDialog from './FormForDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { status } from './Constants';


class AddCategory extends Component {

    state = {
        open: false,
        disable: true,
        currentInputValue: "",
        currentMultipleValue: "",
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({
            open: false,
            currentInputValue: "",
            currentMultipleValue: "",
            disable: true,
        });
    };

    handleInputChange = (e) => {
        const value = e.currentTarget.value;
        if (value.trim().length > 0) {
            this.setState({
                disable: false,
            });
        }
        if (!value.trim().length) {
            this.setState({
                disable: true,
            });
        }
        this.setState({
            currentInputValue: value,
        })
    };

    handleMultipleInputChange = (e) => {
        const value = e.currentTarget.value;
        this.setState({
            currentMultipleValue: value,
        })
    };

    loadAllCategories = () => {
        const { loadAllCategories } = this.props;
        loadAllCategories();
    }

    handleSubmit = () => {
        const { currentInputValue, currentMultipleValue } = this.state;
        const tiket = {
            title: currentInputValue,
            description: currentMultipleValue,
            status: status.TO_DO,
            time: new Date(),
            key: +new Date()
        }

        localStorage.setItem(+new Date(), JSON.stringify(tiket));
        this.loadAllCategories();
        this.setState({
            open: false,
            currentInputValue: "",
            currentMultipleValue: "",
            disable: true,
        });
    };

    render() {
        const { open, disable, currentInputValue, currentMultipleValue } = this.state;

        return (
            <div>
                <ButtonForAddCategory handleClickOpen={this.handleClickOpen} />
                <Dialog
                    open={open}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description">
                    <DialogTitle id="alert-dialog-title">Add category</DialogTitle>
                    <DialogContent>
                        <DialogContent>
                            <FormForDialog
                                handleSubmit={this.handleSubmit}
                                handleMultipleInputChange={this.handleMultipleInputChange}
                                handleInputChange={this.handleInputChange}
                                currentInputValue={currentInputValue}
                                currentMultipleValue={currentMultipleValue} />
                        </DialogContent>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="secondary">Close</Button>
                        <Button type="submit" onClick={this.handleSubmit} disabled={disable} color="primary">Apply</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
export default AddCategory;