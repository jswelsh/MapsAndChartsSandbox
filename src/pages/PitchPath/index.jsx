import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';

import { useIntl } from 'react-intl'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as pitchData from "./data/pitches.json";
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Tab, Tabs, Paper, TableCell, TableRow, TableBody, Table, TableContainer, TableHead
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  light: {backgroundColor:'#d9d9d9'},
  traditional: {backgroundColor:'#eeece7'},
  dark: {backgroundColor:'#595959'},
  table:{
    margin:"auto"
  }
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
  const classes = useStyles();


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
      id: 'Pitch Path',
      defaultMessage: 'Pitch Path',
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
    {pitchData.features.map(pitch => (
      <Marker
        offsetTop={-24}
        offsetLeft={-24}
        key={pitch.properties.ID}
        latitude={pitch.geometry.coordinates[0]}
        longitude={pitch.geometry.coordinates[1]}
        >
        <IconButton
          size="medium"
          color="secondary"
          // className="marker-btn"
          onClick={e => {
            e.preventDefault();
            setSelectedPitch(pitch);
          }}
          >
          <RoomIcon />
        </IconButton>
      </Marker>
    ))}
    {selectedPitch ? (
    <Popup
      className={classes[tab]}
      latitude={selectedPitch.geometry.coordinates[0]}
      longitude={selectedPitch.geometry.coordinates[1]}
      onClose={() => {
        setSelectedPitch(null);
      }}
    >







    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell> <h2>{selectedPitch.properties.NAME}</h2></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {selectedPitch.properties.HOME &&
          <TableRow>
            <TableCell>Home Field:</TableCell>
            <TableCell>{selectedPitch.properties.HOME}</TableCell>
          </TableRow>}
          {selectedPitch.properties.FACILITIES &&
          <TableRow>
            <TableCell>Facilities:</TableCell>
            <TableCell>{selectedPitch.properties.FACILITIES}</TableCell>
          </TableRow>}
          {selectedPitch.properties.CLUBHOUSE &&
          <TableRow>
            <TableCell>Clubhouse:</TableCell>
            <TableCell>{selectedPitch.properties.CLUBHOUSE}</TableCell>
          </TableRow>}
          {selectedPitch.properties.PARKING &&
          <TableRow>
            <TableCell>Parking:</TableCell>
            <TableCell>{selectedPitch.properties.PARKING}</TableCell>
          </TableRow>}
        </TableBody>
      </Table>
    </TableContainer>
      </Popup>
    ) : null}
    </ReactMapGL>
  </Page>
  )
}
