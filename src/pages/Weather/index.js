/* Imports */
import {useEffect} from 'react'
import axios from 'axios';

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
/* vancouver,  */
/* 
    {
        "id": 6173331,
        "name": "Vancouver",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -123.119339,
            "lat": 49.24966
        }
    },{
        "id": 5911606,
        "name": "Burnaby",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.952629,
            "lat": 49.266361
        }
    },{
        "id": 6087844,
        "name": "New Westminster",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.910919,
            "lat": 49.206779
        }
    },{
        "id": 6065686,
        "name": "Maple Ridge",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.601929,
            "lat": 49.219391
        }
    },{
        "id": 6111706,
        "name": "Port Coquitlam",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.769318,
            "lat": 49.266369
        }
    },{
        "id": 6122077,
        "name": "Richmond",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -67.659302,
            "lat": 46.074902
        }
    },{
        "id": 6159905,
        "name": "Surrey",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.825089,
            "lat": 49.10635
        }
    },{
        "id": 6049430,
        "name": "Langley",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.585892,
            "lat": 49.08297
        }
    },{
        "id": 5881792,
        "name": "Abbotsford",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.285873,
            "lat": 49.049679
        }
    },{
        "id": 5921357,
        "name": "Chilliwack",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -121.944267,
            "lat": 49.174679
        }
    },
    {
        "id": 6180144,
        "name": "Whistler",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -122.96946,
            "lat": 50.116402
        }
    },{
        "id": 5976783,
        "name": "Hope",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -121.441437,
            "lat": 49.382992
        }
    },
    {
        "id": 6147439,
        "name": "Sidney",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -123.402618,
            "lat": 48.649639
        }
    },
    {
        "id": 6174041,
        "name": "Victoria",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -123.369301,
            "lat": 48.432941
        }
    },
    {
        "id": 5943865,
        "name": "Duncan",
        "state": "",
        "country": "CA",
        "coord": {
            "lon": -123.70266,
            "lat": 48.782928
        }
    },

*/

/* 
{
  coord: {
    lon: 37.62,
    lat: 55.75
  },
    sys: {
    country: "RU",
    timezone: 10800,
    sunrise: 1608962361,
    sunset: 1608987652
  },
  weather: [
    {
      id: 804,
      main: "Clouds",
      description: "overcast clouds",
      icon: "04n"
    }
  ],
  main: {
    temp: 271.18,
    feels_like: 265.76,
    temp_min: 270.93,
    temp_max: 271.48,
    pressure: 1006,
    humidity: 79
  },
  visibility: 10000,
  wind: {
    speed: 4,
    deg: 240
  },
  clouds: {
    all: 90
  },
  dt: 1609002486,
  id: 524901,
  name: "Moscow"
},
*/

const imgMap ={
  rainy: "https://www.amcharts.com/lib/images/weather/animated/rainy-1.svg"
}
const ids = '6173331,5911606,6087844,6065686'
const apiKey = '247caa6dbdb7d1f3c1bf6aa5fac887ed'
let weatherReports = []
const Weather = () => {
  const intl = useIntl()
  const classes = useStyles()
  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/group?id=${ids}&units=metric&appid=${apiKey}`)
    .then((res) => res.data.list)
    .then((weatherLists) => weatherLists.map((report, index) => {return {
      latitude: report.coord.lat, 
      longitude: report.coord.lon,
      imageURL: `http://openweathermap.org/img/wn/${report.weather[0].icon}@2x.png`,
      label: `${report.name}: ${report.main.temp}°C`
    }}))
    .then((res) => {
      console.log(res)
      weatherReports = [res]})
  },[])
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

    imageSeries.data = weatherReports;
    return () => {
      chart.dispose()
      }
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