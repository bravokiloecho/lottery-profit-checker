const dayjs = require('dayjs')
const advancedFormat = require('dayjs/plugin/advancedFormat')

dayjs.extend(advancedFormat)

const FormatData = (results, outcome, summary) => {
	const { drawDate } = results
	const prettyDate = dayjs(drawDate, 'DD-MMM-YYY').format(
		'dddd Do MMMM, YYYY',
	)
	const {
		cashWon,
		moneySpent,
		totalCashPrizes,
		freeTicketsWon,
		roundEarnings,
		worthlessTickets,
		previousFreeTickets,
		ticketsBought,
		totalTicketsUsed,
		isProfit,
		jackpotWon,
	} = outcome

	const {
		accumulatedEarnings,
		roundsPlayed,
		accumulatedSpend,
		accumulatedProfitLoss,
		isAccumulatedProfit,
	} = summary

	const currencyFormatter = new Intl.NumberFormat('en-GB', {
		style: 'currency',
		currency: 'GBP',
	})

	return {
		drawDate,
		prettyDate,
		// Last round
		cashWon: currencyFormatter.format(Math.abs(cashWon)),
		moneySpent: currencyFormatter.format(Math.abs(moneySpent)),
		roundEarnings: currencyFormatter.format(Math.abs(roundEarnings)),
		freeTicketsWon: freeTicketsWon.toLocaleString('en'),
		totalCashPrizes: totalCashPrizes.toLocaleString('en'),
		worthlessTickets: worthlessTickets.toLocaleString('en'),
		previousFreeTickets: previousFreeTickets.toLocaleString('en'),
		ticketsBought: ticketsBought.toLocaleString('en'),
		totalTicketsUsed: totalTicketsUsed.toLocaleString('en'),
		jackpotWon,
		isProfit,
		// Overall
		accumulatedProfitLoss: currencyFormatter.format(Math.abs(accumulatedProfitLoss)),
		accumulatedSpend: currencyFormatter.format(Math.abs(accumulatedSpend)),
		accumulatedEarnings: currencyFormatter.format(Math.abs(accumulatedEarnings)),
		roundsPlayed: roundsPlayed.toLocaleString('en'),
		isAccumulatedProfit,
	}
}

module.exports = FormatData
