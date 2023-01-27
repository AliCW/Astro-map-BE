const fs = require('fs/promises')
//const { convertCoordinates } = require('./formatCoordinates.js')
const { convert, createEclipseObjects, formatCoordinates, convertFromFile } = require('./convert.js')
const { distance } = require('../distance')


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

