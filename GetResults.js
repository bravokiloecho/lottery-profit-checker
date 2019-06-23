/*
*
Get the numbers from the draw
*
*/

const curl = require('curlrequest')
const csv = require('fast-csv')

// DOWNLOAD THE CSV
// --------------------
function downloadCsv() {
	const url = 'https://www.national-lottery.co.uk/results/lotto/draw-history/csv'
	const options = {
		url,
	}

	return new Promise((resolve, reject) => {
		curl.request(options, (err, csvResult) => {
			if (err) {
				reject(err)
				return
			}
			resolve(csvResult)
		})
	})
}

// PARSE THE CSV
// ----------------
function parseCsv(string) {
	return new Promise((resolve) => {
		csv.fromString(string, { headers: true }).on('data', (data) => {
			resolve(data)
		})
		// .on("end", function(){
		//   console.log("done")
		// })
	})
}

// GET THE RESULTS AS AN ARRAY
// ---------------------------
function getResultsObj(csvResult) {
	return {
		balls: [
			parseFloat(csvResult['Ball 1']),
			parseFloat(csvResult['Ball 2']),
			parseFloat(csvResult['Ball 3']),
			parseFloat(csvResult['Ball 4']),
			parseFloat(csvResult['Ball 5']),
			parseFloat(csvResult['Ball 6']),
		],
		bonus: parseFloat(csvResult['Bonus Ball']),
		drawNumber: csvResult.DrawNumber,
	}
}

// EXPORT
const GetResults = async () => {
	const csvString = await downloadCsv().catch(err => err)

	const csvData = await parseCsv(csvString)

	const obj = getResultsObj(csvData)

	return obj
}

module.exports = GetResults
