import React, { Component } from 'react';
import MainContent from './MainContent'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import './styles.css'

class App extends Component {

  render() {
    return (
      <div>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              Dashboard
          </Typography>
          </Toolbar>
        </AppBar>
        <MainContent />
      </div>
    );
  }
}
export default App;
