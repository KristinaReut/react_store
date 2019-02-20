import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { status } from './Constants';
import Ticket from './Ticket';
import ButtonsForSort from './ButtonsForSort'
import AddCategory from './AddCategory'

class MainContent extends Component {
  state = {
    categories: [],
  };

  loadAllCategories = () => {
    let arr = [];
    let keys = Object.keys(localStorage);
    for (let i = 0; i < localStorage.length; i++) {
      arr.push(JSON.parse(localStorage.getItem(keys[i])));
    }
    this.setState({
      categories: arr,
    })
  }

  componentDidMount = () => {
    setTimeout(this.loadAllCategories, 1000);
  }

  handleDeleteCategory = (category) => {
    localStorage.removeItem(category.key);
    this.loadAllCategories()
  }

  sortByName = (categories) => {
    let arr = categories.sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
    this.setState({
      categories: arr,
    })
  }

  sortByDate = (categories) => {
    let arr = categories.sort((a, b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0));
    this.setState({
      categories: arr,
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
    let data = ev.dataTransfer.getData("text");
    let card = JSON.parse(localStorage.getItem(data));
    card.status =
      (ev.currentTarget.classList.contains(status.TO_DO)) ?
        status.TO_DO :
        (ev.currentTarget.classList.contains(status.IN_PROGRESS)) ?
          status.IN_PROGRESS : status.DONE;
    localStorage[data] = JSON.stringify(card);
    this.loadAllCategories();
  }

  render() {
    const { categories } = this.state

    return (
      <div>
        <AddCategory loadAllCategories={this.loadAllCategories}/>
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
              <TableCell onDrop={this.drop} onDragOver={this.allowDrop} className={status.TO_DO}>
                <ButtonsForSort sortByName={this.sortByName} sortByDate={this.sortByDate} categories={categories} />
                {categories.map((category, index) => {
                  return category.status === status.TO_DO ?
                    (<Ticket
                      key={index}
                      category={category}
                      handleDeleteCategory={this.handleDeleteCategory}
                      drag={this.drag} />
                    ) : null
                })}
              </TableCell>
              <TableCell onDrop={this.drop} onDragOver={this.allowDrop} className={status.IN_PROGRESS}>
                <ButtonsForSort sortByName={this.sortByName} sortByDate={this.sortByDate} categories={categories} />
                {categories.map((category, index) => {
                  return category.status === status.IN_PROGRESS ?
                    (<Ticket
                      key={index}
                      category={category}
                      handleDeleteCategory={this.handleDeleteCategory}
                      drag={this.drag} />
                    ) : null
                })}
              </TableCell>
              <TableCell onDrop={this.drop} onDragOver={this.allowDrop} className={status.DONE}>
                <ButtonsForSort sortByName={this.sortByName} sortByDate={this.sortByDate} categories={categories} />
                {categories.map((category, index) => {
                  return category.status === status.DONE ?
                    (<Ticket
                      key={index}
                      category={category}
                      handleDeleteCategory={this.handleDeleteCategory}
                      drag={this.drag} />
                    ) : null
                })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default MainContent;