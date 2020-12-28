/* Imports */
import React, { useEffect, useState } from 'react'
import axios from 'axios';

import { makeStyles, useTheme } from '@material-ui/core/styles'
import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh"
import am4themes_dark from "@amcharts/amcharts4/themes/dark"
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
import { useIntl } from 'react-intl'
// @ts-ignore
import Page from 'material-ui-shell/lib/containers/Page'
// @ts-ignore
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import { regions, iconMap } from "./data"
import { Button, Menu, MenuItem } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { InfoModal } from './InfoModal'


const useStyles = makeStyles(() => ({
  Weather: {
    width: "100%",
    height: "100%",
    margin:"auto"
  },
  PopOver: {
    position: 'absolute',
    top: 18,
    right: 64,
    padding: '10px'},

}))

const Weather = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null)
  const [reports, setReports] = useState([])
  const [selectedRegion, setSelectedRegion] = useState('westCoast')

  console.log(theme)
  const intl = useIntl()
  const classes = useStyles()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  };
  const handleClose = (region) => {
    setSelectedRegion(region)
    setAnchorEl(null)
  };
    useEffect(() => {
      axios
      .get(`https://api.openweathermap.org/data/2.5/group?id=${(regions[selectedRegion].cities.map(city => city.id)).join()}&units=metric&appid=${process.env.REACT_APP_WEATHER_ACCESS_TOKEN}`)
      .then(res => res.data.list)
      .then(weatherLists => weatherLists.map((report, index) => {return {
        latitude: report.coord.lat,
        longitude: report.coord.lon,
        imageURL: `https://www.amcharts.com/lib/images/weather/animated/${iconMap[report.weather[0].id]}`,
        width: 32,
        height: 32,
        label: `${report.name}: ${report.main.temp}°C`
      }}))
      .then(res => setReports(res))
    }, [selectedRegion])

  useEffect(() => {
    if(theme.palette.type === 'dark' ) {
      console.log('dark',theme.palette.type === 'dark');
      am4core.unuseTheme(am4themes_spiritedaway)
      am4core.useTheme(am4themes_dark)
    }
    if(theme.palette.type === 'light') {
      console.log('light',theme.palette.type === 'light');
      am4core.unuseTheme(am4themes_dark)
      am4core.useTheme(am4themes_spiritedaway)
    }  
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create("chartDiv", am4maps.MapChart);

    chart.geodata = am4geodata_worldHigh;
    chart.projection = new am4maps.projections.Mercator()
    chart.homeZoomLevel = regions[selectedRegion].zoom
    chart.homeGeoPoint = { 
      longitude: regions[selectedRegion].coords.longitude,
      latitude: regions[selectedRegion].coords.latitude
    }

    let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.exclude = ["AQ"];
    polygonSeries.useGeodata = true;
    polygonSeries.nonScalingStroke = true;
    polygonSeries.strokeOpacity = 0.5;

    let imageSeries = chart.series.push(new am4maps.MapImageSeries());
    let imageTemplate = imageSeries.mapImages.template;
    imageTemplate.propertyFields.longitude = "longitude";
    imageTemplate.propertyFields.latitude = "latitude";
    imageTemplate.nonScaling = true;

    let image = imageTemplate.createChild(am4core.Image);
    image.propertyFields.href = "imageURL";
    image.width = 50;
    image.height = 50;
    image.horizontalCenter = "middle";
    image.verticalCenter = "middle";

    let label = imageTemplate.createChild(am4core.Label);
    label.text = "{label}";
    label.fill = theme.palette.text.primary;
    label.horizontalCenter = "middle";
    label.verticalCenter = "top";
    label.dy = 20;
    imageSeries.data = reports;
    return () => {
      chart.dispose()
      }
  }, [reports, selectedRegion, theme.palette.type, theme.palette.text.primary])
return ( 
  <Page
    pageTitle={intl.formatMessage({
      id: 'Weather',
      defaultMessage: 'Weather',
    })}>
    <Scrollbar>
        <div id="chartDiv"className={classes.Weather} />
      <InfoModal />
      <Button variant={'outlined'} color={'secondary'} aria-controls="simple-menu" aria-haspopup="true" className={classes.PopOver} onClick={handleClick} endIcon={<AddIcon />}>
        regions
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => handleClose(selectedRegion)}
        >
        <MenuItem onClick={() => handleClose('westCoast')}>WestCoast</MenuItem>
        <MenuItem onClick={() => handleClose('prairies')}>Prairies</MenuItem>
        <MenuItem onClick={() => handleClose('central')}>Central</MenuItem>
        <MenuItem onClick={() => handleClose('atlantic')}>Atlantic</MenuItem>
      </Menu>
    </Scrollbar>
  </Page>
)
}


export default Weather
