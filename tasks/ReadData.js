const fs = require('fs')

const ReadData = async (dataFile) => {
	try {
		const rawData = fs.readFileSync(dataFile)
		return JSON.parse(rawData)
	} catch (err) {
		return false
	}
}

module.exports = ReadData
