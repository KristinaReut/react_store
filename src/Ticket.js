import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Ticket extends Component {

    render() {
        const { category, handleDeleteCategory, drag } = this.props;
        return (
            <Card style={{ margin: '10px', cursor: 'pointer' }} id={category.key} draggable="true" onDragStart={drag}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <Button style={{ float: 'right' }} color="secondary" onClick={() => handleDeleteCategory(category)}>Delete</Button>
                        {category.title}
                    </Typography>
                    <Typography component="p">
                        {category.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}
export default Ticket;