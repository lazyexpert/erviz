export default class Picker {
    constructor(scheme) {
        this.fields = []
        this.schemeRef = scheme
        for (let key of Reflect.ownKeys(scheme)) {
            this.fields.push(Object.assign({}, scheme[key], {
                name: key
            }))
        }
    }

    updateDataType(key, dataType) {
        for (let field of this.fields) {
            if (field.name == key) {
                field.dataType = dataType
            }
        }
        this.schemeRef[key].dataType = dataType
    }

    createControls() {
        let container = document.querySelector(".filter-table")
        for (let field of this.fields) {
            container.insertAdjacentHTML(
                'beforeEnd',
                `
                <ul class="filter-table__body">
                    <li>${field.name}</li>
                    <li>
                        <select>
                        <option>           </option>
                        <option value="LATITUDE">latitude</option>
                        <option value="LONGITUDE">longitude</option>
                        <option value="INTENSITY">intensity</option>
                        <option value="RADIUS">radius</option>
                        <option value="TIME">timelapse var</option>
                        </select>
                    </li>
                    <li>
                        <input class="styled-checkbox" id="use-field-${field.name}" type="checkbox" value="value1">
                        <label for="use-field-${field.name}"></label>
                    </li>
                </ul>`
            )
            let select = container.lastChild.querySelector('select')
            select.onchange = () => {
                this.updateDataType(field.name, select.value)
            }
        }
    }
}
