const FormatData = (outcome, summary) => {
	const {
		cashWon,
		moneySpent,
		totalCashPrizes,
		freeTicketsWon,
		worthlessTickets,
		previousFreeTickets,
		ticketsBought,
		totalTicketsUsed,
		isProfit,
	} = outcome

	const {
		accumulatedEarnings,
		roundsPlayed,
		accumulatedSpend,
		accumulatedProfitLoss,
	} = summary

	const currencyFormatter = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
	})

	return {
		// Last round
		cashWon: currencyFormatter.format(cashWon),
		moneySpent: currencyFormatter.format(moneySpent),
		freeTicketsWon: freeTicketsWon.toLocaleString('en'),
		totalCashPrizes: totalCashPrizes.toLocaleString('en'),
		worthlessTickets: worthlessTickets.toLocaleString('en'),
		previousFreeTickets: previousFreeTickets.toLocaleString('en'),
		ticketsBought: ticketsBought.toLocaleString('en'),
		totalTicketsUsed: totalTicketsUsed.toLocaleString('en'),
		isProfit,
		// Overall
		accumulatedProfitLoss: currencyFormatter.format(accumulatedProfitLoss),
		accumulatedSpend: currencyFormatter.format(accumulatedSpend),
		accumulatedEarnings: currencyFormatter.format(accumulatedEarnings),
		roundsPlayed: roundsPlayed.toLocaleString('en'),
	}
}

module.exports = FormatData
