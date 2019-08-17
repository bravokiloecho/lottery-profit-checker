function formTweet(data) {
	const {
		isProfit,
		isAccumulatedProfit,
		jackpotWon,
		prettyDate,
		moneySpent,
		ticketsBought,
		previousFreeTickets,
		totalTicketsUsed,
		cashWon,
		freeTicketsWon,
		roundEarnings,
		roundsPlayed,
		accumulatedSpend,
		accumulatedEarnings,
		accumulatedProfitLoss,
	} = data

	// Define whether word is profit or loss
	const earningsWord = isProfit ? 'profit' : 'loss'
	const accumulatedEarningsWord = isAccumulatedProfit ? 'profit' : 'loss'
	const roundsWord = roundsPlayed === 1 ? 'round' : 'rounds'

	let tweetText1 = ''
	let tweetText2 = ''

	if (jackpotWon) {
		tweetText1 += '*** JACKPOT ***\n\n'
	}

	tweetText1 += `On ${prettyDate}, `
	tweetText1 += `${cashWon} and ${freeTicketsWon} free tickets were won. `
	tweetText1 += `The total spend was ${moneySpent} on ${ticketsBought} tickets`
	if (previousFreeTickets) {
		tweetText1 += ` with an additional ${previousFreeTickets} free tickets from the previous draw.`
	} else {
		tweetText1 += '.'
	}

	tweetText1 += '\n\n'

	tweetText1 += `This results in a ${earningsWord} of ${roundEarnings} for this round.`

	// SECOND TWEET
	tweetText2 += `After ${roundsPlayed} ${roundsWord} the overall ${accumulatedEarningsWord} is ${accumulatedProfitLoss} `
	tweetText2 += `after spending ${accumulatedSpend} and winning ${accumulatedEarnings}.`

	return [tweetText1, tweetText2]
}

const BuildTweet = (data) => {
	// Get tweets
	return formTweet(data)
}

module.exports = BuildTweet
