// @ts-ignore

import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import * as am4core from "@amcharts/amcharts4/core";
// @ts-ignore
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"
// @ts-ignore
import Page from 'material-ui-shell/lib/containers/Page'
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
  useEffect(() => {

  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  let chart = am4core.create("chartDiv", am4plugins_forceDirected.ForceDirectedTree);
  let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
  am4core.options.autoDispose = true;
  
  chart.data = [
    {
      name: "Technologies I Use", value: 500,
      children: [
        {
          name: "Languages", value: 200,
          children: [
            { name: "JavaScript", value: 150, children: [
              { name: "TypeScript", value: 150 }
            ]},
            { name: "Ruby", value: 150 },
            { name: "HTML", value: 150 },
            { name: "CSS", value: 150, children: [
              { name: 'styled-comp', value:'150'},
              { name: "SCSS", value: 150 },]},
            { name: "SQL", value: 150 },

          ]
        },{
          name: "Libraries", value: 200,
          children: [
            { name: "ActiveRecords", value: 150 },
            { name: "Material-UI", value: 150 },
            { name: "TensorFlow", value: 150 },
            { name: "Bootstrap", value: 150 },
            { name: "socket.IO", value: 150 },
            { name: "amCharts", value: 150},
            { name: "JQuery", value: 150 },
            { name: "Mapbox", value: 150 },
            { name: "React", value: 150 },
            { name: "Keras", value: 150 },
            { name: "Redux", value: 150 },]
        },{
          name: "Testing", value: 200,
          children: [
            { name: "StoryBook", value:150 },
            { name: "Cypress", value:150 },
            { name: "Mocha", value: 150 },
            { name: "Chai", value: 150 },
            { name: "Jest", value: 150 },]
        },{
          name: "Frameworks", value: 200,
          children: [
            { name: "Express", value: 150 },
            { name: "Rails", value: 150 },]
        },{
          name: "Environments", value: 200,
          children: [
            { name: "Node.js", value: 150 }]
          },{
            name: "Databases", value: 200,
            children: [
              { name: "MongoDB", value: 150, children: [
                { name: "Atlas", value: 150 }]},
              { name: "NoSQL", value: 150 },
              { name: "MySQL", value: 150 },
              { name: "PostgreSQL", value: 150 }
              ]
            },{
              name: "Platforms", value:200, children: [
                { name: "AWS", value:150 },
                { name: "Firebase", value:150 },
                { name: "Heroku", value:150 },
                { name: "Netlify", value:150 },
              ]
            }
        ]
    }
  ];
  networkSeries.nodes.template.outerCircle.filters.push(new am4core.DropShadowFilter());

  networkSeries.dataFields.value = "value";
  networkSeries.dataFields.name = "name";
  networkSeries.dataFields.children = "children";
  // networkSeries.nodes.template.tooltipText = "{name}";
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
    
    <Page>
      <Scrollbar>
        <div id="chartDiv"className={classes.TechnologiesGraph} />
      </Scrollbar>
    </Page>

  );
}

export default TechnologiesGraph