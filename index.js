const getParameters = () => {
  const params = {}
  const argv = process.argv
  for (let i = 2, L = argv.length; i < L; i ++) {
    const item = argv[i]
    if (!item.startsWith('--')) continue
    let key = item.substr(2)
    let value = null
    if (key.length === 0) continue
    if (key.indexOf('=') > -1) {
      const parts = key.split('=')
      key = parts[0]
      value = whatIsValue(parts[1])
    } else {
      value = argv[i + 1]
      if (value && !value.startsWith('--')) {
        value = whatIsValue(value)
        i += 1
      } else {
        value = true
      }
    }
    params[key] = value
  }
  return params
}

const whatIsValue = (val) => {
  const tryNumber = Number(val)
  if (isNaN(tryNumber)) {
    return val
  } else {
    return tryNumber
  }
}

const params = getParameters()

if (!params.dir) {
  throw new Error('Please provide --dir=??')
}

if (!params.mode) {
  throw new Error('Please provide --mode=build or --mode=dev')
}

