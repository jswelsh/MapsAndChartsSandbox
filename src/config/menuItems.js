import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import GetApp from '@material-ui/icons/GetApp'
import BarChartIcon from '@material-ui/icons/BarChart';
import MapIcon from '@material-ui/icons/Map';
import LockIcon from '@material-ui/icons/Lock'
import React from 'react'

const getMenuItems = (props) => {
  const {
    intl,
    menuContext,
    a2HSContext,
    auth: authData,
  } = props
  const { isAuthMenuOpen } = menuContext
  const { auth, setAuth } = authData
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext

  const isAuthorised = auth.isAuthenticated


  if (isAuthMenuOpen || !isAuthorised) {
    return [
      {
        value: '/signin',
        onClick: isAuthorised
          ? () => {
              setAuth({ isAuthenticated: false })
            }
          : () => {},
        visible: true,
        primaryText: isAuthorised
          ? intl.formatMessage({ id: 'sign_out' })
          : intl.formatMessage({ id: 'sign_in' }),
        leftIcon: isAuthorised ? <ExitToAppIcon /> : <LockIcon />,
      }
    ]
  }
  return [
    {
      value: '/home',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'home' }),
    },{
      value: '/pitch_path',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Pitch Path' }),
      leftIcon: <MapIcon/>,
    },
    {
      value: '/technologies_graph',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Technologies Graph' }),
      leftIcon:  <BarChartIcon/>,
    },
    {
      value: '/bc_economic_map',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'BC Economic Map' }),
      leftIcon: <MapIcon/>,
    },
    {
      value: '/weather',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Weather Map' }),
      leftIcon: <MapIcon/>,
    },{
      value: '/tech_tags_graph',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Tech Tags Graph' }),
      leftIcon: <BarChartIcon/>,
    },
    {
      value: '/canadian_polygon_map',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Canadian Poly Map' }),
      leftIcon: <MapIcon/>,
    },
    {
      value: null,
      visible: isAppInstallable && !isAppInstalled,
      onClick: () => {
        deferredPrompt.prompt()
      },
      primaryText: intl.formatMessage({
        id: 'install',
        defaultMessage: 'Install',
      }),
      leftIcon: <GetApp />,
    },
  ]
}
export default getMenuItems
