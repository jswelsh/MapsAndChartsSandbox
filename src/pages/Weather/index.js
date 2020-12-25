/* Imports */
import {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { useIntl } from 'react-intl'
// @ts-ignore
import Page from 'material-ui-shell/lib/containers/Page'
// @ts-ignore
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
import * as data from "./data.json"

const useStyles = makeStyles(() => ({
  Weather: {
    width: "100%",
    height: "90vh",
    paddingTop: "10px",
    margin:"auto"
  },
}))


const Weather = () => {
  const intl = useIntl()
  const classes = useStyles()
  useEffect(() => {
am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

let chart = am4core.create("chartDiv", am4maps.MapChart);

chart.geodata = am4geodata_worldHigh;

chart.projection = new am4maps.projections.Mercator();
chart.homeZoomLevel = 30;
chart.homeGeoPoint = { longitude: -122.8, latitude: 52};

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
label.horizontalCenter = "middle";
label.verticalCenter = "top";
label.dy = 20;

imageSeries.data = data.nodes;
}, [])
return ( 
  <Page
    pageTitle={intl.formatMessage({
      id: 'Weather',
      defaultMessage: 'Weather',
    })}>
    <Scrollbar>
      <div id="chartDiv"className={classes.Weather} />
    </Scrollbar>
  </Page>
)
}

export default Weather
// https://www.amcharts.com/lib/images/weather/animated/thunder.svg