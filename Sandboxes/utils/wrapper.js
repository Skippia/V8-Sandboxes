'use strict'

/**
 * @description Logs call, arguments, result
 */
export function wrapFunction(key, fn) {
  console.log(`Wrap function: ${key}`)

  return (...args) => {
    console.log(`Called wrapper for: ${key}`)
    console.dir({ args })

    if (args.length > 0) {
      let callback = args[args.length - 1]
      if (typeof callback === 'function') {
        args[args.length - 1] = (...args) => {
          console.log(`Callback: ${key}`)
          callback(...args)
        }
      }
      else {
        callback = null
      }
    }
    console.log(`Call: ${key}`)
    console.dir(args)
    // Call original function (f.e setTimeout(someCb, ms))
    const result = fn(...args)
    console.log(`Ended wrapper for: ${key}`)
    console.dir({ result })
    return result
  }
}

export function cloneInterface(anInterface) {
  const clone = {}
  for (const key in anInterface) {
    const fn = anInterface[key]
    clone[key] = wrapFunction(key, fn)
  }
  return clone
}
