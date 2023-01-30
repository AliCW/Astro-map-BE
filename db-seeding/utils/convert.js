const { convertCoordinates } = require("./formatCoordinates");
const { distance } = require('../distance')

const convert = (arrayOfStrings) => {
  const arrayOfArrays = arrayOfStrings.map((string) => {
    let splitArray = string.split(" ");
    const filteredArray = splitArray.filter((element) => {
      if (element !== "") {
        return element;
      }
    });
    return filteredArray;
  });

  return arrayOfArrays;
};

const createEclipseObjects = (convertedArray) => {
  const info = convertedArray[0];
  let month = info[info.length - 2]
  if (month === "Jan"){
    month = "01"
  } else if (month === "Feb"){
    month = "02"
  } else if (month === "Mar"){
    month = "03"
  } else if (month === "Apr"){
    month = "04"
  } else if (month === "May"){
    month = "05"
  } else if (month === "Jun"){
    month = "06"
  } else if (month === "Jul"){
    month = "07"
  } else if (month === "Aug"){
    month = "08"
  } else if (month === "Sep"){
    month = "09"
  } else if (month === "Oct"){
    month = "10"
  } else if (month === "Nov"){
    month = "11"
  } else if (month === "Dec"){
    month = "12"
  }
  const date =
    info[info.length - 3] + "-" + month + "-" + info[info.length - 1];
  const eclipseObjectArray = [];
  convertedArray.map((array) => {
    if (/\d\d:\d\d/.test(array[0]) || /Limits/.test(array[0])) {
      if (array[1] === "-") {
        const obj = {};
        obj.date = date;
        obj.time = array[0];
        obj.northLat = null;
        obj.northLatDegrees = null;
        obj.northLong = null;
        obj.northLongDegrees = null;
        obj.southLat = array[4];
        obj.southLatDegrees = array[3];
        obj.southLong = array[6];
        obj.southLongDegrees = array[5];
        obj.centerLat = array[8];
        obj.centerLatDegrees = array[7];
        obj.centerLong = array[10];
        obj.centerLongDegrees = array[9];
        obj.pathWidth = array[array.length - 2];
        obj.centerDuration = array[array.length - 1];
        eclipseObjectArray.push(obj);
      } else if (array[5] === "-") {
        const obj = {};
        obj.date = date;
        obj.time = array[0];
        obj.northLat = array[2];
        obj.northLatDegrees = array[1];
        obj.northLong = array[4];
        obj.northLongDegrees = array[3];
        obj.southLat = null;
        obj.southLatDegrees = null;
        obj.southLong = null;
        obj.southLongDegrees = null;
        obj.centerLat = array[8];
        obj.centerLatDegrees = array[7];
        obj.centerLong = array[10];
        obj.centerLongDegrees = array[9];
        obj.pathWidth = array[array.length - 2];
        obj.centerDuration = array[array.length - 1];
        eclipseObjectArray.push(obj);
      } else if (array[9] === "-") {
        const obj = {};
        obj.date = date;
        obj.time = array[0];
        obj.northLat = array[2];
        obj.northLatDegrees = array[1];
        obj.northLong = array[4];
        obj.northLongDegrees = array[3];
        obj.southLat = array[6];
        obj.southLatDegrees = array[5];
        obj.southLong = array[8];
        obj.southLongDegrees = array[7];
        obj.centerLat = null;
        obj.centerLatDegrees = null;
        obj.centerLong = null;
        obj.centerLongDegrees = null;
        obj.pathWidth = null;
        obj.centerDuration = null;
        eclipseObjectArray.push(obj);
      } else {
        const obj = {};
        obj.date = date;
        obj.time = array[0];
        obj.northLat = array[2];
        obj.northLatDegrees = array[1];
        obj.northLong = array[4];
        obj.northLongDegrees = array[3];
        obj.southLat = array[6];
        obj.southLatDegrees = array[5];
        obj.southLong = array[8];
        obj.southLongDegrees = array[7];
        obj.centerLat = array[10];
        obj.centerLatDegrees = array[9];
        obj.centerLong = array[12];
        obj.centerLongDegrees = array[11];
        obj.pathWidth = array[array.length - 2];
        obj.centerDuration = array[array.length - 1];
        eclipseObjectArray.push(obj);
      }
    }
  });
  return eclipseObjectArray;
};

const formatCoordinates = (eclipseObjectArray) => {
  const convertedArray = eclipseObjectArray.map((obj) => {
    if (obj.northLat !== null) {
      obj.northCoordinates = convertCoordinates(
        obj.northLat,
        obj.northLong,
        obj.northLatDegrees,
        obj.northLongDegrees
      );
    } else obj.northCoordinates = null;
    delete obj.northLat;
    delete obj.northLong;
    delete obj.northLatDegrees;
    delete obj.northLongDegrees;
    if (obj.centerLat !== null) {
      obj.centerCoordinates = convertCoordinates(
        obj.centerLat,
        obj.centerLong,
        obj.centerLatDegrees,
        obj.centerLongDegrees
      );
    } else obj.centerCoordinates = null;
    delete obj.centerLat;
    delete obj.centerLong;
    delete obj.centerLatDegrees;
    delete obj.centerLongDegrees;
    if (obj.southLat !== null) {
      obj.southCoordinates = convertCoordinates(
        obj.southLat,
        obj.southLong,
        obj.southLatDegrees,
        obj.southLongDegrees
      );
    } else obj.southCoordinates = null;
    delete obj.southLat;
    delete obj.southLong;
    delete obj.southLatDegrees;
    delete obj.southLongDegrees;

    if (obj.northCoordinates === null) {
      obj.kmDistance = distance(obj.centerCoordinates.latitude, obj.centerCoordinates.longitude, obj.southCoordinates.latitude, obj.southCoordinates.longitude)
    } else if (obj.southCoordinates === null) {
      obj.kmDistance = distance(obj.northCoordinates.latitude, obj.northCoordinates.longitude, obj.centerCoordinates.latitude, obj.centerCoordinates.longitude)
    } else obj.kmDistance = distance(obj.northCoordinates.latitude, obj.northCoordinates.longitude, obj.southCoordinates.latitude, obj.southCoordinates.longitude)

    return obj;
  });
  return convertedArray;
};

module.exports = {
  convert,
  createEclipseObjects,
  formatCoordinates,
};
