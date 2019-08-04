function formTweet(data) {
	const {
		isProfit,
		isAccumulatedProfit,
		jackpotWon,
		prettyDate,
		moneySpent,
		ticketsBought,
		previousFreeTickets,
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

	tweetText1 += `${moneySpent} bought ${ticketsBought} tickets`
	if (previousFreeTickets) {
		tweetText1 += ` with an additional ${previousFreeTickets} free tickets used from the previous draw`
	}

	tweetText1 += '.\n\n'

	tweetText1 += `${cashWon} and ${freeTicketsWon} free tickets were won, `
	tweetText1 += `resulting in a ${earningsWord} of ${roundEarnings}.\n`

	// SECOND TWEET
	tweetText2 += `After ${roundsPlayed} ${roundsWord}, ${accumulatedSpend} has been spent and `
	tweetText2 += `${accumulatedEarnings} has been won, `
	tweetText2 += `resulting in an overall ${accumulatedEarningsWord} of ${accumulatedProfitLoss}.`

	return [tweetText1, tweetText2]
}

const BuildTweet = (data) => {
	// Get tweets
	return formTweet(data)
}

module.exports = BuildTweet
