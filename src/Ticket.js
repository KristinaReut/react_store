import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class Ticket extends Component {

    render() {
        const { ticket, handleDeleteTicket, drag } = this.props;
        return (
            <Card style={{ margin: '10px', cursor: 'pointer' }} id={ticket.key} draggable="true" onDragStart={drag}>
                <CardContent>
                    <Typography color="textSecondary" gutterBottom>
                        <Button style={{ float: 'right' }} color="secondary" onClick={() => handleDeleteTicket(ticket)}>Delete</Button>
                        {ticket.title}
                    </Typography>
                    <Typography component="p">
                        {ticket.description}
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}
export default Ticket;