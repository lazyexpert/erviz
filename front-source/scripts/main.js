import "../scss/main.scss"
import makeDatum, {getMinMax, normalize} from './schemeParser'

let payload = window.responseObject

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

function getInstance(geometry, id, color=[0.55, 0.45, 0.7], intensity=0.5) {
    return new Cesium.GeometryInstance({
        geometry,
        id,
        attributes: {
            color : Cesium.ColorGeometryInstanceAttribute.fromColor(
                new Cesium.Color(1, 0, 0, 1)
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
    const MIN_RADIUS = 200000, MAX_RADIUS = 250000
    const MIN_INTENSITY = 0.3, MAX_INTENSITY = 0.8
    for (let i = 0; i < data.length; i++) {
        let elem = data[i]
        if (!elem.hasLatitude || !elem.hasLongitude) {
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
        // console.log(elem.$longitude)
        // console.log(elem.$latitude)
        // console.log(radius)
        let ellipse = getGeometry(
            elem.$longitude,
            elem.$latitude,
            radius
        )
        // console.log('')
        // console.log(ellipse)
        // console.log(intensity)
        let instance = getInstance(ellipse, i, [0.54, 0.45, 0.69], intensity)
        // console.log(instance)
        // console.log('')
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
    payload.schema.schema.latitude.dataType = 'LATITUDE'
    payload.schema.schema.longitude.dataType = 'LONGITUDE'
    payload.schema.schema.brightness.dataType = 'RADIUS'
    payload.schema.schema.bright_t31.dataType = 'INTENSITY'
    let data = payload.data.map(x => makeDatum(x, payload.schema.schema))
    window.data = data
    draw(data)
    initPicker(viewer.scene, (selected_) => {selected = selected_})
})()
