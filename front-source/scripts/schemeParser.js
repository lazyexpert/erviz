class DatumObject {
    constructor(datum, scheme) {
        this.datum = datum
        this.scheme = {}
        this.latitudeField = null
        this.hasLatitude = false
        this.longitudeField = null
        this.hasLongitude = false
        this.intensityField = null
        this.hasIntensity = false
        this.radiusField = null
        this.hasRadius = false
        this.timeField = null
        this.hasTime = false
        for (let key of Reflect.ownKeys(scheme)) {
            this.scheme[key] = scheme[key]
            switch (scheme[key].dataType) {
            case 'LATITUDE':
                this.hasLatitude = true
                this.latitudeField = scheme[key]

            case 'LONGITUDE':
                this.hasLongitude = true
                this.longitudeField = scheme[key]

            case 'INTENSITY':
                this.hasIntensity = true
                this.intensityField = scheme[key]

            case 'RADIUS':
                this.hasRadius = true
                this.radiusField = scheme[key]

            case 'TIME':
                this.hasTime = true
                this.timeField = scheme[key]
            }
        }
    }

    items() {
        let res = []
        for (let key of Reflect.ownKeys(this.scheme)) {
            if (this.scheme[key].visibility) {
                res.push([key, this.datum[this.scheme[key].index]])
            }
        }
        return res
    }

    get(key) {
        switch (key) {
        case '$latitude':
            if (this.hasLatitude)
                return this.datum[this.latitudeField.index]
            else
                return null

        case '$longitude':
            if (this.hasLongitude)
                return this.datum[this.longitudeField.index]
            else
                return null

        case '$radius':
            if (this.hasRadius) {
                return this.datum[this.radiusField.index]
            } else {
                return null
            }

        case '$intensity':
            if (this.hasIntensity)
                return this.datum[this.intensityField.index]
            else
                return null

        case '$time':
            if (this.hasTime){
                return this.datum[this.timeField.index]
            } else {
                return null
            }

        default:
            return this.datum[this.scheme[key].index]
        }
    }

    set(key, value) {
        this.datum[this.scheme[key].index] = value
    }
}

const __meta__ = {
    get: function(target, property) {
        if (property.startsWith('$'))
            return target.get(property)
        return Reflect.get(target, property)
    },

    set: function (taget, property, value) {
        target.set(property, value)
        return true
    }
}

export default function makeDatum(datum, scheme) {
    return new Proxy(new DatumObject(datum, scheme), __meta__)
}

export function getMinMax(data, field) {
    let minIndex = 0, maxIndex = 0;
    for (let i = 0; i < data.length; i++) {
        let elem = data[i]
        if (!elem[field]) continue
        if (elem[field] < data[minIndex][field]) {
            minIndex = i
        }
        if (elem[field] > data[maxIndex][field]) {
            maxIndex = i
        }
    }
    return [data[minIndex][field], data[maxIndex][field]]
}

export function normalize(elem, field, minMax) {
    let [min, max] = minMax
    if (max == min) return 0
    return (elem[field] - min) / (max - min)
}
