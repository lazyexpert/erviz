import "../scss/main.scss"
import makeDatum, {getMinMax, normalize} from './schemeParser'

let payload = {
  "id": "xxxx",
  "meta": {
    "title": "Example dataSource preset",
    "createdAt": 1457384583,
    "description": "Example of the datasource description",
  },
  "scheme": [
    {
      "latitude": {
        "index": 0,
        "dataType": "LATITUDE",
        "visibility": false
      }
    },
    {
      "longitude": {
        "index": 1,
        "dataType": "LONGITUDE",
        "visibility": false
      }
    },
    {
      "brightness": {
        "index": 2,
        "dataType": "RADIUS",
        "visibility": false
      }
    },
    {
      "scan": {
        "index": 3,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "track": {
        "index": 4,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "acq_date": {
        "index": 5,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "acq_time": {
        "index": 6,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "satellite": {
        "index": 7,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "confidence": {
        "index": 8,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "version": {
        "index": 9,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "bright_t31": {
        "index": 10,
        "dataType": "INTENSITY",
        "visibility": false
      }
    },
    {
      "frp": {
        "index": 11,
        "dataType": "",
        "visibility": false
      }
    },
    {
      "daynight": {
        "index": 12,
        "dataType": "",
        "visibility": false
      }
    }
  ],
  data: [[-0.381,-160.009,313.6,2,1.4,"2017-04-28",35,"A",55,"6.0NRT",296,24.1,"D"],
[-12.985,141.686,319.7,1.1,1,"2017-04-28",100,"T",76,"6.0NRT",290.8,15.1,"D"],
[-12.986,141.696,315.2,1.1,1,"2017-04-28",100,"T",70,"6.0NRT",291.6,10.3,"D"],
[-12.991,141.689,326.6,1.1,1,"2017-04-28",100,"T",82,"6.0NRT",292.9,23.1,"D"],
[-14.277,130.909,309.3,3.1,1.7,"2017-04-28",100,"T",48,"6.0NRT",287.2,25.1,"D"],
[-15.605,131.288,314.5,2.7,1.6,"2017-04-28",100,"T",60,"6.0NRT",287.8,27.5,"D"],
[-16.775,137.482,311.6,1.1,1,"2017-04-28",100,"T",43,"6.0NRT",300.2,4.9,"D"],
[-15.728,131.038,311.1,2.8,1.6,"2017-04-28",100,"T",35,"6.0NRT",289.9,21.5,"D"],
[-15.757,131.113,332.8,2.8,1.6,"2017-04-28",100,"T",87,"6.0NRT",290.4,119.5,"D"],
[-15.771,131.11,326.7,2.8,1.6,"2017-04-28",100,"T",83,"6.0NRT",290.2,85.1,"D"],
[-15.772,130.865,309.6,2.9,1.6,"2017-04-28",100,"T",50,"6.0NRT",289,18.4,"D"],
[-15.773,131.103,319.8,2.8,1.6,"2017-04-28",100,"T",77,"6.0NRT",289.5,52,"D"],
[-15.772,130.859,309.2,2.9,1.6,"2017-04-28",100,"T",55,"6.0NRT",289.2,17.9,"D"],
[-17.677,141.055,315.7,1.1,1.1,"2017-04-28",100,"T",42,"6.0NRT",303.1,7.5,"D"],
[-17.687,141.054,313.6,1.1,1.1,"2017-04-28",100,"T",21,"6.0NRT",302.6,5.8,"D"],
[-16.613,133.024,322.8,1.9,1.4,"2017-04-28",100,"T",52,"6.0NRT",293.3,39.5,"D"],
[-16.613,132.999,318.6,1.9,1.4,"2017-04-28",100,"T",50,"6.0NRT",292.8,31.2,"D"],
[-16.616,133.016,334.9,1.9,1.4,"2017-04-28",100,"T",88,"6.0NRT",293.2,84,"D"],
[-16.619,133.034,324.5,1.9,1.4,"2017-04-28",100,"T",80,"6.0NRT",293.4,47.7,"D"],
[-17.477,137.195,314.8,1.1,1,"2017-04-28",100,"T",60,"6.0NRT",302.7,6.6,"D"],
[-17.479,137.205,314.1,1.1,1,"2017-04-28",100,"T",58,"6.0NRT",302.2,6.4,"D"],
[-16.764,132.451,309.8,2.1,1.4,"2017-04-28",100,"T",41,"6.0NRT",294.9,14.2,"D"],
[-20.732,139.478,317.7,1.1,1,"2017-04-28",105,"T",67,"6.0NRT",293.8,12.4,"D"],
[-21.033,130.232,308.4,2.5,1.5,"2017-04-28",105,"T",0,"6.0NRT",269.4,38.1,"D"],
[-21.507,130.22,323.5,2.5,1.5,"2017-04-28",105,"T",0,"6.0NRT",268.3,82.7,"D"],
[-23.773,145.383,310.4,2.7,1.6,"2017-04-28",105,"T",57,"6.0NRT",299,21.7,"D"],
[-24.572,143.054,328.7,1.8,1.3,"2017-04-28",105,"T",82,"6.0NRT",299.6,53.2,"D"],
[-24.577,143.048,319.7,1.8,1.3,"2017-04-28",105,"T",73,"6.0NRT",299.3,28.7,"D"],
[-24.579,143.066,314.8,1.9,1.3,"2017-04-28",105,"T",65,"6.0NRT",299.3,17.7,"D"],
[-30.832,147.812,308.3,4.7,2,"2017-04-28",105,"T",63,"6.0NRT",292.3,57.3,"D"],
[-30.83,147.805,310.1,4.7,2,"2017-04-28",105,"T",67,"6.0NRT",292.3,69.2,"D"],
[-33.828,136.266,302.4,1,1,"2017-04-28",105,"T",28,"6.0NRT",290.6,4.5,"D"],
[28.635,7.54,302.2,1,1,"2017-04-28",120,"A",43,"6.0NRT",291.7,4.9,"N"],
[27.763,9.195,305.8,1,1,"2017-04-28",120,"A",66,"6.0NRT",288.6,8.8,"N"],
[14.74,-3.964,315.5,3.4,1.7,"2017-04-28",120,"A",91,"6.0NRT",285.3,79.1,"N"],
[14.737,-3.932,316.1,3.4,1.7,"2017-04-28",120,"A",92,"6.0NRT",291,78.1,"N"],
[5.358,4.346,309.5,1.1,1,"2017-04-28",125,"A",55,"6.0NRT",292,7.7,"N"],
[4.553,4.621,310.4,1.1,1,"2017-04-28",125,"A",71,"6.0NRT",289.7,7.9,"N"]]
}

function randomColor() {
    return Math.random()
}

let viewer = new Cesium.Viewer('cesiumContainer', {
    timeline: false,
    animation: false
})

function getGeometry(long, lat, size=250000.00) {
    let center = Cesium.Cartesian3.fromDegrees(long, lat)
    return new Cesium.EllipseGeometry({
        center,
        semiMajorAxis : size,
        semiMinorAxis : size
    })
}

function getInstance(geometry, id, color=[0.55, 0.45, 0.7], intensity=0.5) {  // color is not being currently used
    return new Cesium.GeometryInstance({
        geometry,
        id,
        attributes: {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(
                new Cesium.Color(...color, intensity)
            )
        }
    })
}

function initPicker(scene, cb) {
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)
    handler.setInputAction(function (movement) {
        let pick = scene.pick(movement.position)
        if (cb) {
            cb(pick.id)
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
}

function draw(data) {
    let entities = []
    let scene = viewer.scene
    let minMaxRadius, minMaxIntensity
    if (data[0].hasRadius) {
       minMaxRadius = getMinMax(data, '$radius')
    }
    if (data[0].hasIntensity) {
        minMaxIntensity = getMinMax(data, '$intensity')
    }
    const MIN_RADIUS = 50000, MAX_RADIUS = 250000
    const MIN_INTENSITY = 0.3, MAX_INTENSITY = 0.8
    for (let i = 0; i < data.length; i++) {
        let elem = data[i]
        if (!elem.$latitude || !elem.$longitude) {
            continue
        }
        let radius = (
            elem.hasRadius ?
            MIN_RADIUS + normalize(elem, '$radius', minMaxRadius) * (MAX_RADIUS - MIN_RADIUS) :
            undefined
        )
        let intensity = (
            elem.hasIntensity ?
            MIN_INTENSITY + normalize(elem, '$intensity', minMaxIntensity) * (MAX_INTENSITY - MIN_INTENSITY) :
            undefined
        )
        let ellipse = getGeometry(
            elem.$longitude,
            elem.$latitude,
            radius
        )
        let instance = getInstance(ellipse, i, [0.54, 0.45, 0.69], intensity)
        entities.push(scene.primitives.add(new Cesium.GroundPrimitive({
            geometryInstances : [instance]
        })))
    }
    return entities
}

function filter() {
    for (let i = 0; i < entities.length; i++) {
        if (i % 2) {
            entities[i].show = false
        }
    }
}


function clear() {
    viewer.scene.primitives.removeAll()
}

function animate() {
    let time = 0;
    setInterval(() => {
        time++;
        for (let i = 0; i < data.length; i++) {
            data[i].latitude += time * 0.01;
            data[i].longitude += time * 0.01;
        }
        clear()
        draw(data)
    }, 1000)
}


(function main() {
    let selected = null
    let data = payload.data.map(x => makeDatum(x, payload.scheme))
    console.log(data)
    draw(data)
    initPicker(viewer.scene, (selected_) => {selected = selected_})
})()
