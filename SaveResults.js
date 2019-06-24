const fs = require('fs')

function writeData(dataFile, data) {
	const dataString = JSON.stringify(data, null, 2)
	fs.writeFileSync(dataFile, dataString)
}

const SaveResults = async (dataFile, oldData, results) => {
	const { cashWon, freeTicketsWon, totalMoneySpent: previouslySpent } = results
	const { accumulatedEarnings = 0, roundsPlayed = 0, totalSpent = 0 } = oldData
	const newData = {
		freeTickets: freeTicketsWon,
		accumulatedEarnings: accumulatedEarnings + cashWon,
		roundsPlayed: roundsPlayed + 1,
		totalSpent: totalSpent + previouslySpent,
	}
	// Calc profit loss
	newData.profitLoss = newData.accumulatedEarnings - newData.totalSpent
	// Write data to file
	await writeData(dataFile, newData)
	// Return new data
	return newData
}

module.exports = SaveResults
