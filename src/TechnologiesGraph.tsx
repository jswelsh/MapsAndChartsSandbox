// @ts-ignore

import React from 'react';

import * as am4core from "@amcharts/amcharts4/core";
// @ts-ignore
import * as am4charts from "@amcharts/amcharts4/charts";
import { makeStyles } from '@material-ui/core/styles';

// import { Paper } from '@material-ui/core';

import am4themes_dark from "@amcharts/amcharts4/themes/dark";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import * as am4plugins_forceDirected from "@amcharts/amcharts4/plugins/forceDirected"

const useStyles = makeStyles(() => ({
  TechnologiesGraph: {

    padding: 30,
    margin:'auto',
    width: "95%", minHeight: 800},
  }));


function TechnologiesGraph() {  
  const classes = useStyles();

  am4core.useTheme(am4themes_dark);
  am4core.useTheme(am4themes_animated);
  let chart = am4core.create("chartDiv", am4plugins_forceDirected.ForceDirectedTree);
  let networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())
  am4core.options.autoDispose = true;
  
  chart.data = [
    {
      name: "Technologies I Use", value: 300,
      children: [
        {
          name: "Languages", value: 200,
          children: [
            { name: "JavaScript", value: 100, children: [
              { name: "TypeScript", value: 100 }
            ]},
            { name: "Ruby", value: 100 },
            { name: "HTML", value: 100 },
            { name: "CSS", value: 100, children: [
              { name: 'styled-comp', value:'100'},
              { name: "SCSS", value: 100 },]},
            { name: "SQL", value: 100 },

          ]
        },{
          name: "Libraries", value: 200,
          children: [
            { name: "ActiveRecords", value: 100 },
            { name: "Material-UI", value: 100 },
            { name: "TensorFlow", value: 100 },
            { name: "Bootstrap", value: 100 },
            { name: "socket.IO", value: 100 },
            { name: "amCharts", value: 100},
            { name: "JQuery", value: 100 },
            { name: "Mapbox", value: 100 },
            { name: "React", value: 100 },
            { name: "Keras", value: 100 },
            { name: "Redux", value: 100 },]
        },{
          name: "Testing", value: 200,
          children: [
            { name: "StoryBook", value:100 },
            { name: "Cypress", value:100 },
            { name: "Mocha", value: 100 },
            { name: "Chai", value: 100 },
            { name: "Jest", value: 100 },]
        },{
          name: "Frameworks", value: 200,
          children: [
            { name: "Express", value: 100 },
            { name: "Rails", value: 100 },]
        },{
          name: "Environments", value: 200,
          children: [
            { name: "Node.js", value: 100 }]
          },{
            name: "Database", value: 200,
            children: [
              { name: "MongoDB", value: 100, children: [
                { name: "Atlas", value: 100 }]},
              { name: "NoSQL", value: 100 },
              { name: "AWS", value: 100 },
              { name: "MySQL", value: 100 },
              { name: "PostgreSQL", value: 100 }
              ]
            }
        ]
    }
  ];
  
  networkSeries.dataFields.value = "value";
  networkSeries.dataFields.name = "name";
  networkSeries.dataFields.children = "children";
  networkSeries.nodes.template.tooltipText = "{name}";
  networkSeries.nodes.template.fillOpacity = 1;
  
  networkSeries.nodes.template.label.text = "{name}"
  networkSeries.fontSize = 10;
  
  networkSeries.links.template.strokeWidth = 1;
  
  let hoverState = networkSeries.links.template.states.create("hover");
  hoverState.properties.strokeWidth = 3;
  hoverState.properties.strokeOpacity = 1;

  return ( 
    <div id="chartDiv"className={classes.TechnologiesGraph} >

    </div>
  );
}

export  { TechnologiesGraph }