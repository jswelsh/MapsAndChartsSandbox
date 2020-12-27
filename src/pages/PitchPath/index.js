import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useIntl } from 'react-intl'
import ReactMapGL, {
  FullscreenControl,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Marker,
  Popup,
} from 'react-map-gl'
// import './../../../node_modules/mapbox-gl/dist/mapbox-gl.css'
import * as data from "./data.json"
import RoomIcon from '@material-ui/icons/Room'
import { IconButton, Tab, Tabs, Paper, TableCell, TableRow, TableBody, Table, TableContainer, TableHead,
} from '@material-ui/core'
import { InfoModal } from './InfoModal'

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
  FullscreenControl: {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px'},
  NavigationControl: {
    position: 'absolute',
    top: 72,
    left: 0,
    padding: '10px'
  },
  ScaleControl:{
    position: 'absolute',
    bottom: 36,
    left: 0,
    padding: '10px'
  },

}))

const controls = {
  FullscreenControl: <FullscreenControl/>,
  GeolocateControl: <GeolocateControl/>, 
  NavigationControl: <NavigationControl/>,
  ScaleControl: <ScaleControl/>
}
const tableRows ={
  HOME: 'Home Pitch For:',
  FACILITIES: 'Facilities:',
  CLUBHOUSE: 'Clubhouse:',
  PARKING: 'Parking:'
}
const tabs= ['light', 'traditional', 'dark']

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
  <Page pageTitle={intl.formatMessage({
      id: 'PitchPath',
      defaultMessage: 'Pitch Path',
    })}
    tabs={
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(e, t) => setTab(t)}
          aria-label="simple tabs example"
          centered
        >{tabs.map(tab => <Tab label={tab} value={tab} />)}
        </Tabs>
      </AppBar>
    }
  >
    <ReactMapGL 
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
    {...viewport}
    mapStyle={
      tab === "light" ? "mapbox://styles/jswelsh/ckix84ydp0p9c19rr498enr7y" :
      tab === "traditional" ? "mapbox://styles/mapbox/streets-v8" : 
      "mapbox://styles/jswelsh/ck26srect6cnn1cpacapltkyt"}
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
        setSelectedPitch(null)
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
          {Object.entries(tableRows).map(([key, value]) =>{
            return(
              selectedPitch[key] &&
              <TableRow>
                <TableCell>{value}</TableCell>
                <TableCell>{selectedPitch[key]}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
      </Popup>
    ) : null}
    {Object.entries(controls).map(([key, value]) =>{
      return( 
      <div className={classes[key]}>
        {value}
      </div>)
    })}
    <InfoModal />
    </ReactMapGL>
  </Page>
  )
}
