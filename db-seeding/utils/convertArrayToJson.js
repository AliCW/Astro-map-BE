const fs = require('fs/promises')
const { convertCoordinates } = require('./formatCoordinates.js')
const { convert, createEclipseObjects, formatCoordinates, convertFromFile } = require('./convert.js')
const { giantArray } = require('./test-data/test-array')
const { totalArrays } = require('./data/total-arrays-all/total-arrays-all')
const { hybridArrays } = require('./data/hybrid-arrays-all/hybrid-arrays-all')
const { annularArrays } = require('./data/annular-arrays-all/annular-arrays')

const convertFromStrings = (array) => {
    const convertedFile = convert(array)
    const eclipseArray = createEclipseObjects(convertedFile)
    const formattedArray = formatCoordinates(eclipseArray)
    return formattedArray
}

const convertArrayOfStringsToJson = (arrayOfEclipses, type) => {

    const eclipseObjectsArray = arrayOfEclipses.map((eclipse) => {
        const array = convertFromStrings(eclipse)
        const individualEclipse = { type: type, date: array[0].date, coordinateData: array }
        return individualEclipse
    })

    
    return eclipseObjectsArray
}

module.exports = { convertArrayOfStringsToJson }

