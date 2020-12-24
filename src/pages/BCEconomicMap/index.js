import {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useIntl } from 'react-intl'

import * as am4core from "@amcharts/amcharts4/core"
import * as am4maps from "@amcharts/amcharts4/maps"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from '@amcharts/amcharts4/themes/animated'
//@ts-ignore
import Page from 'material-ui-shell/lib/containers/Page'
//@ts-ignore
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'
//@ts-ignore
import BCMap from './bc.geojson'

const useStyles = makeStyles(() => ({
  BCEconomicMap: {
    height: "90vh",
    margin:"auto",
    paddingTop: "5vh",
  },
}))

const BCEconomicMap = () => {
  const intl = useIntl()
  const classes = useStyles()
  useEffect(() => {
    am4core.useTheme(am4themes_animated)

  var chart = am4core.create("chartDiv", am4maps.MapChart)
  chart.reverseGeodata = true
  chart.geodataSource.url = BCMap
  chart.projection = new am4maps.projections.Mercator()

  // zoom out on background click
  chart.chartContainer.background.events.on("hit", function () { zoomOut() })

  var colorSet = new am4core.ColorSet()
  var morphedPolygon

  var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries())
  polygonSeries.useGeodata = true

  // regions area look and behavior
  var polygonTemplate = polygonSeries.mapPolygons.template
  polygonTemplate.strokeOpacity = 1
  polygonTemplate.stroke = am4core.color("#ffffff")
  polygonTemplate.fillOpacity = 0.5
  polygonTemplate.tooltipText = "{name}"

  // de-saturate filter for countries
  var desaturateFilter = new am4core.DesaturateFilter()
  desaturateFilter.saturation = 0.55
  polygonTemplate.filters.push(desaturateFilter)

  // take a color from color set
  polygonTemplate.adapter.add("fill", function (fill, target) {
    return colorSet.getIndex(target.dataItem.index + 1)
  })

  // set fillOpacity to 1 when hovered
  var hoverState = polygonTemplate.states.create("hover")
  hoverState.properties.fillOpacity = 1

  // what to do when region is clicked
  polygonTemplate.events.on("hit", function (event) {
    event.target.zIndex = 1000000
    selectPolygon(event.target)
  })

  // Pie chart
  var pieChart = chart.seriesContainer.createChild(am4charts.PieChart)
  // Set width/heigh of a pie chart for easier positioning only
  pieChart.width = 100
  pieChart.height = 100
  pieChart.hidden = true

  // because defaults are 50, and it's not good with small countries
  pieChart.chartContainer.minHeight = 1
  pieChart.chartContainer.minWidth = 1

  var pieSeries = pieChart.series.push(new am4charts.PieSeries())
  pieSeries.dataFields.value = "value"
  pieSeries.dataFields.category = "category"
  pieSeries.data = [
    { value: 100, category: "Employed full-time" }, 
    { value: 50, category: "Self-employed" }, 
    { value: 1, category: "Unemployment rate" }]

  var dropShadowFilter = new am4core.DropShadowFilter()
  dropShadowFilter.blur = 4
  pieSeries.filters.push(dropShadowFilter)

  var sliceTemplate = pieSeries.slices.template
  sliceTemplate.fillOpacity = 1
  sliceTemplate.strokeOpacity = 0

  var activeState = sliceTemplate.states.getKey("active")
  activeState.properties.shiftRadius = 0 // no need to pull on click, as country circle under the pie won't make it good

  var sliceHoverState = sliceTemplate.states.getKey("hover")
  sliceHoverState.properties.shiftRadius = 0 // no need to pull on click, as country circle under the pie won't make it good

  //change default animation
  var hiddenState = pieSeries.hiddenState
  hiddenState.properties.startAngle = pieSeries.startAngle
  hiddenState.properties.endAngle = pieSeries.endAngle
  hiddenState.properties.opacity = 0
  hiddenState.properties.visible = false

  // series labels
  var labelTemplate = pieSeries.labels.template
  labelTemplate.nonScaling = true
  labelTemplate.fill = am4core.color("#FFFFFF")
  labelTemplate.fontSize = 10
  labelTemplate.background = new am4core.RoundedRectangle()
  labelTemplate.background.fillOpacity = 0.9
  labelTemplate.background.fill = am4core.color("#7678a0")
  labelTemplate.padding(4, 9, 4, 9)

  // we need pie series to hide faster to avoid strange pause after country is clicked
  pieSeries.hiddenState.transitionDuration = 200

  // country label
  var countryLabel = chart.chartContainer.createChild(am4core.Label)
  countryLabel.text = "Select a Region"
  countryLabel.fill = am4core.color("#2f315e")
  countryLabel.fontSize = 40

  countryLabel.hiddenState.properties.dy = 1000
  countryLabel.defaultState.properties.dy = 0
  countryLabel.valign = "middle"
  countryLabel.align = "right"
  countryLabel.paddingRight = 50
  countryLabel.hide(0)
  countryLabel.show()

  // select polygon
  function selectPolygon(polygon) {
    if(morphedPolygon !== polygon) {
      var animation = pieSeries.hide()
      if (animation) {
        animation.events.on("animationended", function () {
          morphToCircle(polygon)
        })
      }
      else {
        morphToCircle(polygon)
      }
    }
  }

  // fade out all countries except selected
  function fadeOut(exceptPolygon) {
    for (var i = 0; i < polygonSeries.mapPolygons.length; i++) {
      var polygon = polygonSeries.mapPolygons.getIndex(i)
      if (polygon !== exceptPolygon) {
        polygon.defaultState.properties.fillOpacity = 0.5
        polygon.animate([{
          property: "fillOpacity", to: 0.5 },{
          property: "strokeOpacity", to: 1 }],
        polygon.polygon.morpher.morphDuration)
      }
    }
  }

  function zoomOut() {
    if (morphedPolygon) {
      pieSeries.hide()
      morphBack()
      fadeOut()
      countryLabel.hide()
      morphedPolygon = undefined
    }
  }

  function morphBack() {
    if (morphedPolygon) {
      morphedPolygon.polygon.morpher.morphBack()
      var dsf = morphedPolygon.filters.getIndex(0)
      dsf.animate({ property: "saturation", to: 0.25 }, morphedPolygon.polygon.morpher.morphDuration)
    }
  }

  function morphToCircle(polygon) {
    var animationDuration = polygon.polygon.morpher.morphDuration
    // if there is a country already morphed to circle, morph it back
    morphBack()
    // morph polygon to circle
    polygon.toFront()
    polygon.polygon.morpher.morphToSingle = true
    var morphAnimation = polygon.polygon.morpher.morphToCircle()
    polygon.strokeOpacity = 0 // hide stroke for lines not to cross countries
    polygon.defaultState.properties.fillOpacity = 1
    polygon.animate({ property: "fillOpacity", to: 1 }, animationDuration)
    // animate desaturate filter
    var filter = polygon.filters.getIndex(0)
    filter.animate({ property: "saturation", to: 1 }, animationDuration)
    // save currently morphed polygon
    morphedPolygon = polygon
    // fade out all other
    fadeOut(polygon)
    // hide country label
    countryLabel.hide()
    if (morphAnimation) {
      morphAnimation.events.on("animationended", function () {
        zoomToCountry(polygon)
      })
    } else {
      zoomToCountry(polygon)
    }
  }

  function zoomToCountry(polygon) {
    console.log(polygon)
    var zoomAnimation = chart.zoomToMapObject(polygon, 1.3, true)
    if (zoomAnimation) {
      zoomAnimation.events.on("animationended", function () {
        showPieChart(polygon)
      })
    } else {
      showPieChart(polygon)
    }
  }


  function showPieChart(polygon) {
    polygon.polygon.measure()
    var radius = polygon.polygon.measuredWidth / 2 * polygon.globalScale / chart.seriesContainer.scale
    pieChart.width = radius * 2
    pieChart.height = radius * 2
    pieChart.radius = radius

    var centerPoint = am4core.utils.spritePointToSvg(polygon.polygon.centerPoint, polygon.polygon)
    centerPoint = am4core.utils.svgPointToSprite(centerPoint, chart.seriesContainer)

    pieChart.x = centerPoint.x - radius
    pieChart.y = centerPoint.y - radius

    var fill = polygon.fill
    var desaturated = fill.saturate(0.3)
    var uberDesaturated = fill.saturate(0.4)

    for (var i = 0; i < pieSeries.dataItems.length; i++) {
      var dataItem = pieSeries.dataItems.getIndex(i)
      dataItem.value = Math.round(Math.random() * 100)
      dataItem.slice.fill = am4core.color(am4core.colors.interpolate(
        fill.rgb,
        am4core.color("#ffffff").rgb,
        0.2 * i
      ))

      dataItem.label.background.fill = desaturated
      dataItem.tick.stroke = fill
    }

    pieSeries.show()
    pieChart.show()

    countryLabel.text = "{id}"
    countryLabel.dataItem = polygon.dataItem
    countryLabel.fill = uberDesaturated
    countryLabel.show()
  }
  return () => {
    chart.dispose()
    }
  }, [])
  return ( 
    <Page
      pageTitle={intl.formatMessage({
        id: 'BCEconomic',
        defaultMessage: 'BC Economic Map',
      })}>
      <Scrollbar>
        <div id="chartDiv"className={classes.BCEconomicMap} />
      </Scrollbar>
    </Page>
  )
}

export default BCEconomicMap