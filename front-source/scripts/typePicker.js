export default class Picker {
    constructor(scheme) {
        this.fields = []
        this.schemeRef = scheme
        for (let key of Reflect.ownKeys(scheme)) {
            scheme[key].visibility = true
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
        let shown = false
        for (let field of this.fields) {
            if (field.dataType == 'TIME') {
                document.querySelector('.animation-block').removeAttribute('hidden')
                shown = true
            }
        }
        if (!shown) {
            document.querySelector('.animation-block').setAttribute('hidden', true)
        }
        this.schemeRef[key].dataType = dataType
    }

    updateVisibility(key, visibility) {
        this.schemeRef[key].visibility = visibility
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
                        <input
                            class="styled-checkbox"
                            id="use-field-${field.name}"
                            type="checkbox"
                            value="value1"
                            checked>
                        <label for="use-field-${field.name}"></label>
                    </li>
                </ul>`
            )
            let elem = container.lastChild
            let select = elem.querySelector('select')
            select.onchange = () => {
                this.updateDataType(field.name, select.value)
            }
            let input = elem.querySelector('input')
            input.onchange = () => {
                this.updateVisibility(field.name, input.checked)
            }
        }
    }
}
