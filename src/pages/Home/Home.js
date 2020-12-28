import Page from 'material-ui-shell/lib/containers/Page'
import React from 'react'
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar/Scrollbar'
import { useIntl } from 'react-intl'
import BarChartIcon from '@material-ui/icons/BarChart';
import MapIcon from '@material-ui/icons/Map';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link as RouterLink, /* LinkProps as RouterLinkProps */ } from 'react-router-dom';

import { 
  Paper,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  Typography, } from '@material-ui/core';

const useStyles = makeStyles((theme) =>
  createStyles({
    List: {
      width: '100%',
      margin: 'auto',
      maxWidth: '600px',
      backgroundColor: theme.palette.background.paper,
    }, 
    Paper: {
      margin: 'auto',
      maxWidth: '600px',
      height: '100%'
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
  title: 'Weather app',
  subHeader: 'A Canadian weather applet',
  info: '',
  link: '/weather',
  icon: <MapIcon/>,
},{
  title: 'Technology Tags',
  subHeader: 'an interactive tag map',
  info: 'Most Popular Tags @ Stack Overflow, tags link to Stack Overflow',
  link: '/tech_tags_graph',
  icon: <BarChartIcon/>
},{
  title: 'Canada Polygon Map',
  subHeader: 'A basic map with an on hover effect',
  info: '',
  link: '/canadian_polygon_map',
  icon: <MapIcon/>
}
]

function ListItemLink(props) {
  const { icon, primary, secondary, to } = props;

  const renderLink = React.useMemo(
    () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} secondary={secondary}/>
      </ListItem>
    </li>
  );
}


function AppletsList() {
  const classes = useStyles();

  return (
    <Paper className={classes.Paper}>
      <List className={classes.List}>
        {applets.map( (applet, index) => { return (
          <>
            <ListItemLink 
              to={applet.link} 
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
              icon={applet.icon} />
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
      </Scrollbar>
    </Page>
  )
}
export default HomePage