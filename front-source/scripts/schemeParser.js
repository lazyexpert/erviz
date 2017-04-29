class DatumObject {
    constructor(datum, scheme) {
        this.datum = datum
        this.scheme = {}
        for (let field of scheme) {
            let key = Reflect.ownKeys(field)[0]
            this.scheme[key] = field[key]
        }
    }

    get(key) {
        return this.datum[this.scheme[key].index]
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
