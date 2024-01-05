export function replaceValue(json: any) {
  return JSON.stringify(json)
    .replace(/"/g, '')
    .replace(/,/g, ', \n')
    .replace(/:/g, ': ')
    .replace(/{/g, '"{\n')
    .replace(/}/g, '\n      }"')
    .replace(/,\n/g, '\n') // remove comma
    .replace(/: /g, ': ')
    .replace(/(,)?([a-zA-Z0-9]+):/g, '        $2:')
}

export function replaceFuntionValue(string: any) {
  return JSON.stringify(string)
    .replace(/"/g, '')
    .replace(/,/g, ',')
    .replace(/:/g, ': ')
    .replace(/"/g, '\'')
}

export function cleanConfig(config: string | number | Record<string, any>) {
  const cleanedConfig = JSON.stringify(config, (key, value) => {
    if (typeof value === 'string')
      return `'${value}'`

    else if (typeof value === 'number')
      return value

    else
      return value
  }, 2)

  return cleanedConfig.replace(/"/g, '')
}
