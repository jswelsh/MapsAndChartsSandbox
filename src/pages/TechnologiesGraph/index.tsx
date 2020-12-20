// @ts-ignore

import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from "@amcharts/amcharts4/core";
import { useIntl } from 'react-intl'

// @ts-ignore
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"
// @ts-ignore
import Page from 'material-ui-shell/lib/containers/Page'
import * as data from "./data.json";
// @ts-ignore
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'

const useStyles = makeStyles(() => ({
  TechnologiesGraph: {
    width: "100%",
    height: "100vh"
  },
}));


const TechnologiesGraph = () => {
  const classes = useStyles();
  const intl = useIntl()
  useEffect(() => {

  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  let chart = am4core.create("chartDiv", am4plugins_forceDirected.ForceDirectedTree);
  let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
  am4core.options.autoDispose = true;
  
  chart.data = data.technologies;
  
  networkSeries.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter());
  networkSeries.dataFields.value = "value";
  networkSeries.dataFields.name = "name";
  networkSeries.dataFields.children = "children";
  networkSeries.nodes.template.fillOpacity = 1;  
  networkSeries.nodes.template.label.text = "[bold]{name}"
  networkSeries.fontSize = 10;
  networkSeries.maxLevels = 2;
  networkSeries.links.template.strokeWidth = 1;
  networkSeries.links.template.distance = 1.5;

  let hoverState = networkSeries.links.template.states.create("hover");
  hoverState.properties.strokeWidth = 3;
  hoverState.properties.strokeOpacity = 1;
  return () => {
    chart.dispose();
    };
  }, [])
  return ( 
    <Page
      pageTitle={intl.formatMessage({
        id: 'TechnologiesGraph',
        defaultMessage: 'Technologies Graph: A interactive Node graph of the Dev-Tech I use; Click the circles, I dare you...',
      })}>
      <Scrollbar>
        <div id="chartDiv"className={classes.TechnologiesGraph} />
      </Scrollbar>
    </Page>
  );
}

export default TechnologiesGraph