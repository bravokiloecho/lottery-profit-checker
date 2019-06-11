/*
*
Get the numbers from the draw
*
*/

const curl = require('curlrequest')
const csv = require("fast-csv")

// DOWNLOAD THE CSV
// --------------------
function downloadCsv() {
  const url = 'https://www.national-lottery.co.uk/results/lotto/draw-history/csv'
  const options = {
    url
  }

  return new Promise(function(resolve, reject) {
    curl.request(options, function (err,csv) {
      if (err) {
        reject(err)
        return
      }
      resolve(csv)
    })
  })
}

// PARSE THE CSV
// ----------------
function parseCsv(string) {
  return new Promise(function(resolve, reject) {
    csv
      .fromString(string, {headers: true})
      .on("data", function(data){
        resolve(data)
      })
      // .on("end", function(){
      //   console.log("done")
      // })
  })
}

// GET THE RESULTS AS AN ARRAY
// ---------------------------
function getResultsObj(csv) {
  return {
    balls:[
      csv['Ball 1'],
      csv['Ball 2'],
      csv['Ball 3'],
      csv['Ball 4'],
      csv['Ball 5'],
      csv['Ball 6'],
    ],
    bonus: csv['Bonus Ball'],
    drawNumber: csv['DrawNumber'],
  }
}

// EXPORT
const GetResults = async function () {
  const csvString = await downloadCsv().catch(function (err) {
    return err
  })
  
  const csv = await parseCsv(csvString)

  const obj = getResultsObj( csv )

  return obj
}

module.exports = GetResults