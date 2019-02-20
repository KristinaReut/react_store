import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { status } from './Constants';
import Ticket from './Ticket';
import AddTicket from './AddTicket';
import Button from '@material-ui/core/Button';

class MainContent extends Component {
  state = {
    ticketsToDo: [],
    ticketsInProgress: [],
    ticketsDone: [],
  };

  loadAllTickets = () => {
    const arr1 = [],
      arr2 = [],
      arr3 = [];
    const keys = Object.keys(localStorage);

    for (let i = 0; i < keys.length; i++) {
      const ticket = JSON.parse(localStorage.getItem(keys[i]));
      const statusOfTicket = ticket.status;
      if (statusOfTicket === status.TO_DO) {
        arr1.push(ticket);
      }
      if (statusOfTicket === status.IN_PROGRESS) {
        arr2.push(ticket);
      }
      if (statusOfTicket === status.DONE) {
        arr3.push(ticket);
      }
    }

    this.setState({
      ticketsToDo: arr1,
      ticketsInProgress: arr2,
      ticketsDone: arr3,
    });
  }

  componentDidMount = () => {
    setTimeout(this.loadAllTickets, 1000);
  }

  handleDeleteTicket = (ticket) => {
    localStorage.removeItem(ticket.key);
    this.loadAllTickets();
  }

  sort = (tickets, e) => {
    const methods = e.currentTarget.id;
    const sortTickets = tickets.sort((a, b) => (a[methods] > b[methods]) ? 1 : ((b[methods] > a[methods]) ? -1 : 0));
    const name = tickets
      .filter(tiket => tiket.stats === status.TO_DO ?
        'ticketsToDo' : status.IN_PROGRESS ?
          'ticketsInProgress' : 'ticketsDone');

    this.setState({
      [name]: sortTickets,
    })
  }

  drag = (ev) => {
    ev.dataTransfer.setData("text", ev.target.id);
  }

  allowDrop = (ev) => {
    ev.preventDefault();
  }

  drop = (ev) => {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const card = JSON.parse(localStorage.getItem(data));
    card.status = ev.currentTarget.id;
    localStorage[data] = JSON.stringify(card);
    this.loadAllTickets();
  }

  render() {
    const { ticketsToDo, ticketsInProgress, ticketsDone } = this.state;

    return (
      <div>
        <AddTicket loadAllTickets={this.loadAllTickets} />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">To do</TableCell>
              <TableCell align="center">In progress</TableCell>
              <TableCell align="center">Done</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell onDrop={this.drop} onDragOver={this.allowDrop} id={status.TO_DO}>
                <Button variant="outlined" style={{margin: 10}} color="primary" onClick={(e) => this.sort(ticketsToDo, e)} id="title">
                  Sort by name
                </Button>
                <Button variant="outlined" color="primary" onClick={(e) => this.sort(ticketsToDo, e)} id="time">
                  Sort by date
                </Button>
                {ticketsToDo.map(ticket =>
                  <Ticket
                    key={ticket.key}
                    ticket={ticket}
                    handleDeleteTicket={this.handleDeleteTicket}
                    drag={this.drag} />
                )}
              </TableCell>
              <TableCell onDrop={this.drop} onDragOver={this.allowDrop} id={status.IN_PROGRESS}>
                <Button variant="outlined" style={{margin: 10}} color="primary" onClick={(e) => this.sort(ticketsInProgress, e)} id="title">
                  Sort by name
                </Button>
                <Button variant="outlined" color="primary" onClick={(e) => this.sort(ticketsInProgress, e)} id="time">
                  Sort by date
                </Button>
                {ticketsInProgress.map(ticket =>
                  <Ticket
                    key={ticket.key}
                    ticket={ticket}
                    handleDeleteTicket={this.handleDeleteTicket}
                    drag={this.drag} />
                )}
              </TableCell>
              <TableCell onDrop={this.drop} onDragOver={this.allowDrop} id={status.DONE}>
                <Button variant="outlined" style={{margin: 10}} color="primary" onClick={(e) => this.sort(ticketsDone, e)} id="title">
                  Sort by name
                </Button>
                <Button variant="outlined" color="primary" onClick={(e) => this.sort(ticketsDone, e)} id="time">
                  Sort by date
                </Button>
                {ticketsDone.map(ticket =>
                  <Ticket
                    key={ticket.key}
                    ticket={ticket}
                    handleDeleteTicket={this.handleDeleteTicket}
                    drag={this.drag} />
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default MainContent;