import { forEach } from "lodash"

export const setGender = (value) => (value == 'l' ? 'laki-laki' : 'perempuan')
export const clearForm = (object) => {
  forEach(object, (item) => {
    item = ''
  })
}
