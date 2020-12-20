import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useEffect, useState } from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { useIntl } from 'react-intl'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import * as pitchData from "./data/pitches.json";
import RoomIcon from '@material-ui/icons/Room';

export default function () {
  const [tab, setTab] = useState('one')
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
      id: 'tabs_demo',
      defaultMessage: 'Tabs demo',
    })}
    tabs={
      <AppBar position="static">
        <Tabs
          value={tab}
          onChange={(e, t) => setTab(t)}
          aria-label="simple tabs example"
          centered
        >
          <Tab label="Item One" value="one" />
          <Tab label="Item Two" value="two" />
          <Tab label="Item Three" value="three" />
        </Tabs>
      </AppBar>
    }
  >
    <ReactMapGL 
    {...viewport}
    // mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    mapboxApiAccessToken={"pk.eyJ1IjoianN3ZWxzaCIsImEiOiJja2l4MGphcGozbG1yMnNwZG9nZnNkbDA0In0.9yfpYdKfH4z4CEopxNi0kQ"}
    // mapStyle="mapbox://styles/leighhalliday/cjufmjn1r2kic1fl9wxg7u1l4"
    onViewportChange={(viewport) => setViewport(viewport)}
    >

    {/* {console.log(pitchData.features[0].geometry.coordinates[0])} */}
        {pitchData.features.map(pitch => (
          // console.log(pitch.properties.ID, pitch.geometry.coordinates[0], pitch.geometry.coordinates[1])
          <Marker
            key={pitch.properties.ID}
            latitude={pitch.geometry.coordinates[0]}
            longitude={pitch.geometry.coordinates[1]}
            >
            <button
              // className="marker-btn"
              onClick={e => {
                e.preventDefault();
                setSelectedPitch(pitch);
              }}
              >
              <RoomIcon />
            </button> 
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





{/* <div>
{tab === 'one' && <div>One</div>}
{tab === 'two' && <div>Two</div>}
{tab === 'three' && <div>Three</div>}
</div> */}