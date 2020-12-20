import AppBar from '@material-ui/core/AppBar'
import Page from 'material-ui-shell/lib/containers/Page'
import React, { useState } from 'react'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import { useIntl } from 'react-intl'
import ReactMapGL from 'react-map-gl'

export default function () {
  const [tab, setTab] = useState('one')
  const [viewport, setViewport] = React.useState({
    latitude: 49.2827,
    longitude: -123.1207,
    zoom:12,
    width:"100%",
    height:"100%"
  });

  const intl = useIntl()

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
    onViewportChange={(viewport) => setViewport(viewport)}
    />
  </Page>
  )
}





{/* <div>
{tab === 'one' && <div>One</div>}
{tab === 'two' && <div>Two</div>}
{tab === 'three' && <div>Three</div>}
</div> */}