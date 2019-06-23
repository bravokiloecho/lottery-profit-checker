// Run sanic for faster arrays
// https://github.com/kb-dev/sanic.js
// require('sanic.js').changeMyWorld()

const ticketPrice = 2
// const budget = 1000000
const budget = 100
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
const TestTickets = (results, prizes) => {
	const winnings = {
		cash: 0,
		freeTickets: 0,
	}
	for (let i = 0; i < totalTickets; i += 1) {
		const ticket = getTicket()
		const ticketValue = getTicketValue(ticket, results, prizes)
		if (ticketValue === 'freeTicket') {
			winnings.freeTickets += 1
		} else {
			winnings.cash += ticketValue
		}
	}
	return winnings
}

module.exports = TestTickets
