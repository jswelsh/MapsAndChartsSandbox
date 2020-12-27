import React, { useState } from 'react'
import { makeStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { 
  IconButton,
  Divider,
  Paper,
  Modal,
  Link
} from '@material-ui/core';
import { lightBlue } from '@material-ui/core/colors';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
  },
});

function rand() {
  return Math.round(Math.random() * 20) - 10;
}
const getModalStyle = () => {
  const top = 50 + rand();
  const left = 50 + rand();
  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  Help: {
    position: 'absolute',
    top: 12,
    right: 0,
  }
}));

function InfoModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-about">About</h2>
      <Divider/>
      A Weather applet, let's the user select a region within Canada and grab the forecasts for the current day.
     <h2 id="simple-modal-controls">Tools</h2>
      <Divider/>
      <p id="simple-modal-controls-description">
        <ul>
        <li><Link target="_blank" href="https://openweathermap.org/api">Openweather API</Link></li>
        <li><Link target="_blank" href="https://www.amcharts.com/javascript-maps/">amCharts maps</Link></li>
        <li><Link target="_blank" href="https://material-ui.com/">Material UI</Link></li>
        <li><Link target="_blank" href="https://reactjs.org/">React</Link></li>
        <li><Link target="_blank" href="https://github.com/axios/axios">Axios</Link></li>
        </ul>
      </p>
    </div>
  );
  
  return (
    <ThemeProvider theme={theme}>
      <div>
        {<IconButton
          size="large"
          className={classes.Help}
          color="primary"
          onClick={handleOpen}> 
          <HelpOutlineIcon fontSize="large"/>
        </IconButton>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-about"
          aria-labelledby="simple-modal-controls"
          aria-describedby="simple-modal-controls-description"
        >
          {body}
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export { InfoModal }