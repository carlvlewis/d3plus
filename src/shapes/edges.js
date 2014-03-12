//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.edges = function(vars) {

  var edges = vars.returned.edges

  if (!edges) var edges = []

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialization of Lines
  //----------------------------------------------------------------------------
  function init(l) {

    var opacity = vars.style.edges.opacity == 1 ? vars.style.edges.opacity : 0

    l
      .attr("opacity",opacity)
      .style("stroke-width",0)
      .style("stroke",vars.style.background)
      .style("fill","none")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Styling of Lines
  //----------------------------------------------------------------------------
  function style(l) {
    var marker = vars.edges.arrows.value ? "url(#d3plus_edge_marker_default)" : "none"
    l
      .style("stroke-width",vars.style.edges.width)
      .style("stroke",vars.style.edges.color)
      .attr("opacity",vars.style.edges.opacity)
      .attr("marker-start",function(){
        return vars.edges.arrows.direction.value == "source" ? marker : "none"
      })
      .attr("marker-end",function(){
        return vars.edges.arrows.direction.value == "target" ? marker : "none"
      })
      .attr("vector-effect","non-scaling-stroke")
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Positioning of Lines
  //----------------------------------------------------------------------------
  function line(l) {
    l
      .attr("x1",function(d){
        return d.source.d3plus.x
      })
      .attr("y1",function(d){
        return d.source.d3plus.y
      })
      .attr("x2",function(d){
        return d.target.d3plus.x
      })
      .attr("y2",function(d){
        return d.target.d3plus.y
      })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Positioning of Splines
  //----------------------------------------------------------------------------
  var diagonal = d3.svg.diagonal(),
      radial = d3.svg.diagonal()
        .projection(function(d){
          var r = d.y, a = d.x;
          return [r * Math.cos(a), r * Math.sin(a)];
        })

  function spline(l) {
    l
      .attr("d", function(d) {
        if (d.source.d3plus.r) {
          var x1 = d.source.d3plus.a,
              y1 = d.source.d3plus.r,
              x2 = d.target.d3plus.a,
              y2 = d.target.d3plus.r
          return radial({"source":{"x":x1,"y":y1},"target":{"x":x2,"y":y2}});

        }
        else {
          var x1 = d.source.d3plus.x,
              y1 = d.source.d3plus.y,
              x2 = d.target.d3plus.x,
              y2 = d.target.d3plus.y
          return diagonal({"source":{"x":x1,"y":y1},"target":{"x":x2,"y":y2}});
        }
      })
      .attr("transform",function(d){
        if (d.d3plus && d.d3plus.translate) {
          var x = d.d3plus.translate.x || 0
          var y = d.d3plus.translate.y || 0
          return "translate("+x+","+y+")"
        }
        else {
          "translate(0,0)"
        }
      })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculates and Draws Label for edge
  //----------------------------------------------------------------------------
  function label(d) {

    if (!d.d3plus) {
      d.d3plus = {}
    }

    delete d.d3plus_label

    if (vars.g.edges.selectAll("line, path").size() < vars.edges.large && vars.edges.label && d[vars.edges.label]) {

      if ("spline" in d.d3plus) {

        var length = this.getTotalLength(),
            center = this.getPointAtLength(length/2),
            prev = this.getPointAtLength((length/2)-(length*.1)),
            next = this.getPointAtLength((length/2)+(length*.1)),
            radians = Math.atan2(next.y-prev.y,next.x-prev.x),
            angle = radians*(180/Math.PI),
            bounding = this.parentNode.getBBox(),
            width = length*.8,
            x = d.d3plus.translate.x+center.x,
            y = d.d3plus.translate.y+center.y,
            translate = {
              "x": d.d3plus.translate.x+center.x,
              "y": d.d3plus.translate.y+center.y
            }

      }
      else {

        var bounds = this.getBBox()
            start = {"x": d.source.d3plus.x, "y": d.source.d3plus.y},
            end = {"x": d.target.d3plus.x, "y": d.target.d3plus.y},
            xdiff = end.x-start.x,
            ydiff = end.y-start.y,
            center = {"x": end.x-(xdiff)/2, "y": end.y-(ydiff)/2},
            radians = Math.atan2(ydiff,xdiff),
            angle = radians*(180/Math.PI),
            length = Math.sqrt((xdiff*xdiff)+(ydiff*ydiff)),
            width = length-(vars.style.labels.padding*2),
            x = center.x,
            y = center.y,
            translate = {
              "x": center.x,
              "y": center.y
            }

      }

      if (vars.edges.arrows.value) {
        var m = typeof vars.edges.arrows.value == "number" ? typeof vars.edges.arrows.value == "number" : 8
        width -= m*2
      }

      if (angle < -90 || angle > 90) {
        angle -= 180
      }

      d.d3plus_label = {
        "x": x,
        "y": y,
        "translate": translate,
        "w": width,
        "h": 15,
        "angle": angle,
        "anchor": "middle",
        "valign": "center",
        "color": d3plus.color.legible(vars.style.edges.color),
        "resize": false,
        "names": [vars.format(d[vars.edges.label])],
        "background": true
      }

    }

    d3plus.shape.labels(vars,d3.select(this.parentNode))

  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter/update/exit the Arrow Marker
  //----------------------------------------------------------------------------
  var marker_data = vars.edges.arrows.value ? ["default","highlight"] : []
  var marker = vars.defs.selectAll(".d3plus_edge_marker")
    .data(marker_data)

  var m = typeof vars.edges.arrows.value == "number" ? vars.edges.arrows.value : 10

  var marker_style = function(path) {
    path
      .attr("d",function(){
        if (vars.edges.arrows.direction.value == "target") {
          return "M -"+m*0.75+",-"+m/2+" L 0,0 L -"+m*0.75+","+m/2+" L -"+m*0.75+",-"+m/2
        }
        else {
          return "M "+m*0.75+",-"+m/2+" L 0,0 L "+m*0.75+","+m/2+" L "+m*0.75+",-"+m/2
        }
      })
      .attr("fill",function(d){
        if (d == "default") {
          return vars.style.edges.color
        }
        else {
          return vars.style.highlight.primary
        }
      })
  }

  if (vars.timing) {
    marker.exit().transition().duration(vars.timing)
      .attr("opacity",0)
      .remove()

    marker.select("path").transition().duration(vars.timing)
      .attr("opacity",1)
      .call(marker_style)
  }
  else {
    marker.exit().remove()
  }

  var opacity = vars.timing ? 0 : 1
  var enter = marker.enter().append("marker")
    .attr("id",function(d){
      return "d3plus_edge_marker_"+d
    })
    .attr("class","d3plus_edge_marker")
    .attr("orient","auto")
    .attr("markerWidth",10)
    .attr("markerHeight",10)
    .style("overflow","visible")
    .append("path")
    .attr("opacity",opacity)
    .call(marker_style)

  if (vars.timing) {
    enter.transition().duration(vars.timing)
      .attr("opacity",1)
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Bind "edges" data to lines in the "edges" group
  //----------------------------------------------------------------------------
  var line_data = edges.filter(function(l){
    return !l.d3plus || (l.d3plus && !("spline" in l.d3plus))
  })

  var lines = vars.g.edges.selectAll("g.d3plus_edge_line")
    .data(line_data,function(d){
      return d.source[vars.id.key]+"_"+d.target[vars.id.key]
    })

  var spline_data = edges.filter(function(l){
    return l.d3plus && l.d3plus.spline
  })

  var splines = vars.g.edges.selectAll("g.d3plus_edge_path")
    .data(spline_data,function(d){
      return d.source[vars.id.key]+"_"+d.target[vars.id.key]
    })

  if (vars.timing) {

    lines.exit().transition().duration(vars.timing)
      .attr("opacity",0)
      .remove()

    splines.exit().transition().duration(vars.timing)
      .attr("opacity",0)
      .remove()

    lines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .transition().duration(vars.timing/2)
      .attr("opacity",0)
      .remove()

    splines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .transition().duration(vars.timing/2)
      .attr("opacity",0)
      .remove()

    lines.selectAll("line").transition().duration(vars.timing)
      .call(line)
      .call(style)
      .each("end",label)

    splines.selectAll("path").transition().duration(vars.timing)
      .call(spline)
      .call(style)
      .each("end",label)

    lines.enter().append("g")
      .attr("class","d3plus_edge_line")
      .append("line")
      .call(line)
      .call(init)
      .transition().duration(vars.timing)
        .call(style)
        .each("end",label)

    splines.enter().append("g")
      .attr("class","d3plus_edge_path")
      .append("path")
      .call(spline)
      .call(init)
      .transition().duration(vars.timing)
        .call(style)
        .each("end",label)

  }
  else {

    lines.exit().remove()

    splines.exit().remove()

    lines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .remove()

    splines.selectAll("text.d3plus_label, rect.d3plus_label_bg")
      .remove()

    lines.selectAll("line")
      .call(line)
      .call(style)
      .call(label)

    splines.selectAll("path")
      .call(spline)
      .call(style)
      .call(label)

    lines.enter().append("g")
      .attr("class","d3plus_edge_line")
      .append("line")
      .call(line)
      .call(init)
      .call(style)
      .call(label)

    splines.enter().append("g")
      .attr("class","d3plus_edge_path")
      .append("path")
      .call(spline)
      .call(init)
      .call(style)
      .call(label)

  }

}
