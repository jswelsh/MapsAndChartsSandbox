import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import BarChartIcon from '@material-ui/icons/BarChart';
import MapIcon from '@material-ui/icons/Map';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

import { 
  Paper,
  List,
  Link,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography, } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: 'auto',
      maxWidth: '600px',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }),
);
const applets = [{
  title: 'Pitch Path',
  subHeader: 'A rugby pitch locator',
  info: '',
  link: '/pitch_path',
  icon: <MapIcon/>
},{
  title: 'Technologies Graph',
  subHeader: 'An interactive Node graph of the Dev-Tech I use',
  info: 'Click the circles to toggle show/hide functionality of each node',
  link: '/technologies_graph',
  icon: <BarChartIcon/>
},{
  title: 'BC Economic Map',
  subHeader: 'An interactive map of BC',
  info: 'Click an economic region to generate a randomize pie chart, real data not included',
  link: '/bc_economic_map',
  icon: <MapIcon/>
},{
  title: 'Canada Polygon Map',
  subHeader: 'A basic map with an on hover effect',
  info: '',
  link: '/canadian_polygon_map',
  icon: <MapIcon/>
},{
  title: 'Technology Tags',
  subHeader: 'an interactive tag map',
  info: 'Most Popular Tags @ Stack Overflow, tags link to Stack Overflow',
  link: '/tech_tags_graph',
  icon: <BarChartIcon/>
}
]
function AppletsList() {
  const classes = useStyles();

  return (
    <Paper>
      <List className={classes.root}>
        {applets.map( (applet, index) => { return (
          <>
            <ListItem alignItems="flex-start" component={RouterLink} to={applet.link}>
              <ListItemAvatar>
                <Avatar>
                  {applet.icon}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={applet.title}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                      >
                      {applet.subHeader}
                    </Typography>
                  </React.Fragment>
                }
                />
            </ListItem>
            {(applets.length !== index + 1) && <Divider variant="inset" component="li" />}
          </>
        )})}
      </List>
    </Paper>
  );
}

const HomePage = () => {
  const intl = useIntl()

  return (
    <Page pageTitle={intl.formatMessage({ id: 'home' })}>
      <Scrollbar
        style={{ height: '100%', width: '100%', display: 'flex', flex: 1 }}
      >
        <AppletsList/>
        {/* {intl.formatMessage({ id: 'home' })} */}
      </Scrollbar>
    </Page>
  )
}
export default HomePage