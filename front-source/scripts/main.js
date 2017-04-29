import "../scss/main.scss";

const data = [{
    "latitude": -0.381,
    "longitude": -160.009,
    "brightness": 313.6,
    "scan": 2,
    "track": 1.4,
    "acq_date": "2017-04-28",
    "acq_time": 35,
    "satellite": "A",
    "confidence": 55,
    "version": "6.0NRT",
    "bright_t31": 296,
    "frp": 24.1,
    "daynight": "D"
    },
    {
    "latitude": -0.381,
    "longitude": -160.009,
    "brightness": 313.6,
    "scan": 2,
    "track": 1.4,
    "acq_date": "2017-04-28",
    "acq_time": 35,
    "satellite": "A",
    "confidence": 55,
    "version": "6.0NRT",
    "bright_t31": 296,
    "frp": 24.1,
    "daynight": "D"
    },
    {
    "latitude": -12.985,
    "longitude": 141.686,
    "brightness": 319.7,
    "scan": 1.1,
    "track": 1,
    "acq_date": "2017-04-28",
    "acq_time": 100,
    "satellite": "T",
    "confidence": 76,
    "version": "6.0NRT",
    "bright_t31": 290.8,
    "frp": 15.1,
    "daynight": "D"
    },
    {
    "latitude": -12.986,
    "longitude": 141.696,
    "brightness": 315.2,
    "scan": 1.1,
    "track": 1,
    "acq_date": "2017-04-28",
    "acq_time": 100,
    "satellite": "T",
    "confidence": 70,
    "version": "6.0NRT",
    "bright_t31": 291.6,
    "frp": 10.3,
    "daynight": "D"
    },
    {
    "latitude": -12.991,
    "longitude": 141.689,
    "brightness": 326.6,
    "scan": 1.1,
    "track": 1,
    "acq_date": "2017-04-28",
    "acq_time": 100,
    "satellite": "T",
    "confidence": 82,
    "version": "6.0NRT",
    "bright_t31": 292.9,
    "frp": 23.1,
    "daynight": "D"
  },
  {
    "latitude": -14.277,
    "longitude": 130.909,
    "brightness": 309.3,
    "scan": 3.1,
    "track": 1.7,
    "acq_date": "2017-04-28",
    "acq_time": 100,
    "satellite": "T",
    "confidence": 48,
    "version": "6.0NRT",
    "bright_t31": 287.2,
    "frp": 25.1,
    "daynight": "D"
  },
  {
    "latitude": -15.605,
    "longitude": 131.288,
    "brightness": 314.5,
    "scan": 2.7,
    "track": 1.6,
    "acq_date": "2017-04-28",
    "acq_time": 100,
    "satellite": "T",
    "confidence": 60,
    "version": "6.0NRT",
    "bright_t31": 287.8,
    "frp": 27.5,
    "daynight": "D"
  },
  {
    "latitude": -16.775,
    "longitude": 137.482,
    "brightness": 311.6,
    "scan": 1.1,
    "track": 1,
    "acq_date": "2017-04-28",
    "acq_time": 100,
    "satellite": "T",
    "confidence": 43,
    "version": "6.0NRT",
    "bright_t31": 300.2,
    "frp": 4.9,
    "daynight": "D"
}]

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

function getInstance(geometry, id, color) {  // color is not being currently used
    return new Cesium.GeometryInstance({
        geometry,
        id,
        attributes: {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(
                new Cesium.Color(randomColor(), randomColor(), randomColor(), 0.5)
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
    for (let i = 0; i < data.length; i++) {
        let elem = data[i]
        let ellipse = getGeometry(elem.longitude, elem.latitude)
        let instance = getInstance(ellipse, i)
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

function animate() {
    let time = 0;
    setInterval(() => {
        time++;
        for (let i = 0; i < data.length; i++) {
            data[i].latitude += time * 0.01;
            data[i].longitude += time * 0.01;
        }
        viewer.scene.primitives.removeAll()
        draw(data)
    }, 1000)
}


(function main() {
    let selected = null
    draw(data)
    initPicker(viewer.scene, (selected_) => {selected = selected_})
})()
