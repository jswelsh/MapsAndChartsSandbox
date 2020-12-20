import DaschboardIcon from '@material-ui/icons/Dashboard'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import GetApp from '@material-ui/icons/GetApp'
import LanguageIcon from '@material-ui/icons/Language'
import LockIcon from '@material-ui/icons/Lock'
import React from 'react'
import StyleIcon from '@material-ui/icons/Style'
import allLocales from './locales'
import allThemes from './themes'

const getMenuItems = (props) => {
  const {
    intl,
    updateLocale,
    locale,
    menuContext,
    themeContext,
    a2HSContext,
    auth: authData,
  } = props
  const { isDesktop, isAuthMenuOpen, useMiniMode, setMiniMode } = menuContext
  const { themeID, setThemeID } = themeContext
  const { auth, setAuth } = authData
  const { isAppInstallable, isAppInstalled, deferredPrompt } = a2HSContext

  const localeItems = allLocales.map((l) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: l.locale }),
      onClick: () => {
        updateLocale(l.locale)
      },
      leftIcon: <LanguageIcon />,
    }
  })

  const isAuthorised = auth.isAuthenticated

  const themeItems = allThemes.map((t) => {
    return {
      value: undefined,
      visible: true,
      primaryText: intl.formatMessage({ id: t.id }),
      onClick: () => {
        setThemeID(t.id)
      },
      leftIcon: <StyleIcon style={{ color: t.color }} />,
    }
  })

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
      /* leftIcon: <DaschboardIcon />, */
    },
    {
      value: '/technologies_graph',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Technologies Graph' }),
      /* leftIcon: <DaschboardIcon />, */
    },
    {
      value: '/bc_economic_map',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'BC Economic Map' }),
      /* leftIcon: <DaschboardIcon />, */
    },
    {
      value: '/canadian_polygon_map',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Canadian Poly Map' }),
      /* leftIcon: <DaschboardIcon />, */
    },{
      value: '/tech_tags_graph',
      visible: isAuthorised,
      primaryText: intl.formatMessage({ id: 'Tech Tags Graph' }),
      /* leftIcon: <DaschboardIcon />, */
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
