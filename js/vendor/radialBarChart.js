/********************************************************************************
* Copyright (c) 2013 Peter Cook 																								*
*																																								*
* Permission is hereby granted, free of charge, to any person obtaining a copy 	*
* of this software and associated documentation files (the "Software"), to deal *
* in the Software without restriction, including without limitation the rights 	*
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 		*
* copies of the Software, and to permit persons to whom the Software is 				*
* furnished to do so, subject to the following conditions: 											*
* 																																							*
* The above copyright notice and this permission notice shall be included in 		*
* all copies or substantial portions of the Software. 													*
*																																								*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 		*
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 			*
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 	*
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 				*
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, *
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN 		*
* THE SOFTWARE. 																																*
********************************************************************************/

function radialBarChart() {

	// CREATEING THE ARRAY WITH LABELS
	var hours = [];
	var h1 = 14;
	var h2 = 0;
	for(var i=0; i<24; i++) {

		if(i<10) {
			hours.push(h1<10 ? "0" + h1.toString() : h1.toString());
			h1 = h1 +1;
		}
		else {
			hours.push(h2<10 ? "0" + h2.toString() : h2.toString());
			h2 = h2 + 1;
		}
	}

	// CREATEING VARIABLE FOR CHOSEN PIECE
	var chosen = 0;
  chart.setChosen = function(value) {
    chart.chosen = value;

    console.log("set chosen to " + chart.chosen)

  }
/*
	// GLOBAL FUNCTION TO CALL WHEN CHANGING THE CHOSEN PIECE
	this.setChosenPieceGlobal = function() {
		consfole.log("in setChosenPieceGlobal");
		setChosenPiece();
	}
  
	// FUNCTION TO CALL WHEN CHANGING THE CHOSEN PIECE
	function setChosenPiece() {
    console.log("in setChosenPiece");
		chosen = 6;
	}
*/
  // Configurable variables
  var margin = {top: 40, right: 20, bottom: 20, left: 20};
  var barHeight = 100;
  var reverseLayerOrder = false;
  var barColors = undefined;
  var capitalizeLabels = false;
  var domain = [0, 100];
  var tickValues = undefined;
  var colorLabels = false;
  var tickCircleValues = [];
  var transitionDuration = 1000;

  // Scales & other useful things
  var numBars = null;
  var barScale = null;
  var keys = null;
  var labelRadius = 0;


  function init(d) {
    barScale = d3.scale.linear().domain(domain).range([0, barHeight]);

    keys = d3.map(d[0].data).keys();
    numBars = keys.length;

    // Radius of the key labels
    labelRadius = barHeight * 1.025;   
  }

  function svgRotate(a) {
    return 'rotate('+ +a +')';
  }

  function svgTranslate(x, y) {
    return 'translate('+ +x +','+ +y +')';
  }

  function initChart(container) {
    var g = d3.select(container)
      .append('svg')
      .style('width', 2 * barHeight + margin.left + margin.right + 'px')
      .style('height', 2 * barHeight + margin.top + margin.bottom + 'px')
      .append('g')
      .classed('radial-barchart', true)
        .attr('transform', svgTranslate(margin.left + barHeight, margin.top + barHeight));

    // Concentric circles at specified tick values
    g.append('g')
      .classed('tick-circles', true)
      .selectAll('circle')
      .data(tickCircleValues)
      .enter()
      .append('circle')
      .attr('r', function(d) {return barScale(d);})
      .style('fill', 'none');
  }

  function renderOverlays(container) {
    var g = d3.select(container).select('svg g.radial-barchart');

    // Spokes
    g.append('g')
      .classed('spokes', true)
      .selectAll('line')
      .data(keys)
      .enter()
      .append('line')
      .attr('y2', -barHeight)
      .attr('transform', function(d, i) {return svgRotate(i * 360 / numBars);});

    // Axis
    var axisScale = d3.scale.linear().domain(domain).range([0, -barHeight]);
    var axis = d3.svg.axis().scale(axisScale).orient('right');
    if(tickValues)
      axis.tickValues(tickValues);
    g.append('g')
      .classed('axis', true)
      .call(axis);

    // Outer circle
    g.append('circle')
      .attr('r', barHeight)
      .classed('outer', true)
      .style('fill', 'none');

    // Labels
    var labels = g.append('g')
      .classed('labels', true);

    labels.append('def')
      .append('path')
      .attr('id', 'label-path')
      .attr('d', 'm0 ' + -labelRadius + ' a' + labelRadius + ' ' + labelRadius + ' 0 1,1 -0.01 0');

    labels.selectAll('text')
      .data(keys)
      .enter()
      .append('text')
      .style('text-anchor', 'middle')
      .style('fill', function(d, i) {
        return colorLabels ? barColors[i % barColors.length] : null;})
      .append('textPath')
      .attr('xlink:href', '#label-path')
      // changes where texts is anchored
      .attr('startOffset', function(d, i) {return i * 100 / numBars + 10 / numBars + '%';})
      .text(function(d) { return hours[d] ;});
  }

  var firstChartDrawing = true;
  function chart(selection) {

  	console.log("in chart");

  	console.log("selection: " + selection);

    selection.each(function(d) {

    	console.log("in selection");

      	init(d);

      if(reverseLayerOrder)
        d.reverse();

      var g = d3.select(this).select('svg g.radial-barchart');

      // check whether chart has already been created
      var update = g[0][0] !== null; // true if data is being updated

      if(!update)
        initChart(this);

      g = d3.select(this).select('svg g.radial-barchart');

      // Layer enter/exit/update
      var layers = g.selectAll('g.layer')
        .data(d);

      layers
        .enter()
        .append('g')
        .attr('class', function(d, i) {
          return 'layer-' + i;
        })
        .classed('layer', true);

      layers.exit().remove();

      console.log('paths', layers.selectAll('path').length);

      // Segment enter/exit/update
      var segments = layers
        .selectAll('path')
        .data(function(d) {
          var m = d3.map(d.data);

          return m.values(); 
        });

      segments
        .enter()
        .append('path')
        .style('fill', function(d, i) {
          if(!barColors) return;

          //var test = chart.updateGlobal();
          //console.log("test: " + test);
          if(i == chosen) {
          	//chosen = chosen+1;
            return "blue";
          }
          return barColors[i % barColors.length];

        });

      if (firstChartDrawing) {
	      segments
	        .enter()
	        .append('path')
	        .style('fill', function(d, i) {
	          if(!barColors) return "";

	          //var test = chart.updateGlobal();
	          //console.log("test: " + test);
	          console.log("chosen: " + chosen);
	          if(i == chosen) {
	          	//chosen = chosen+1;
	            return "blue";
	          }
	          return barColors[i % barColors.length];
	        });
     			segments.exit().remove();
	        firstChartDrawing = false;
	    } else {

	      segments
	        .selectAll('path')
	        .style('fill', function(d, i) {
	          if(!barColors) return "";

	          //var test = chart.updateGlobal();
	          //console.log("test: " + test);
	          console.log("chosen: " + chosen);
	          if(i == chosen) {
	          	//chosen = chosen+1;
	            return "blue";
	          }
	          return barColors[i % barColors.length];
	        });
	    }


      
      segments
        .transition()
        .duration(transitionDuration)
        .attr('d', d3.svg.arc().innerRadius(0).outerRadius(or).startAngle(sa).endAngle(ea))
			

      if(!update)
        renderOverlays(this);
    });

  }

  /* Arc functions */
  or = function(d, i) {
    return barScale(d);
  }
  sa = function(d, i) {
    return (i * 2 * Math.PI) / numBars;
  }
  ea = function(d, i) {
    return ((i + 1) * 2 * Math.PI) / numBars;
  }

  /* Configuration getters/setters */
  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.barHeight = function(_) {
    if (!arguments.length) return barHeight;
    barHeight = _;
    return chart;
  };

  chart.reverseLayerOrder = function(_) {
    if (!arguments.length) return reverseLayerOrder;
    reverseLayerOrder = _;
    return chart;
  };

  chart.barColors = function(_) {
    if (!arguments.length) return barColors;
    barColors = _;
    return chart;
  };

  chart.capitalizeLabels = function(_) {
    if (!arguments.length) return capitalizeLabels;
    capitalizeLabels = _;
    return chart;
  };

  chart.domain = function(_) {
    if (!arguments.length) return domain;
    domain = _;
    return chart;
  };

  chart.tickValues = function(_) {
    if (!arguments.length) return tickValues;
    tickValues = _;
    return chart;
  };

  chart.colorLabels = function(_) {
    if (!arguments.length) return colorLabels;
    colorLabels = _;
    return chart;
  };

  chart.tickCircleValues = function(_) {
    if (!arguments.length) return tickCircleValues;
    tickCircleValues = _;
    return chart;
  };

  chart.transitionDuration = function(_) {
    if (!arguments.length) return transitionDuration;
    transitionDuration = _;
    return chart;   
  };

  return chart;
}