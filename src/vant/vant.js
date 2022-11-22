import { Button, Toast, Checkbox, Picker, Form, Field, CellGroup, CheckboxGroup, Radio, RadioGroup, Empty, Image } from 'vant'

const vant = {
    install: function(Vue) {
        Vue.use(Button)
        Vue.use(Toast)
        Vue.use(Checkbox)
        Vue.use(Picker)
        Vue.use(Form)
        Vue.use(Field)
        Vue.use(CellGroup)
        Vue.use(CheckboxGroup)
        Vue.use(Radio)
        Vue.use(RadioGroup)
        Vue.use(Empty)
        Vue.use(Image)
    }
}

export default vant