import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { useIntl } from 'react-intl'
import ReactMapGL, { 
  Marker, 
  Popup, 
  GeolocateControl, 
  FullscreenControl, } from 'react-map-gl'
import * as data from "./data.json";
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Tab, Tabs, Paper, TableCell, TableRow, TableBody, Table, TableContainer, TableHead
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  PopUp: {opacity:'100%'},
  GeolocateControl: {  
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px'},
  FullscreenControl: {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'},
}));

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
      defaultMessage: 'Pitch Path: A Rugby Pitch locator; press esc to exit popups',
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
        <div className={classes.GeolocateControl}>
          <GeolocateControl />
        </div>
        <div className={classes.FullScreenControl}>
          <FullscreenControl />
        </div>
    </ReactMapGL>
  </Page>
  )
}
