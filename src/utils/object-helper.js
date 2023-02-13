export const lazyLoad = (view) => {
   return () => import(/* @vite-ignore */ `/src/pages/${view}.vue`)
}
/**
 * pick value from object
 * @param {object} obj
 * @param {string} ...props
 * @returns {object}
 */
export const pick = (obj, ...props) => {
   return props.reduce(function (result, prop) {
      result[prop] = obj[prop]
      return result
   }, {})
}

/**
 * omit selected value from object
 * @param {object} obj
 * @param {string} ...props
 * @returns {object}
 */
export const omit = (obj, ...props) => {
   const result = { ...obj }
   props.forEach(function (prop) {
      delete result[prop]
   })
   return result
}

// export const renameKeys = (keysMap, obj) =>
//   Object.keys(obj).reduce(
//     (acc, key) => ({
//       ...acc,
//       ...{ [keysMap[key] || key]: obj[key] },
//     }),
//     {}
//   )
//
export const renameKey = (obj, old_key, new_key) => {
   // check if old key = new key
   if (old_key !== new_key) {
      Object.defineProperty(
         obj,
         new_key, // modify old key
         // fetch description from object
         Object.getOwnPropertyDescriptor(obj, old_key)
      )
      delete obj[old_key] // delete old key
   }
}
