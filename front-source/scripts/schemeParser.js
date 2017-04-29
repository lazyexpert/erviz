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
        for (let field of scheme) {
            let key = Reflect.ownKeys(field)[0]
            this.scheme[key] = field[key]
            switch (field[key].dataType) {
            case 'LATITUDE':
                this.hasLatitude = true
                this.latitudeField = field[key]

            case 'LONGITUDE':
                this.hasLongitude = true
                this.longitudeField = field[key]

            case 'INTENSITY':
                this.hasIntensity = true
                this.intensityField = field[key]

            case 'RADIUS':
                this.hasRadius = true
                this.radiusField = field[key]
            }
        }
    }

    get(key) {
        switch (key) {
        case '$latitude':
            return this.datum[this.latitudeField.index]

        case '$longitude':
            return this.datum[this.longitudeField.index]

        case '$radius':
            return this.datum[this.radiusField.index]

        case '$intensity':
            return this.datum[this.intensityField.index]

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
        return target.get(property)
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
    return (elem[field] - min) / (max - min)
}
