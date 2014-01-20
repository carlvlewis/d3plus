(function(){
var d3plus = window.d3plus || {};
window.d3plus = d3plus;

d3plus.version = "1.0.1 - Blue";

d3plus.ie = /*@cc_on!@*/false;

d3plus.evt = {}; // stores all mouse events that could occur

// Modernizr touch events
if (window.Modernizr && Modernizr.touch) {
  d3plus.evt.click = "touchend"
  d3plus.evt.down = "touchstart"
  d3plus.evt.up = "touchend"
  d3plus.evt.over = "touchstart"
  d3plus.evt.out = "touchend"
  d3plus.evt.move = "touchmove"
} else {
  d3plus.evt.click = "click"
  d3plus.evt.down = "mousedown"
  d3plus.evt.up = "mouseup"
  if (d3plus.ie) {
    d3plus.evt.over = "mouseenter"
    d3plus.evt.out = "mouseleave"
  }
  else {
    d3plus.evt.over = "mouseover"
    d3plus.evt.out = "mouseout"
  }
  d3plus.evt.move = "mousemove"
}

// Modernizr SVG Capable Detect
d3plus.svg = true
if (window.Modernizr && Modernizr.svg === false) {
  d3plus.svg = false
}

d3plus.apps = {};
d3plus.color = {};
d3plus.console = {};
d3plus.data = {};
d3plus.shape = {};
d3plus.styles = {};
d3plus.tooltip = {};
d3plus.utils = {};
d3plus.variable = {};
d3plus.zoom = {};

d3plus.console.print = function(type,message,style) {
  if (d3plus.ie) console.log("[d3plus] "+message)
  else console[type]("%c[d3plus]%c "+message,"font-weight:bold;",style)
}
d3plus.console.log = function(message,style) {
  if (!style) var style = "font-weight:bold;"
  d3plus.console.print("log",message,style)
}
d3plus.console.group = function(message,style) {
  if (!style) var style = "font-weight:bold;"
  d3plus.console.print("group",message,style)
}
d3plus.console.warning = function(message,style) {
  if (!style) var style = "font-weight:bold;color:red;"
  message = "WARNING: "+message
  d3plus.console.print("log",message,style)
}
d3plus.console.groupEnd = function() {
  if (!d3plus.ie) console.groupEnd()
}
d3plus.console.time = function(message) {
  if (!d3plus.ie) console.time(message)
}
d3plus.console.timeEnd = function(message) {
  if (!d3plus.ie) console.timeEnd(message)
}
d3plus.public = {}

d3plus.public.active = {
  "key": null,
  "mute": [],
  "solo": [],
  "spotlight": {
    "accepted": [true,false],
    "default": false,
    "deprecates": ["spotlight"]
  }
}

d3plus.public.aggs = {
  "default": {},
  "deprecated": ["nesting_aggs"]
}

d3plus.public.axes = {
  "mirror": {
    "accepted": [true,false],
    "default": false,
    "deprecates": ["mirror_axis","mirror_axes"]
  },
  "static": {
    "accepted": [true,false],
    "default": true,
    "deprecates": ["static_axis","static_axes"]
  },
  "values": ["x","y"]
}

d3plus.public.attrs = {
  "default": {}
}

d3plus.public.color = {
  "deprecates": ["color_var"],
  "key": null,
  "mute": [],
  "solo": []
}

d3plus.public.container = {
  "default": null
}

d3plus.public.coords = {
  "default": null
}

d3plus.public.data = {
  "default": []
}

d3plus.public.depth = {
  "default": 0
}

d3plus.public.descs = {
  "default": {}
}

d3plus.public.dev = {
  "accepted": [true,false],
  "default": false
}

d3plus.public.error = {
  "default": false
}

d3plus.public.focus = {
  "default": null,
  "deprecates": ["highlight"]
}

d3plus.public.footer = {
  "default": false
}

d3plus.public.height = {
  "default": null
}

d3plus.public.icon = {
  "deprecates": ["icon_var"],
  "key": "icon"
}

d3plus.public.id = {
  "data_refresh": true,
  "deprecates": ["id_var","nesting"],
  "key": "id",
  "mute": {
    "default": [],
    "deprecates": ["filter"]
  },
  "nesting": ["id"],
  "solo": {
    "default": [],
    "deprecates": ["solo"]
  }
}

d3plus.public.labels = {
  "accepted": [true,false],
  "default": true
}

d3plus.public.links = {
  "deprecates": ["edges"],
  "default": null
}

d3plus.public.nodes = {
  "default": null
}

d3plus.public.number_format = function(number,key,vars) {
  
  if (key == vars.time.key) {
    return number
  }
  else if (number < 10) {
    return d3.round(number,2)
  }
  else if (number.toString().split(".")[0].length > 4) {
    var symbol = d3.formatPrefix(number).symbol
    symbol = symbol.replace("G", "B") // d3 uses G for giga
    
    // Format number to precision level using proper scale
    number = d3.formatPrefix(number).scale(number)
    number = parseFloat(d3.format(".3g")(number))
    return number + symbol;
  }
  else if (key == "share") {
    return d3.format(".2f")(number)
  }
  else {
    return d3.format(",f")(number)
  }
  
}

d3plus.public.order = {
  "key": null,
  "sort": {
    "accepted": ["asc","desc"],
    "default": "asc",
    "deprecates": ["sort"]
  }
}

d3plus.public.shape = {
  "accepted": ["circle","donut","line","square","area","coordinates"],
  "default": null,
  "interpolate": {
    "accepted": ["linear","step","step-before","step-after","basis","basis-open","cardinal","cardinal-open","monotone"],
    "default": "linear",
    "deprecates": ["stack_type"]
  }
}

d3plus.public.size = {
  "data_refresh": true,
  "deprecates": ["value"],
  "key": null,
  "mute": [],
  "scale": {
    "accepted": ["sqrt","linear","log"],
    "deprecates": ["size_scale"],
    "default": "sqrt"
  },
  "solo": []
}

d3plus.public.temp = {
  "deprecates": ["else_var","else"],
  "key": null,
  "mute": [],
  "solo": []
}

d3plus.public.text = {
  "deprecates": ["name_array","text_var"],
  "key": null,
  "mute": [],
  "solo": []
}

d3plus.public.text_format = function(text,key,vars) {
  if (!text) return ""
  return text.charAt(0).toUpperCase() + text.substr(1).toLowerCase()
  
}

d3plus.public.time = {
  "data_refresh": true,
  "deprecates": ["year","year_var"],
  "key": null,
  "mute": [],
  "solo": []
}

d3plus.public.title = {
  "default": null,
  "sub": {
    "default": null,
    "deprecates": ["sub_title"]
  },
  "total": {
    "default": false,
    "deprecates": ["total_bar"],
    "object": true
  }
}

d3plus.public.tooltip = {
  "deprecates": ["tooltip_info"],
  "default": [],
  "html": null
}

d3plus.public.total = {
  "deprecates": ["total_var"],
  "key": null,
  "mute": [],
  "solo": []
}

d3plus.public.type = {
  "default": "tree_map"
}

d3plus.public.width = {
  "default": null
}

d3plus.public.x = {
  "data_refresh": true,
  "deprecates": ["xaxis","xaxis_val","xaxis_var"],
  "domain": null,
  "key": null,
  "lines": [],
  "mute": [],
  "reset": ["x_range"],
  "scale": {
    "accepted": ["linear","log","continuous","share"],
    "default": "linear",
    "deprecates": ["layout","unique_axis","xaxis_scale"]
  },
  "stacked": {
    "accepted": [true,false],
    "default": false
  },
  "solo": [],
  "zerofill": {
    "accepted": [true,false],
    "default": false
  }
}

d3plus.public.y = {
  "data_refresh": true,
  "deprecates": ["yaxis","yaxis_val","yaxis_var"],
  "domain": null,
  "key": null,
  "lines": [],
  "mute": [],
  "reset": ["y_range"],
  "scale": {
    "accepted": ["linear","log","continuous","share"],
    "default": "linear",
    "deprecates": ["layout","unique_axis","yaxis_scale"]
  },
  "stacked": {
    "accepted": [true,false],
    "default": false
  },
  "solo": [],
  "zerofill": {
    "accepted": [true,false],
    "default": false
  }
}

d3plus.public.zoom = {
  "scroll": {
    "accepted": [true,false],
    "default": false,
    "deprecates": ["scroll_zoom"]
  }
}
d3plus.viz = function() {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Public Variables with Default Settings
  //-------------------------------------------------------------------
  
  var vars = {
    "autodraw": false,
    "color_domain": [],
    "color_scale": d3.scale.sqrt().interpolate(d3.interpolateRgb),
    "footer_text": function() {
      var text = vars.tooltip.html || vars.tooltip.default.long ? "Click for More Info" : null
      return vars.text_format(text)
    },
    "format": function(value,key) {
      if (typeof value === "number") return vars.number_format(value,key,vars)
      if (typeof value === "string") return vars.text_format(value,key,vars)
      else return JSON.stringify(value)
    },
    "g": {"apps":{}},
    "graph": {},
    "margin": {"top": 0, "right": 0, "bottom": 0, "left": 0},
    "mute": [],
    "solo": [],
    "style": d3plus.styles.default
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Main drawing function
  //-------------------------------------------------------------------
  chart = function(selection) {
    selection.each(function() {

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // If placing into a new container, remove it's contents
      // and check text direction.
      //-------------------------------------------------------------------
      if (vars.container.changed) {
        d3.select(vars.container.default).html("")
        var dir = d3.select("html").attr("dir")
        if (dir) {
          vars.style.labels.dir = dir
        }
        else {
          vars.style.labels.dir = "ltr"
        }
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Run setup function if app has it
      //-------------------------------------------------------------------
      if (d3plus.apps[vars.type.default].setup) {
        d3plus.apps[vars.type.default].setup(vars)
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Set container element to vars.parent
      //-------------------------------------------------------------------
      if (!vars.parent) vars.parent = d3.select(this)
      var sizes = ["width","height"]
      sizes.forEach(function(s){
        if (!vars[s].default) {
          var p = parseFloat(vars.parent.style(s),10)
          vars[s].default = p ? p : window["inner"+s.charAt(0).toUpperCase()+s.slice(1)]
        }
      })

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Format Data as Necessary
      //-------------------------------------------------------------------
      d3plus.data.format(vars);
      
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Determine Color Range if Necessary
      //-------------------------------------------------------------------
      d3plus.data.color(vars);

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Remove All Tooltips associated with App (and previous app)
      //-------------------------------------------------------------------
      if (vars.type.previous && vars.type.default != vars.type.previous) {
        d3plus.tooltip.remove(vars.type.previous);
      }
      d3plus.tooltip.remove(vars.type.default);

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Enter Elements
      //-------------------------------------------------------------------
      
      // Enter SVG
      vars.svg = vars.parent.selectAll("svg#d3plus").data(["d3plus"]);
      vars.svg.enter().append("svg")
        .attr("id","d3plus")
        .attr('width',vars.width.default)
        .attr('height',vars.height.default)

      // Enter BG Rectangle
      vars.g.bg = vars.svg.selectAll("rect#bg").data(["bg"]);
      vars.g.bg.enter().append("rect")
        .attr("id","bg")
        .attr("fill",vars.style.background)
        .attr('width',vars.width.default)
        .attr('height',vars.height.default)
    
      // Enter Title Group
      vars.g.titles = vars.svg.selectAll("g#titles").data(["titles"])
      vars.g.titles.enter().append("g")
        .attr("id","titles")
    
      // Enter Footer Group
      vars.g.footer = vars.svg.selectAll("g#footer").data(["footer"])
      vars.g.footer.enter().append("g")
        .attr("id","footer")
        .attr("transform","translate(0,"+vars.height.default+")")

      // Enter App Clipping Mask
      vars.g.clipping = vars.svg.selectAll("clippath#clipping").data(["clipping"])
      vars.g.clipping.enter().append("clippath")
        .attr("id","clipping")
        .append("rect")
          .attr("width",vars.app_width)
          .attr("height",vars.app_height)
          .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
    
      // Enter Container Group
      vars.g.container = vars.svg.selectAll("g#container").data(["container"])
      vars.g.container.enter().append("g")
        .attr("id","container")
        .attr("clip-path","url(#clipping)")
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
    
      // Enter Zoom Group
      vars.g.zoom = vars.g.container.selectAll("g#zoom").data(["zoom"])
      vars.g.zoom.enter().append("g")
        .attr("id","zoom")
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
    
      // Enter App Background Group
      vars.g.app = vars.g.zoom.selectAll("g#app").data(["app"])
      vars.g.app.enter().append("g")
        .attr("id","app")
        
      // Enter App Group
      vars.g.apps[vars.type.default] = vars.g.app.selectAll("g#"+vars.type.default).data([vars.type.default])
      vars.g.apps[vars.type.default].enter().append("g")
        .attr("id",vars.type.default)
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
    
      // Enter Links Group
      vars.g.links = vars.g.zoom.selectAll("g#links").data(["links"])
      vars.g.links.enter().append("g")
        .attr("id","links")
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
    
      // Enter App Data Group
      vars.g.data = vars.g.zoom.selectAll("g#data").data(["data"])
      vars.g.data.enter().append("g")
        .attr("id","data")
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
        
      vars.defs = vars.svg.selectAll("defs").data(["defs"])
      vars.defs.enter().append("defs")
      
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Title and Size Calculations
      //-------------------------------------------------------------------
      vars.app_width = vars.width.default;
      d3plus.utils.titles(vars);
      vars.app_height = vars.height.default - vars.margin.top - vars.margin.bottom;
      vars.graph.height = vars.app_height-vars.graph.margin.top-vars.graph.margin.bottom;

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Update Elements
      //-------------------------------------------------------------------
      
      // Update Parent Element
      vars.parent
        .style("width",vars.width.default+"px")
        .style("height",vars.height.default+"px")
        .style("overflow","hidden")
        
      // Update SVG
      vars.svg.transition().duration(vars.style.timing.transitions)
          .attr('width',vars.width.default)
          .attr('height',vars.height.default)
    
      // Update Background Rectangle
      vars.g.bg.transition().duration(vars.style.timing.transitions)
          .attr('width',vars.width.default)
          .attr('height',vars.height.default)
          
      // Update App Clipping Rectangle
      vars.g.clipping.select("rect").transition().duration(vars.style.timing.transitions)
        .attr("width",vars.app_width)
        .attr("height",vars.app_height)
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
        
      // Update App Background Groups
      vars.g.app.selectAll("g").transition().duration(vars.style.timing.transitions)
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
        
      // Update Links Group
      vars.g.links.selectAll("g").transition().duration(vars.style.timing.transitions)
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
    
      // Update Data Group
      vars.g.data.transition().duration(vars.style.timing.transitions)
        .attr("transform","translate("+vars.margin.left+","+vars.margin.top+")")
      
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Check to see if we have all required variables set
      //-------------------------------------------------------------------
      var reqs = ["id"]
      if (d3plus.apps[vars.type.default].requirements) {
        reqs = reqs.concat(d3plus.apps[vars.type.default].requirements)
      }
      var missing = []
      reqs.forEach(function(r){
        var key = "key" in vars[r] ? "key" : "default"
        if (!vars[r][key]) missing.push(r)
      })
      if (missing.length) {
        vars.internal_error = "The following variables need to be set: "+missing.join(", ")
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Check to see if we have all required libraries
      //-------------------------------------------------------------------
      var reqs = ["d3"]
      if (d3plus.apps[vars.type.default].libs) {
        reqs = reqs.concat(d3plus.apps[vars.type.default].libs)
      }
      var missing = []
      reqs.forEach(function(r){
        if (!window[r]) missing.push(r)
      })
      if (missing.length) {
        vars.internal_error = "The following libraries need to be loaded: "+missing.join(", ")
      }

      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Check to see if the requested app supports the set shape
      //-------------------------------------------------------------------
      if (!vars.shape.default) {
        vars.shape.default = d3plus.apps[vars.type.default].shapes[0]
      }
      else if (d3plus.apps[vars.type.default].shapes.indexOf(vars.shape.default) < 0) {
        d3plus.console.warning("\""+vars.shape.default+"\" is not an accepted shape for the \""+vars.type.default+"\" app, please use one of the following: \""+d3plus.apps[vars.type.default].shapes.join("\", \"")+"\"")
        vars.shape.previous = vars.shape.default
        vars.shape.default = d3plus.apps[vars.type.default].shapes[0]
        d3plus.console.log("Defaulting shape to \""+vars.shape.default+"\"")
      }
  
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Hide the previous app, if applicable
      //-------------------------------------------------------------------
      if (vars.type.previous && vars.type.default != vars.type.previous && vars.g.apps[vars.type.previous]) {
        if (vars.dev.default) d3plus.console.group("Hiding \"" + vars.type.previous + "\"")
        vars.g.apps[vars.type.previous].transition().duration(vars.style.timing.transitions)
          .attr("opacity",0)
        if (vars.dev.default) d3plus.console.groupEnd();
      }
      
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Draw the specified app
      //-------------------------------------------------------------------
      if (vars.dev.default) d3plus.console.group("Drawing \"" + vars.type.default + "\"")
      // Set vars.group to the app's specific group element
      vars.group = vars.g.apps[vars.type.default]
      // Make the group visible if there is data
      vars.group.transition().duration(vars.style.timing.transitions)
        .attr("opacity",function(){
          if (vars.app_data.length == 0 || vars.internal_error) return 0
          else return 1
        })
      // Reset mouse events for the app to use
      vars.mouse = {}
      // Call the app's draw function, returning formatted data
      var returned = null
      
      vars.returned = {
          "nodes": null,
          "links": null
        }
          
      if (!vars.internal_error) {
        returned = d3plus.apps[vars.type.default].draw(vars)
      }
          
      if (returned instanceof Array) {
        vars.returned.nodes = returned
      }
      else if (returned) {
        if (returned.nodes) {
          vars.returned.nodes = returned.nodes
        }
        if (returned.links) {
          vars.returned.links = returned.links
        }
      }
      
      if (!vars.returned.nodes || !(vars.returned.nodes instanceof Array) || !vars.returned.nodes.length) {
        if (vars.dev.default) d3plus.console.log("No data returned by app.")
        vars.returned.nodes = [] 
      }
      
      // Draw links based on the data
      d3plus.shape.links(vars,vars.returned.links)
      
      // Draw nodes based on the data
      d3plus.shape.draw(vars,vars.returned.nodes)
        
      if (vars.dev.default) d3plus.console.groupEnd();
      
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Check for Errors
      //-------------------------------------------------------------------
      if (!vars.internal_error) {
        if ((!vars.error.default && !vars.app_data) || !vars.returned.nodes.length) {
          vars.internal_error = "No Data Available"
        }
        else if (vars.type.default == "rings" && !vars.connections[vars.focus.default]) {
          vars.app_data = null
          vars.internal_error = "No Connections Available"
        }
        else if (vars.error.default) {
          vars.app_data = null
          if (vars.error.default === true) {
            vars.internal_error = "Error"
          }
          else {
            vars.internal_error = vars.error.default
          }
        }
        else {
          vars.internal_error = null
        }
      }
      d3plus.utils.error(vars)
      
      //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      // Reset all "change" values to false
      //-------------------------------------------------------------------
      function reset_change(obj) {
        if (obj.changed) obj.changed = false
        else {
          for (o in obj) {
            if (Object.keys(d3plus.public).indexOf(o) >= 0) {
              if (o == "changed" && obj[o]) obj[o] = false
              else if (obj[o] != null && typeof obj[o] == "object") {
                reset_change(obj[o])
              }
            }
          }
        }
      }
      reset_change(vars)
      
    });
    
    return chart;
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Expose Public Variables
  //-------------------------------------------------------------------
  
  chart.csv = function(x) {
    
    if (x instanceof Array) var columns = x
    
    var csv_to_return = [],
        titles = [],
        title = vars.title.default || "My D3plus App Data"
        
    title = title.replace(/\ /g,'-')

    if (!columns) {
      var columns = [vars.id.key]
      if (vars.time.key) columns.push(vars.time.key)
      if (vars.size.key) columns.push(vars.size.key)
      if (vars.text.key) columns.push(vars.text.key)
    }
    
    columns.forEach(function(c){
      titles.push(vars.format(c))
    })
    
    csv_to_return.push(titles);
    
    vars.returned.nodes.forEach(function(n){
      var arr = []
      columns.forEach(function(c){
        arr.push(d3plus.variable.value(vars,n,c))
      })
      csv_to_return.push(arr)
    })
    
    var csv_data = "data:text/csv;charset=utf-8,"
    csv_to_return.forEach(function(c,i){
      dataString = c.join(",");
      csv_data += i < csv_to_return.length ? dataString + "\n" : dataString;
    })
    
    if (d3plus.ie) {
      var blob = new Blob([csv_data],{
        type: "text/csv;charset=utf-8;",
      })
      navigator.msSaveBlob(blob,title+".csv")
    }
    else {
      var encodedUri = encodeURI(csv_data);
      var link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download",title+".csv");
      link.click();
    }
    
    return csv_to_return;
    
  };
  
  chart.draw = function(x) {
    if (x) {
      if (typeof x == "boolean") {
        vars.autodraw = x
      }
      else {
        d3plus.console.warning(".draw() only accepts booleans to change the \"autodraw\" functionality.")
      }
    }
    if (!vars.container.default) {
      d3plus.console.warning("Please define a container div using .container()")
    }
    else if (d3.select(vars.container.default).empty()) {
      d3plus.console.warning("Cannot find <div> on page matching: \""+vars.container+"\"")
    }
    else {
      d3.select(vars.container.default).call(chart)
    }
    return chart;
  }

  chart.style = function(x) {
    if (!arguments.length) return vars.style;
    
    function check_depth(object,property,depth) {
      if (typeof depth == "object") {
        for (d in depth) {
          if (object[property] === undefined) {
            d3plus.console.warning("\""+property+"\" cannot be set");
          }
          else {
            check_depth(object[property],d,depth[d]);
          }
        }
      }
      else {
        if (object[property] === undefined) {
          d3plus.console.warning("\""+property+"\" cannot be set");
        }
        else {
          object[property] = depth;
        }
      }
    }
    
    if (typeof x == "object") {
      check_depth(vars,"style",x)
    }
    else if (typeof x == "string") {
      if (d3plus.styles[x]) {
        vars.style = plus.styles[x]
      }
      else {
        d3plus.console.warning("Style \""+x+"\" does not exist. Installed styles are: \""+Object.keys(d3plus.styles).join("\", \"")+"\"");
      }
    }
    else {
      d3plus.console.warning(".style() only accepts strings or keyed objects.");
    }
    
    return chart;
  };
  
  Object.keys(d3plus.public).forEach(function(p){
    
    // give default values to this .viz()
    vars[p] = d3plus.public[p]
    
    // detect available app types
    if (p == "type") {
      vars[p].accepted = Object.keys(d3plus.apps)
    }
    
    // create error messages for deprecated methods
    if (vars[p]) {
      function deprecate(obj) {
        for (o in obj) {
          if (o == "deprecates") {
            obj[o].forEach(function(d){
              chart[d] = (function(dep,n) {
                return function(x) {
                  d3plus.console.warning("\."+dep+"() method has been deprecated, please use the new \."+n+"() method.")
                  return chart;
                }
              })(d,p)
            })
          }
          else if (typeof obj[o] == "object") {
            deprecate(obj[o])
          }
        }
      }
      deprecate(vars[p])
    }
    
    // create method for variable
    
    chart[p] = (function(key) {
      return function(user) {

        if (!arguments.length) return vars[key];
        
        if (vars[key].reset) {
          vars[key].reset.forEach(function(r){
            vars[r] = null
          })
        }
        
        // determine default key type, if available
        if (vars[key].key !== undefined) var key_type = "key"
        else if (vars[key].default !== undefined) var key_type = "default"
        else var key_type = null
        
        if ((typeof user == "object" && key_type && !user[key_type] && !(Object.keys(user)[0] in vars[key]))
              || typeof user != "object") {
          set_value(vars[key],key_type,user)
        }
        else if (typeof user == "object") {
          check_object(vars,key,user)
        }
        else {
          d3plus.console.warning("Incompatible format for ."+key+"() method.")
        }
        
        function check_object(object,property,depth) {
          if (object[property] === undefined) {
            d3plus.console.warning("\""+property+"\" cannot be set.");
          }
          else {
            if (typeof depth == "object" && !(depth instanceof Array)) {
              if (object[property].object) {
                set_value(object[property],key_type,depth)
              }
              else {

                for (d in depth) {
                  check_object(object[property],d,depth[d]);
                }
                
              }
            }
            else {
              if (["solo","mute"].indexOf(property) >= 0) {
                object.changed = true
              }
              set_value(object,property,depth);
            }
          }
        }
        
        function update_array(arr,x) {
          // if the user has passed an array, use that
          if(x instanceof Array){
            arr = x;
          }
          // otherwise add/remove it from the array
          else if(arr.indexOf(x) >= 0){
            arr.splice(arr.indexOf(x), 1)
          }
          // element not in current filter so add it
          else {
            arr.push(x)
          }
          
          return arr
          
        }
        
        function set_value(a,b,c) {
          
          if (key == "type") {
            if (!a.accepted) {
              a.accepted = Object.keys(d3plus.apps)
            }
            
            if (a.accepted.indexOf(c) < 0) {
              for (app in d3plus.apps) {
                if (d3plus.apps[app].deprecates && d3plus.apps[app].deprecates.indexOf(c) >= 0) {
                  d3plus.console.warning(JSON.stringify(c)+" has been deprecated by "+JSON.stringify(app)+", please update your code.")
                  c = app
                }
              }
            }
            
          }
          
          if (vars.dev.default || key == "dev") {
            if (b == "default" || b == "key" || !b) {
              var text = "\."+key+"()"
            }
            else {
              var text = "\""+b+"\" of \."+key+"()"
            }
          }
          
          if (a.accepted && a.accepted.indexOf(c) < 0) {
            d3plus.console.warning(""+JSON.stringify(c)+" is not an accepted value for "+text+", please use one of the following: \""+a.accepted.join("\", \"")+"\"")
          }
          else if (!(a[b] instanceof Array) && a[b] == c || (a[b] && (a[b].key == c || a[b].default == c))) {
            if (vars.dev.default) d3plus.console.log(text+" was not updated because it did not change.")
          }
          else {
            if (b == "solo" || b == "mute") {
              if (a[b] instanceof Array) {
                a[b] = update_array(a[b],c)
                var arr = a[b]
              }
              else {
                a[b].default = update_array(a[b].default,c)
                var arr = a[b].default
              }
              if (key != "time") {
                if (arr.length && vars[b].indexOf(key) < 0) {
                  vars[b].push(key)
                }
                else if (!arr.length && vars[b].indexOf(key) >= 0) {
                  vars[b].splice(vars[b].indexOf(key), 1)
                }
              }
            }
            else if (key == "id" && b == "key") {

              if (c instanceof Array) {
                vars.id.nesting = c
                if (vars.depth.default < c.length) vars.id.key = c[vars.depth.default]
                else {
                  vars.id.key = c[0]
                  vars.depth.default = 0
                }
              }
              else {
                vars.id.key = c
                vars.id.nesting = [c]
                vars.depth.default = 0
              }
              a.changed = true
                
            }
            else if (key == "text" && b == "key") {

              if (!vars.text.array) vars.text.array = {}
              if (typeof c == "string") {
                vars.text.array[vars.id.key] = [c]
              }
              else if (c instanceof Array) {
                vars.text.array[vars.id.key] = c
              }
              else {
                vars.text.array = c
                var n = c[vars.id.key] ? c[vars.id.key] : c[Object.keys(c)[0]]
                vars.text.array[vars.id.key] = typeof n == "string" ? [n] : n
              }
              vars.text.key = vars.text.array[vars.id.key][0]
              a.changed = true
              
            }
            else if (key == "depth") {
              // Set appropriate depth and id
              if (c >= vars.id.nesting.length) vars.depth.default = vars.id.nesting.length-1
              else if (c < 0) vars.depth.default = 0
              else vars.depth.default = c;
              vars.id.key = vars.id.nesting[vars.depth.default]
              
              if (vars.text.array) {

                // Set appropriate name_array and text
                var n = vars.text.array[vars.id.key]
                if (n) {
                  vars.text.array[vars.id.key] = typeof n == "string" ? [n] : n
                  vars.text.key = vars.text.array[vars.id.key][0]
                }
                
              }
              
              a.changed = true
            }
            else if (key == "aggs") {
              for (agg in c) {
                if (a[b][agg] && a[b][agg] == c[agg]) {
                  if (vars.dev.default) d3plus.console.log("Aggregation for \""+agg+"\" is already set to \""+c[agg]+"\"")
                }
                else {
                  a[b][agg] = c[agg]
                  a.changed = true
                }
              }
            }
            else {
              if (typeof a[b] == "object" && a[b] != null && (a[b].key !== undefined || a[b].default !== undefined)) {
                var k = a[b].key !== undefined ? "key" : "default";
                a = a[b]
                b = k
              }
              a.previous = a[b]
              a[b] = c
              a.changed = true
            }
            
            if ((vars.dev.default || key == "dev") && (a.changed || ["solo","mute"].indexOf(b) >= 0)) {
              if (JSON.stringify(a[b]).length < 260) {
                d3plus.console.log(text+" has been set to "+JSON.stringify(a[b])+".")
              }
              else {
                d3plus.console.log(text+" has been set.")
              }
            }
          }
          
        }
        
        if (vars.autodraw) {
          return chart.draw()
        }
        else {
          return chart
        }
        
      }
    })(p)
  })

  return chart;
};
d3plus.apps.bubbles = {}
d3plus.apps.bubbles.data = "nested";
d3plus.apps.bubbles.fill = true;
d3plus.apps.bubbles.tooltip = "static"
d3plus.apps.bubbles.shapes = ["circle","donut"];
d3plus.apps.bubbles.scale = 1.05

d3plus.apps.bubbles.draw = function(vars) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Test for labels
  //-------------------------------------------------------------------
  var label_height = vars.labels.default && !vars.small ? 50 : 0
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Sort Data
  //-------------------------------------------------------------------
  var order = vars.order.key || vars.size.key
  vars.app_data.sort(function(a,b){
    var a_value = d3plus.variable.value(vars,a,order)
    var b_value = d3plus.variable.value(vars,b,order)
    return vars.order.sort.default == "asc" ? a_value-b_value : b_value-a_value
  })
    
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate rows and columns
  //-------------------------------------------------------------------
  if(vars.app_data.length == 1) {
    var columns = 1,
        rows = 1;
  }
  else if (vars.app_data.length < 4) {
    var columns = vars.app_data.length,
        rows = 1;
  } 
  else {
    var rows = Math.ceil(Math.sqrt(vars.app_data.length/(vars.app_width/vars.app_height))),
        columns = Math.ceil(Math.sqrt(vars.app_data.length*(vars.app_width/vars.app_height)));
  }

  if (vars.app_data.length > 0) {
    while ((rows-1)*columns >= vars.app_data.length) rows--
  }
  
  var column_width = vars.app_width/columns,
      column_height = vars.app_height/rows
      
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define size scale
  //-------------------------------------------------------------------
  if (!vars.app_data) vars.app_data = []
  
  var domain_min = d3.min(vars.app_data, function(d){ 
    if (!vars.size.key) return 0
    return d3plus.variable.value(vars,d,vars.size.key,null,"min")
  })
  
  var domain_max = d3.max(vars.app_data, function(d){ 
    if (!vars.size.key) return 0
    return d3plus.variable.value(vars,d,vars.size.key)
  })
  
  var padding = 5
  
  var size_min = 20
  var size_max = (d3.min([column_width,column_height])/2)-(padding*2)
  size_max -= label_height
  
  var size = d3.scale[vars.size.scale.default]()
    .domain([domain_min,domain_max])
    .range([size_min,size_max])
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate bubble packing
  //-------------------------------------------------------------------
  var pack = d3.layout.pack()
    .size([column_width-padding*2,column_height-padding*2-label_height])
    .value(function(d) { 
      if (!vars.size.key) return 0
      return d3plus.variable.value(vars,d,vars.size.key)
    })
    .padding(padding)
    .radius(function(d){ 
      return size(d) 
    })
    
  var data = []
  
  var row = 0
  vars.app_data.forEach(function(d,i){
    
    var temp = pack.nodes(d)
    
    var xoffset = (column_width*i) % vars.app_width,
        yoffset = column_height*row
        
    temp.forEach(function(t){
      if (!t.d3plus) t.d3plus = {}
      if (!t.d3plus.depth) t.d3plus.depth = t.depth
      t.xoffset = xoffset
      t.yoffset = yoffset+label_height
      if (t.depth < vars.depth.default) {
        t.d3plus.static = true
      }
      else {
        t.d3plus.static = false
      }
      if (temp.length == 1) {
        t.d3plus.label = false
      }
      else {
        t.d3plus.label = true
      }
    })
    
    data = data.concat(temp)
    
    if ((i+1) % columns == 0) {
      row++
    }
  
  })
  
  var downscale = size_max/d3.max(data,function(d){ return d.r })
  
  data.forEach(function(d){
    d.x = ((d.x-column_width/2)*downscale)+column_width/2
    d.d3plus.x = d.x+d.xoffset
    d.y = ((d.y-column_height/2)*downscale)+column_height/2
    d.d3plus.y = d.y+d.yoffset
    d.r = d.r*downscale
    d.d3plus.r = d.r
  })
  
  data.sort(function(a,b){
    return a.depth-b.depth
  })
  
  var label_data = data.filter(function(d){
    return d.depth == 0
  })
  
  var labels = vars.group.selectAll("text.bubble_label")
    .data(label_data,function(d){
      if (!d.d3plus.label_height) d.d3plus.label_height = 0
      return d[vars.id.nesting[d.depth]]
    })
    
  function label_style(l) {
    l
      .attr("x",function(d){
        return d.d3plus.x
      })
      .attr("y",function(d){
        return d.d3plus.y-d.r-d.d3plus.label_height-padding
      })
      .attr("text-anchor","middle")
      .style("font-weight",vars.style.font.weight)
      .attr("font-family",vars.style.font.family)
      .attr("font-size","12px")
      .style("fill",function(d){
        var color = d3plus.variable.color(vars,d)
        return d3plus.color.legible(color)
      })
      .each(function(d){
        if (d.r > 10 && label_height > 10) {
          var names = d3plus.variable.text(vars,d,d.depth)
          d3plus.utils.wordwrap({
            "text": names,
            "parent": this,
            "width": column_width-padding*2,
            "height": label_height
          })
        }
      })
      .attr("y",function(d){
        d.d3plus.label_height = d3.select(this).node().getBBox().height
        return d.d3plus.y-d.r-d.d3plus.label_height-padding
      })
      .selectAll("tspan")
        .attr("x",function(d){
          return d.d3plus.x
        })
  }
  
  labels.enter().append("text")
    .attr("class","bubble_label")
    .call(label_style)
    .attr("opacity",0)
    
  labels.transition().duration(vars.style.timing.transitions)
    .call(label_style)
    .attr("opacity",1)
    
  labels.exit()
    .attr("opacity",0)
    .remove()
  
  return data
//   
// 
//   
//   var max_size = d3.max(data_packed,function(d){return d.r;})*2,
//       downscale = (d3.min([vars.app_width/columns,(vars.app_height/rows)-title_height])*0.90)/max_size;
//       
//   var r = 0, c = 0;
//   data_packed.forEach(function(d){
//     
//     if (d.depth == 1) {
//       
//       if (vars.grouping != "active") {
//         var color = d3plus.variable.color(vars,d.children[0]);
//       }
//       else {
//         var color = "#cccccc";
//       }
//       
//       color = d3.rgb(color).hsl()
//       if (color.s > 0.9) color.s = 0.75
//       while (color.l > 0.75) color = color.darker()
//       color = color.rgb()
//       
//       groups[d.key] = {};
//       groups[d.key][vars.color] = color;
//       groups[d.key].children = d.children.length;
//       groups[d.key].key = d.key;
//       groups[d.key][vars.text.key] = d[vars.text.key];
//       groups[d.key].x = ((vars.app_width/columns)*c)+((vars.app_width/columns)/2);
//       groups[d.key].y = ((vars.app_height/rows)*r)+((vars.app_height/rows)/2)+(title_height/2);
//       groups[d.key].width = (vars.app_width/columns);
//       groups[d.key].height = (vars.app_height/rows);
//       groups[d.key].r = d.r*downscale;
// 
//       if (c < columns-1) c++
//       else {
//         c = 0
//         r++
//       }
//       
//     }
//     
//   })
//   
//   vars.app_data.forEach(function(d){
//     var parent = data_packed.filter(function(p){ 
//       if (d3plus.variable.value(vars,d[vars.id],vars.grouping) === false) var key = "false";
//       else if (d3plus.variable.value(vars,d[vars.id],vars.grouping) === true) var key = "true";
//       else var key = d3plus.variable.value(vars,d[vars.id],vars.grouping)
//       return key == p.key 
//     })[0]
//     d.x = (downscale*(d.x-parent.x))+groups[parent.key].x;
//     d.y = (downscale*(d.y-parent.y))+groups[parent.key].y;
//     d.r = d.r*downscale;
//   })
//     
//   //===================================================================
//   
//   //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//   // Set up initial SVG groups
//   //-------------------------------------------------------------------
//     
//   vars.parent_enter.append('g')
//     .attr('class','groups');
//     
//   vars.parent_enter.append('g')
//     .attr('class','bubbles');
//     
//   vars.parent_enter.append('g')
//     .attr('class','labels');
//     
//   //===================================================================
//   
//   //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//   // New labels enter, initialize them here
//   //-------------------------------------------------------------------
// 
//   if (vars.small) groups = {};
// 
//   var group = d3.select("g.groups").selectAll("g.group")
//     .data(d3.values(groups),function(d){ return d.key })
//     
//   group.enter().append("g")
//     .attr("class", "group")
//     .attr("transform", function(d){ return "translate("+d.x+","+d.y+")"; })
//     .each(function(d){
//       
//       if (vars.grouping == "active") {
//         var t = d[vars.text.key] == "true" ? "Fully "+vars.active : "Not Fully "+vars.active
//       } else {
//         var t = d[vars.text.key]
//       }
//         
//       d3.select(this).append("text")
//         .attr("opacity",0)
//         .attr("text-anchor","middle")
//         .attr("font-weight",vars.style.font.weight)
//         .attr("font-size","12px")
//         .attr("font-family",vars.style.font.family)
//         .attr("fill",d3plus.color.legible(d[vars.color]))
//         .attr('x',0)
//         .attr('y',function(dd) {
//           return -(d.height/2)-title_height/4;
//         })
//         .each(function(){
//           d3plus.utils.wordwrap({
//             "text": t,
//             "parent": this,
//             "width": d.width,
//             "height": 30
//           })
//         })
//       
//     });
//     
//   group.transition().duration(vars.style.timing.transitions)
//     .attr("transform", function(d){ return "translate("+d.x+","+d.y+")"; })
//     .each(function(d){
//       
//       if (vars.style.group.background && d.children > 1) {
//         
//         var bg = d3.select(this).selectAll("circle")
//           .data([d]);
//         
//         bg.enter().append("circle")
//           .attr("fill", d[vars.color])
//           .attr("stroke", d[vars.color])
//           .attr("stroke-width",1)
//           .style('fill-opacity', 0.1 )
//           .attr("opacity",0)
//           .attr("r",d.r)
//         
//         bg.transition().duration(vars.style.timing.transitions)
//           .attr("opacity",1)
//           .attr("r",d.r);
//           
//       } else {
//         d3.select(this).select("circle").transition().duration(vars.style.timing.transitions)
//           .attr("opacity",0)
//           .remove();
//       }
//       
//       d3.select(this).select("text").transition().duration(vars.style.timing.transitions)
//         .attr("opacity",1)
//         .attr('y',function(dd) {
//           return -(d.height/2)-title_height/4;
//         })
//       
//     });
//     
//   group.exit().transition().duration(vars.style.timing.transitions)
//     .each(function(d){
//       
//       if (vars.style.group.background) {
//         d3.select(this).select("circle").transition().duration(vars.style.timing.transitions)
//           .attr("r",0)
//           .attr("opacity",0);
//       }
//       
//       d3.select(this).selectAll("text").transition().duration(vars.style.timing.transitions)
//         .attr("opacity",0);
//         
//     }).remove();
//     
//   //===================================================================

};
d3plus.apps.chart = {}
d3plus.apps.chart.data = "grouped";
d3plus.apps.chart.fill = true;
d3plus.apps.chart.deprecates = ["pie_scatter","scatter"];
d3plus.apps.chart.requirements = ["x","y"];
d3plus.apps.chart.tooltip = "static";
d3plus.apps.chart.shapes = ["circle","donut","line","square","area"];
d3plus.apps.chart.scale = {
    "circle": 1.1,
    "donut": 1.1,
    "square": 1.1
  };

d3plus.apps.chart.draw = function(vars) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // If there is data, run the needed calculations
  //-------------------------------------------------------------------
  if (vars.app_data.length) {
    
    if (!vars.tickValues) vars.tickValues = {}

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine X and Y axis
    //-------------------------------------------------------------------
    vars.continuous_axis = null
    vars.opp_axis = null
    vars.stacked_axis = null
    
    vars.axes.values.forEach(function(axis){
      
      if (vars[axis].stacked.default) {
        vars.stacked_axis = axis
      }
      if (!vars.continuous_axis && vars[axis].scale.default == "continuous") {
        vars.continuous_axis = axis
        vars.opp_axis = axis == "x" ? "y" : "x"
      }
      
      if (vars.data.changed || vars.depth.changed || !vars[axis+"_range"] || !vars.axes.static.default) {

        if (vars.dev.default) d3plus.console.time("determining "+axis+"-axis")
        if (vars[axis].scale.default == "share") {
          vars[axis+"_range"] = [0,1]
          vars.tickValues[axis] = d3plus.utils.buckets([0,1],11)
          vars.stacked_axis = axis
        }
        else if (vars[axis].stacked.default) {
          if (!vars.axes.static.default) {
            var range_data = vars.app_data
          }
          else {
            var range_data = vars.data.restricted.all
          }
          var xaxis_sums = d3.nest()
            .key(function(d){return d[vars.x.key] })
            .rollup(function(leaves){
              return d3.sum(leaves, function(d){
                return parseFloat(d3plus.variable.value(vars,d,vars[axis].key))
              })
            })
            .entries(range_data)
            
          vars[axis+"_range"] = [0,d3.max(xaxis_sums, function(d){ return d.values; })]
        }
        else if (vars[axis].domain instanceof Array) {
          vars[axis+"_range"] = vars[axis].domain
          vars.tickValues[axis] = d3plus.utils.uniques(vars.app_data,vars[axis].key)
          vars.tickValues[axis] = vars.tickValues[axis].filter(function(t){
            return t >= vars[axis+"_range"][0] && t <= vars[axis+"_range"][1]
          })
        }
        else if (!vars.axes.static.default) {
          vars[axis+"_range"] = d3.extent(vars.app_data,function(d){
            return parseFloat(d3plus.variable.value(vars,d,vars[axis].key))
          })
          vars.tickValues[axis] = d3plus.utils.uniques(vars.app_data,vars[axis].key)
        }
        else {
          var all_depths = []
          for (id in vars.id.nesting) {
            all_depths = all_depths.concat(vars.data.grouped[vars.id.nesting[id]].all)
          }
          vars[axis+"_range"] = d3.extent(all_depths,function(d){
            return parseFloat(d3plus.variable.value(vars,d,vars[axis].key))
          })
          vars.tickValues[axis] = d3plus.utils.uniques(vars.data.restricted.all,vars[axis].key)
        }

        // add padding to axis if there is only 1 value
        if (vars[axis+"_range"][0] == vars[axis+"_range"][1]) {
          vars[axis+"_range"][0] -= 1
          vars[axis+"_range"][1] += 1
        }
        
        // reverse Y axis
        if (axis == "y") vars.y_range = vars.y_range.reverse()
      
        if (vars.dev.default) d3plus.console.timeEnd("determining "+axis+"-axis")
      }
      else if (!vars[axis+"_range"]) {
        vars[axis+"_range"] = [-1,1]
      }
    
    })
    
    //===================================================================
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mirror axes, if applicable
    //-------------------------------------------------------------------
    if (vars.axes.mirror.default) {
      var domains = vars.y_range.concat(vars.x_range)
      vars.x_range = d3.extent(domains)
      vars.y_range = d3.extent(domains).reverse()
    }
    
    //===================================================================
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Filter data to only include values within the axes
    //-------------------------------------------------------------------
    if (vars.dev.default) d3plus.console.time("removing data outside of axes")
    var old_length = vars.app_data.length
    var data = vars.app_data.filter(function(d){
      var val = parseFloat(d3plus.variable.value(vars,d,vars.y.key))
      var y_include = val != null && val <= vars.y_range[0] && val >= vars.y_range[1]
      if (y_include) {
        var val = parseFloat(d3plus.variable.value(vars,d,vars.x.key))
        return val != null && val >= vars.x_range[0] && val <= vars.x_range[1]
      }
      else return false
    })
    if (vars.dev.default) d3plus.console.timeEnd("removing data outside of axes")
    var removed = old_length - data.length
    if (removed && vars.dev.default) d3plus.console.log("removed "+removed+" nodes")
    
    //===================================================================
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Determine size of nodes
    //-------------------------------------------------------------------
  
    if (data) {

      if (vars.dev.default) d3plus.console.time("determining size scale")
      if (vars.size.key) {
        if (!vars.axes.static.default) {
          var size_domain = d3.extent(vars.app_data,function(d){
            var val = d3plus.variable.value(vars,d,vars.size.key)
            return val == 0 ? null : val
          })
        }
        else {
          var all_depths = []
          for (id in vars.id.nesting) {
            all_depths = all_depths.concat(vars.data.grouped[vars.id.nesting[id]].all)
          }
          var size_domain = d3.extent(all_depths,function(d){
            var val = d3plus.variable.value(vars,d,vars.size.key)
            return val == 0 ? null : val
          })
        }
        if (!size_domain[0] || !size_domain[1]) size_domain = [0,0]
      }
      else {
        var size_domain = [0,0]
      }
  
      var max_size = Math.floor(d3.max([d3.min([vars.graph.width,vars.graph.height])/15,10])),
          min_size = 10
      
      if (size_domain[0] == size_domain[1]) var min_size = max_size
  
      var size_range = [min_size,max_size]
    
      var radius = d3.scale[vars.size.scale.default]()
        .domain(size_domain)
        .range(size_range)
      
      if (vars.dev.default) d3plus.console.timeEnd("determining size scale")
      
    }
    
    //===================================================================
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create axis scales and add buffer if necessary
    //-------------------------------------------------------------------
    
    vars.axes.values.forEach(function(axis){

      // Create Axes
      var range_max = axis == "x" ? vars.graph.width : vars.graph.height
      
      if (["continuous","share"].indexOf(vars[axis].scale.default) >= 0) {
        var s = "linear"
      }
      else {
        var s = vars[axis].scale.default
      }
      
      vars[axis+"_scale"] = d3.scale[s]()
        .domain(vars[axis+"_range"])
        .range([0,range_max])
        
      // set buffer room (take into account largest size var)
      var continuous_buffer = ["continuous","share"].indexOf(vars[axis].scale.default) >= 0
      if (["square","circle","donut"].indexOf(vars.shape.default) >= 0 && !continuous_buffer) {

        if (vars[axis].scale.default != "log") {
    
          var scale = vars[axis+"_scale"]
          var inverse_scale = d3.scale[s]()
            .domain(scale.range())
            .range(scale.domain())
      
          var largest_size = radius.range()[1]*2

          // convert largest size to x scale domain
          largest_size = inverse_scale(largest_size)
        
          // get radius of largest in pixels by subtracting this value from the x scale minimum
          var buffer = largest_size - scale.domain()[0];
          buffer = vars.stacked_axis ? 0 : buffer
          // update x scale with new buffer offsets
          vars[axis+"_scale"]
            .domain([scale.domain()[0]-buffer,scale.domain()[1]+buffer])
          
        }
        
      }
    
      var orient = axis == "x" ? "bottom" : "left"
      
      vars[axis+"_axis"] = d3.svg.axis()
        .tickSize(10)
        .tickPadding(5)
        .orient(orient)
        .scale(vars[axis+"_scale"])
        .tickFormat(function(d, i) {
          
          if ((vars[axis].scale.default == "log" && d.toString().charAt(0) == "1")
              || vars[axis].scale.default != "log") {
            
            if (vars[axis].scale.default == "share") {
              var text = d*100+"%"
            }
            else {
              var text = vars.format(d,vars[axis].key);
            }
            
            d3.select(this)
              .style("font-size",vars.style.ticks.font.size)
              .style("fill",vars.style.ticks.font.color)
              .attr("font-family",vars.style.font.family)
              .attr("font-weight",vars.style.font.weight)
              .text(text)
            
            if (axis == "x") {
              var w = this.getBBox().width,
                  h = this.getBBox().height
              d3.select(this).attr("transform","translate(18,8)rotate(70)");
              var height = (Math.cos(25)*w)+5;
              if (height > vars.graph.yoffset && !vars.small) {
                vars.graph.yoffset = height;
              }
              var width = (Math.cos(25)*h)+5;
              if (width > vars.graph.rightoffset && !vars.small) {
                vars.graph.rightoffset = width;
              }
            }
            else {
              var width = this.getBBox().width;
              if (width > vars.graph.offset && !vars.small) {
                vars.graph.offset = width;
              }
            }
          
          }
          else {
            var text = null
          }
      
          return text;
      
        });
        
      if (vars[axis].scale.default == "continuous" && vars.tickValues[axis]) {
        vars[axis+"_axis"].tickValues(vars.tickValues[axis])
      }
    
    })
    
  }
  
  if (!data) {
    var data = []
  }
  
  // Function for Tick Styling
  function tick_style(t,axis) {
    t
      .attr("stroke",vars.style.ticks.color)
      .attr("stroke-width",vars.style.ticks.width)
      .attr("shape-rendering",vars.style.rendering)
      .style("opacity",function(d){
        var lighter = vars[axis].scale.default == "log" && d.toString().charAt(0) != "1"
        return lighter ? 0.25 : 1
      })
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter SVG Elements
  //-------------------------------------------------------------------
    
  // Enter Background Plane
  var plane = vars.group.selectAll("g#plane").data(["plane"])
  plane.enter().append("g")
    .attr("id","plane")
    .attr("transform", "translate(" + vars.graph.margin.left + "," + vars.graph.margin.top + ")")
    
  // Enter Background Rectangle
  var bg = plane.selectAll("rect#background").data(["background"])
  bg.enter().append("rect")
    .attr("id","background")
    .attr('x',0)
    .attr('y',0)
    .attr('width', vars.graph.width)
    .attr('height', vars.graph.height)
    .attr("stroke-width",1)
    .attr("stroke","#ccc")
      .attr("shape-rendering",vars.style.rendering)
    .style('fill','#fafafa')
    
  // Enter Background Mirror
  var mirror = plane.selectAll("path#mirror").data(["mirror"])
  mirror.enter().append("path")
    .attr("id","mirror")
    .attr("fill","#000")
    .attr("fill-opacity",0.03)
    .attr("stroke-width",1)
    .attr("stroke","#ccc")
    .attr("stroke-dasharray","10,10")
    .attr("opacity",0)
    
  // Enter Axes
  var axes = vars.group.selectAll("g#axes").data(["axes"])
  axes.enter().append("g")
    .attr("id","axes")

  // Enter X Axis Grid
  var xgrid = plane.selectAll("g#xgrid").data(["xgrid"])
  xgrid.enter().append("g")
    .attr("id","xgrid")
    .attr("transform", "translate(0," + vars.graph.height + ")")
    
  // Enter Y Axis Grid
  var ygrid = plane.selectAll("g#ygrid").data(["ygrid"])
  ygrid.enter().append("g")
    .attr("id","ygrid")

  // Enter X Axis Scale
  var xaxis = plane.selectAll("g#xaxis").data(["xaxis"])
  xaxis.enter().append("g")
    .attr("id","xaxis")
    .attr("transform", "translate(0," + vars.graph.height + ")")
    
  // Enter Y Axis Scale
  var yaxis = plane.selectAll("g#yaxis").data(["yaxis"])
  yaxis.enter().append("g")
    .attr("id","yaxis")
    
  // Enter X Axis Label
  var xlabel = axes.selectAll("text#xlabel").data(["xlabel"])
  xlabel.enter().append("text")
    .attr("id", "xlabel")
    .attr("x", vars.app_width/2)
    .attr("y", vars.app_height-10)
    .text(vars.format(vars.x.key))
    .attr("font-family",vars.style.font.family)
    .attr("font-weight",vars.style.font.weight)
    .attr("font-size",vars.style.labels.size)
    .attr("fill",vars.style.labels.color)
    .attr("text-anchor",vars.style.labels.align)
    
  // Enter Y Axis Label
  var ylabel = axes.selectAll("text#ylabel").data(["ylabel"])
  ylabel.enter().append("text")
    .attr("id", "ylabel")
    .attr("y", 15)
    .attr("x", -(vars.graph.height/2+vars.graph.margin.top))
    .text(vars.format(vars.y.key))
    .attr("transform","rotate(-90)")
    .attr("font-family",vars.style.font.family)
    .attr("font-weight",vars.style.font.weight)
    .attr("font-size",vars.style.labels.size)
    .attr("fill",vars.style.labels.color)
    .attr("text-anchor",vars.style.labels.align)
    
  // Enter Mouse Event Group
  var mouseevents = vars.group.selectAll("g#mouseevents").data(["mouseevents"])
  mouseevents.enter().append("g")
    .attr("id","mouseevents")
    
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculate Spacing Needed for Axes Labels
  //-------------------------------------------------------------------
  vars.graph.offset = 0
  yaxis.call(vars.y_axis)
    .selectAll("line")
    .call(tick_style,"y")
    
  vars.graph.margin.left += vars.graph.offset
  vars.graph.width -= vars.graph.offset
  vars.x_scale.range([0,vars.graph.width])
  
  vars.graph.yoffset = 0
  vars.graph.rightoffset = 0
  xaxis.call(vars.x_axis)
    .selectAll("line")
    .call(tick_style,"x")
    
  vars.graph.height -= vars.graph.yoffset
  vars.graph.width -= vars.graph.rightoffset
  vars.x_scale.range([0,vars.graph.width])
  vars.y_scale.range([0,vars.graph.height])
  yaxis.call(vars.y_axis)
  xaxis.call(vars.x_axis)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Update SVG Elements
  //-------------------------------------------------------------------
  
  // Update Plane Group
  plane.transition().duration(vars.style.timing.transitions)
    .attr("transform", "translate(" + vars.graph.margin.left + "," + vars.graph.margin.top + ")")
    
  // Update Plane Background
  bg.attr('width', vars.graph.width)
    .attr('height', vars.graph.height)
      
  // Update Mirror Triangle
  mirror.transition().duration(vars.style.timing.transitions)
    .attr("opacity",function(){
      return vars.axes.mirror.default ? 1 : 0
    })
    .attr("d",function(){
      var w = vars.graph.width, h = vars.graph.height
      return "M "+w+" "+h+" L 0 "+h+" L "+w+" 0 Z"
    })
    
  // Update Y Axis
  yaxis.transition().duration(vars.style.timing.transitions)
    .call(vars.y_axis.scale(vars.y_scale))

  yaxis.selectAll("line").transition().duration(vars.style.timing.transitions)
      .call(tick_style,"y")
  
  yaxis.selectAll("path").style("fill","none")
  
  // Update X Axis
  xaxis.transition().duration(vars.style.timing.transitions)
    .attr("transform", "translate(0," + vars.graph.height + ")")
    .call(vars.x_axis.scale(vars.x_scale))
    .selectAll("g.tick").select("text")
      .style("text-anchor","start")

  xaxis.selectAll("line").transition().duration(vars.style.timing.transitions)
      .call(tick_style,"x")
  
  xaxis.selectAll("path").style("fill","none")
    
  // Update Y Grid
  ygrid.transition().duration(vars.style.timing.transitions)
    .call(vars.y_axis
      .tickFormat("")
      .tickSize(-vars.graph.width)
    )
  
  ygrid.selectAll("line").transition().duration(vars.style.timing.transitions)
      .call(tick_style,"y")
  
  ygrid.selectAll("path").style("fill","none")
    
  // Update X Grid
  xgrid.transition().duration(vars.style.timing.transitions)
    .call(vars.x_axis
      .tickFormat("")
      .tickSize(-vars.graph.height)
    )
  
  xgrid.selectAll("line").transition().duration(vars.style.timing.transitions)
      .attr("transform", "translate(0,-"+vars.graph.yoffset+")")
      .call(tick_style,"x")
  
  xgrid.selectAll("path").style("fill","none")

  // Update X Axis Label
  xlabel.text(vars.format(vars.x.key))
    .attr('x', vars.app_width/2)
    .attr('y', vars.app_height-10)
    .attr("opacity",function(){
      if (vars.app_data.length == 0) return 0
      else return 1
    })

  // Update Y Axis Label
  ylabel.text(vars.format(vars.y.key))
    .attr('y', 15)
    .attr('x', -(vars.graph.height/2+vars.graph.margin.top))
    .attr("opacity",function(){
      if (vars.app_data.length == 0) return 0
      else return 1
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Enter/Update User-Defined Axis Lines
  //-------------------------------------------------------------------
      
  function get_name(d) {
    if (typeof d == "number" || typeof d == "string") {
      return null;
    }
    else {
      return Object.keys(d)[0]
    }
  }
    
  function get_val(d) {
    if (typeof d == "number") {
      return d;
    }
    else if (typeof d == "string") {
      return parseFloat(d);
    }
    else {
      var v = d[Object.keys(d)[0]]
      if (typeof v == "string") {
        return parseFloat(v);
      }
      else {
        return v;
      }
    }
  }
  
  vars.axes.values.forEach(function(axis){
    
    var lines = plane.selectAll("g."+axis+"line")
      .data(vars[axis].lines,function(l){
        if (typeof l == "number" || typeof l == "string") {
          return l
        }
        else {
          return Object.keys(l)[0]
        }
      })
      
    var enter = lines.enter().append("g")
      .attr("class",axis+"line")
      
    var max = axis == "x" ? "height" : "width",
        pos = axis == "x" ? (vars.graph.height-8)+"px" : "10px",
        padding = axis == "x" ? 10 : 20
    
    enter.append("line")
      .attr(axis+"1",0)
      .attr(axis+"2",vars.graph[max])
      .attr("stroke","#ccc")
      .attr("stroke-width",3)
      .attr("stroke-dasharray","10,10")
    
    enter.append("text")
      .style("font-size",vars.style.ticks.font.size)
      .style("fill",vars.style.ticks.font.color)
      .attr("text-align","start")
      .attr(axis,pos)
      
    lines.selectAll("line").transition().duration(vars.style.timing.transitions)
        .attr(axis+"1",function(d){
          return get_val(d) ? vars[axis+"_scale"](get_val(d)) : 0
        })
        .attr(axis+"2",function(d){
          return get_val(d) ? vars[axis+"_scale"](get_val(d)) : 0
        })
        .attr("opacity",function(d){
          var yes = get_val(d) > vars[axis+"_scale"].domain()[1] && get_val(d) < vars[axis+"_scale"].domain()[0]
          return get_val(d) != null && yes ? 1 : 0
        })
      
      lines.selectAll("text").transition().duration(vars.style.timing.transitions)
        .text(function(){
          if (get_val(d) != null) {
            var v = vars.format(get_val(d),y_name)
            return get_name(d) ? vars.format(get_name(d)) + ": " + v : v
          }
          else return null
        })
        .attr(axis,function(d){
          return (vars[axis+"_scale"](get_val(d))+padding)+"px"
        })
      
  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Format Data for Plotting
  //-------------------------------------------------------------------
  
  if (["line","area"].indexOf(vars.shape.default) >= 0) {
    radius.range([2,2])
  }
    
  vars.axis_offset = {
    "x": vars.graph.margin.left+vars.margin.left,
    "y": vars.graph.margin.top+vars.margin.top
  }
  
  data.forEach(function(d){
    d.d3plus.x = vars.x_scale(d3plus.variable.value(vars,d,vars.x.key))
    d.d3plus.x += vars.axis_offset.x
    
    d.d3plus.r = radius(d3plus.variable.value(vars,d,vars.size.key))
    
    if (!vars.stacked_axis) {

      d.d3plus.y = vars.y_scale(d3plus.variable.value(vars,d,vars.y.key))
      d.d3plus.y += vars.axis_offset.y
      
      if (vars.shape.default == "area") {
        d.d3plus[vars.opp_axis+"0"] = vars[vars.opp_axis+"_scale"].range()[1]
        d.d3plus[vars.opp_axis+"0"] += vars.axis_offset[vars.opp_axis]
      }
      
    }
    
  })
  
  if (["line","area"].indexOf(vars.shape.default) >= 0) {
    
    data = d3.nest()
      .key(function(d){
        var id = d3plus.variable.value(vars,d,vars.id.key),
            depth = d.d3plus.depth ? d.d3plus.depth : 0
        return id+"_"+depth+"_"+vars.shape.default
      })
      .rollup(function(leaves){
        
        var availables = d3plus.utils.uniques(leaves,vars[vars.continuous_axis].key),
            previousMissing = false
            
        vars.tickValues[vars.continuous_axis].forEach(function(v,i,arr){
          
          if(availables.indexOf(v) < 0){
            var obj = {}
            obj[vars[vars.continuous_axis].key] = v
            obj[vars.id.key] = leaves[0][vars.id.key]
            obj[vars[vars.opp_axis].key] = vars[vars.opp_axis+"_scale"].domain()[1]
            obj.d3plus = {}
            obj.d3plus.r = radius(radius.domain()[0])
            obj.d3plus[vars.continuous_axis] += vars.axis_offset[vars.continuous_axis]
            
            if (!vars.stacked_axis) {
              obj.d3plus[vars.opp_axis] = vars[vars.opp_axis+"_scale"].range()[1]
              obj.d3plus[vars.opp_axis] += vars.axis_offset[vars.opp_axis]
              obj.d3plus[vars.opp_axis+"0"] = obj.d3plus[vars.opp_axis]
            }
            
            if (vars[vars.continuous_axis].zerofill.default || vars[vars.opp_axis].stacked.default) {
              var position = vars[vars.continuous_axis+"_scale"](v)
              position += vars.axis_offset[vars.continuous_axis]
              obj.d3plus[vars.continuous_axis] = position
              leaves.push(obj)
            }
            else if (vars.shape.default != "line") {
              if (!previousMissing && i > 0) {
                var position = vars[vars.continuous_axis+"_scale"](arr[i-1])
                position += vars.axis_offset[vars.continuous_axis]
                obj.d3plus[vars.continuous_axis] = position
                leaves.push(obj)
              }
              if (i < arr.length-1) {
                var position = vars[vars.continuous_axis+"_scale"](arr[i+1])
                position += vars.axis_offset[vars.continuous_axis]
                var obj2 = d3plus.utils.copy(obj)
                obj2.d3plus[vars.continuous_axis] = position
                leaves.push(obj2)
              }
            }
            previousMissing = true
            
          }
          else {
            previousMissing = false
          }
        })
        
        leaves.sort(function(a,b){
          var xsort = a.d3plus[vars.continuous_axis] - b.d3plus[vars.continuous_axis]
          if (xsort) return xsort
          var ksort = a[vars[vars.continuous_axis].key] - b[vars[vars.continuous_axis].key]
          return ksort
        })
        
        return leaves
      })
      .entries(data)
      
    data.forEach(function(d,i){
      vars.id.nesting.forEach(function(n,i){
        if (i <= vars.depth.default && !d[n]) {
          d[n] = d3plus.utils.uniques(d.values,n).filter(function(unique){
            return unique && unique != "undefined"
          })[0]
        }
      })
    })
    
  }
  
  var sort = null
  if (vars.order.key) {
    sort = vars.order.key
  }
  else if (vars.continuous_axis) {
    sort = vars[vars.opp_axis].key
  }
  else if (vars.size.key) {
    sort = vars.size.key
  }
  
  if (sort) {

    data.sort(function(a,b){

      if (a.values instanceof Array) {
        a_value = 0
        a.values.forEach(function(v){
          var val = d3plus.variable.value(vars,v,sort)
          if (val) {
            if (typeof val == "number") {
              a_value += val
            }
            else {
              a_value = val
            }
          }
        })
      }
      else {
        a_value = d3plus.variable.value(vars,a,sort)
      }
    
      if (b.values instanceof Array) {
        b_value = 0
        b.values.forEach(function(v){
          var val = d3plus.variable.value(vars,v,sort)
          if (val) {
            if (typeof val == "number") {
              b_value += val
            }
            else {
              b_value = val
            }
          }
        })
      }
      else {
        b_value = d3plus.variable.value(vars,b,sort)
      }
      
      if (vars.color.key && sort == vars.color.key) {
          
        a_value = d3plus.variable.color(vars,a)
        b_value = d3plus.variable.color(vars,b)

        a_value = d3.rgb(a_value).hsl()
        b_value = d3.rgb(b_value).hsl()
  
        if (a_value.s == 0) a_value = 361
        else a_value = a_value.h
        if (b_value.s == 0) b_value = 361
        else b_value = b_value.h
  
      }
      
      if(a_value<b_value) return vars.order.sort.default == "desc" ? -1 : 1;
      if(a_value>b_value) return vars.order.sort.default == "desc" ? 1 : -1;
  
      return 0;

    });
  }
  
  if (vars.stacked_axis) {
    
    var stack = d3.layout.stack()
      .values(function(d) { return d.values; })
      .x(function(d) { return d.d3plus.x; })
      .x(function(d) { return d.d3plus.y; })
      .y(function(d) { 
        var flip = vars.graph.height,
            val = d3plus.variable.value(vars,d,vars.y.key)
        return flip-vars.y_scale(val); 
      })
      .out(function(d,y0,y){
        var flip = vars.graph.height
        
        if (vars[vars.stacked_axis].scale.default == "share") {
          d.d3plus.y0 = (1-y0)*flip
          d.d3plus.y = d.d3plus.y0-(y*flip)
        }
        else {
          d.d3plus.y0 = flip-y0
          d.d3plus.y = d.d3plus.y0-y
        }
        d.d3plus.y += (vars.margin.top+vars.graph.margin.top)
        d.d3plus.y0 += (vars.margin.top+vars.graph.margin.top)
      })
      
    var offset = vars[vars.stacked_axis].scale.default == "share" ? "expand" : "zero";

    var data = stack.offset(offset)(data)
      
  }
  else if (["area","line"].indexOf(vars.shape.default) < 0) {
    
    function data_tick(l,axis) {
      l
        .attr("x1",function(d){
          return axis == "y" ? 0 : d.d3plus.x-vars.graph.margin.left-vars.margin.left
        })
        .attr("x2",function(d){
          return axis == "y" ? -5 : d.d3plus.x-vars.graph.margin.left-vars.margin.left
        })
        .attr("y1",function(d){
          return axis == "x" ? vars.graph.height : d.d3plus.y-vars.graph.margin.top-vars.margin.top
        })
        .attr("y2",function(d){
          return axis == "x" ? vars.graph.height+5 : d.d3plus.y-vars.graph.margin.top-vars.margin.top
        })
        .style("stroke",function(d){
          var c = d3.hsl(d3plus.variable.color(vars,d));
          c.l = c.l < .2 ? 0 : c.l-.2;
          return c.toString();
        })
        .style("stroke-width",vars.style.data.stroke.width)
        .attr("shape-rendering",vars.style.rendering)
    }
    
    var data_ticks = plane.selectAll("g.data_ticks")
      .data(data,function(d){ 
        return d[vars.id.key]+"_"+d.d3plus.depth
      })
    
    var tick_enter = data_ticks.enter().append("g")
      .attr("class","data_ticks")
      .attr("opacity",0)
      
    tick_enter.append("line")
      .attr("class","data_y")
      .call(data_tick,"y")
      
    data_ticks.selectAll("line.data_y")
      .call(data_tick,"y")
      
    tick_enter.append("line")
      .attr("class","data_x")
      .call(data_tick,"x")
      
    data_ticks.selectAll("line.data_x")
      .call(data_tick,"x")
      
    data_ticks.transition().duration(vars.style.timing.transitions)
      .attr("opacity",1)
      
    data_ticks.exit().transition().duration(vars.style.timing.transitions)
      .attr("opacity",0)
      .remove()
    
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Plot data on chart!
  //-------------------------------------------------------------------
  
  function axis_lines(node) {
    
    var click_remove = d3.event.type == "click" && (vars.tooltip.default.long || vars.tooltip.html),
        create = ["mouseover","mousemove"].indexOf(d3.event.type) >= 0
    
    if (!click_remove && create && vars.shape.default != "area") {
    
      if (node.data) var node = node.data
      
      var line_data = [
        d3plus.utils.copy(node.d3plus),
        d3plus.utils.copy(node.d3plus)
      ]
      line_data[0].axis = "x"
      line_data[1].axis = "y"
      
    }
    else {
      var line_data = []
    }
      
    function line_init(l) {
      l
        .attr("x2",function(d){
          var ret = d.axis == "x" ? d.x : d.x-d.r
          return ret
        })
        .attr("y2",function(d){
          var ret = d.axis == "y" ? d.y : d.y+d.r
          return ret
        })
        .style("stroke-width",0)
        .attr("opacity",0)
    }
    
    var lines = mouseevents.selectAll("line.axis_label")
      .data(line_data,function(d){
        return d.axis+"_"+d.id
      })
      
    lines.enter().append("line")
      .attr("class","axis_label")
      .call(line_init)
      .attr("x1",function(d){
        return d.axis == "x" ? d.x : d.x-d.r
      })
      .attr("y1",function(d){
        return d.axis == "y" ? d.y : d.y+d.r
      })
      .style("stroke",function(d){
        return d3plus.variable.color(vars,node)
      })
      .attr("shape-rendering",vars.style.rendering)
      
    lines.transition().duration(vars.style.timing.mouseevents)
      .attr("class","axis_label")
      .attr("x2",function(d){
        return d.axis == "x" ? d.x : vars.margin.left+vars.graph.margin.left
      })
      .attr("y2",function(d){
        return d.axis == "y" ? d.y : vars.graph.height+vars.graph.margin.top+vars.margin.top
      })
      .style("stroke",function(d){
        var c = d3.hsl(d3plus.variable.color(vars,node));
        c.l = c.l < .2 ? 0 : c.l-.2;
        return c.toString();
      })
      .style("stroke-width",vars.style.data.stroke.width)
      .attr("opacity",1)
      
    lines.exit().transition().duration(vars.style.timing.mouseevents)
      .call(line_init)
      .remove()
      
    var texts = mouseevents.selectAll("text.axis_label")
      .data(line_data,function(d){
        return d.axis+"_"+d.id
      })

    texts.enter().append("text")
      .attr("class","axis_label")
      .attr("id",function(d){
        return d.axis+"_"+d.id
      })
      .text(function(d){
        var val = d3plus.variable.value(vars,node,vars[d.axis].key)
        return vars.format(val,vars[d.axis].key)
      })
      .attr("x",function(d){
        return d.axis == "x" ? d.x : vars.margin.left+vars.graph.margin.left-5
      })
      .attr("y",function(d){
        return d.axis == "y" ? d.y : vars.graph.height+vars.graph.margin.top+vars.margin.top+5
      })
      .attr("dy",function(d){
        return d.axis == "y" ? (vars.style.ticks.font.size*.35) : vars.style.ticks.font.size
      })
      .attr("text-anchor",function(d){
        return d.axis == "y" ? "end": "middle"
      })
      .style("fill",function(d){
        var c = d3.hsl(d3plus.variable.color(vars,node));
        c.l = c.l < .2 ? 0 : c.l-.2;
        return c.toString();
      })
      .style("font-size",vars.style.ticks.font.size)
      .attr("font-family",vars.style.font.family)
      .attr("font-weight",vars.style.font.weight)
      .attr("opacity",0)
      
    texts.transition().duration(vars.style.timing.mouseevents)
      .delay(vars.style.timing.mouseevents)
      .attr("opacity",1)
      
    texts.exit().transition().duration(vars.style.timing.mouseevents)
      .attr("opacity",0)
      .remove()
      
    var rects = mouseevents.selectAll("rect.axis_label")
      .data(line_data,function(d){
        return d.axis+"_"+d.id
      })

    rects.enter().insert("rect","text")
      .attr("class","axis_label")
      .attr("x",function(d){
        var width = d3.select("text#"+d.axis+"_"+d.id).node().getBBox().width
        var ret = d.axis == "x" ? d.x : vars.margin.left+vars.graph.margin.left
        return d.axis == "x" ? ret-width/2-5 : ret-width-10
      })
      .attr("y",function(d){
        var height = d3.select("text#"+d.axis+"_"+d.id).node().getBBox().height
        var ret = d.axis == "y" ? d.y : vars.graph.height+vars.graph.margin.top+vars.margin.top
        return d.axis == "x" ? ret : ret-height/2-5
      })
      .attr("width",function(d){
        var text = d3.select("text#"+d.axis+"_"+d.id).node().getBBox()
        return text.width + 10
      })
      .attr("height",function(d){
        var text = d3.select("text#"+d.axis+"_"+d.id).node().getBBox()
        return text.height + 10
      })
      .style("stroke",function(d){
        var c = d3.hsl(d3plus.variable.color(vars,node));
        c.l = c.l < .2 ? 0 : c.l-.2;
        return c.toString();
      })
      .style("fill","white")
      .style("stroke-width",vars.style.data.stroke.width)
      .attr("shape-rendering",vars.style.rendering)
      .attr("opacity",0)
      
    rects.transition().duration(vars.style.timing.mouseevents)
      .delay(vars.style.timing.mouseevents)
      .attr("opacity",1)
      
    rects.exit().transition().duration(vars.style.timing.mouseevents)
      .attr("opacity",0)
      .remove()
    
  }

  vars.mouse = axis_lines
  
  return data
  
};
d3plus.apps.geo_map = {}
d3plus.apps.geo_map.data = "object";
d3plus.apps.geo_map.libs = ["topojson"];
d3plus.apps.geo_map.requirements = ["color","coords"];
d3plus.apps.geo_map.tooltip = "follow"
d3plus.apps.geo_map.shapes = ["coordinates"];
d3plus.apps.geo_map.scale = 1

d3plus.apps.geo_map.draw = function(vars) {
  
  topojson.presimplify(vars.coords.default)
  
  var coords = vars.coords.default,
      key = Object.keys(coords.objects)[0]
      topo = topojson.feature(coords, coords.objects[key]),
      features = topo.features
      
  features.forEach(function(f){
    f[vars.id.key] = f.id
  })
  
  return features
  
};
d3plus.apps.line = {}
d3plus.apps.line.data = "grouped";
d3plus.apps.line.requirements = ["x","y"];
d3plus.apps.line.tooltip = "static";
d3plus.apps.line.shapes = ["line"];

d3plus.apps.line.setup = function(vars) {

  vars.x.scale.default = "continuous"
  
}

d3plus.apps.line.draw = function(vars) {
  
  return d3plus.apps.chart.draw(vars)
  
}
d3plus.apps.network = {}
d3plus.apps.network.data = "object";
d3plus.apps.network.requirements = ["nodes","links"];
d3plus.apps.network.tooltip = "static"
d3plus.apps.network.shapes = ["circle","square","donut"];
d3plus.apps.network.scale = 1.05

d3plus.apps.network.draw = function(vars) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Use filtered lists if they are available
  //-------------------------------------------------------------------
  var nodes = vars.nodes.restricted || vars.nodes.default,
      links = vars.links.restricted || vars.links.default
      
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Determine Size Scale
  //-------------------------------------------------------------------
  var x_range = d3.extent(d3.values(nodes), function(d){return d.x}),
      y_range = d3.extent(d3.values(nodes), function(d){return d.y}),
      aspect = (x_range[1]-x_range[0])/(y_range[1]-y_range[0])

  // Calculate overall network size based on aspect ratio
  if (aspect > vars.app_width/vars.app_height) {
    var network_height = vars.app_width/aspect,
        network_width = vars.app_width,
        offset_top = ((vars.app_height-network_height)/2),
        offset_left = 0
  } else {
    var network_width = vars.app_height*aspect, 
        network_height = vars.app_height,
        offset_left = ((vars.app_width-network_width)/2),
        offset_top = 0
  }

  // Set X and Y position scales
  var scale = {}
  scale.x = d3.scale.linear()
    .domain(x_range)
    .range([offset_left, vars.app_width-offset_left])
  scale.y = d3.scale.linear()
    .domain(y_range)
    .range([offset_top, vars.app_height-offset_top])
    
  var val_range = d3.extent(d3.values(vars.app_data), function(d){
    var val = d3plus.variable.value(vars,d,vars.size.key)
    return val == 0 ? null : val
  });
  
  if (typeof val_range[0] == "undefined") val_range = [1,1]
  
  var distances = []
  nodes.forEach(function(n1){
    nodes.forEach(function(n2){
      if (n1 != n2) {
        var xx = Math.abs(scale.x(n1.x)-scale.x(n2.x));
        var yy = Math.abs(scale.y(n1.y)-scale.y(n2.y));
        distances.push(Math.sqrt((xx*xx)+(yy*yy)))
      }
    })
  })

  var max_size = d3.min(distances,function(d){
    return d;
  })
  max_size = max_size*(max_size/800)
  var min_size = 4;
  
  // Add buffers to position scales
  scale.x.range([offset_left+(max_size*1.5), vars.app_width-(max_size*1.5)-offset_left])
  scale.y.range([offset_top+(max_size*1.5), vars.app_height-(max_size*1.5)-offset_top])
  
  // Create size scale
  scale.r = d3.scale[vars.size.scale.default]()
    .domain(val_range)
    .range([min_size, max_size])
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Match nodes to data
  //-------------------------------------------------------------------
  var data = [], lookup = {}
  nodes.forEach(function(n){
    if (vars.app_data[n[vars.id.key]]) {
      var obj = d3plus.utils.merge(n,vars.app_data[n[vars.id.key]])
    }
    else {
      var obj = d3plus.utils.copy(n)
    }
    obj.d3plus = {}
    obj.d3plus.x = scale.x(n.x)
    obj.d3plus.y = scale.y(n.y)
    lookup[obj[vars.id.key]] = {
      "x": obj.d3plus.x,
      "y": obj.d3plus.y
    }
    var val = d3plus.variable.value(vars,obj,vars.size.key)
    obj.d3plus.r = val ? scale.r(val) : scale.r.range()[0]
    data.push(obj)
  })
  
  data.sort(function(a,b){
    return b.d3plus.r - a.d3plus.r
  })
  
  links.forEach(function(l,i){
    l.source.d3plus = {}
    l.source.d3plus.x = lookup[l.source[vars.id.key]].x
    l.source.d3plus.y = lookup[l.source[vars.id.key]].y
    l.target.d3plus = {}
    l.target.d3plus.x = lookup[l.target[vars.id.key]].x
    l.target.d3plus.y = lookup[l.target[vars.id.key]].y
  })
  
  return {"nodes": data, "links": links}

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Private Variables
  //-------------------------------------------------------------------
  
  // var dragging = false,
  //     info_width = 300,
  //     zoom_behavior = d3.behavior.zoom().scaleExtent([1, 16]),
  //     hover = null,
  //     last_hover = null,
  //     last_highlight = null,
  //     highlight_extent = {};
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function that handles the zooming and panning of the visualization
  //-------------------------------------------------------------------
  
  // vars.zoom = function(direction) {
  //   
  //   var zoom_extent = zoom_behavior.scaleExtent()
  //   // If d3 zoom event is detected, use it!
  //   if(!direction) {
  //     evt_scale = d3.event.scale
  //     translate = d3.event.translate
  //   } 
  //   else {
  //     if (direction == "in") {
  //       if (zoom_behavior.scale() > zoom_extent[1]/2) multiplier = zoom_extent[1]/zoom_behavior.scale()
  //       else multiplier = 2
  //     } 
  //     else if (direction == "out") {
  //       if (zoom_behavior.scale() < zoom_extent[0]*2) multiplier = zoom_extent[0]/zoom_behavior.scale()
  //       else multiplier = 0.5
  //     } 
  //     else if (direction == vars.focus.default) {
  //       var x_bounds = [scale.x(highlight_extent.x[0]),scale.x(highlight_extent.x[1])],
  //           y_bounds = [scale.y(highlight_extent.y[0]),scale.y(highlight_extent.y[1])]
  //           
  //       if (x_bounds[1] > (vars.app_width-info_width-5)) var offset_left = info_width+32
  //       else var offset_left = 0
  //           
  //       var w_zoom = (vars.app_width-info_width-10)/(x_bounds[1]-x_bounds[0]),
  //           h_zoom = vars.app_height/(y_bounds[1]-y_bounds[0])
  //       
  //       if (w_zoom < h_zoom) {
  //         x_bounds = [x_bounds[0]-(max_size*4),x_bounds[1]+(max_size*4)]
  //         evt_scale = (vars.app_width-info_width-10)/(x_bounds[1]-x_bounds[0])
  //         if (evt_scale > zoom_extent[1]) evt_scale = zoom_extent[1]
  //         offset_x = -(x_bounds[0]*evt_scale)
  //         offset_y = -(y_bounds[0]*evt_scale)+((vars.app_height-((y_bounds[1]-y_bounds[0])*evt_scale))/2)
  //       } else {
  //         y_bounds = [y_bounds[0]-(max_size*2),y_bounds[1]+(max_size*2)]
  //         evt_scale = vars.app_height/(y_bounds[1]-y_bounds[0])
  //         if (evt_scale > zoom_extent[1]) evt_scale = zoom_extent[1]
  //         offset_x = -(x_bounds[0]*evt_scale)+(((vars.app_width-info_width-10)-((x_bounds[1]-x_bounds[0])*evt_scale))/2)
  //         offset_y = -(y_bounds[0]*evt_scale)
  //       }
  // 
  //       translate = [offset_x+offset_left,offset_y]
  //     } 
  //     else if (direction == "reset") {
  //       vars.focus.default = null
  //       translate = [0,0]
  //       evt_scale = 1
  //     }
  //     
  //     if (direction == "in" || direction == "out") {
  //       var trans = d3.select("g.viz")[0][0].getAttribute('transform')
  //       if (trans) {
  //         trans = trans.split('(')
  //         var coords = trans[1].split(')')
  //         coords = coords[0].replace(' ',',')
  //         coords = coords.substring(0,trans[1].length-6).split(',')
  //         offset_x = parseFloat(coords[0])
  //         offset_y = coords.length == 2 ? parseFloat(coords[1]) : parseFloat(coords[0])
  //         zoom_var = parseFloat(trans[2].substring(0,trans[2].length-1))
  //       } else {
  //         offset_x = 0
  //         offset_y = 0
  //         zoom_var = 1
  //       }
  //       if ((multiplier > 0.5 && multiplier <= 1) && direction == "out") {
  //         offset_x = 0
  //         offset_y = 0
  //       } else {
  //         offset_x = (vars.app_width/2)-(((vars.app_width/2)-offset_x)*multiplier)
  //         offset_y = (vars.app_height/2)-(((vars.app_height/2)-offset_y)*multiplier)
  //       }
  //     
  //       translate = [offset_x,offset_y]
  //       evt_scale = zoom_var*multiplier
  //     }
  //   
  //   }
  //   
  //   zoom_behavior.translate(translate).scale(evt_scale)
  //   
  //   // Auto center visualization
  //   if (translate[0] > 0) translate[0] = 0
  //   else if (translate[0] < -((vars.app_width*evt_scale)-vars.app_width)) {
  //     translate[0] = -((vars.app_width*evt_scale)-vars.app_width)
  //   }
  //   if (translate[1] > 0) translate[1] = 0
  //   else if (translate[1] < -((vars.app_height*evt_scale)-vars.app_height)) translate[1] = -((vars.app_height*evt_scale)-vars.app_height)
  //   if (!direction) {
  //     if (d3.event.sourceEvent.type == "mousewheel" || d3.event.sourceEvent.type == "mousemove") {
  //       var viz_timing = d3.select(".viz")
  //     } else {
  //       var viz_timing = d3.select(".viz").transition().duration(vars.style.timing.transitions)
  //     }
  //   } else {
  //     var viz_timing = d3.select(".viz").transition().duration(vars.style.timing.transitions)
  //   }
  //   viz_timing.attr("transform","translate(" + translate + ")" + "scale(" + evt_scale + ")")
  //   
  // }
  // 
  // //===================================================================
  // 
  // vars.update = function() {
  //   // If highlight variable has ACTUALLY changed, do this stuff
  //   if (last_highlight != vars.focus.default) {
  //     
  //     // Remove all tooltips on page
  //     d3plus.tooltip.remove(vars.type.default)
  //     d3.select("g.highlight").selectAll("*").remove()
  //     d3.select("g.hover").selectAll("*").remove()
  //     
  //     if (vars.focus.default) {
  //                         
  //       create_nodes("highlight")
  //       
  //     }
  //     else {
  //       vars.zoom("reset");
  //     }
  //     
  //     node.call(node_color)
  //     
  //     last_highlight = vars.focus.default
  //   }
  // 
  //   // If hover variable has ACTUALLY changed, do this stuff
  //   if (last_hover != hover) {
  // 
  //     d3.select("g.hover").selectAll("*").remove()
  //     
  //     // If a new hover element exists, create it
  //     if (hover && hover != vars.focus.default) {
  //       create_nodes("hover")
  //     }
  //     
  //     // Set last_hover to the new hover ID
  //     last_hover = hover
  //   }
  //   
  //   function create_nodes(group) {
  //     
  //     if (group == "highlight") {
  //       var c = vars.focus.default
  //     }
  //     else {
  //       var c = hover
  //     }
  //     
  //     var node_data = nodes.filter(function(x){return x[vars.id] == c})
  //     
  //     if (group == "highlight" || !vars.focus.default) {
  // 
  //       var prim_nodes = [],
  //           prim_links = [];
  //           
  //       if (vars.connections[c]) {
  //         vars.connections[c].forEach(function(n){
  //           prim_nodes.push(nodes.filter(function(x){return x[vars.id] == n[vars.id]})[0])
  //         })
  //         prim_nodes.forEach(function(n){
  //           prim_links.push({"source": node_data[0], "target": n})
  //         })
  //       }
  //       
  //       var node_data = prim_nodes.concat(node_data)
  //       highlight_extent.x = d3.extent(d3.values(node_data),function(v){return v.x;}),
  //       highlight_extent.y = d3.extent(d3.values(node_data),function(v){return v.y;})
  // 
  //       if (group == "highlight") {
  //         vars.zoom(c);
  //         
  //         make_tooltip = function(html) {
  //       
  //           if (typeof html == "string") html = "<br>"+html
  // 
  //           if (scale.x(highlight_extent.x[1]) > (vars.app_width-info_width-10)) {
  //             var x_pos = 30
  //           }
  //           else {
  //             var x_pos = vars.app_width-info_width-5
  //           }
  //        
  //           var prod = nodes.filter(function(n){return n[vars.id] == vars.focus.default})[0]
  //         
  //           var tooltip_data = d3plus.tooltip.data(vars,vars.focus.default)
  //         
  //           var tooltip_appends = "<div class='d3plus_tooltip_data_title'>"
  //           tooltip_appends += vars.format("Primary Connections")
  //           tooltip_appends += "</div>"
  //     
  //           prim_nodes.forEach(function(n){
  //           
  //             var parent = "d3.select(&quot;#"+vars.parent.node().id+"&quot;)"
  //           
  //             tooltip_appends += "<div class='d3plus_network_connection' onclick='"+parent+".call(chart.highlight(&quot;"+n[vars.id]+"&quot;))'>"
  //             tooltip_appends += "<div class='d3plus_network_connection_node'"
  //             tooltip_appends += " style='"
  //             tooltip_appends += "background-color:"+fill_color(n)+";"
  //             tooltip_appends += "border-color:"+stroke_color(n)+";"
  //             tooltip_appends += "'"
  //             tooltip_appends += "></div>"
  //             tooltip_appends += "<div class='d3plus_network_connection_name'>"
  //             tooltip_appends += d3plus.variable.value(vars,n[vars.id],vars.text.key)
  //             tooltip_appends += "</div>"
  //             tooltip_appends += "</div>"
  //           })
  //           
  //           d3plus.tooltip.remove(vars.type.default)
  //         
  //           d3plus.tooltip.create({
  //             "data": tooltip_data,
  //             "title": d3plus.variable.value(vars,vars.focus.default,vars.text.key),
  //             "color": d3plus.variable.color(vars,vars.focus.default),
  //             "icon": d3plus.variable.value(vars,vars.focus.default,"icon"),
  //             "style": vars.style.icon,
  //             "x": x_pos,
  //             "y": vars.margin.top+5,
  //             "width": info_width,
  //             "max_height": vars.app_height-10,
  //             "html": tooltip_appends+html,
  //             "fixed": true,
  //             "mouseevents": true,
  //             "parent": vars.parent,
  //             "background": vars.style.background,
  //             "id": vars.type.default
  //           })
  //           
  //         }
  //         
  //         var html = vars.click.default ? vars.click.default(vars.focus.default) : ""
  //   
  //         if (typeof html == "string") make_tooltip(html)
  //         else {
  //           d3.json(html.url,function(data){
  //             html = html.callback(data)
  //             make_tooltip(html)
  //           })
  //         }
  //         
  //       }
  //       
  //       d3.select("g."+group).selectAll("line")
  //         .data(prim_links).enter().append("line")
  //           .attr("pointer-events","none")
  //           .attr("stroke",vars.style.primary.color)
  //           .attr("stroke-width",2)
  //           .call(link_position)
  //     }
  //     
  //     var node_groups = d3.select("g."+group).selectAll("g")
  //       .data(node_data).enter().append("g")
  //         .attr("class","hover_node")
  //         .call(node_events)
  //   
  //     node_groups
  //       .append("circle")
  //         .attr("class","bg")
  //         .call(node_size)
  //         .call(node_position)
  //         .call(node_stroke)
  //         .attr("stroke",vars.style.primary.color);
  //       
  //     node_groups
  //       .append("circle")
  //         .call(node_size)
  //         .call(node_position)
  //         .call(node_stroke)
  //         .call(node_color)
  //         .call(create_label);
  //   }
  //   
  // }
    
  
    
  // Create viz group on vars.parent_enter
  // var viz_enter = vars.parent_enter.append("g")
//     .call(zoom_behavior.on("zoom",function(){ vars.zoom(); }))
//     .on(d3plus.evt.down,function(d){
//       dragging = true
//     })
//     .on(d3plus.evt.up,function(d){
//       dragging = false
//     })
//     .append('g')
//       .attr('class','viz')
//     
//   viz_enter.append('rect')
//     .attr('class','overlay')
//     .attr("fill","transparent");
//     
//   d3.select("rect.overlay")
//     .attr("width", vars.app_width)
//     .attr("height", vars.app_height)
//     .on(d3plus.evt.over,function(d){
//       if (!vars.focus.default && hover) {
//         hover = null;
//         vars.update();
//       }
//     })
//     .on(d3plus.evt.click,function(d){
//       // vars.focus.default = null;
//       // vars.zoom("reset");
//       // vars.update();
//     })
//     .on(d3plus.evt.move,function(d){
//       if (zoom_behavior.scale() > 1) {
//         d3.select(this).style("cursor","move")
//         if (dragging && !d3plus.ie) {
//           d3.select(this).style("cursor","-moz-grabbing")
//           d3.select(this).style("cursor","-webkit-grabbing")
//         }
//         else if (!d3plus.ie) {
//           d3.select(this).style("cursor","-moz-grab")
//           d3.select(this).style("cursor","-webkit-grab")
//         }
//       }
//       else {
//         d3.select(this).style("cursor","default")
//       }
//     });
//     
//   if (!vars.zoom.scroll.default) {
//     d3.select(d3.select("g.viz").node().parentNode)
//       .on("mousewheel.zoom", null)
//       .on("DOMMouseScroll.zoom", null)
//       .on("wheel.zoom", null)
//   }
//     
//   viz_enter.append('g')
//     .attr('class','links')
//     
//   viz_enter.append('g')
//     .attr('class','nodes')
//     
//   viz_enter.append('g')
//     .attr('class','highlight')
//     
//   viz_enter.append('g')
//     .attr('class','hover')
//     
//   d3plus.utilsts.zoom_controls();
//   
//   //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//   // New nodes and links enter, initialize them here
//   //-------------------------------------------------------------------
//   
//   var node = d3.select("g.nodes").selectAll("circle.node")
//     .data(nodes, function(d) { return d[vars.id]; })
//   
//   node.enter().append("circle")
//     .attr("class","node")
//     .attr("r",0)
//     .call(node_position)
//     .call(node_color)
//     .call(node_stroke);
//     
//   var link = d3.select("g.links").selectAll("line.link")
//     .data(links, function(d) { return d.source[vars.id] + "-" + d.target[vars.id]; })
//     
//   link.enter().append("line")
//     .attr("class","link")
//     .attr("pointer-events","none")
//     .attr("stroke", "white")
//     .attr("stroke-width", 1)
//     .call(link_position);
//   
//   //===================================================================
//   
//   //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//   // Update, for nodes and links that are already in existance
//   //-------------------------------------------------------------------
// 
//   node
//     .on(d3plus.evt.over, function(d){
//       if (!dragging) {
//         hover = d[vars.id];
//         vars.update();
//       }
//     });
// 
//   node.transition().duration(vars.style.timing.transitions)
//     .call(node_size)
//     .call(node_stroke)
//     .call(node_position)
//     .call(node_color);
//     
//   link
//     .call(link_events);
//     
//   link.transition().duration(vars.style.timing.transitions)
//     .attr("stroke", "#dedede")
//     .call(link_position);
//       
//   //===================================================================
// 
//   //===================================================================
//   
//   if (vars.focus.default) {
//     var present = false;
//     nodes.forEach(function(d){
//       if (d[vars.id] == vars.focus.default) present = true;
//     })
//     if (!present) {
//       vars.focus.default = null;
//     }
//   }
//   vars.update();
//       
//   function link_position(l) {
//     l
//       .attr("x1", function(d) { return scale.x(d.source.x); })
//       .attr("y1", function(d) { return scale.y(d.source.y); })
//       .attr("x2", function(d) { return scale.x(d.target.x); })
//       .attr("y2", function(d) { return scale.y(d.target.y); })
//       .attr("vector-effect","non-scaling-stroke")
//   }
//   
//   function link_events(l) {
//     l
//       .on(d3plus.evt.click,function(d){
//         vars.focus.default = null;
//         vars.zoom("reset");
//         vars.update();
//       })
//   }
//   
//   function stroke_color(d) {
//     
//     // Get elements' color
//     var color = d3plus.variable.color(vars,d)
//     
//     // If node is active, return a darker color, else, return the normal color
//     var active = vars.active ? d3plus.variable.value(vars,d[vars.id],vars.active) : true
//     return active ? "#333" : color;
//     
//   }
//   
//   function node_events(n) {
//     n
//       .on(d3plus.evt.over, function(d){
//         
//         d3.select(this).style("cursor","pointer")
//         if (!d3plus.ie) {
//           d3.select(this).style("cursor","-moz-zoom-in")
//           d3.select(this).style("cursor","-webkit-zoom-in")
//         }
//           
//         if (d[vars.id] == vars.focus.default && !d3plus.ie) {
//           d3.select(this).style("cursor","-moz-zoom-out")
//           d3.select(this).style("cursor","-webkit-zoom-out")
//         }
//         
//         if (d[vars.id] != hover) {
//           hover = d[vars.id];
//           vars.update();
//         }
//         
//       })
//       .on(d3plus.evt.out, function(d){
//         
//         // Returns false if the mouse has moved into a child element.
//         // This is used to catch when the mouse moves onto label text.
//         var target = d3.event.toElement || d3.event.relatedTarget
//         if (target) {
//           var id_check = target.__data__[vars.id] == d[vars.id]
//           if (target.parentNode != this && !id_check) {
//             hover = null;
//             vars.update();
//           }
//         }
//         else {
//           hover = null;
//           vars.update();
//         }
//         
//       })
//       .on(d3plus.evt.click, function(d){
//         
//         d3.select(this).style("cursor","auto")
// 
//         // If there is no highlighted node, 
//         // or the hover node is not the highlighted node
//         if (!vars.focus.default || vars.focus.default != d[vars.id]) {
//           vars.focus.default = d[vars.id];
//         } 
//         
//         // Else, the user is clicking on the highlighted node.
//         else {
//           vars.focus.default = null;
//         }
//         
//         vars.update();
//         
//       })
//   }
//   
//   function create_label(n) {
//     if (vars.labels) {
//       n.each(function(d){
// 
//         var font_size = Math.ceil(10/zoom_behavior.scale()),
//             padding = font_size/4,
//             corner = Math.ceil(3/zoom_behavior.scale())
//             value = d3plus.variable.value(vars,d[vars.id],vars.size.key),
//             size = value > 0 ? scale.r(value) : scale.r(val_range[0])
//         if (font_size < size || d[vars.id] == hover || d[vars.id] == vars.focus.default) {
//           d3.select(this.parentNode).append("text")
//             .attr("pointer-events","none")
//             .attr("x",scale.x(d.x))
//             .attr("fill",d3plus.color.text(fill_color(d)))
//             .attr("font-size",font_size+"px")
//             .attr("text-anchor","middle")
//             .attr("font-family",vars.style.font.family)
//             .attr("font-weight",vars.style.font.weight)
//             .each(function(e){
//               var th = size < font_size+padding*2 ? font_size+padding*2 : size,
//                   tw = ((font_size*5)/th)*(font_size*5)
//               var text = d3plus.variable.value(vars,d[vars.id],vars.text.key)
//               d3plus.utils.wordwrap({
//                 "text": text,
//                 "parent": this,
//                 "width": tw,
//                 "height": th,
//                 "padding": 0
//               });
//               if (!d3.select(this).select("tspan")[0][0]) {
//                 d3.select(this).remove();
//               }
//               else {
//                 finish_label(d3.select(this));
//               }
//             })
//         }
//               
//         function finish_label(text) {
//           
//           var w = text.node().getBBox().width,
//               h = text.node().getBBox().height
//         
//           text.attr("y",scale.y(d.y)-(h/2)-(padding/3))
//           
//           w = w+(padding*6)
//           h = h+(padding*2)
//           
//           if (w > size*2) {
//             d3.select(text.node().parentNode)
//               .insert("rect","circle")
//                 .attr("class","bg")
//                 .attr("rx",corner)
//                 .attr("ry",corner)
//                 .attr("width",w)
//                 .attr("height",h)
//                 .attr("y",scale.y(d.y)-(h/2))
//                 .attr("x",scale.x(d.x)-(w/2))
//                 .call(node_stroke)
//                 .attr("stroke",vars.style.primary.color);
//             d3.select(text.node().parentNode)
//               .insert("rect","text")
//                 .attr("rx",corner)
//                 .attr("ry",corner)
//                 .attr("stroke-width", 0)
//                 .attr("fill",fill_color(d))
//                 .attr("width",w)
//                 .attr("height",h)
//                 .attr("y",scale.y(d.y)-(h/2))
//                 .attr("x",scale.x(d.x)-(w/2));
//           }
//         }
//         
//       })
//       
//     }
//   }
      
};
d3plus.apps.rings = {}
d3plus.apps.rings.data = "object";
d3plus.apps.rings.requirements = ["links","focus"];
d3plus.apps.rings.tooltip = "static"
d3plus.apps.rings.shapes = ["circle","square","donut"];
d3plus.apps.rings.scale = 1.05

d3plus.apps.rings.draw = function(vars) {
      
  var radius = d3.min([vars.app_height,vars.app_width])/2,
      // ring_width = vars.small ? radius/2.25 : radius/3,
      ring_width = radius/2.25,
      links = [],
      nodes = []
  
  if (vars.app_data) {
    
    var center = vars.app_data[vars.focus.default]
    center.d3plus.x = vars.app_width/2
    center.d3plus.y = vars.app_height/2
    center.d3plus.r = ring_width/2
    
    var primaries = [], claimed = []
    vars.connections[vars.focus.default].forEach(function(c){
      var n = vars.app_data[c[vars.id.key]]
      if (!n) {
        n = {"d3plus": {}}
        n[vars.id.key] = c[vars.id.key]
      }
      n.d3plus.children = vars.connections[n[vars.id.key]].filter(function(c){
        return c[vars.id.key] != vars.focus.default
      })
      claimed.push(n[vars.id.key])
      primaries.push(n)
    })
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Sort primary nodes by children (smallest to largest) and then by sort 
    // order.
    //--------------------------------------------------------------------------
    var sort = null
    if (vars.order.key) {
      sort = vars.order.key
    }
    else if (vars.color.key) {
      sort = vars.color.key
    }
    else if (vars.size.key) {
      sort = vars.size.key
    }
    else {
      sort = vars.id.key
    }
    
    function sort(a,b){
        
      a_value = d3plus.variable.value(vars,a,sort)
      b_value = d3plus.variable.value(vars,b,sort)
    
      if (vars.color.key && sort == vars.color.key) {
        
        a_value = d3plus.variable.color(vars,a)
        b_value = d3plus.variable.color(vars,b)
        
        a_value = d3.rgb(a_value).hsl()
        b_value = d3.rgb(b_value).hsl()

        if (a_value.s == 0) a_value = 361
        else a_value = a_value.h
        if (b_value.s == 0) b_value = 361
        else b_value = b_value.h

      }
      else {
        a_value = d3plus.variable.value(vars,a,sort)
        b_value = d3plus.variable.value(vars,b,sort)
      }
    
      if(a_value<b_value) return vars.order.sort.default == "desc" ? -1 : 1;
      if(a_value>b_value) return vars.order.sort.default == "desc" ? 1 : -1;
        
    }
    
    primaries.sort(function(a,b){
      
      var lengthdiff = a.d3plus.children.length - b.d3plus.children.length
      
      if (lengthdiff) {
        
        return lengthdiff
        
      }
      else {
        
        return sort(a,b)
      
      }
      
    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Check for similar children and give preference to nodes with less
    // overall children.
    //--------------------------------------------------------------------------
    var secondaries = [], total = 0
    primaries.forEach(function(p){
      p.d3plus.children = p.d3plus.children.filter(function(c){
        return claimed.indexOf(c[vars.id.key]) < 0
      })
      total += p.d3plus.children.length || 1
      p.d3plus.children.forEach(function(c){
        claimed.push(c[vars.id.key])
      })
    })
    
    primaries.sort(sort)
    
    var offset = 0, radian = Math.PI*2, start = 0
    primaries.forEach(function(p,i){
      
      var children = p.d3plus.children.length || 1,
          space = (radian/total)*children
          
      if (i == 0) {
        start = angle
        offset -= space/2
      }
      
      var angle = offset+(space/2)
          
      // Rotate everything by 90 degrees so that the first is at 12:00
      angle -= radian/4
      
      p.d3plus.radians = angle
      p.d3plus.x = vars.app_width/2 + (ring_width * Math.cos(angle))
      p.d3plus.y = vars.app_height/2 + (ring_width * Math.sin(angle))
      p.d3plus.r = 8
      
      var link = {"source": {}, "target": {}}
      link.source[vars.id.key] = center[vars.id.key]
      link.source.d3plus = {
        "x": vars.app_width/2,
        "y": vars.app_height/2
      }
      link.target[vars.id.key] = p[vars.id.key]
      link.target.d3plus = {
        "x": p.d3plus.x,
        "y": p.d3plus.y
      }
      links.push(link)
      
      offset += space
      p.d3plus.children.sort(sort)
      
      p.d3plus.children.forEach(function(c,i){
        var d = vars.app_data[c[vars.id.key]],
            s = radian/total
            
        if (!d) {
          d = {"d3plus": {}}
          d[vars.id.key] = c[vars.id.key]
        }
        
        a = (angle-(s*children/2)+(s/2))+((s)*i)
        d.d3plus.radians = a
        d.d3plus.x = vars.app_width/2 + ((ring_width*2) * Math.cos(a))
        d.d3plus.y = vars.app_height/2 + ((ring_width*2) * Math.sin(a))
        d.d3plus.r = 4
        secondaries.push(d)
      })
      
    })
    primaries.forEach(function(p,i){

      vars.connections[p[vars.id.key]].forEach(function(c){
        
        if (c[vars.id.key] != center[vars.id.key]) {

          var link = {"source": {}, "target": {}}
          link.d3plus = {
            "spline": true,
            "translate": {
              "x": vars.app_width/2,
              "y": vars.app_height/2
            }
          }
          link.source[vars.id.key] = p[vars.id.key]
          link.source.d3plus = {
            "a": p.d3plus.radians,
            "r": ring_width
          }
          var r = ring_width*2
          var target = secondaries.filter(function(s){
            return s[vars.id.key] == c[vars.id.key]
          })[0]
          if (!target) {
            r = ring_width
            target = primaries.filter(function(s){
              return s[vars.id.key] == c[vars.id.key]
            })[0]
          }
          link.target[vars.id.key] = c[vars.id.key]
          link.target.d3plus = {
            "a": target.d3plus.radians,
            "r": r
          }
          
          links.push(link)
          
        }
        
      })
      
    })
    
    nodes = [center].concat(primaries).concat(secondaries)
    
  }
  
  return {"links": links, "nodes": nodes}
  
  // function text_styles(t) {
  //   t
  //     .attr("fill",function(d){
  //       if (d.depth == 0) {
  //         var color = d3plus.color.text(fill_color(d));
  //       } 
  //       else {
  //         var color = d3plus.color.legible(d[vars.color]);
  //       }
  // 
  //       if (d.depth == 0) return color;
  //       else if (d.depth == 1 && (!hover || d == hover || d.children_total.indexOf(hover) >= 0)) return color;
  //       else if (d.depth == 2 && (!hover || d == hover || d.parents.indexOf(hover) >= 0)) return color;
  //       else return "lightgrey"
  //     })
  //     .attr("text-anchor", function(d) { 
  //       if (d.depth == 0) return "middle"
  //       else return d.ring_x%360 < 180 ? "start" : "end"; 
  //     })
  //     .attr("transform", function(d) { 
  //       if (d.depth == 0) return "none"
  //       else {
  //         var offset = d.radius*2
  //         return d.ring_x%360 < 180 ? "translate("+offset+")" : "rotate(180)translate(-"+offset+")";
  //       }
  //     })
  // }
  
};
d3plus.apps.stacked = {}
d3plus.apps.stacked.data = "grouped";
d3plus.apps.stacked.requirements = ["x","y"];
d3plus.apps.stacked.tooltip = "static";
d3plus.apps.stacked.shapes = ["area"];

d3plus.apps.stacked.setup = function(vars) {

  vars.x.scale.default = "continuous"
  vars.x.zerofill.default = true
  vars.y.stacked.default = true
  
}

d3plus.apps.stacked.draw = function(vars) {
  
  return d3plus.apps.chart.draw(vars)
  
}
d3plus.apps.tree_map = {}
d3plus.apps.tree_map.data = "nested";
d3plus.apps.tree_map.requirements = ["size"];
d3plus.apps.tree_map.tooltip = "follow"
d3plus.apps.tree_map.shapes = ["square"];

d3plus.apps.tree_map.draw = function(vars) {
  
  var data = d3.layout.treemap()
    .round(false)
    .size([vars.app_width, vars.app_height])
    .children(function(d) { return d.children; })
    .padding(1)
    .sort(function(a, b) { return a.value - b.value; })
    .value(function(d) { return d3plus.variable.value(vars,d,vars.size.key); })
    .nodes({"name":"root", "children": vars.app_data})
    .filter(function(d) {
      return !d.children && d.area;
    })
  
  if (data.length) {
  
    var root = data[0]
    while (root.parent) {
      root = root.parent
    }
  
    data.forEach(function(d){
      d.d3plus.x = d.x+d.dx/2
      d.d3plus.y = d.y+d.dy/2
      d.d3plus.width = d.dx
      d.d3plus.height = d.dy
      d.d3plus.share = d.value/root.value
    })
  
  }
  
  return data
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Sets color range of data, if applicable
//-------------------------------------------------------------------
d3plus.data.color = function(vars) {
  
  if (vars.color.key && typeof vars.color.key == "object") {
    if (vars.color.key[vars.id.key]) {
      var color_id = vars.color.key[vars.id.key]
    }
    else {
      var color_id = vars.color.key[Object.keys(vars.color.key)[0]]
    }
  }
  else {
    var color_id = vars.color.key
  }
  
  if (vars.data.default && vars.color.key && vars.color.changed && vars.data.keys[color_id] == "number") {

    if (vars.dev.default) d3plus.console.group("Calculating Color Range")
    
    var data_range = []
    vars.color_domain = null
    
    if (vars.dev.default) d3plus.console.time("get data range")
    
    vars.data.default.forEach(function(d){
      var val = parseFloat(d3plus.variable.value(vars,d,vars.color.key))
      if (val) data_range.push(val)
    })
    
    if (vars.dev.default) d3plus.console.timeEnd("get data range")
    
    if (vars.dev.default) d3plus.console.time("create color scale")
    
    data_range.sort(function(a,b) {return a-b})
    vars.color_domain = [d3.quantile(data_range,0.1),d3.quantile(data_range,0.9)]
    
    var new_range = vars.style.color.range.slice(0)
    if (vars.color_domain[0] < 0 && vars.color_domain[1] > 0) {
      vars.color_domain.push(vars.color_domain[1])
      vars.color_domain[1] = 0
    }
    else if (vars.color_domain[1] > 0 || vars.color_domain[0] < 0) {
      new_range = vars.style.color.heatmap
      vars.color_domain = d3plus.utils.buckets(d3.extent(data_range),new_range.length)
    }
    
    vars.color_scale
      .domain(vars.color_domain)
      .range(new_range)
  
    if (vars.dev.default) d3plus.console.timeEnd("create color scale")
    
    if (vars.dev.default) d3plus.console.groupEnd();
    
  }
  
}//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Filters the data based on vars.check
//-------------------------------------------------------------------
d3plus.data.filter = function(vars) {
  
  if (vars.check.indexOf("time") >= 0 && vars.data.filtered) {
    vars.data.filtered = {"all": vars.data.filtered.all}
  }
  
  if (vars.check.length > 1 || (vars.check.length == 1 && vars.check[0] != "time")) {
    
    if (vars.dev.default) d3plus.console.group("Filtering Data");
    var checking = vars.check.join(", ")
    if (vars.dev.default) d3plus.console.time(checking)
    
    var data = "default"
    vars.check.forEach(function(key){
      if (key != "time") {
        
        if (key == "xaxis") vars.x_range = null
        else if (key == "yaxis") vars.y_range = null
        
        vars.data.filtered = vars.data[data].filter(function(d){
          var variable = vars[key].default ? vars[key].default : vars[key].key
          var val = d3plus.variable.value(vars,d,variable)
          return val != null
        })
        data = "filtered"
        
      }
    })
    vars.data.filtered = {"all": vars.data.filtered}
    
    if (vars.dev.default) d3plus.console.timeEnd(checking)
    if (vars.dev.default) d3plus.console.groupEnd();
  }
  else if (!vars.data.filtered) {
    vars.data.filtered = {"all": vars.data.default}
  }
  
  if (vars.time.key && Object.keys(vars.data.filtered).length == 1) {
    
    if (vars.dev.default) d3plus.console.log("Disaggregating by Year")

    // Find available years
    vars.data.time = d3plus.utils.uniques(vars.data.filtered.all,vars.time.key)
    // for (var i = 0; i < vars.data.time.length; i++) {
    //   vars.data.time[i] = Date.parse(vars.data.time[i])
    // }
    // vars.data.time = vars.data.time.filter(function(t){return t})
    vars.data.time.sort()
    
    if (vars.data.time.length) {
      vars.data.time.forEach(function(y){
        vars.data.filtered[y] = vars.data.filtered.all.filter(function(d){
          return d3plus.variable.value(vars,d,vars.time.key) == y;
        })
      })
    }
    
  }
    
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats Raw Data
//-------------------------------------------------------------------
d3plus.data.format = function(vars) {
  
  vars.data.type = d3plus.apps[vars.type.default].data || "array"
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function to check key types
  //-------------------------------------------------------------------
  function get_keys(arr,add) {
    if (arr instanceof Array) {
      arr.forEach(function(d){
        if (add) d.d3plus = {}
        for (k in d) {
          if (!vars.data.keys[k] && d[k]) {
            vars.data.keys[k] = typeof d[k]
          }
        }
      })
    }
    else {
      for (var d in arr) {
        for (k in arr[d]) {
          if (!vars.data.keys[k] && arr[d][k]) {
            vars.data.keys[k] = typeof arr[d][k]
          }
        }
      }
    }
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initial setup when new data is detected
  //-------------------------------------------------------------------
  if (vars.data.changed) {
    
    if (vars.dev.default) d3plus.console.group("New Data Detected")
    
    vars.data.filtered = null

    if (vars.dev.default) d3plus.console.time("key analysis")
    vars.data.keys = {}
    get_keys(vars.data.default,true)
    if (vars.dev.default) d3plus.console.timeEnd("key analysis")
    
    if (vars.dev.default) d3plus.console.groupEnd();
    
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check attr keys, if new attrs exist
  //-------------------------------------------------------------------
  if (vars.attrs.changed) {
    
    if (vars.dev.default) d3plus.console.group("New Attributes Detected");
    if (vars.dev.default) d3plus.console.time("key analysis");
    if (typeof vars.attrs.default == "object") {
      for (a in vars.attrs.default) {
        get_keys(vars.attrs.default[a])
      }
    }
    else {
      get_keys(vars.attrs.default)
    }
    if (vars.dev.default) d3plus.console.timeEnd("key analysis");
    if (vars.dev.default) d3plus.console.groupEnd();
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Filters Data if variables with "data_refresh" have been changed
  //-------------------------------------------------------------------
  vars.check = []
  for (k in vars) {
    if (vars[k] && vars[k]["data_refresh"] && vars[k].changed) {
      vars.check.push(k)
    }
  }
  if (!vars.data.filtered || vars.check.length || vars.active.changed || vars.temp.changed || vars.total.changed) {
    vars.data[vars.data.type] = null
    vars.app_data = [];
    d3plus.data.filter(vars)
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Restricts Filtered Data if objects have "Solo" or "Mute"
  //-------------------------------------------------------------------
  if (vars.mute.length || vars.solo.length) {
    
    // if "solo", only check against "solo" (disregard "mute")
    var key = vars.solo.length ? "solo" : "mute"
    
    vars.data[vars.data.type] = null
    
    // start restricting based on "filtered" data
    var data = "filtered"
        
    vars[key].forEach(function(v){
      
      function test_value(val) {
        
        if (!(vars[v][key] instanceof Array)) {
          var arr = vars[v][key].default
        }
        else {
          var arr = vars[v][key]
        }
        
        var match = false
        arr.forEach(function(f){
          if (typeof f == "function") {
            match = f(val)
          }
          else if (f == val) {
            match = true
          }
          
        })
        
        return match
      }
      
      function nest_check(d) {
        
        // if the variable has nesting, check all levels
        var match = false
        
        if (vars[v].nesting) {
          vars[v].nesting.forEach(function(n){
            if (!match) {
              match = test_value(d3plus.variable.value(vars,d,n))
            }
          })
        }
        else {
          var k = vars[v].default ? vars[v].default : vars[v].key
          match = test_value(d3plus.variable.value(vars,d,k))
        }
        
        if (key == "solo") {
          return match
        }
        else if (key == "mute") {
          return !match
        }
        
      }
      
      if (!vars.data.restricted) {
        vars.data.restricted = {}
      }
      for (y in vars.data[data]) {
        vars.data.restricted[y] = vars.data[data][y].filter(nest_check)
      }
      
      if (v == "id") {

        if (vars.nodes.default) {
          if (vars.dev.default) d3plus.console.log("Filtering Nodes")
          vars.nodes.restricted = vars.nodes.default.filter(nest_check)
        }
    
        if (vars.links.default) {
          if (vars.dev.default) d3plus.console.log("Filtering Connections")
          vars.links.restricted = vars.links.default.filter(function(d){
            var first_match = nest_check(d.source),
                second_match = nest_check(d.target)
            return first_match && second_match
          })
          vars.connections = d3plus.utils.connections(vars,vars.links.restricted)
        }
        
      }
      
      // continue restricting on already "restricted" data
      data = "restricted"
      
    })
    
  }
  else {
    vars.data.restricted = vars.data.filtered
    vars.nodes.restricted = null
    vars.links.restricted = null
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Formats Data to type specified by App, if it does not exist.
  //-------------------------------------------------------------------
  if (!vars.data[vars.data.type]) {
    
    if (vars.dev.default) d3plus.console.group("Formatting Data")
    vars.data[vars.data.type] = {}
    
    vars.id.nesting.forEach(function(depth){
      
      if (vars.dev.default) d3plus.console.time(depth)
      
      var level = vars.id.nesting.slice(0,vars.id.nesting.indexOf(depth)+1)
      
      vars.data[vars.data.type][depth] = {}
      
      for (y in vars.data.restricted) {
        
        if (vars.data.type == "nested") {
          vars.data[vars.data.type][depth][y] = d3plus.data.nest(vars,vars.data.restricted[y],level)
        }
        else if (vars.data.type == "grouped") {
          vars.data[vars.data.type][depth][y] = d3plus.data.nest(vars,vars.data.restricted[y],level,true)
        }
        else if (vars.data.type == "object") {
          vars.data[vars.data.type][depth][y] = {}
          vars.data.restricted[y].forEach(function(d){
            vars.data[vars.data.type][depth][y][d[vars.id.key]] = d;
          })
        }
        else {
          vars.data[vars.data.type][depth][y] = vars.data.restricted[y]
        }
        
      }
      
      if (vars.dev.default) d3plus.console.timeEnd(depth)
      
    })
    
    if (vars.dev.default) d3plus.console.groupEnd()
    
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Fetches the correct Data for the App
  //-------------------------------------------------------------------
  if (!vars.app_data.length || vars.check.length || vars.data.changed || vars.depth.changed || vars.time.changed || vars.type.changed) {
    
    if (vars.data.type == "object") {
      vars.app_data = {};
    }
    else {
      vars.app_data = [];
    }
    
    if (vars.time.solo.length) {
      var years = []
      vars.time.solo.forEach(function(y){
        if (typeof y == "function") {
          vars.data.time.forEach(function(t){
            if (y(t)) {
              years.push(t)
            }
          })
        }
        else {
          years.push(y)
        }
      })
    }
    else if (vars.time.mute.length) {
      var muted = []
      vars.time.mute.forEach(function(y){
        if (typeof y == "function") {
          vars.data.time.forEach(function(t){
            if (y(t)) {
              muted.push(t)
            }
          })
        }
        else {
          muted.push(y)
        }
      })
      var years = vars.data.time.filter(function(t){
        return muted.indexOf(t) < 0
      })
    }
    else {
      var years = ["all"]
    }
    
    if (years.length == 1) {
      vars.app_data = vars.data[vars.data.type][vars.id.nesting[vars.depth.default]][years[0]]
    }
    else {
      
      var data = vars.data[vars.data.type][vars.id.nesting[vars.depth.default]],
          missing = []
          
      years.forEach(function(y){

        if (data[y]) {
          
          if (vars.data.type == "object") {
            for (k in data[y]) {
              if (!vars.app_data[data[y][k][vars.id.key]]) {
                vars.app_data[data[y][k][vars.id.key]] = []
              }
              vars.app_data[data[y][k][vars.id.key]].push(data[y][k])
            }
          }
          else {
            vars.app_data = vars.app_data.concat(data[y])
          }
        }
        else {
          missing.push(y)
        }
          
      })
      
      if (vars.app_data.length == 0 && missing.length) {
        vars.internal_error = "No Data Available for "+missing.join(", ")
        d3plus.console.warning(vars.internal_error)
      }
      else {
        if (vars.app_data instanceof Array) {
          var separated = false
          vars.axes.values.forEach(function(a){
            if (vars[a].key == vars.time.key && vars[a].scale.default == "continuous") {
              separated = true
            }
          })
          if (!separated) {
            vars.app_data = d3plus.data.nest(vars,vars.app_data,[vars.id.key])
          }
        }
        else if (typeof vars.app_data == "object") {
          for (k in vars.app_data) {
            vars.app_data[k] = d3plus.data.nest(vars,vars.app_data[k],[vars.id.key])[0]
          }
        }
        vars.internal_error = null
      }
      
    }
    
  }
  
  if (!vars.app_data) {
    vars.app_data = []
  }
  
  // Get link connections if they have not been previously set
  if (!vars.connections && vars.links.default) {
    var links = vars.links.restricted || vars.links.default
    vars.connections = d3plus.utils.connections(vars,links)
  }
  
  if (vars.type == "stacked") {
    vars.app_data = vars.app_data.filter(function(d){
      var val = parseFloat(d3plus.variable.value(vars,d,vars.x.key))
      return val >= vars.x_range[0] && val <= vars.x_range[1]
    })
  }
  
  vars.check = []
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Nests data...
//-------------------------------------------------------------------
d3plus.data.nest = function(vars,flat_data,levels,grouped) {
  
  var nested_data = d3.nest(), group_data = [];
        
  var checks = ["active","temp","total"]
      
  levels.forEach(function(nest_key, i){
    
    nested_data
      .key(function(d){ 
        return d3plus.variable.value(vars,d,nest_key)
      })
      
    vars.axes.values.forEach(function(axis){
      if (d3plus.apps[vars.type.default].requirements && d3plus.apps[vars.type.default].requirements.indexOf(axis) >= 0 && vars[axis].key && vars[axis].scale.default == "continuous") {
        nested_data
          .key(function(d){ 
            return d3plus.variable.value(vars,d,vars[axis].key)
          })
      }
    })
    
    if (i == levels.length-1) {
      
      nested_data.rollup(function(leaves){
        
        to_return = {
          "d3plus": {
            "depth": i
          }
        }
        
        checks.forEach(function(c){
          var key = vars[c].key ? vars[c].key : c
          to_return[key] = d3.sum(leaves, function(d){ 
            if (vars[c].key) {
              var a = d3plus.variable.value(vars,d,vars[c].key)
              if (typeof a != "number") {
                var a = a ? 1 : 0
              }
            }
            else if (c == "total") {
              var a = 1
            }
            else {
              var a = 0
            }
            return a
          })
          to_return.d3plus[key] = to_return[key]
        })

        var nest_obj = d3plus.variable.value(vars,leaves[0],nest_key)
        to_return[nest_key] = nest_obj
        
        for (key in vars.data.keys) {
          if (vars.id.nesting.indexOf(key) <= vars.id.nesting.indexOf(nest_key) && key in leaves[0]
            && (!vars.active.key || key != vars.active.key) && key != "d3plus") {
            if (typeof vars.aggs.default[key] == "function") {
              to_return[key] = vars.aggs.default[key](leaves)
            }
            else if (typeof vars.aggs.default[key] == "string") {
              to_return[key] = d3[vars.aggs.default[key]](leaves, function(d){ return d[key]; })
            }
            else if ([vars.time.key,vars.icon].indexOf(key) >= 0 || (key == nest_key && !to_return[key])) {
              to_return[key] = leaves[0][key];
            }
            else if (vars.data.keys[key] === "number" && vars.id.nesting.indexOf(key) < 0) {
              to_return[key] = d3.sum(leaves, function(d){ return d[key]; })
            }
            else if (key) {
              to_return[key] = leaves[0][key]
            }
          }
        }
        
        if (grouped) {
          group_data.push(to_return)
        }
        
        return to_return
        
      })
    }
  
  })
    
  rename_key_value = function(obj) { 
    if (obj.values && obj.values.length) { 
      obj.children = obj.values.map(function(obj) { 
        return rename_key_value(obj);
      })
      delete obj.values
      return obj
    } 
    else if(obj.values) { 
      return obj.values
    }
    else {
      return obj; 
    }
  }
  
  find_keys = function(obj,depth,keys) {
    if (obj.children) {
      if (vars.data.keys[levels[depth]] == "number") {
        obj.key = parseFloat(obj.key)
      }
      keys[levels[depth]] = obj.key
      delete obj.key
      for (k in keys) {
        obj[k] = keys[k]
      }
      depth++
      obj.children.forEach(function(c){
        find_keys(c,depth,keys)
      })
    }
  }
  
  nested_data = nested_data
    .entries(flat_data)
    .map(rename_key_value)
    .map(function(obj){
      find_keys(obj,0,{})
      return obj
    })
    
  if (grouped) {
    return group_data
  }
    
  return nested_data;

}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.area = function(vars,selection,enter,exit) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // D3 area definition
  //----------------------------------------------------------------------------
  var area = d3.svg.area()
    .x(function(d) { return d.d3plus.x; })
    .y0(function(d) { return d.d3plus.y0; })
    .y1(function(d) { return d.d3plus.y; })
    .interpolate(vars.shape.interpolate.default)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path").attr("class","data")
    .attr("d",function(d){ return area(d.values) })
    .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.data")
    .data(function(d) {
      
      var areas = [],
          obj = null,
          obj2 = null,
          label = {
            "w": 0,
            "h": 0,
            "x": 0,
            "y": 0
          }
  
      function check_area(area) {

        obj.y = d3.max([obj.y,area.y])
        obj.y0 = d3.min([obj.y0,area.y0])
        obj.x0 = area.x
    
        obj.h = (obj.y0 - obj.y)
        obj.w = (obj.x0 - obj.x)
    
        var toosmall = obj.h < 10 || obj.w < 30,
            aspect_old = label.w/label.h,
            size_old = label.w*label.h,
            aspect_new = obj.w/obj.h,
            size_new = obj.w*obj.h
            
        if ((!toosmall && size_old < size_new) || !label.w) {
          label = {
            "w": obj.w-(vars.style.labels.padding*2),
            "h": obj.h-(vars.style.labels.padding*2),
            "x": obj.x+(obj.w/2),
            "y": obj.y+(obj.h/2)
          }
        }
        if (obj.h < 10) {
          obj = d3plus.utils.copy(area)
        }
    
      }
  
      d.values.forEach(function(v,i){
    
        if (!obj) {
          obj = d3plus.utils.copy(v.d3plus)
        }
        else {
          var arr = d3plus.utils.buckets([0,1],vars.style.labels.segments+1)
          arr.shift()
          arr.pop()
          arr.forEach(function(n){

            var test = d3plus.utils.copy(v.d3plus),
                last = d.values[i-1].d3plus
                
            test.x = last.x + (test.x-last.x) * n
            test.y = last.y + (test.y-last.y) * n
            test.y0 = last.y0 + (test.y0-last.y0) * n

            check_area(test)
        
          })
          check_area(d3plus.utils.copy(v.d3plus))
        }
      })
      
      if (label.w) {
        d.d3plus_label = label
      }
      
      return [d];
    })
    .transition().duration(vars.style.timing.transitions)
      .attr("d",function(d){ return area(d.values) })
      .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define mouse event area
  //----------------------------------------------------------------------------
  var mouses = selection.selectAll("path.mouse")
    .data(function(d) {return [d];})

  mouses.enter().append("path")
    .attr("class","mouse")
    .attr("opacity",0)
    .attr("stroke",1)
    .attr("d",function(d){ return area(d.values) })
  
  mouses
    .data(function(d) {return [d];})
    .on(d3plus.evt.over,function(d){
    
      d3.select(this).style("cursor","pointer")
    
      var mouse = d3.event[vars.continuous_axis]
          positions = d3plus.utils.uniques(d.values,function(x){return x.d3plus[vars.continuous_axis]}),
          closest = d3plus.utils.closest(positions,mouse)
    
      d.data = d.values[positions.indexOf(closest)]
      d.d3plus = d.values[positions.indexOf(closest)].d3plus

      d3.select(this.parentNode).selectAll("path.data")
        .transition().duration(vars.style.timing.mouseevents)
        .style("opacity",1)
    
    })
    .on(d3plus.evt.move,function(d){
    
      var mouse = d3.event.x,
          positions = d3plus.utils.uniques(d.values,function(x){return x.d3plus.x}),
          closest = d3plus.utils.closest(positions,mouse)
        
      d.data = d.values[positions.indexOf(closest)]
      d.d3plus = d.values[positions.indexOf(closest)].d3plus
    
    })
    .on(d3plus.evt.out,function(d){

      d3.select(this.parentNode).selectAll("path.data")
        .transition().duration(vars.style.timing.mouseevents)
        .style("opacity",vars.style.data.opacity)
      
      delete d.d3plus
    
    })
    .transition().duration(vars.style.timing.transitions)
      .attr("d",function(d){ return area(d.values) })
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns the correct fill color for a node
//-------------------------------------------------------------------
d3plus.shape.color = function(d,vars) {
  
  var shape = d.d3plus ? d.d3plus.shapeType : vars.shape.default
  
  if (vars.shape.default == "line") {
    if (d.d3plus && d.d3plus.shapeType == "circle") {
      return d3plus.variable.color(vars,d)
    }
    else {
      return "none"
    }
  }
  else if (vars.shape.default == "area" || shape == "active") {
    return d3plus.variable.color(vars,d)
  }
  else if (shape == "temp") {
    return "url(#hatch"+d.d3plus.id+")"
  }

  if (d.d3plus.static) {
    return d3plus.color.lighter(d3plus.variable.color(vars,d));
  }
  
  var active = vars.active.key ? d3plus.variable.value(vars,d,vars.active.key) : d.d3plus.active,
      temp = vars.temp.key ? d3plus.variable.value(vars,d,vars.total.key) : d.d3plus.temp,
      total = vars.total.key ? d3plus.variable.value(vars,d,vars.total.key) : d.d3plus.total
    
  if ((!vars.active.key && !vars.temp.key) || (active && total && active == total) || (active && !total)) {
    return d3plus.variable.color(vars,d)
  }
  else if (vars.active.spotlight.default) {
    return "#eee"
  }
  else {
    return d3plus.color.lighter(d3plus.variable.color(vars,d));
  }
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.coordinates = function(vars,selection,enter,exit) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define the geographical projection
  //----------------------------------------------------------------------------
  var projection = d3.geo.mercator()
  
  var clip = d3.geo.clipExtent()
      .extent([[0, 0], [vars.app_width, vars.app_height]]);
      
  if (!vars.zoom.scale) {
    vars.zoom.scale = 1
  }
      
  vars.zoom.area = 1/vars.zoom.scale/vars.zoom.scale
  
  // console.log(vars.zoom)

  var simplify = d3.geo.transform({
    point: function(x, y, z) {
      // console.log(z,vars.zoom.area)
      if (z >= vars.zoom.area) this.stream.point(x,y);
    }
  });
  
  var path = d3.geo.path()
    .projection(projection)
    // .projection(simplify)
    // .projection({stream: function(s) { return simplify.stream(clip.stream(s)); }})
    
  enter.append("path")
    .attr("id",function(d){
      return d.id
    })
    .attr("class","data")
    .attr("d",path)
    .call(d3plus.shape.style,vars)
    
  selection.selectAll("path.data")
    .on(d3plus.evt.over,function(d){
      d3.select(this).attr("opacity",1)
    })
    .on(d3plus.evt.out,function(d){
      d3.select(this).attr("opacity",vars.style.data.opacity)
    })
    .transition().duration(vars.style.timing.transitions)
      .call(d3plus.shape.style,vars)
      
  if (vars.coords.changed) {
    selection.each(function(d){
      var b = path.bounds(d)
      if (!vars.bounds) {
        vars.bounds = b
      }
      else {
        if (vars.bounds[0][0] > b[0][0]) {
          vars.bounds[0][0] = b[0][0]
        }
        if (vars.bounds[0][1] > b[0][1]) {
          vars.bounds[0][1] = b[0][1]
        }
        if (vars.bounds[1][0] < b[1][0]) {
          vars.bounds[1][0] = b[1][0]
        }
        if (vars.bounds[1][1] < b[1][1]) {
          vars.bounds[1][1] = b[1][1]
        }
      }
    })
  }
    
  if (!vars.viewport) {
    d3plus.zoom.reset(vars)
  }
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "donut" shapes using svg:path with arcs
//------------------------------------------------------------------------------
d3plus.shape.donut = function(vars,selection,enter,exit,transform) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // In order to correctly animate each donut's size and arcs, we need to store
  // it's previous values in a lookup object that does not get destroyed when
  // redrawing the visualization.
  //----------------------------------------------------------------------------
  if (!vars.arcs) {
    vars.arcs = {
      "donut": {},
      "active": {},
      "temp": {}
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main arc function that determines what values to use for each
  // arc angle and radius.
  //----------------------------------------------------------------------------
  var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d){
      var a = vars.arcs[d.d3plus.shapeType][d.d3plus.id].a
      return a > Math.PI*2 ? Math.PI*2 : a;
    })
    .innerRadius(function(d){
      if (shape == "donut" && !d.d3plus.static) {
        var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
        return r * vars.style.data.donut.size
      }
      else {
        return 0
      }
    })
    .outerRadius(function(d){
      var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
      if (d.d3plus.shapeType != "donut") return r*2
      else return r
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main "arcTween" function where all of the animation happens 
  // for each arc.
  //----------------------------------------------------------------------------
  function size(path,mod,rad,ang) {
    if (!mod) var mod = 0
    if (typeof rad != "number") var rad = undefined
    if (typeof ang != "number") var ang = undefined
    path.attrTween("d", function(d){
      if (rad == undefined) var r = d.d3plus.r
      else var r = rad
      if (ang == undefined) var a = d.d3plus.a[d.d3plus.shapeType]
      else var a = ang
      if (!vars.arcs[d.d3plus.shapeType][d.d3plus.id]) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id] = {"r": 0}
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = d.d3plus.shapeType == "donut" ? Math.PI * 2 : 0
      }
      var radius = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].r,r+mod),
          angle = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].a,a)
      return function(t) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].r = radius(t)
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = angle(t)
        return arc(d)
      }
    })
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Enter
  //----------------------------------------------------------------------------
  enter.append("path")
    .attr("class","data")
    .transition().duration(0)
      .call(size,0,0)
      .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Update
  //----------------------------------------------------------------------------
  selection.selectAll("path.data")
    .data(function(d) {
      return [d];
    })
    .transition().duration(vars.style.timing.transitions)
      .call(size)
      .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "paths" Exit
  //----------------------------------------------------------------------------
  exit.selectAll("path.data")
    .transition().duration(vars.style.timing.transitions)
      .call(size,0,0)
      .each("end",function(d){
        delete vars.arcs[d.d3plus.shapeType][d.d3plus.id]
      })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define mouse event shapes
  //----------------------------------------------------------------------------
  var mouses = selection.selectAll("rect.mouse")
    .data(function(d) {
      return !d.d3plus.static ? [d] : [];
    })
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Mouse "rect" enter
  //----------------------------------------------------------------------------
  mouses.enter().append("rect")
    .attr("class","mouse")
    .attr("x",0)
    .attr("y",0)
    .attr("width",0)
    .attr("height",0)
    .attr("opacity",0)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Mouse "rect" update and mouse events
  //----------------------------------------------------------------------------
  mouses
    .data(function(d) {
      return !d.d3plus.static ? [d] : [];
    })
    .on(d3plus.evt.over,function(d){
  
      d3.select(this).style("cursor","pointer")
  
      d3.select(this.parentNode).selectAll("path.data")
        .transition().duration(vars.style.timing.mouseevents)
        .attr("opacity",1)
  
      d3.select(this.parentNode)
        .transition().duration(vars.style.timing.mouseevents)
        .call(transform,true)
    
    })
    .on(d3plus.evt.out,function(d){
  
      d3.select(this.parentNode).selectAll("path.data")
        .transition().duration(vars.style.timing.mouseevents)
        .attr("opacity",vars.style.data.opacity)
      
      d3.select(this.parentNode)
        .transition().duration(vars.style.timing.mouseevents)
        .call(transform)
    
    })
    .transition().duration(vars.style.timing.transitions)
      .attr("x",function(d){
        return (-d.d3plus.width/2)-3
      })
      .attr("y",function(d){
        return (-d.d3plus.height/2)-3
      })
      .attr("width",function(d){
        return d.d3plus.width+6
      })
      .attr("height",function(d){
        return d.d3plus.height+6
      })
      .attr("rx",function(d){
        return (d.d3plus.width+6)/2
      })
      .attr("ry",function(d){
        return (d.d3plus.height+6)/2
      })
      .attr("shape-rendering","auto")
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws the appropriate shape based on the data
//------------------------------------------------------------------------------
d3plus.shape.draw = function(vars,data) {
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Match vars.shape types to their respective d3plus.shape functions. For 
  // example, both "square", and "circle" shapes use "rect" as their drawing 
  // class.
  //----------------------------------------------------------------------------
  var shape_lookup = {
    "area": "area",
    "circle": "rect",
    "donut": "donut",
    "line": "line",
    "square": "rect",
    "coordinates": "coordinates"
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Split the data by each shape type in the data.
  //----------------------------------------------------------------------------
  var shapes = {}
  data.forEach(function(d){
    if (!d.d3plus) {
      var s = shape_lookup[vars.shape.default]
    }
    else if (!d.d3plus.shape) {
      var s = shape_lookup[vars.shape.default]
      d.d3plus.shapeType = s
    }
    else {
      var s = d.d3plus.shape
      d.d3plus.shapeType = s
    }
    if (!shapes[s]) {
      shapes[s] = []
    }
    shapes[s].push(d)
  })
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Resets the "id" of each data point to use with matching.
  //----------------------------------------------------------------------------
  function id(d) {
    
    var depth = d.d3plus.depth ? d.d3plus.depth : vars.depth.default
    
    d.d3plus.id = ""
    
    vars.id.nesting.forEach(function(n,i){
      if (i <= depth) {
        d.d3plus.id += d3plus.variable.value(vars,d,n)
        d.d3plus.id += "_"
      }
    })
    
    d.d3plus.id += depth+"_"+shape
    
    vars.axes.values.forEach(function(axis){
      if (vars[axis].scale.default == "continuous") {
        d.d3plus.id += "_"+d3plus.variable.value(vars,d,vars[axis].key)
      }
    })
    
    return d
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Calculates width, height, and radius for each data point.
  //----------------------------------------------------------------------------
  function size(d) {
  
    if (d.d3plus.r) {
      if (!d.d3plus.width) d.d3plus.width = d.d3plus.r*2
      if (!d.d3plus.height) d.d3plus.height = d.d3plus.r*2
    }
    else {
      d.d3plus.r = d3.max([d.d3plus.width,d.d3plus.height])/2
    }
    
    if (vars.shape.default != vars.shape.previous) {
      if (vars.shape.default == "square" && ["circle","donut"].indexOf(vars.shape.previous) >= 0) {
        d.d3plus.r = d3.max([d.d3plus.width,d.d3plus.height])/2
      }
      else if (vars.shape.previous == "square" && ["circle","donut"].indexOf(vars.shape.default) >= 0) {
        d.d3plus.width = d.d3plus.r*2
        d.d3plus.height = d.d3plus.r*2
      }
    }
    
    return d
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Transforms the positions and scale of each group.
  //----------------------------------------------------------------------------
  function transform(g,grow) {
    
    var scales = d3plus.apps[vars.type.default].scale
    if (grow && scales && scales[vars.shape.default]) {
       var scale = scales[vars.shape.default]
    }
    else if (grow && scales && typeof scales == "number") {
      var scale = scales
    }
    else {
      var scale = 1
    }

    g
      .attr("transform",function(d){
        if (["line","area","coordinates"].indexOf(shape) < 0) {
          return "translate("+d.d3plus.x+","+d.d3plus.y+")scale("+scale+")"
        }
        else {
          return "scale("+scale+")"
        }
      })
    
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Remove old groups
  //----------------------------------------------------------------------------
  for (shape in shape_lookup) {
    if (!(shape_lookup[shape] in shapes)) {
      vars.g.data.selectAll("g."+shape_lookup[shape])
        .transition().duration(vars.style.timing.transitions)
        .attr("opacity",0)
        .remove()
    }
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialize arrays for labels and sizes
  //----------------------------------------------------------------------------
  var labels = [],
      shares = []
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Create groups by shape, apply data, and call specific shape drawing class.
  //----------------------------------------------------------------------------
  for (shape in shapes) {
    
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind Data to Groups
    //--------------------------------------------------------------------------
    var selection = vars.g.data.selectAll("g."+shape)
      .data(shapes[shape],function(d){
        
        if (shape == "coordinates") {
          if (!d.d3plus) {
            d.d3plus = {}
          }
          return d.id
        }
      
        if (d.values) {
          d.values.forEach(function(v){
            v = id(v)
            v = size(v)
            v.d3plus.shapeType = "circle"
          })
        }
        else {
        
          d = id(d)
      
          d = size(d)

          if (!d.d3plus.a) {
          
            d.d3plus.a = {"donut": Math.PI*2}
            var active = vars.active.key ? d.d3plus[vars.active.key] : d.d3plus.active,
                temp = vars.temp.key ? d.d3plus[vars.temp.key] : d.d3plus.temp,
                total = vars.total.key ? d.d3plus[vars.total.key] : d.d3plus.total
            
            if (total) {
              if (active) {
                d.d3plus.a.active = (active/total) * (Math.PI * 2)
              }
              else {
                d.d3plus.a.active = 0
              }
              if (temp) {
                d.d3plus.a.temp = ((temp/total) * (Math.PI * 2)) + d.d3plus.a.active
              }
              else {
                d.d3plus.a.temp = 0
              }
            }
          
          }
        
        }
        
        return d.d3plus ? d.d3plus.id : d[vars.id.key];
      
      })
      
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Enter
    //--------------------------------------------------------------------------
    var enter = selection.enter().append("g")
      .attr("class",shape)
      .attr("opacity",0)
      .call(transform)
      
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Update
    //--------------------------------------------------------------------------
    selection
      .order()
      .transition().duration(vars.style.timing.transitions)
      .call(transform)
      .attr("opacity",1)
      
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Groups Exit
    //--------------------------------------------------------------------------
    var exit = selection.exit()
      .transition().duration(vars.style.timing.transitions)
      .attr("opacity",0)
      .remove()
      
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Draw appropriate graphics inside of each group
    //--------------------------------------------------------------------------
    d3plus.shape[shape](vars,selection,enter,exit,transform)
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Check for active and temp fills for rects and donuts
    //--------------------------------------------------------------------------
    if (["rect","donut"].indexOf(shape) >= 0) {
      d3plus.shape.fill(vars,selection,enter,exit,transform)
    }
  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create labels
    //--------------------------------------------------------------------------
    d3plus.shape.labels(vars,selection)
    
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function to Update Links
  //----------------------------------------------------------------------------
  function links(d) {

    vars.g.links.selectAll("line, path")
      .sort(function(a,b){
        if (d) {
          
          var id = d[vars.id.key],
              a_source = a.source[vars.id.key],
              a_target = a.target[vars.id.key],
              a_sort = 0,
              b_source = b.source[vars.id.key],
              b_target = b.target[vars.id.key],
              b_sort = 0
              
          if (a_source == id || a_target == id) {
            a_sort = 1
          }
          if (b_source == id || b_target == id) {
            b_sort = 1
          }
          
          return a_sort - b_sort
          
        }
        else {
          return a - b
        }
      })
      .transition().duration(vars.style.timing.mouseevents)
      .style("stroke",function(l){
        
        if (d) {
    
          var id = d[vars.id.key],
              source = l.source[vars.id.key],
              target = l.target[vars.id.key]
              
          if (source == id || target == id) {
            return vars.style.highlight.primary
          }
          else {
            return vars.style.background
          }
        }
        else {
          return vars.style.links.color
        }
        
      })
      
  }
  
  vars.g.data.selectAll("g")
    .on(d3plus.evt.over,function(d){
      
      if (!d.d3plus || !d.d3plus.static) {
        
        if (!vars.small) {

          vars.covered = false
  
          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse.over) {
            vars.mouse.over(d)
          }
      
          var tooltip_data = d.data ? d.data : d
          d3plus.tooltip.app({
            "vars": vars,
            "data": tooltip_data
          })
        
        }
        
        links(d)
        
      }
      
    })
    .on(d3plus.evt.move,function(d){

      if (!d.d3plus || !d.d3plus.static) {
        
        if (!vars.small) {

          vars.covered = false
  
          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse.move) {
            vars.mouse.over(d)
          }
      
          if (["area","line"].indexOf(vars.shape.default) >= 0 || d3plus.apps[vars.type.default].tooltip == "follow") {

            var tooltip_data = d.data ? d.data : d
            d3plus.tooltip.app({
              "vars": vars,
              "data": tooltip_data
            })
        
          }
          
        }
        
        links(d)
        
      }
      
    })
    .on(d3plus.evt.out,function(d){
      
      if (!d.d3plus || !d.d3plus.static) {
        
        if (!vars.small) {

          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse.out) {
            vars.mouse.over(d)
          }
      
          if (!vars.covered) {
            d3plus.tooltip.remove(vars.type.default)
          }
          
        }
        
        links()
        
      }
      
    })
    .on(d3plus.evt.click,function(d){
      
      if (!d.d3plus || !d.d3plus.static) {
        
        if (!vars.small) {

          if (typeof vars.mouse == "function") {
            vars.mouse(d)
          }
          else if (vars.mouse.click) {
            vars.mouse.over(d)
          }
      
          var tooltip_data = d.data ? d.data : d
          d3plus.tooltip.app({
            "vars": vars,
            "data": tooltip_data
          })
        
        }
        
        links()
        
      }
      
    })
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.fill = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on enter and exit.
  //----------------------------------------------------------------------------
  function init(nodes) {
    
    nodes
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0)
      
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on update.
  //----------------------------------------------------------------------------
  function update(nodes,mod) {
    if (!mod) var mod = 0
    nodes
      .attr("x",function(d){
        return (-d.d3plus.width/2)-(mod/2)
      })
      .attr("y",function(d){
        return (-d.d3plus.height/2)-(mod/2)
      })
      .attr("width",function(d){
        return d.d3plus.width+mod
      })
      .attr("height",function(d){
        return d.d3plus.height+mod
      })
      .attr("rx",function(d){
        var rounded = ["circle","donut"].indexOf(vars.shape.default) >= 0
        return rounded ? (d.d3plus.width+mod)/2 : 0
      })
      .attr("ry",function(d){
        var rounded = ["circle","donut"].indexOf(vars.shape.default) >= 0
        return rounded ? (d.d3plus.height+mod)/2 : 0
      })
      .attr("shape-rendering",function(d){
        if (["square"].indexOf(vars.shape.default) >= 0) {
          return vars.style.rendering
        }
        else {
          return "auto"
        }
      })
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // In order to correctly animate each donut's size and arcs, we need to store
  // it's previous values in a lookup object that does not get destroyed when
  // redrawing the visualization.
  //----------------------------------------------------------------------------
  if (!vars.arcs) {
    vars.arcs = {
      "donut": {},
      "active": {},
      "temp": {}
    }
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main arc function that determines what values to use for each
  // arc angle and radius.
  //----------------------------------------------------------------------------
  var arc = d3.svg.arc()
    .startAngle(0)
    .endAngle(function(d){
      var a = vars.arcs[d.d3plus.shapeType][d.d3plus.id].a
      return a > Math.PI*2 ? Math.PI*2 : a;
    })
    .innerRadius(function(d){
      if (shape == "donut" && !d.d3plus.static) {
        var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
        return r * vars.style.data.donut.size
      }
      else {
        return 0
      }
    })
    .outerRadius(function(d){
      var r = vars.arcs[d.d3plus.shapeType][d.d3plus.id].r
      if (d.d3plus.shapeType != "donut") return r*2
      else return r
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // This is the main "arcTween" function where all of the animation happens 
  // for each arc.
  //----------------------------------------------------------------------------
  function size(path,mod,rad,ang) {
    if (!mod) var mod = 0
    if (typeof rad != "number") var rad = undefined
    if (typeof ang != "number") var ang = undefined
    path.attrTween("d", function(d){
      if (rad == undefined) var r = d.d3plus.r
      else var r = rad
      if (ang == undefined) var a = d.d3plus.a[d.d3plus.shapeType]
      else var a = ang
      if (!vars.arcs[d.d3plus.shapeType][d.d3plus.id]) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id] = {"r": 0}
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = d.d3plus.shapeType == "donut" ? Math.PI * 2 : 0
      }
      var radius = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].r,r+mod),
          angle = d3.interpolate(vars.arcs[d.d3plus.shapeType][d.d3plus.id].a,a)
      return function(t) {
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].r = radius(t)
        vars.arcs[d.d3plus.shapeType][d.d3plus.id].a = angle(t)
        return arc(d)
      }
    })
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Check each data point for active and temp data
  //----------------------------------------------------------------------------
  selection.each(function(d){
  
    var active = vars.active.key ? d.d3plus[vars.active.key] : d.d3plus.active,
        temp = vars.temp.key ? d.d3plus[vars.temp.key] : d.d3plus.temp,
        total = vars.total.key ? d.d3plus[vars.total.key] : d.d3plus.total,
        group = d3.select(this)
        
    function destroy(type) {
    
      group.selectAll("path."+type)
        .transition().duration(vars.style.timing.transitions)
        .call(size,0,d.d3plus.r,0)
        .remove()
    
    }
  
    function create(type) {

      var new_data = d3plus.utils.copy(d)
      new_data.d3plus.shapeType = type
    
      var delay = 0

      var color = d3plus.variable.color(vars,d)
    
      if (group.selectAll("path."+type).empty()) {
          
        delay = vars.style.timing.transitions
      
        if (type == "temp") {
        
          var pattern = vars.defs.append("pattern")
            .attr("id","hatch"+d.d3plus.id)
            .attr("patternUnits","userSpaceOnUse")
            .attr("x","0")
            .attr("y","0")
            .attr("width","10")
            .attr("height","10")
            .append("g")
          
          pattern.append("rect")
            .attr("x","0")
            .attr("y","0")
            .attr("width","10")
            .attr("height","10")
            .attr("fill",color)
            .attr("fill-opacity",0.25)
          
          pattern.append("line")
            .attr("x1","0")
            .attr("x2","10")
            .attr("y1","0")
            .attr("y2","10")
            .attr("stroke",color)
            .attr("stroke-width",1)
            .attr("shape-rendering",vars.style.rendering)
          
          pattern.append("line")
            .attr("x1","-1")
            .attr("x2","1")
            .attr("y1","9")
            .attr("y2","11")
            .attr("stroke",color)
            .attr("stroke-width",1)
            .attr("shape-rendering",vars.style.rendering)
          
          pattern.append("line")
            .attr("x1","9")
            .attr("x2","11")
            .attr("y1","-1")
            .attr("y2","1")
            .attr("stroke",color)
            .attr("stroke-width",1)
            .attr("shape-rendering",vars.style.rendering)
        }
      
        if (group.selectAll("#clip_"+d.d3plus.id).empty()) {
          group.insert("clipPath",".mouse")
            .attr("id","clip_"+d.d3plus.id)
            .append("rect")
              .attr("class","clipping")
              .call(init)
              .transition().duration(vars.style.timing.transitions)
                .call(update)
        }
      
        group.insert("path","rect.mouse")
          .attr("class",type)
          .attr("clip-path","url(#clip_"+d.d3plus.id+")")
          .data([new_data])
          .transition().duration(0)
            .call(size,0,d.d3plus.r,0)
            .call(d3plus.shape.style,vars)
            .transition().duration(delay)
              .call(size)
            
      }

      group.selectAll("path."+type)
        .data([new_data])
        .transition().duration(vars.style.timing.transitions)
        .delay(delay)
        .call(size)
        .call(d3plus.shape.style,vars)
      
      group.selectAll("#clip_"+d.d3plus.id)
        .select("rect")
        .data([new_data])
        .transition().duration(vars.style.timing.transitions)
        .delay(delay)
          .call(update)
        
      vars.defs.selectAll("pattern#hatch"+d.d3plus.id).selectAll("rect")
        .transition().duration(vars.style.timing.transitions)
        .delay(delay)
        .style("fill",color)
    
      vars.defs.selectAll("pattern#hatch"+d.d3plus.id).selectAll("line")
        .transition().duration(vars.style.timing.transitions)
        .delay(delay)
        .style("stroke",color)
        
    }
      
    if (total && d3plus.apps[vars.type.default].fill) {
      
      if (active && active < total) {
        create("active")
      }
      else {
        destroy("active")
      }
      
      if (temp) {
        create("temp")
      }
      else {
        destroy("temp")
      }
    
      if (!temp && !active) {
        group.selectAll("#clip_"+d.d3plus.id)
          .transition().delay(vars.style.timing.transitions)
          .remove()
      }
        
    }
    else {
      
      destroy("active")
      destroy("temp")
      
      group.selectAll("#clip_"+d.d3plus.id)
        .transition().delay(vars.style.timing.transitions)
        .remove()
    }
  })
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "labels" using svg:text and d3plus.utils.wordwrap
//------------------------------------------------------------------------------
d3plus.shape.labels = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Label Exiting
  //----------------------------------------------------------------------------
  remove = function(text) {
    text
      .transition().duration(vars.style.timing.transitions)
      .attr("opacity",0)
      .remove()
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Label Styling
  //----------------------------------------------------------------------------
  style = function(text,wrap) {
    
    function x_pos(t) {
      
      var align = vars.style.labels.align,
          tspan = this.tagName == "tspan",
          share = tspan ? this.parentNode.className.baseVal == "share" : this.className.baseVal == "share",
          width = d3.select(this).node().getBBox().width,
          rtl = vars.style.labels.dir == "rtl"
          
      if (align == "middle" || share) {
        var pos = t.x-width/2
      }
      else if ((align == "end" && !rtl) || (align == "start" && rtl)) {
        var pos = t.x+t.w/2-width
      }
      else {
        var pos = t.x-t.w/2
      }
      
      if (tspan) {
        if (align == "middle") {
          if (vars.style.labels.dir == "rtl") {
            pos -= (width-this.offsetWidth)/2
          }
          else {
            pos += (width-this.offsetWidth)/2
          }
        }
        else if (align == "end") {
          if (vars.style.labels.dir == "rtl") {
            pos -= (width-this.offsetWidth)
          }
          else {
            pos += (width-this.offsetWidth)
          }
        }
      }
      
      if (vars.style.labels.dir == "rtl") {
        pos += width
      }
      
      return pos
      
    }
    
    function y_pos(t) {
      
      if (d3.select(this).select("tspan").empty()) {
        return 0
      }
      else {
        
        var align = vars.style.labels.align,
            height = d3.select(this).node().getBBox().height,
            diff = parseFloat(d3.select(this).style("font-size"),10)/5
            
        if (this.className.baseVal == "share") {
          var pheight = d3.select(this.parentNode).datum().d3plus.height
          if (align == "end") {
            var y = t.y-pheight/2+diff/2
          }
          else {
            var y = t.y+pheight/2-height-diff/2
          }
        }
        else {
          
          if (align == "middle") {
            var y = t.y-height/2-diff/2
          }
          else if (align == "end") {
            var y = t.y+t.h/2-height+diff/2
          }
          else {
            var y = t.y-t.h/2-diff
          }
        
        }

        return y
        
      }
    }
    
    text
      .style("font-weight",vars.style.font.weight)
      .attr("font-family",vars.style.font.family)
      .attr("text-anchor","start")
      .attr("fill", function(t){ 
        return d3plus.color.text(t.color); 
      })
      .attr("x",x_pos)
      .attr("y",y_pos)
      .each(function(t){
        
        if (wrap) {

          if (t.text) {

            d3plus.utils.wordwrap({
              "text": vars.format(t.text*100,"share")+"%",
              "parent": this,
              "width": t.w,
              "height": t.h,
              "resize": true,
              "font_max": 70
            })
          
          }
          else {
            
            if (vars.style.labels.align != "middle") {
              var height = t.h-t.share
            }
            else {
              var height = t.h
            }

            d3plus.utils.wordwrap({
              "text": t.names,
              "parent": this,
              "width": t.w,
              "height": height,
              "resize": true
            })
          
          }
          
        }
        
      })
      .attr("x",x_pos)
      .attr("y",y_pos)
      .selectAll("tspan")
        .attr("x",x_pos)
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Loop through each selection and analyze the labels
  //----------------------------------------------------------------------------
  if (vars.labels.default) {
    
    selection.each(function(d){
    
      var disabled = d.d3plus && "label" in d.d3plus && !d.d3plus.label,
          stat = d.d3plus && "static" in d.d3plus && d.d3plus.static
          label = d.d3plus_label,
          share = d.d3plus_share,
          names = d3plus.variable.text(vars,d),
          group = d3.select(this),
          share_size = 0,
          fill = d3plus.apps[vars.type.default].fill
          
      if (["line","area"].indexOf(vars.shape.default) >= 0) {
        var background = true
      }
      else {
        var active = vars.active.key ? d.d3plus[vars.active.key] : d.d3plus.active,
            temp = vars.temp.key ? d.d3plus[vars.temp.key] : d.d3plus.temp,
            total = vars.total.key ? d.d3plus[vars.total.key] : d.d3plus.total,
            background = (!temp && !active) || (active == total)
      }
      
      if (!disabled && (background || !fill) && !stat) {
        
        if (share && share.w >= 20 && share.h >= 10 && d.d3plus.share && vars.style.labels.align != "middle") {
          
          share.text = d.d3plus.share
          share.color = d3plus.shape.color(d,vars)
    
          var text = group.selectAll("text.share")
            .data([share],function(t){
              return t.w+""+t.h+""+t.text
            })
    
          text
            .transition().duration(vars.style.timing.transitions/2)
            .call(style,true)
    
          text.enter().insert("text",".mouse")
            .attr("class","share")
            .attr("opacity",0)
            .call(style,true)
    
          text
            .transition().duration(vars.style.timing.transitions/2)
            .delay(vars.style.timing.transitions/2)
            .attr("opacity",0.5)
      
          share_size = text.node().getBBox().height
  
          text.exit()
            .call(remove)
          
        }
        else {
          group.selectAll("text.share")
            .call(remove)
        }
        
        if (label && label.w >= 20 && label.h >= 10 && names.length) {

          label.names = names
          label.color = d3plus.shape.color(d,vars)
          label.share = share_size
      
          var text = group.selectAll("text.label")
            .data([label],function(t){
              return t.w+""+t.h+""+t.names.join("")
            })
        
          text
            .transition().duration(vars.style.timing.transitions/2)
            .call(style,true)
      
          text.enter().insert("text",".mouse")
            .attr("class","label")
            .attr("opacity",0)
            .call(style,true)
        
          text
            .transition().duration(vars.style.timing.transitions/2)
            .delay(vars.style.timing.transitions/2)
              .attr("opacity",1)
    
          text.exit()
            .call(remove)
            
        }
        else {
          group.selectAll("text.label")
            .call(remove)
        }
        
      }
      else {
        group.selectAll("text")
          .call(remove)
      }
    })
    
  }
  else {
    
    selection.selectAll("text")
      .call(remove)
      
  }
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "line" shapes using svg:line
//------------------------------------------------------------------------------
d3plus.shape.line = function(vars,selection,enter,exit) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The D3 line function that determines what variables to use for x and y 
  // positioning, as well as line interpolation defined by the user.
  //----------------------------------------------------------------------------
  var line = d3.svg.line()
    .x(function(d){ return d.d3plus.x; })
    .y(function(d){ return d.d3plus.y; })
    .interpolate(vars.shape.interpolate.default)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Divide each line into it's segments. We do this so that there can be gaps 
  // in the line and mouseover.
  //
  // Then, create new data group from values to become small nodes at each 
  // point on the line.
  //----------------------------------------------------------------------------

  var hitarea = vars.style.data.stroke.width
  if (hitarea < 30) {
    hitarea = 30
  }
  
  selection.each(function(d){

    var step = 0,
        segments = [],
        nodes = [],
        temp = d3plus.utils.copy(d),
        group = d3.select(this)
        
    temp.values = []
    d.values.forEach(function(v,i,arr){
      nodes.push(v)
      var k = v[vars[vars.continuous_axis].key],
          index = vars.tickValues[vars.continuous_axis].indexOf(k)
          
      if (i+step == index) {
        temp.values.push(v)
        temp.key += "_"+segments.length
      }
      else {
        if (i > 0) {
          segments.push(temp)
          temp = d3plus.utils.copy(d)
          temp.values = []
        }
        temp.values.push(v)
        temp.key += "_"+segments.length
        step++
      }
      if (i == arr.length-1) {
        segments.push(temp)
      }
    })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind segment data to "paths"
    //--------------------------------------------------------------------------
    var paths = group.selectAll("path.line")
      .data(segments, function(d){
        return d.key
      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Enter
    //--------------------------------------------------------------------------
    paths.enter().append("path")
      .attr("class","line")
      .attr("d",function(d){ return line(d.values) })
      .call(d3plus.shape.style,vars)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "paths" Update
    //--------------------------------------------------------------------------
    paths
      .transition().duration(vars.style.timing.transitions)
        .attr("d",function(l){ return line(l.values) })
        .call(d3plus.shape.style,vars)

  
    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Bind node data to "rects"
    //--------------------------------------------------------------------------
    var rects = group.selectAll("rect.anchor")
      .data(nodes, function(d){
        return d.d3plus.id
      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "rects" Enter
    //--------------------------------------------------------------------------
    rects.enter().append("rect")
      .attr("class","anchor")
      .attr("id",function(d){
        return d.d3plus.id
      })
      .call(init)
      .call(d3plus.shape.style,vars)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "rects" Update
    //--------------------------------------------------------------------------
    rects
      .transition().duration(vars.style.timing.transitions)
        .call(update)
        .call(d3plus.shape.style,vars)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // "rects" Exit
    //--------------------------------------------------------------------------
    rects.exit()
      .transition().duration(vars.style.timing.transitions)
        .call(init)
        .remove()

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Create mouse event lines
    //--------------------------------------------------------------------------
    var mouse = group.selectAll("path.mouse")
      .data(segments, function(d){
        return d.key
      })

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Enter
    //--------------------------------------------------------------------------
    mouse.enter().append("path")
      .attr("class","mouse")
      .attr("d",function(l){ return line(l.values) })
      .style("stroke","black")
      .style("stroke-width",hitarea)
      .style("fill","none")
      .style("stroke-linecap","round")
      .attr("opacity",0.25)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Update
    //--------------------------------------------------------------------------
    mouse
      .on(d3plus.evt.over,function(m){
    
        d3.select(this).style("cursor","pointer")
    
        var mouse = d3.event[vars.continuous_axis]
            positions = d3plus.utils.uniques(d.values,function(x){return x.d3plus[vars.continuous_axis]}),
            closest = d3plus.utils.closest(positions,mouse)
            
        var parent_data = d3.select(this.parentNode).datum()
        parent_data.data = d.values[positions.indexOf(closest)]
        parent_data.d3plus = d.values[positions.indexOf(closest)].d3plus
        
        d3.select(this.parentNode).selectAll("path.line")
          .transition().duration(vars.style.timing.mouseevents)
          .style("stroke-width",vars.style.data.stroke.width*2)
    
        d3.select(this.parentNode).selectAll("rect")
          .transition().duration(vars.style.timing.mouseevents)
          .style("stroke-width",vars.style.data.stroke.width*2)
          .call(update,2)
    
      })
      .on(d3plus.evt.move,function(d){
    
        var mouse = d3.event.x,
            positions = d3plus.utils.uniques(d.values,function(x){return x.d3plus.x}),
            closest = d3plus.utils.closest(positions,mouse)
            
        var parent_data = d3.select(this.parentNode).datum()
        parent_data.data = d.values[positions.indexOf(closest)]
        parent_data.d3plus = d.values[positions.indexOf(closest)].d3plus
    
      })
      .on(d3plus.evt.out,function(d){
    
        d3.select(this.parentNode).selectAll("path.line")
          .transition().duration(vars.style.timing.mouseevents)
          .style("stroke-width",vars.style.data.stroke.width)
    
        d3.select(this.parentNode).selectAll("rect")
          .transition().duration(vars.style.timing.mouseevents)
          .style("stroke-width",vars.style.data.stroke.width)
          .call(update)
            
        var parent_data = d3.select(this.parentNode).datum()
        delete parent_data.data
        delete parent_data.d3plus
    
      })
      .transition().duration(vars.style.timing.transitions)
        .attr("d",function(l){ return line(l.values) })
        .style("stroke-width",hitarea)

    //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    // Mouse "paths" Exit
    //--------------------------------------------------------------------------
    mouse.exit().remove()
    
  })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each anchor point on enter and exit.
  //----------------------------------------------------------------------------
  function init(n) {
    
    n
      .attr("x",function(d){
        return d.d3plus.x
      })
      .attr("y",function(d){
        return d.d3plus.y
      })
      .attr("width",0)
      .attr("height",0)
      
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each anchor point on update.
  //----------------------------------------------------------------------------
  function update(n,mod) {

    if (!mod) var mod = 0
    
    n
      .attr("x",function(d){
        return d.d3plus.x - ((d.d3plus.width/2)+(mod/2))
      })
      .attr("y",function(d){
        return d.d3plus.y - ((d.d3plus.height/2)+(mod/2))
      })
      .attr("width",function(d){
        return d.d3plus.width+mod
      })
      .attr("height",function(d){
        return d.d3plus.height+mod
      })
      .attr("rx",function(d){
        return (d.d3plus.width+mod)/2
      })
      .attr("ry",function(d){
        return (d.d3plus.height+mod)/2
      })
      
  }
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.links = function(vars,links) {
  
  if (!links) var links = []
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Initialization of Lines
  //----------------------------------------------------------------------------
  function init(l) {
    
    var opacity = vars.style.links.opacity == 1 ? vars.style.links.opacity : 0
    
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
    l
      .style("stroke-width",vars.style.links.width)
      .style("stroke",vars.style.links.color)
      .attr("opacity",vars.style.links.opacity)
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
  // Bind "links" data to lines in the "links" group
  //----------------------------------------------------------------------------
  var line_data = links.filter(function(l){
    return !l.d3plus || !l.d3plus.spline
  })
  
  var lines = vars.g.links.selectAll("line")
    .data(line_data,function(d){
      return d.source[vars.id.key]+"_"+d.target[vars.id.key]
    })
  
  lines.enter().append("line")
    .call(line)
    .call(init)
  
  lines.transition().duration(vars.style.timing.transitions)
    .call(line)
    .call(style)
  
  lines.exit()
    .call(init)
    .remove()
    
  var spline_data = links.filter(function(l){
    return l.d3plus && l.d3plus.spline
  })
  
  var splines = vars.g.links.selectAll("path")
    .data(spline_data,function(d){
      return d.source[vars.id.key]+"_"+d.target[vars.id.key]
    })
  
  splines.enter().append("path")
    .call(spline)
    .call(init)
  
  splines.transition().duration(vars.style.timing.transitions)
    .call(spline)
    .call(style)
  
  splines.exit()
    .call(init)
    .remove()
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Draws "square" and "circle" shapes using svg:rect
//------------------------------------------------------------------------------
d3plus.shape.rect = function(vars,selection,enter,exit,transform) {

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on enter and exit.
  //----------------------------------------------------------------------------
  function init(nodes) {
    
    nodes
      .attr("x",0)
      .attr("y",0)
      .attr("width",0)
      .attr("height",0)
      
  }

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // The position and size of each rectangle on update.
  //----------------------------------------------------------------------------
  function update(nodes,mod) {
    if (!mod) var mod = 0
    nodes
      .attr("x",function(d){
        return (-d.d3plus.width/2)-(mod/2)
      })
      .attr("y",function(d){
        return (-d.d3plus.height/2)-(mod/2)
      })
      .attr("width",function(d){
        return d.d3plus.width+mod
      })
      .attr("height",function(d){
        return d.d3plus.height+mod
      })
      .attr("rx",function(d){
        var rounded = vars.shape.default == "circle"
        return rounded ? (d.d3plus.width+mod)/2 : 0
      })
      .attr("ry",function(d){
        var rounded = vars.shape.default == "circle"
        return rounded ? (d.d3plus.height+mod)/2 : 0
      })
      .attr("shape-rendering",function(d){
        if (vars.shape.default == "square") {
          return vars.style.rendering
        }
        else {
          return "auto"
        }
      })
  }
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "rects" Enter
  //----------------------------------------------------------------------------
  enter.append("rect")
    .attr("class","data")
    .call(init)
    .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "rects" Update
  //----------------------------------------------------------------------------
  selection.selectAll("rect.data")
    .data(function(d) { 
      
      d.d3plus_label = {
        "w": 0,
        "h": 0,
        "x": 0,
        "y": 0
      }
    
      // Square bounds
      if (vars.shape.default == "square") {

        var w = d.d3plus.width-(vars.style.labels.padding*2),
            h = d.d3plus.height-(vars.style.labels.padding*2)
        
        d.d3plus_share = {
          "w": w,
          "h": h/4,
          "x": 0,
          "y": 0
        }
        
        d.d3plus_label.w = w
        d.d3plus_label.h = h
        
      }
      // Circle bounds
      else {
        d.d3plus_label.w = Math.sqrt(Math.pow(d.d3plus.width,2)/2)-(vars.style.labels.padding)
        d.d3plus_label.h = Math.sqrt(Math.pow(d.d3plus.height,2)/2)-(vars.style.labels.padding)
      }
      
      return [d];
    })
    .transition().duration(vars.style.timing.transitions)
      .call(update)
      .call(d3plus.shape.style,vars)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // "rects" Exit
  //----------------------------------------------------------------------------
  exit.selectAll("rect.data")
    .transition().duration(vars.style.timing.transitions)
    .call(init)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Define mouse event shapes
  //----------------------------------------------------------------------------
  var mouses = selection.selectAll("rect.mouse")
    .data(function(d) {
      return !d.d3plus.static ? [d] : [];
    })

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Mouse "rect" enter
  //----------------------------------------------------------------------------
  mouses.enter().append("rect")
    .attr("class","mouse")
    .call(init)
    .attr("opacity",0)

  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Mouse "rect" update and mouse events
  //----------------------------------------------------------------------------
  mouses
    .data(function(d) {
      return !d.d3plus.static ? [d] : [];
    })
    .on(d3plus.evt.over,function(d){
      
      d3.select(this).style("cursor","pointer")
      
      d3.select(this.parentNode).selectAll(".data")
        .transition().duration(vars.style.timing.mouseevents)
        .attr("opacity",1)
      
      d3.select(this.parentNode)
        .transition().duration(vars.style.timing.mouseevents)
        .call(transform,true)
        
    })
    .on(d3plus.evt.out,function(d){
      
      d3.select(this.parentNode).selectAll(".data")
        .transition().duration(vars.style.timing.mouseevents)
        .attr("opacity",vars.style.data.opacity)
          
      d3.select(this.parentNode)
        .transition().duration(vars.style.timing.mouseevents)
        .call(transform)
        
    })
    .transition().duration(vars.style.timing.transitions)
      .call(update,6)
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Fill style for all shapes
//-------------------------------------------------------------------
d3plus.shape.style = function(nodes,vars) {

  nodes
    .style("fill",function(d){
      
      if (d.d3plus && d.d3plus.spline) {
        return "none"
      }
      else {
        return d3plus.shape.color(d,vars)
      }
      
    })
    .style("stroke", function(d){
      return d3plus.color.darker(d3plus.shape.color(d,vars));
    })
    .style("stroke-width",vars.style.data.stroke.width)
    .attr("opacity",vars.style.data.opacity)
    .attr("vector-effect","non-scaling-stroke")
    
}
d3plus.styles.default = {
  "background": "#ffffff",
  "color": {
    "heatmap": ["#00008f", "#003fff", "#00efff", "#ffdf00", "#ff3000", "#7f0000"],
    "range": ["#ff0000","#888888","#00ff00"]
  },
  "data": {
    "donut": {
      "size": 0.35
    },
    "stroke": {
      "width": 1
    },
    "opacity": 0.9
  },
  "font": {
    "family": "sans-serif",
    "weight": "normal"
  },
  "group": {
    "background": true,
  },
  "icon": "default",
  "info": {
    "font-size": 20
  },
  "labels": {
    "align": "middle",
    "padding": 7,
    "segments": 4
  },
  "links": {
    "color": "#dedede",
    "opacity": 1,
    "width": 1
  },
  "highlight": {
    "primary": "#cc0000",
    "secondary": "#ffdddd"
  },
  "rendering": "crispEdges",
  "ticks": {
    "color": "#ccc",
    "font": {
      "color": "#888",
      "size": 12
    },
    "width": 1
  },
  "timing": {
    "mouseevents": 60,
    "transitions": 600
  },
  "title": {
    "align": "middle",
    "height": null,
    "width": null
  },
  "tooltip": {
    "anchor": "top center",
    "background": "white",
    "font": {
      "color": "#333",
      "family": "sans-serif",
      "weight": "normal"
    }
  }
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates correctly formatted tooltip for Apps
//-------------------------------------------------------------------
d3plus.tooltip.app = function(params) {
  
  var vars = params.vars,
      d = params.data,
      ex = params.ex,
      mouse = params.mouseevents ? params.mouseevents : false,
      arrow = params.arrow ? params.arrow : true
      
  if (d3.event.type == "click" && (vars.tooltip.html || vars.tooltip.default.long)) {
    var fullscreen = true,
        arrow = false,
        mouse = true,
        length = "long",
        footer = vars.footer.default
      
    vars.covered = true
  }
  else {
    var fullscreen = false,
        align = vars.style.tooltip.anchor,
        length = "short",
        footer = vars.footer_text()
  }
  
  if (params.x) {
    var x = params.x
  }
  else if (d3plus.apps[vars.type.default].tooltip == "follow") {
    var x = d3.event.clientX
  }
  else {
    var x = d.d3plus.x
  }
  
  if (params.y) {
    var y = params.y
  }
  else if (d3plus.apps[vars.type.default].tooltip == "follow") {
    var y = d3.event.clientY
  }
  else {
    var y = d.d3plus.y
  }
  
  if (params.offset) {
    var offset = params.offset
  }
  else if (d3plus.apps[vars.type.default].tooltip == "follow") {
    var offset = 3
  }
  else {
    var offset = d.d3plus.r ? d.d3plus.r : d.d3plus.height/2
  }
  
  function make_tooltip(html) {

    var active = vars.active.key ? d3plus.variable.value(vars,d,vars.active.key) : d.d3plus.active,
        total = vars.total.key ? d3plus.variable.value(vars,d,vars.total.key) : d.d3plus.total
      
    if (active > 1 && active != total) {
      if (!ex) ex = {}
      ex.fill = active+"/"+total+" ("+vars.format((active/total)*100,"share")+"%)"
    }
    else if (d.d3plus.share) {
      if (!ex) ex = {}
      ex.share = vars.format(d.d3plus.share*100,"share")+"%"
    }
    
    var icon = d3plus.variable.value(vars,d,vars.icon.key),
        title = d3plus.variable.value(vars,d,vars.text.key),
        tooltip_data = d3plus.tooltip.data(vars,d,length,ex),
        id = d3plus.variable.value(vars,d,vars.id.key)
        
    if (!title) {
      title = id
    }
        
    d3plus.tooltip.create({
      "align": align,
      "arrow": arrow,
      "background": vars.style.tooltip.background,
      "fontcolor": vars.style.tooltip.font.color,
      "fontfamily": vars.style.tooltip.font.family,
      "fontweight": vars.style.tooltip.font.weight,
      "data": tooltip_data,
      "color": d3plus.variable.color(vars,d),
      "footer": footer,
      "fullscreen": fullscreen,
      "html": html,
      "icon": icon,
      "id": vars.type.default,
      "mouseevents": mouse,
      "offset": offset,
      "parent": vars.parent,
      "style": vars.style.icon,
      "title": title,
      "x": x,
      "y": y,
      "rtl": vars.style.labels.dir == "rtl"
    })
    
  }
  
  if (fullscreen) {

    if (typeof vars.tooltip.html == "string") {
      make_tooltip(vars.tooltip.html)
    }
    else if (typeof vars.tooltip.html == "function") {
      make_tooltip(vars.tooltip.html(id))
    }
    else if (vars.tooltip.html && typeof vars.tooltip.html == "object" && vars.tooltip.html.url) {
      d3.json(vars.tooltip.html.url,function(data){
        var html = vars.tooltip.html.callback ? vars.tooltip.html.callback(data) : data
        make_tooltip(html)
      })
    }
    else {
      make_tooltip("")
    }
    
  }
  else {
    make_tooltip("")
  }
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Correctly positions the tooltip's arrow
//-------------------------------------------------------------------
d3plus.tooltip.arrow = function(arrow) {
  arrow
    .style("bottom", function(d){
      if (d.anchor.y != "center" && !d.flip) return "-5px"
      else return "auto"
    })
    .style("top", function(d){
      if (d.anchor.y != "center" && d.flip) return "-5px"
      else if (d.anchor.y == "center") return "50%"
      else return "auto"
    })
    .style("left", function(d){
      if (d.anchor.y == "center" && d.flip) return "-5px"
      else if (d.anchor.y != "center") return "50%"
      else return "auto"
    })
    .style("right", function(d){
      if (d.anchor.y == "center" && !d.flip) return "-5px"
      else return "auto"
    })
    .style("margin-left", function(d){
      if (d.anchor.y == "center") {
        return "auto"
      }
      else {
        if (d.anchor.x == "right") {
          var arrow_x = -d.width/2+d.arrow_offset/2
        }
        else if (d.anchor.x == "left") {
          var arrow_x = d.width/2-d.arrow_offset*2 - 5
        }
        else {
          var arrow_x = -5
        }
        if (d.cx-d.width/2-5 < arrow_x) {
          arrow_x = d.cx-d.width/2-5
          if (arrow_x < 2-d.width/2) arrow_x = 2-d.width/2
        }
        else if (-(window.innerWidth-d.cx-d.width/2+5) > arrow_x) {
          var arrow_x = -(window.innerWidth-d.cx-d.width/2+5)
          if (arrow_x > d.width/2-11) arrow_x = d.width/2-11
        }
        return arrow_x+"px"
      }
    })
    .style("margin-top", function(d){
      if (d.anchor.y != "center") {
        return "auto"
      }
      else {
        if (d.anchor.y == "bottom") {
          var arrow_y = -d.height/2+d.arrow_offset/2 - 1
        }
        else if (d.anchor.y == "top") {
          var arrow_y = d.height/2-d.arrow_offset*2 - 2
        }
        else {
          var arrow_y = -9
        }
        if (d.cy-d.height/2-d.arrow_offset < arrow_y) {
          arrow_y = d.cy-d.height/2-d.arrow_offset
          if (arrow_y < 4-d.height/2) arrow_y = 4-d.height/2
        }
        else if (-(window.innerHeight-d.cy-d.height/2+d.arrow_offset) > arrow_y) {
          var arrow_y = -(window.innerHeight-d.cy-d.height/2+d.arrow_offset)
          if (arrow_y > d.height/2-22) arrow_y = d.height/2-22
        }
        return arrow_y+"px"
      }
    })
}//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Create a Tooltip
//-------------------------------------------------------------------
d3plus.tooltip.create = function(params) {
  
  var default_width = params.fullscreen ? 250 : 200
  params.width = params.width || default_width
  params.max_width = params.max_width || 386
  params.id = params.id || "default"
  params.size = params.fullscreen || params.html ? "large" : "small"
  params.offset = params.offset || 0
  params.arrow_offset = params.arrow ? 8 : 0
  params.x = params.x || 0
  params.y = params.y || 0
  params.color = params.color || "#333"
  params.parent = params.parent || d3.select("body")
  params.curtain = params.curtain || "#fff"
  params.background = params.background || "#fff"
  params.fontcolor = params.fontcolor || "#333"
  params.fontfamily = params.fontfamily || "sans-serif"
  params.fontweight = params.fontweight || "normal"
  params.style = params.style || "default"
  params.rtl = params.rtl || false
  
  //^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  // Function that closes ALL Descriptions
  //-------------------------------------------------------------------
  var close_descriptions = function() {
    d3.selectAll("div.d3plus_tooltip_data_desc").style("height","0px")
    d3.selectAll("div.d3plus_tooltip_data_help").style("background-color","#ccc")
  }
  
  d3plus.tooltip.remove(params.id)
  
  params.anchor = {}
  if (params.fullscreen) {
    params.anchor.x = "center"
    params.anchor.y = "center"
    params.x = params.parent ? params.parent.node().offsetWidth/2 : window.innerWidth/2
    params.y = params.parent ? params.parent.node().offsetHeight/2 : window.innerHeight/2
  }
  else if (params.align) {
    var a = params.align.split(" ")
    params.anchor.y = a[0]
    if (a[1]) params.anchor.x = a[1]
    else params.anchor.x = "center"
  }
  else {
    params.anchor.x = "center"
    params.anchor.y = "top"
  }
  
  var title_width = params.width - 30
  
  if (params.fullscreen) {
    var curtain = params.parent.append("div")
      .attr("id","d3plus_tooltip_curtain_"+params.id)
      .attr("class","d3plus_tooltip_curtain")
      .style("background-color",params.curtain)
      .on(d3plus.evt.click,function(){
        d3plus.tooltip.remove(params.id)
      })
  }
  
  var tooltip = params.parent.append("div")
    .datum(params)
    .attr("id","d3plus_tooltip_id_"+params.id)
    .attr("class","d3plus_tooltip d3plus_tooltip_"+params.size)
    .style("color",params.fontcolor)
    .style("font-family",params.fontfamily)
    .style("font-weight",params.fontweight)
    .on(d3plus.evt.out,function(){
      close_descriptions()
    })
    
  if (params.max_height) {
    tooltip.style("max-height",params.max_height+"px")
  }
    
  if (params.fixed) {
    tooltip.style("z-index",500)
    params.mouseevents = true
  }
  else {
    tooltip.style("z-index",2000)
  }
  
  var container = tooltip.append("div")
    .datum(params)
    .attr("class","d3plus_tooltip_container")
    .style("background-color",params.background)
  
  if (params.fullscreen && params.html) {
    
    w = params.parent ? params.parent.node().offsetWidth*0.75 : window.innerWidth*0.75
    h = params.parent ? params.parent.node().offsetHeight*0.75 : window.innerHeight*0.75
    
    container
      .style("width",w+"px")
      .style("height",h+"px")
      
    var body = container.append("div")
      .attr("class","d3plus_tooltip_body")
      .style("width",params.width+"px")
      
  }
  else {
    
    if (params.width == "auto") {
      var w = "auto"
      container.style("max-width",params.max_width+"px")
    }
    else var w = params.width-14+"px"

    var body = container
      .style("width",w)
      
  }
    
  if (params.title || params.icon) {
    var header = body.append("div")
      .attr("class","d3plus_tooltip_header")
  }
  
  if (params.fullscreen) {
    var close = tooltip.append("div")
      .attr("class","d3plus_tooltip_close")
      .style("background-color",d3plus.color.legible(params.color))
      .html("\&times;")
      .on(d3plus.evt.click,function(){
        d3plus.tooltip.remove(params.id)
      })
  }
  
  if (!params.mouseevents) {
    tooltip.style("pointer-events","none")
  }
  else if (params.mouseevents !== true) {
    
    var oldout = d3.select(params.mouseevents).on(d3plus.evt.out)
    
    var newout = function() {
      
      var target = d3.event.toElement || d3.event.relatedTarget
      if (target) {
        var c = typeof target.className == "string" ? target.className : target.className.baseVal
        var istooltip = c.indexOf("d3plus_tooltip") == 0
      }
      else {
        var istooltip = false
      }
      if (!target || (!ischild(tooltip.node(),target) && !ischild(params.mouseevents,target) && !istooltip)) {
        oldout(d3.select(params.mouseevents).datum())
        close_descriptions()
        d3.select(params.mouseevents).on(d3plus.evt.out,oldout)
      }
    }
    
    var ischild = function(parent, child) {
       var node = child.parentNode;
       while (node != null) {
         if (node == parent) {
           return true;
         }
         node = node.parentNode;
       }
       return false;
    }
    
    d3.select(params.mouseevents).on(d3plus.evt.out,newout)
    tooltip.on(d3plus.evt.out,newout)
    
    var move_event = d3.select(params.mouseevents).on(d3plus.evt.move)
    if (move_event) {
      tooltip.on(d3plus.evt.move,move_event)
    }
    
  }
    
  if (params.arrow) {
    var arrow = tooltip.append("div")
      .attr("class","d3plus_tooltip_arrow")
      .style("background-color",params.background)
  }
  
  if (params.icon) {
    var title_icon = header.append("div")
      .attr("class","d3plus_tooltip_icon")
      .style("background-image","url("+params.icon+")")
      
    if (params.style == "knockout") {
      title_icon.style("background-color",params.color)
    }
    
    title_width -= title_icon.node().offsetWidth
  }
  
  if (params.title) {
    var title = header.append("div")
      .attr("class","d3plus_tooltip_title")
      .style("width",title_width+"px")
      .text(params.title)
  }
  
  if (params.description) {
    var description = body.append("div")
      .attr("class","d3plus_tooltip_description")
      .text(params.description)
  }
  
  if (params.data || params.html && !params.fullscreen) {

    var data_container = body.append("div")
      .attr("class","d3plus_tooltip_data_container")
  }
  
  if (params.data) {
      
    var val_width = 0, val_heights = {}
      
    var last_group = null
    params.data.forEach(function(d,i){
      
      if (d.group) {
        if (last_group != d.group) {
          last_group = d.group
          data_container.append("div")
            .attr("class","d3plus_tooltip_data_title")
            .text(d.group)
        }
      }
      
      var block = data_container.append("div")
        .attr("class","d3plus_tooltip_data_block")
        .datum(d)
        
      if (d.highlight) {
        block.style("color",d3plus.color.legible(params.color))
      }
      
      var name = block.append("div")
          .attr("class","d3plus_tooltip_data_name")
          .html(d.name)
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })
      
      var val = block.append("div")
          .attr("class","d3plus_tooltip_data_value")
          .text(d.value)
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })
          
      if (params.rtl) {
        val.style("left","6px")
      }
      else {
        val.style("right","6px")
      }
          
      if (params.mouseevents && d.desc) {
        var desc = block.append("div")
          .attr("class","d3plus_tooltip_data_desc")
          .text(d.desc)
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })
          
        var dh = desc.node().offsetHeight
        
        desc.style("height","0px")
          
        var help = name.append("div")
          .attr("class","d3plus_tooltip_data_help")
          .text("?")
          .on(d3plus.evt.over,function(){
            var c = d3.select(this.parentNode.parentNode).style("color")
            d3.select(this).style("background-color",c)
            desc.style("height",dh+"px")
          })
          .on(d3plus.evt.out,function(){
            d3.event.stopPropagation()
          })
          
        name
          .style("cursor","pointer")
          .on(d3plus.evt.over,function(){
            close_descriptions()
            var c = d3.select(this.parentNode).style("color")
            help.style("background-color",c)
            desc.style("height",dh+"px")
          })
          
        block.on(d3plus.evt.out,function(){
          d3.event.stopPropagation()
          close_descriptions()
        })
      }
          
      var w = parseFloat(val.style("width"),10)
      if (w > params.width/2) w = params.width/2
      if (w > val_width) val_width = w
          
      if (i != params.data.length-1) {
        if ((d.group && d.group == params.data[i+1].group) || !d.group && !params.data[i+1].group)
        data_container.append("div")
          .attr("class","d3plus_tooltip_data_seperator")
      }
          
    })
    
    data_container.selectAll(".d3plus_tooltip_data_name")
      .style("width",function(){
        var w = parseFloat(d3.select(this.parentNode).style("width"),10)
        return (w-val_width-30)+"px"
      })
    
    data_container.selectAll(".d3plus_tooltip_data_value")
      .style("width",val_width+"px")
      .each(function(d){
        var h = parseFloat(d3.select(this).style("height"),10)
        val_heights[d.name] = h
      })
    
    data_container.selectAll(".d3plus_tooltip_data_name")
      .style("min-height",function(d){
        return val_heights[d.name]+"px"
      })
    
  }
    
  if (params.html && !params.fullscreen) {
    data_container.append("div")
      .html(params.html)
  }
  
  var footer = body.append("div")
    .attr("class","d3plus_tooltip_footer")
  
  if (params.footer) {
    footer.html(params.footer)
  }
  
  params.height = tooltip.node().offsetHeight
  
  if (params.html && params.fullscreen) {
    var h = params.height-12
    var w = tooltip.node().offsetWidth-params.width-44
    container.append("div")
      .attr("class","d3plus_tooltip_html")
      .style("width",w+"px")
      .style("height",h+"px")
      .html(params.html)
  }
  
  params.width = tooltip.node().offsetWidth
  
  if (params.anchor.y != "center") params.height += params.arrow_offset
  else params.width += params.arrow_offset
  
  if (params.data || (!params.fullscreen && params.html)) {
    
    if (!params.fullscreen && params.html) {
      var parent_height = params.parent.node().offsetHeight
      var limit = params.fixed ? parent_height-params.y-10 : parent_height-10
      var h = params.height < limit ? params.height : limit
    }
    else {
      var h = params.height
    }
    h -= parseFloat(container.style("padding-top"),10)
    h -= parseFloat(container.style("padding-bottom"),10)
    if (header) {
      h -= header.node().offsetHeight
      h -= parseFloat(header.style("padding-top"),10)
      h -= parseFloat(header.style("padding-bottom"),10)
    }
    if (footer) {
      h -= footer.node().offsetHeight
      h -= parseFloat(footer.style("padding-top"),10)
      h -= parseFloat(footer.style("padding-bottom"),10)
    }
    data_container
      .style("max-height",h+"px")
  }
  
  params.height = tooltip.node().offsetHeight
  
  d3plus.tooltip.move(params.x,params.y,params.id);
    
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates a data object for the Tooltip
//-------------------------------------------------------------------

d3plus.tooltip.data = function(vars,id,length,extras) {

  if (!length) var length = "long"
  
  var extra_data = {}
  if (extras && typeof extras == "string") extras = [extras]
  else if (extras && typeof extras == "object") {
    extra_data = d3plus.utils.merge(extra_data,extras)
    var extras = []
    for (k in extra_data) {
      extras.push(k)
    }
  }
  else if (!extras) var extras = []
  
  var tooltip_highlights = []
  
  if (vars.tooltip.default instanceof Array) var a = vars.tooltip.default
  else if (vars.tooltip.default[length] && vars.tooltip.default[length] instanceof Array) var a = vars.tooltip.default[length]
  else if (vars.tooltip.default[length]) var a = d3plus.utils.merge({"":[]},vars.tooltip.default[length])
  else var a = vars.tooltip.default
  
  function format_key(key,group) {
    if (vars.attrs.default[group]) var id_var = group
    else var id_var = null
    
    if (group) group = vars.format(group)
    
    var value = extra_data[key] || d3plus.variable.value(vars,id,key,id_var)
    
    if (value !== false && value !== null) {
      var name = vars.format(key),
          h = tooltip_highlights.indexOf(key) >= 0
          
      var val = vars.format(value,key)
      
      var obj = {"name": name, "value": val, "highlight": h, "group": group}
      
      if (vars.descs[key]) obj.desc = vars.descs[key]
    
      if (val) tooltip_data.push(obj)
    }
    
  }
     
  var tooltip_data = []
  if (a instanceof Array) {
    
    extras.forEach(function(e){
      if (a.indexOf(e) < 0) a.push(e)
    })
    
    a.forEach(function(t){
      format_key(t)
    })
  
  }
  else {
    
    if (vars.id.nesting.length && vars.depth.default < vars.id.nesting.length-1) {
      var a = d3plus.utils.copy(a)
      vars.id.nesting.forEach(function(n,i){
        if (i > vars.depth.default && a[n]) delete a[n]
      })
    }
    
    if (vars.tooltip.default.long && typeof vars.tooltip.default.long == "object") {
      var placed = []
      for (group in vars.tooltip.default.long) {
        
        extras.forEach(function(e){
          if (vars.tooltip.default.long[group].indexOf(e) >= 0 && ((a[group] && a[group].indexOf(e) < 0) || !a[group])) {
            if (!a[group]) a[group] = []
            a[group].push(e)
            placed.push(e)
          }
          else if (a[group] && a[group].indexOf(e) >= 0) {
            placed.push(e)
          }
        })
      }
      extras.forEach(function(e){
        if (placed.indexOf(e) < 0) {
          if (!a[""]) a[""] = []
          a[""].push(e)
        }
      })
    }
    else {
      var present = []
      for (group in a) {
        extras.forEach(function(e){
          if (a[group] instanceof Array && a[group].indexOf(e) >= 0) {
            present.push(e)
          }
          else if (typeof a[group] == "string" && a[group] == e) {
            present.push(e)
          }
        })
      }
      if (present.length != extras.length) {
        if (!a[""]) a[""] = []
        extras.forEach(function(e){
          if (present.indexOf(e) < 0) {
            a[""].push(e)
          }
        })
      }
    }
    
    if (a[""]) {
      a[""].forEach(function(t){
        format_key(t,"")
      })
      delete a[""]
    }
    
    for (group in a) {
      if (a[group] instanceof Array) {
        a[group].forEach(function(t){
          format_key(t,group)
        })
      }
      else if (typeof a[group] == "string") {
        format_key(a[group],group)
      }
    }
    
  }
  
  return tooltip_data
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Set X and Y position for Tooltip
//-------------------------------------------------------------------

d3plus.tooltip.move = function(x,y,id) {
  
  if (!id) var tooltip = d3.select("div#d3plus_tooltip_id_default")
  else var tooltip = d3.select("div#d3plus_tooltip_id_"+id)
  
  if (tooltip.node()) {
    
    var d = tooltip.datum()
  
    d.cx = x
    d.cy = y
    
    if (!d.fixed) {

      // Set initial values, based off of anchor
      if (d.anchor.y != "center") {

        if (d.anchor.x == "right") {
          d.x = d.cx - d.arrow_offset - 4
        }
        else if (d.anchor.x == "center") {
          d.x = d.cx - d.width/2
        }
        else if (d.anchor.x == "left") {
          d.x = d.cx - d.width + d.arrow_offset + 2
        }

        // Determine whether or not to flip the tooltip
        if (d.anchor.y == "bottom") {
          d.flip = d.cy + d.height + d.offset <= window.innerHeight
        }
        else if (d.anchor.y == "top") {
          d.flip = d.cy - d.height - d.offset < 0
        }
        
        if (d.flip) {
          d.y = d.cy + d.offset + d.arrow_offset
        }
        else {
          d.y = d.cy - d.height - d.offset - d.arrow_offset
        }
    
      }
      else {

        d.y = d.cy - d.height/2
        
        // Determine whether or not to flip the tooltip
        if (d.anchor.x == "right") {
          d.flip = d.cx + d.width + d.offset <= window.innerWidth
        }
        else if (d.anchor.x == "left") {
          d.flip = d.cx - d.width - d.offset < 0
        }
    
        if (d.anchor.x == "center") {
          d.flip = false
          d.x = d.cx - d.width/2
        }
        else if (d.flip) {
          d.x = d.cx + d.offset + d.arrow_offset
        }
        else {
          d.x = d.cx - d.width - d.offset
        }
      }
  
      // Limit X to the bounds of the screen
      if (d.x < 0) {
        d.x = 0
      }
      else if (d.x + d.width > window.innerWidth) {
        d.x = window.innerWidth - d.width
      }
  
      // Limit Y to the bounds of the screen
      if (d.y < 0) {
        d.y = 0
      }
      else if (d.y + d.height > window.innerHeight) {
        d.y = window.innerHeight - d.height
      }
      
    }
    
    tooltip
      .style("top",d.y+"px")
      .style("left",d.x+"px")
  
    if (d.arrow) {
      tooltip.selectAll(".d3plus_tooltip_arrow")
        .call(d3plus.tooltip.arrow)
    }
    
  }
    
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Destroy Tooltips
//-------------------------------------------------------------------

d3plus.tooltip.remove = function(id) {

  // If an ID is specified, only remove that tooltip
  if (id) {
    
    // First remove the background curtain, if the tooltip has one
    d3.selectAll("div#d3plus_tooltip_curtain_"+id).remove()
    // Finally, remove the tooltip itself
    d3.selectAll("div#d3plus_tooltip_id_"+id).remove()
    
  }
  // If no ID is given, remove ALL d3plus tooltips
  else {
    
    // First remove all background curtains on the page
    d3.selectAll("div#d3plus_tooltip_curtain").remove()
    // Finally, remove all tooltip
    d3.selectAll("div.d3plus_tooltip").remove()
    
  }

}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Random color generator
//------------------------------------------------------------------------------
d3plus.color.scale = d3.scale.category20b()
d3plus.color.random = function(x) {
  var rand_int = x || Math.floor(Math.random()*20)
  return d3plus.color.scale(rand_int);
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns appropriate text color based off of a given color
//------------------------------------------------------------------------------
d3plus.color.text = function(color) {
  var hsl = d3.hsl(color),
      light = "#ffffff", 
      dark = "#333333";
  if (hsl.l > 0.65) return dark;
  else if (hsl.l < 0.49) return light;
  return hsl.h > 35 && hsl.s >= 0.3 ? dark : light;
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Darkens a color if it's too light to appear on white
//------------------------------------------------------------------------------
d3plus.color.legible = function(color) {
  var hsl = d3.hsl(color)
  if (hsl.s > .9) hsl.s = .9
  if (hsl.l > .4) hsl.l = .4
  return hsl.toString();
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Darkens a color
//------------------------------------------------------------------------------
d3plus.color.darker = function(color) {
  var c = d3.hsl(color)
  c.l = c.l < .2 ? 0 : c.l-.2;
  return c.toString();
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Lightens a color
//------------------------------------------------------------------------------
d3plus.color.lighter = function(color) {
  var c = d3.hsl(color);
  c.l = 0.95;
  return c.toString();
}//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Creates Error Message
//-------------------------------------------------------------------

d3plus.utils.error = function(vars) {
  
  var error = vars.svg.selectAll("g#error")
    .data(["error"])
    
  error.enter().append("g")
    .attr("id","error")
    .attr("opacity",0)
    .append("text")
      .attr("x",vars.width.default/2)
      .attr("font-size","30px")
      .attr("fill","#888")
      .attr("text-anchor", "middle")
      .attr("font-family", vars.style.font.family)
      .style("font-weight", vars.style.font.weight)
      .style(vars.style.info)
      .attr("y",function(){
        var height = d3.select(this).node().getBBox().height
        return vars.height.default/2-height/2
      })
      
  error.transition().duration(vars.style.timing.transitions)
    .attr("opacity",1)
      
  error.select("text").transition().duration(vars.style.timing.transitions)
    .attr("x",vars.width.default/2)
    .each(function(d){
      if (vars.internal_error) {
        d3plus.utils.wordwrap({
          "text": vars.format(vars.internal_error,"error"),
          "parent": this,
          "width": vars.width.default-20,
          "height": vars.height.default-20,
          "resize": false
        })
      }
    })
    .attr("y",function(){
      var height = d3.select(this).node().getBBox().height
      return vars.height.default/2-height/2
    })
    .attr("opacity",function(){
      return vars.internal_error ? 1 : 0
    })
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Formats Raw Data
//-------------------------------------------------------------------

d3plus.utils.titles = function(vars) {
  
  // Calculate total_bar value
  if (!vars.app_data || !vars.title.total.default || vars.type.default == "stacked") {
    vars.data.total = null
  }
  else {
    if (vars.dev.default) d3plus.console.group("Calculating Total Value")
    
    if (vars.dev.default) d3plus.console.time(vars.size.key)
    
    if (vars.app_data instanceof Array) {
      vars.data.total = d3.sum(vars.app_data,function(d){
        return d3plus.variable.value(vars,d,vars.size.key)
      })
    }
    else if (vars.type.default == "rings") {
      if (vars.app_data[vars.focus.default])
        vars.data.total = vars.app_data[vars.focus.default][vars.size.key]
      else {
        vars.data.total = null
      }
    }
    else {
      vars.data.total = d3.sum(d3.values(vars.app_data),function(d){
        return d[vars.size.key]
      })
    }
    
    if (vars.dev.default) d3plus.console.timeEnd(vars.size.key)
    if (vars.dev.default) d3plus.console.groupEnd()
    
  }
  
  vars.margin.top = 0
  var title_offset = 0
  if (vars.width.default <= 400 || vars.height.default <= 300) {
    vars.small = true;
    vars.graph.margin = {"top": 0, "right": 0, "bottom": 0, "left": 0}
    vars.graph.width = vars.app_width
    make_title(null,"title");
    make_title(null,"sub_title");
    make_title(null,"total_bar");
    update_footer(null)
  }
  else {
    if (vars.dev.default) d3plus.console.log("Updating Titles")
    vars.small = false;
    vars.graph.margin = {"top": 10, "right": 10, "bottom": 40, "left": 40}
    vars.graph.width = vars.app_width-vars.graph.margin.left-vars.graph.margin.right
    make_title(vars.title.default,"title");
    make_title(vars.title.sub.default,"sub_title");
    if (vars.app_data && !vars.error.default && (vars.type.default != "rings" || (vars.type.default == "rings" && vars.connections[vars.focus.default]))) {
      make_title(vars.data.total,"total_bar");
    }
    else {
      make_title(null,"total_bar");
    }
    if (vars.margin.top > 0) {
      vars.margin.top += 3
      if (vars.style.title.height && vars.margin.top < vars.style.title.height) {
        title_offset = (vars.style.title.height-vars.margin.top)/2
        vars.margin.top = vars.style.title.height
      }
    }
    update_footer(vars.footer)
  }
  
  vars.g.titles.transition().duration(vars.style.timing.transitions)
    .attr("transform","translate(0,"+title_offset+")")
    
  function make_title(t,type){

    // Set the total value as data for element.
    var font_size = type == "title" ? 18 : 13,
        title_position = {
          "x": vars.width.default/2,
          "y": vars.margin.top
        }
  
    if (type == "total_bar" && t) {
      title = vars.format(t,vars.size.key)
      vars.title.total.default.prefix ? title = vars.title.total.default.prefix + title : null;
      vars.title.total.default.suffix ? title = title + vars.title.total.default.suffix : null;
    
      if (vars.mute.length || vars.solo.length && vars.type.default != "rings") {
        var overall_total = d3.sum(vars.data.default, function(d){ 
          if (vars.type.default == "stacked") return d[vars.size.key]
          else if (vars.time.solo == d[vars.time.key]) return d[vars.size.key]
        })
        var pct = (t/overall_total)*100
        ot = vars.format(overall_total,vars.size.key)
        title += " ("+vars.format(pct,"share")+"% of "+ot+")"
      }
    
    }
    else {
      title = t
    }
  
    if (title) {
      var title_data = title_position
      title_data.title = title
      title_data = [title_data]
    }
    else {
      var title_data = []
    }
  
    var total = vars.g.titles.selectAll("g."+type).data(title_data)
  
    // Enter
    total.enter().append("g")
      .attr("class",type)
      .style("opacity",0)
      .append("text")
        .attr("x",function(d) { return d.x; })
        .attr("y",function(d) { return d.y; })
        .attr("font-size",font_size)
        .attr("fill","#333")
        .attr("text-anchor", vars.style.title.align)
        .attr("font-family", vars.style.font.family)
        .style("font-weight", vars.style.font.weight)
        .each(function(d){
          var width = vars.style.title.width || vars.width.default
          d3plus.utils.wordwrap({
            "text": d.title,
            "parent": this,
            "width": width,
            "height": vars.height.default/8,
            "resize": false
          })
        })
  
    // Update
    total.transition().duration(vars.style.timing.transitions)
      .style("opacity",1)
    
    d3plus.utils.title_update(vars)
  
    // Exit
    total.exit().transition().duration(vars.style.timing.transitions)
      .style("opacity",0)
      .remove();

    if (total.node()) vars.margin.top += total.select("text").node().getBBox().height

  }

  function update_footer(footer_text) {
    
    if (footer_text && footer_text.default) {
      if (footer_text.default.indexOf("<a href=") == 0) {
        var div = document.createElement("div")
        div.innerHTML = footer_text.default
        var t = footer_text.default.split("href=")[1]
        var link = t.split(t.charAt(0))[1]
        if (link.charAt(0) != "h" && link.charAt(0) != "/") {
          link = "http://"+link
        }
        var d = [div.getElementsByTagName("a")[0].innerHTML]
      }
      else {
        var d = [footer_text.default]
      }
    }
    else var d = []
  
    var source = vars.g.footer.selectAll("text.source").data(d)
    var padding = 3
  
    source.enter().append("text")
      .attr("class","source")
      .attr("opacity",0)
      .attr("x",vars.width.default/2+"px")
      .attr("y",padding-1+"px")
      .attr("font-size","10px")
      .attr("fill","#333")
      .attr("text-anchor", "middle")
      .attr("font-family", vars.style.font.family)
      .style("font-weight", vars.style.font.weight)
      .each(function(d){
        d3plus.utils.wordwrap({
          "text": d,
          "parent": this,
          "width": vars.width.default-20,
          "height": vars.height.default/8,
          "resize": false
        })
      })
      .on(d3plus.evt.over,function(){
        if (link) {
          d3.select(this)
            .style("text-decoration","underline")
            .style("cursor","pointer")
            .style("fill","#000")
        }
      })
      .on(d3plus.evt.out,function(){
        if (link) {
          d3.select(this)
            .style("text-decoration","none")
            .style("cursor","auto")
            .style("fill","#333")
        }
      })
      .on(d3plus.evt.click,function(){
        if (link) {
          if (link.charAt(0) != "/") var target = "_blank"
          else var target = "_self"
          window.open(link,target)
        }
      })
    
    source
      .attr("opacity",1)
      .attr("x",(vars.width.default/2)+"px")
      .attr("font-family", vars.style.font.family)
      .style("font-weight", vars.style.font.weight)
      .each(function(d){
        d3plus.utils.wordwrap({
          "text": d,
          "parent": this,
          "width": vars.width.default-20,
          "height": vars.height.default/8,
          "resize": false
        })
      })
    
    source.exit().transition().duration(vars.style.timing.transitions)
      .attr("opacity",0)
      .remove()
    
    if (d.length) {
      var height = source.node().getBBox().height
      vars.margin.bottom = height+padding*2
    }
    else {
      vars.margin.bottom = 0
    }
  
    vars.g.footer.transition().duration(vars.style.timing.transitions)
      .attr("transform","translate(0,"+(vars.height.default-vars.margin.bottom)+")")
  
  }
}

d3plus.utils.title_update = function(vars) {
  
  vars.g.titles.selectAll("g").select("text")
    .transition().duration(vars.style.timing.transitions)
      .attr("x",function(d) { return d.x; })
      .attr("y",function(d) { return d.y; })
      .each(function(d){
        var width = vars.style.title.width || vars.width.default
        d3plus.utils.wordwrap({
          "text": d.title,
          "parent": this,
          "width": width,
          "height": vars.height.default/8,
          "resize": false
        })
      })
      .selectAll("tspan")
        .attr("x",function(d) { return d.x; })
    
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Returns list of unique values
//------------------------------------------------------------------------------
d3plus.utils.uniques = function(data,value) {
  var type = null
  return d3.nest().key(function(d) { 
      if (typeof value == "string") {
        if (!type) type = typeof d[value]
        return d[value]
      }
      else if (typeof value == "function") {
        if (!type) type = typeof value(d)
        return value(d)
      }
      else {
        return d
      }
    })
    .entries(data)
    .reduce(function(a,b){ 
      var val = b.key
      if (type == "number") val = parseFloat(val)
      return a.concat(val)
    },[]).sort(function(a,b){
      return a - b
    })
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finds closest numeric value in array
//------------------------------------------------------------------------------
d3plus.utils.closest = function(arr,value) {
  var closest = arr[0]
  arr.forEach(function(p){
    if (Math.abs(value-p) < Math.abs(value-closest)) {
      closest = p
    }
  })
  return closest
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Merge two objects to create a new one with the properties of both
//------------------------------------------------------------------------------
d3plus.utils.merge = function(obj1, obj2) {
  var obj3 = {};
  function copy_object(obj,ret) {
    for (var a in obj) {
      if (typeof obj[a] != "undefined") {
        if (obj[a] instanceof Array) {
          ret[a] = obj[a]
        }
        else if (typeof obj[a] == "object") {
          if (!ret[a]) ret[a] = {}
          copy_object(obj[a],ret[a])
        }
        else {
          ret[a] = obj[a]
        }
      }
    }
  }
  if (obj1) copy_object(obj1,obj3)
  if (obj2) copy_object(obj2,obj3)
  // for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
  // for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
  return obj3;
}
d3plus.utils.copy = function(obj) {
  return d3plus.utils.merge(obj)
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Expands a min/max into a specified number of buckets
//------------------------------------------------------------------------------
d3plus.utils.buckets = function(arr, buckets) {
  var return_arr = [], step = 1/(buckets-1)*(arr[1]-arr[0]), i = step
  
  for (var i = arr[0]; i <= arr[1]; i = i + step) {
    return_arr.push(i)
  }
  if (return_arr.length < buckets) {
    return_arr[buckets-1] = arr[1]
  }
  if (return_arr[return_arr.length-1] < arr[1]) {
    return_arr[return_arr.length-1] = arr[1]
  }
  return return_arr
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get connection dictionary for specified links
//------------------------------------------------------------------------------
d3plus.utils.connections = function(vars,links) {
  var connections = {};
  links.forEach(function(d) {
    
    if (typeof d.source != "object") {
      d.source = vars.nodes.default.filter(function(n){return n[vars.id.key] == d.source})[0]
    }

    if (typeof d.target != "object") {
      d.target = vars.nodes.default.filter(function(n){return n[vars.id.key] == d.target})[0]
    }
    
    if (!connections[d.source[vars.id.key]]) {
      connections[d.source[vars.id.key]] = []
    }
    connections[d.source[vars.id.key]].push(d.target)
    if (!connections[d.target[vars.id.key]]) {
      connections[d.target[vars.id.key]] = []
    }
    connections[d.target[vars.id.key]].push(d.source)
  })
  return connections;
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finds a given variable by searching through the data and attrs
//------------------------------------------------------------------------------
d3plus.variable.value = function(vars,id,variable,id_var,agg) {
  
  if (!id_var) {
    if (variable && typeof variable == "object") {
      if (variable[vars.id.key]) {
        var id_var = vars.id.key
      }
      else {
        var id_var = Object.keys(variable)[0]
      }
      variable = variable[id_var]
    }
    else {
      var id_var = vars.id.key
    }
  }
  
  if (variable && typeof variable == "function") {
    return variable(id)
  }
  
  function filter_array(arr) {
    return arr.filter(function(d){
      return d[id_var] == id
    })[0]
  }
  
  var value_array = []
  function check_children(obj) {
    if (obj.children) {
      obj.children.forEach(function(c){
        check_children(c)
      })
    }
    else if (obj[variable]) {
      value_array.push(obj[variable])
    }
  }
  
  if (typeof id == "object" && typeof id[variable] != "undefined") {
    return id[variable]
  }
  else if (typeof id == "object" && id.children) {
    
    if (!agg) {
      var agg = "sum"
      if (typeof vars.aggs.default == "string") {
        agg = vars.aggs.default
      }
      else if (vars.aggs.default[variable]) {
        agg = vars.aggs.default[variable]
      }
    }
    check_children(id)
    if (value_array.length) {
      if (typeof agg == "string") {
        return d3[agg](value_array)
      }
      else if (typeof agg == "function") {
        return agg(value_array)
      }
    }
      
    var dat = id
    id = dat[id_var]
    
  }
  else {
    if (typeof id == "object") {
      id = id[id_var]
    }
    if (vars.app_data instanceof Array) {
      var dat = filter_array(vars.app_data)
      if (dat && typeof dat[variable] != "undefined") return dat[variable]
    }
    else if (vars.app_data) {
      var dat = vars.app_data[id]
      if (dat && typeof dat[variable] != "undefined") return dat[variable]
    }
  }
  
  if (vars.attrs.default instanceof Array) {
    var attr = filter_array(vars.attrs.default)
  }
  else if (vars.attrs.default[id_var]) {
    if (vars.attrs.default[id_var] instanceof Array) {
      var attr = filter_array(vars.attrs.default[id_var])
    }
    else {
      var attr = vars.attrs.default[id_var][id]
    }
  }
  else {
    var attr = vars.attrs.default[id]
  }
  
  if (attr && typeof attr[variable] != "undefined") return attr[variable]

  return null
  
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Finds an object's color and returns random if it cannot be found
//------------------------------------------------------------------------------
d3plus.variable.color = function(vars,id) {
  
  function get_random(c) {
    if (typeof c == "object") {
      c = vars.color.key ? d3plus.variable.value(vars,c,vars.color.key) : c[vars.id.key]
    }
    return d3plus.color.random(c)
  }
  
  function validate_color(c) {
    if (c.indexOf("#") == 0 && [4,7].indexOf(c.length) >= 0) return true
    else return false
  }
  
  if (!vars.color.key) {
    return get_random(id);
  }
  else {
    var color = d3plus.variable.value(vars,id,vars.color.key)
    
    if (!color && vars.color_domain instanceof Array) color = "#eee"
    else if (!color) return get_random(id)
    
    if (typeof color == "string") {
      var true_color = validate_color(color)
      return true_color ? color : get_random(color)
    }
    else return vars.color_scale(color)
  }
}

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// Get array of available text values
//------------------------------------------------------------------------------
d3plus.variable.text = function(vars,obj,depth) {
  
  if (typeof depth != "number") var depth = vars.depth.default
  
  if (vars.text.array && typeof vars.text.array == "object") {
    if (vars.text.array[vars.id.nesting[depth]]) {
      var text_keys = vars.text.array[vars.id.nesting[depth]]
    }
    else {
      var text_keys = vars.text.array[Object.keys(vars.text.array)[0]]
    }
  }
  else {
    var text_keys = []
    if (vars.text.key) text_keys.push(vars.text.key)
    text_keys.push(vars.id.nesting[depth])
  }
  if (typeof text_keys == "string") {
    text_keys = [text_keys]
  }
  
  var names = []
  text_keys.forEach(function(t){
    var name = d3plus.variable.value(vars,obj,t,vars.id.nesting[depth])
    if (name) names.push(name)
  })
  
  return names
  
}
//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// function that will wrap and resize SVG text
//-------------------------------------------------------------------

d3plus.utils.wordwrap = function(params) {
  
  var parent = params.parent,
      width = params.width ? params.width : 20000,
      height = params.height ? params.height : 20000,
      resize = params.resize,
      font_max = params.font_max ? params.font_max : 40,
      font_min = params.font_min ? params.font_min : 9,
      text_array = params.text.slice(0)
      
  if (text_array instanceof Array) wrap(String(text_array.shift()).split(" "))
  else wrap(String(text_array).split(" "))
  
  function wrap(words) {
    
    if (resize) {
      
      // Start by trying the largest font size
      var size = font_max
      size = Math.floor(size)
      d3.select(parent).attr('font-size',size)
    
      // Add each word to it's own line (to test for longest word)
      d3.select(parent).selectAll('tspan').remove()
      for(var i=0; i<words.length; i++) {
        if (words.length == 1) var t = words[i]
        else var t = words[i]+"..."
        d3.select(parent).append('tspan').attr("x",0).text(t)
      }
    
      // If the longest word is too wide, make the text proportionately smaller
      if (parent.getBBox().width > width) size = size*(width/parent.getBBox().width)
      
      // If the new size is too small, return NOTHING
      if (size < font_min) {
        d3.select(parent).selectAll('tspan').remove();
        if (typeof text_array == "string" || text_array.length == 0) return;
        else wrap(String(text_array.shift()).split(/[\s-]/))
        return;
      }

      // Use new text size
      size = Math.floor(size)
      d3.select(parent).attr("font-size",size);
    
      // Flow text into box
      flow();
      
      // If text doesn't fit height-wise, shrink it!
      if (parent.childNodes.length*parent.getBBox().height > height) {
        var temp_size = size*(height/(parent.childNodes.length*parent.getBBox().height))
        if (temp_size < font_min) size = font_min
        else size = temp_size
        size = Math.floor(size)
        d3.select(parent).attr('font-size',size)
      } else finish();
    
    }
  
    flow();
    truncate();
    finish();
  
    function flow() {
    
      d3.select(parent).selectAll('tspan').remove()
      
      var x_pos = parent.getAttribute("x")
      
      var tspan = d3.select(parent).append('tspan')
        .attr("x",x_pos)
        .text(words[0])

      for (var i=1; i < words.length; i++) {
        
        tspan.text(tspan.text()+" "+words[i])
      
        if (tspan.node().getComputedTextLength() > width) {
            
          tspan.text(tspan.text().substr(0,tspan.text().lastIndexOf(" ")))
    
          tspan = d3.select(parent).append('tspan')
            .attr("x",x_pos)
            .text(words[i])
            
        }
      }
  
    }
  
    function truncate() {
      var cut = false
      while (parent.childNodes.length*parent.getBBox().height > height && parent.lastChild && !cut) {
        parent.removeChild(parent.lastChild)
        if (parent.childNodes.length*parent.getBBox().height < height && parent.lastChild) cut = true
      }
      if (cut) {
        tspan = parent.lastChild
        words = d3.select(tspan).text().split(/[\s-]/)
      
        var last_char = words[words.length-1].charAt(words[words.length-1].length-1)
        if (last_char == ',' || last_char == ';' || last_char == ':') words[words.length-1] = words[words.length-1].substr(0,words[words.length-1].length-1)
      
        d3.select(tspan).text(words.join(' ')+'...')
      
        if (tspan.getComputedTextLength() > width) {
          if (words.length > 1) words.pop(words.length-1)
          last_char = words[words.length-1].charAt(words[words.length-1].length-1)
          if (last_char == ',' || last_char == ';' || last_char == ':') words[words.length-1].substr(0,words[words.length-1].length-2)
          d3.select(tspan).text(words.join(' ')+'...')
        }
      }
    }
  }
  
  function finish() {
    d3.select(parent).selectAll('tspan').attr("dy", d3.select(parent).style('font-size'));
    return;
  }
  
}
d3plus.zoom.bounds = function(vars,b) {
  
  vars.viewport = b
  
  var aspect = Math.max((b[1][0]-b[0][0])/vars.app_width, (b[1][1]-b[0][1])/vars.app_height)
  
  vars.zoom.scale = .95 / aspect
  
  vars.zoom.translate = [
    -(b[1][0] + b[0][0]) / 2,
    -(b[1][1] + b[0][1]) / 2
  ]
      
  vars.g.zoom
    .attr("transform","translate(" + [vars.app_width/2,vars.app_height/2] + ")"
      + "scale(" + vars.zoom.scale + ")"
      + "translate(" + vars.zoom.translate[0] + "," + vars.zoom.translate[1] + ")")
      
}
d3plus.zoom.controls = function() {
  d3.select("#d3plus.utilsts.zoom_controls").remove()
  if (!vars.small) {
    // Create Zoom Controls
    var zoom_enter = vars.parent.append("div")
      .attr("id","d3plus.utilsts.zoom_controls")
      .style("top",(vars.margin.top+5)+"px")
  
    zoom_enter.append("div")
      .attr("id","zoom_in")
      .attr("unselectable","on")
      .on(d3plus.evt.click,function(){ vars.zoom("in") })
      .text("+")
  
    zoom_enter.append("div")
      .attr("id","zoom_out")
      .attr("unselectable","on")
      .on(d3plus.evt.click,function(){ vars.zoom("out") })
      .text("-")
  
    zoom_enter.append("div")
      .attr("id","zoom_reset")
      .attr("unselectable","on")
      .on(d3plus.evt.click,function(){ 
        vars.zoom("reset") 
        vars.update()
      })
      .html("\&#8634;")
  }
}
d3plus.zoom.reset = function(vars) {
  
  d3plus.zoom.bounds(vars,vars.bounds)
      
}

})();