import React from 'react'
import { makeStyles, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { 
  IconButton, 
  Divider,
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
    top: 0,
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
      An informational and interactive map of Rugby pitches within the BCRU league for the lower-mainland, click a marker to retrieve info for the respective pitch
      <h2 id="simple-modal-controls">Controls</h2>
      <Divider/>
      <p id="simple-modal-controls-description">
        pitch and bearing: press 'Ctrl' + hold 'Right mouse-button' and move the mouse
        zoom in: double click 'Right mouse-button'
        zoom out: press 'Ctrl' + double click 'Right mouse-button'
        exit PopUp: press 'Esc'
      </p>
      <h2 id="simple-modal-controls">Tools</h2>
      <Divider/>
      <p id="simple-modal-controls-description">
        <ul>
        <li><Link target="_blank" href="https://www.mapbox.com/">mapbox</Link></li>
        <li><Link target="_blank" href="https://visgl.github.io/react-map-gl/">react-map-gl</Link></li>
        <li><Link target="_blank" href="https://material-ui.com/">Material UI</Link></li>
        <li><Link target="_blank" href="https://reactjs.org/">React</Link></li>
        </ul>
      </p>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        {<IconButton
          className={classes.Help}

          color="primary"
          onClick={handleOpen}> 
          <HelpOutlineIcon fontSize="large"/>
        </IconButton>}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-about"
          aria-describedby="simple-modal-controls-description"
        >
          {body}
        </Modal>
      </div>
    </ThemeProvider>
  );
}

export { InfoModal }