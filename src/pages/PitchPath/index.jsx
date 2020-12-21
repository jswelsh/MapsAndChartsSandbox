import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { makeStyles, Theme, ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';

import { useIntl } from 'react-intl'
import ReactMapGL, { 
  FullscreenControl, 
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Popup,
  Marker,
} from 'react-map-gl'
import * as data from "./data.json";
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Tab, Tabs, Paper, TableCell, TableRow, TableBody, Table, TableContainer, TableHead, Modal, Divider
} from '@material-ui/core';
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
  station: {
    borderRadius: '20px',
    paddingRight: '12px',
    margin: '-12px',
    color: 'transparent',
    lineHeight: '24px',
    fontSize: '13px',
    whiteSpace: 'nowrap',
    '&span': {
      display: 'none',
    },
    "&:hover": {
      background: 'rgba(0,0,0,0.8)',
      color: '#fff',
      "&span": {
        display: 'inline-block'
      },
    },
    "&before": {
      content: ' ',
      display: "inline-block",
      width: "8px",
      height: "8px",
      background: "red",
      borderRadius: "8px",
      margin: "0 8px",
    },
  },


  



  PopUp: {opacity:'100%'},
  GeolocateControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'},
  FullScreenControl: {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'},
  navStyle: {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px'
  },
  scaleControlStyle:{
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
  },
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
    left: 42,
  }
}));

function SimpleModal() {
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
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
    <div>
      {open === false && <IconButton
        className={classes.Help}
        size="medium"
        color="primary"
        onClick={handleOpen}> 
        <HelpOutlineIcon />
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

export default function () {
  const [tab, setTab] = useState(localStorage.getItem('theme:type'))
  const [selectedPitch, setSelectedPitch] = useState(null)
  const [viewport, setViewport] = React.useState({
    latitude: 49.2827,
    longitude: -123.1207,
    zoom:12,
    width:"100%",
    height:"100%"
  })
  const classes = useStyles()
  const intl = useIntl()
  
  useEffect(() => {
    const listener = e => {
      if (e.key === 'Escape') {
        setSelectedPitch(null)
      }
    }
    window.addEventListener('keydown', listener)
    return () => {
      window.removeEventListener('keydown', listener)
    }
  },[])
  return (
    <Page
    pageTitle={intl.formatMessage({
      id: 'PitchPath',
      defaultMessage: 'Pitch Path: A Rugby Pitch locator',
    })}
    tabs={
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(e, t) => setTab(t)}
          aria-label="simple tabs example"
          centered
        >
          <Tab label= "light" value= "light" />
          <Tab label= "traditional" value= "traditional" />
          <Tab label= "dark" value= "dark" />
        </Tabs>
      </AppBar>
    }
  >
    <ReactMapGL 
    {...viewport}
    mapStyle={
      tab === "light" ? "mapbox://styles/jswelsh/ckix84ydp0p9c19rr498enr7y" :
      tab === "traditional" ? "mapbox://styles/mapbox/streets-v8" : 
      "mapbox://styles/jswelsh/ck26srect6cnn1cpacapltkyt"}
    mapboxApiAccessToken={"pk.eyJ1IjoianN3ZWxzaCIsImEiOiJja2l4MGphcGozbG1yMnNwZG9nZnNkbDA0In0.9yfpYdKfH4z4CEopxNi0kQ"}
    onViewportChange={(viewport) => setViewport(viewport)}
    >
    {data.pitches.map(pitch => (
      <Marker
        offsetTop={-24}
        offsetLeft={-24}
        key={pitch.ID}
        latitude={pitch.COORDINATES[0]}
        longitude={pitch.COORDINATES[1]}
        >
        <div className={classes.station}>
        <IconButton
          size="medium"
          color="secondary"
          // className="marker-btn"
          onClick={e => {
            e.preventDefault()
            setSelectedPitch(pitch)}}
          >
          <RoomIcon />
        </IconButton>
        <span>{pitch.NAME}</span>
      </div>

      </Marker>
    ))}
    {selectedPitch ? (
    <Popup
      className={classes.PopUp}
      latitude={selectedPitch.COORDINATES[0]}
      longitude={selectedPitch.COORDINATES[1]}
      onClose={() => {
        setSelectedPitch(null);
      }}
    >
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> <h2>{selectedPitch.NAME}</h2></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPitch.HOME &&
          <TableRow>
            <TableCell>Home Pitch For:</TableCell>
            <TableCell>{selectedPitch.HOME}</TableCell>
          </TableRow>}
          {selectedPitch.FACILITIES &&
          <TableRow>
            <TableCell>Facilities:</TableCell>
            <TableCell>{selectedPitch.FACILITIES}</TableCell>
          </TableRow>}
          {selectedPitch.CLUBHOUSE &&
          <TableRow>
            <TableCell>Clubhouse:</TableCell>
            <TableCell>{selectedPitch.CLUBHOUSE}</TableCell>
          </TableRow>}
          {selectedPitch.PARKING &&
          <TableRow>
            <TableCell>Parking:</TableCell>
            <TableCell>{selectedPitch.PARKING}</TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
      </Popup>
    ) : null}
        <div className={classes.FullScreenControl}>
          <FullscreenControl />
        </div>
        <div className={classes.GeolocateControl}>
          <GeolocateControl />
        </div>
        <div className={classes.navStyle}>
          <NavigationControl />
        </div>
        <div className={classes.scaleControlStyle}>
          <ScaleControl />
        </div>
            <SimpleModal />
    </ReactMapGL>
  </Page>
  )
}
