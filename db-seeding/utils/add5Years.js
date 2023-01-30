function addFiveYears(){

const thisDay = new Date()
const today = new Date();
const newDate = today.setMonth(today.getMonth()+60);
const oneYear = new Date(newDate);
let yearAheadFormat = oneYear.toString().slice(11, 15);
let monthAheadFormat = oneYear.toString().slice(4, 7);
let dayAheadFormat = oneYear.toString().slice(8, 10);

let thisYearFormat = thisDay.toString().slice(11, 15);
let thisMonthFormat = thisDay.toString().slice(11, 15);
let thisDayFormat = thisDay.toString().slice(8, 10);


  if (monthAheadFormat === "Jan"){
    monthAheadFormat = "01"
    thisMonthFormat = "01"
  } else if (monthAheadFormat === "Feb"){
    monthAheadFormat = "02"
    thisMonthFormat = "02"
  } else if (monthAheadFormat === "Mar"){
    monthAheadFormat = "03"
    thisMonthFormat = "03"
  } else if (monthAheadFormat === "Apr"){
    monthAheadFormat = "04"
    thisMonthFormat = "04"
  } else if (monthAheadFormat === "May"){
    monthAheadFormat = "05"
    thisMonthFormat = "05"
  } else if (monthAheadFormat === "Jun"){
    monthAheadFormat = "06"
    thisMonthFormat = "06"
  } else if (monthAheadFormat === "Jul"){
    monthAheadFormat = "07"
    thisMonthFormat = "07"
  } else if (monthAheadFormat === "Aug"){
    monthAheadFormat = "08"
    thisMonthFormat = "08"
  } else if (monthAheadFormat === "Sep"){
    monthAheadFormat = "09"
    thisMonthFormat = "09"
  } else if (monthAheadFormat === "Oct"){
    monthAheadFormat = "10"
    thisMonthFormat = "10"
  } else if (monthAheadFormat === "Nov"){
    monthAheadFormat = "11"
    thisMonthFormat = "11"
  } else if (monthAheadFormat === "Dec"){
    monthAheadFormat = "12"
    thisMonthFormat = "12"
  }

const fiveYearsAhead = yearAheadFormat + "-" + monthAheadFormat + "-" + dayAheadFormat
const thisYear = thisYearFormat + "-" + thisMonthFormat + "-" + thisDayFormat

return { fiveYearsAhead, thisYear }

}

module.exports = { addFiveYears };