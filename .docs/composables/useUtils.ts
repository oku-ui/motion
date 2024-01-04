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
