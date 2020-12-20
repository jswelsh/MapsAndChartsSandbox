// @ts-ignore

import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as data from "./data.json";
import { useIntl } from 'react-intl'
// @ts-ignore
import * as am4core from "@amcharts/amcharts4/core";
// @ts-ignore
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
// @ts-ignore
import Page from 'material-ui-shell/lib/containers/Page'
// @ts-ignore
import Scrollbar from 'material-ui-shell/lib/components/Scrollbar'

import * as am4plugins_wordCloud from "@amcharts/amcharts4/plugins/wordCloud";
const useStyles = makeStyles(() => ({
  TechTagsGraph: {
    width: "100%",
    height: "100vh"
  }
}));

const TechTagsGraph = () => {
  const classes = useStyles();
  const intl = useIntl()
  useEffect(() => {
    am4core.useTheme(am4themes_animated);

    let chart = am4core.create("chartDiv", am4plugins_wordCloud.WordCloud);
    let series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries());
    series.randomness = 0.1;
    series.rotationThreshold = 0.5;
    series.data = data.tags
    series.dataFields.word = "tag";
    series.dataFields.value = "count";
    series.heatRules.push({
      "target": series.labels.template,
      "property": "fill",
      "min": am4core.color("#00c5cc"),
      "max": am4core.color("#ff85ff"),
      "dataField": "value"
    });
    series.labels.template.url = "https://stackoverflow.com/questions/tagged/{word}";
    series.labels.template.urlTarget = "_blank";
    series.labels.template.tooltipText = "{word}: {value}";
    
    let hoverState = series.labels.template.states.create("hover");
    hoverState.properties.fill = am4core.color("#86e860");

    return () => {
      chart.dispose();
    };
  }, [])
  return ( 
    <Page
      pageTitle={intl.formatMessage({
        id: 'TechTagsGraph',
        defaultMessage: 'Technology Tags: Interactive tag map; Most Popular Tags @ Stack Overflow, tags link to Stack Overflow',
      })}>
      <Scrollbar>
        <div id="chartDiv"className={classes.TechTagsGraph} />
      </Scrollbar>
    </Page>
  );
}

export default TechTagsGraph