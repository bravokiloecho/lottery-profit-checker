// Run sanic for faster arrays
// https://github.com/kb-dev/sanic.js
// require('sanic.js').changeMyWorld()

const ticketPrice = 2
// const budget = 1000000
const budget = 1000000
const totalTickets = Math.floor(budget / ticketPrice)

function getRandom(min, max) {
	return Math.floor(Math.random() * max) + min
}

function generateNumber() {
	const maxNumber = 59
	return getRandom(1, maxNumber)
}

function getTicket(totalNumbers = 6) {
	// Creates an array of `n` random numbers
	return Array.from({ length: totalNumbers }, generateNumber)
}

function getTicketValue(ticket, results, prizes) {
	const { balls, bonus } = results
	// Calc overlap of ticket numbers and balls
	const totalMatches = balls.filter(n => ticket.includes(n)).length
	// Stop here for no prizes
	if (totalMatches < 2) {
		return 0
	}
	// Stop here for two
	if (totalMatches === 2) {
		return prizes[totalMatches]
	}
	// Test for bonus if 5 number
	if (totalMatches === 5) {
		const hasBonus = ticket.includes(bonus)
		if (hasBonus) {
			return prizes['5+Bonus']
		}
		return prizes[totalMatches]
	}

	return prizes[totalMatches]
}

// EXPORT
const TestTickets = (results, prizes, previousSummary) => {
	// Get free tickets from previous round
	const { freeTickets = 0 } = previousSummary

	// Define winnings, updated later
	const winnings = {
		previousFreeTickets: freeTickets,
		moneySpent: budget,
		cashWon: 0,
		totalCashPrizes: 0,
		freeTicketsWon: 0,
		worthlessTickets: 0,
	}

	const updatedTotalTickets = freeTickets
		? totalTickets + freeTickets
		: totalTickets

	for (let i = 0; i < updatedTotalTickets; i += 1) {
		const ticket = getTicket()
		const ticketValue = getTicketValue(ticket, results, prizes)
		if (ticketValue === 0) {
			winnings.worthlessTickets += 1
		} else if (ticketValue === 'freeTicket') {
			winnings.freeTicketsWon += 1
		} else {
			winnings.cashWon += ticketValue
			winnings.totalCashPrizes += 1
		}
	}

	const earnings = winnings.cashWon - budget

	const updatedWinnings = {
		...winnings,
		ticketsBought: totalTickets,
		totalTicketsUsed: updatedTotalTickets,
		isProfit: earnings > 0,
	}

	return updatedWinnings
}

module.exports = TestTickets
