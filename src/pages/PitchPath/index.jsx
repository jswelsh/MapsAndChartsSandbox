import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as pitchData from "./data/pitches.json";
import RoomIcon from '@material-ui/icons/Room';
import { IconButton, Tab, Tabs } from '@material-ui/core';

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
      latitude={selectedPitch.geometry.coordinates[0]}
      longitude={selectedPitch.geometry.coordinates[1]}
      onClose={() => {
        setSelectedPitch(null);
      }}
    >
      <div>
        <h2>{selectedPitch.properties.NAME}</h2>
        <p>{selectedPitch.properties.DESCRIPTION}</p>
      </div>
      </Popup>
    ) : null}
    </ReactMapGL>
  </Page>
  )
}
