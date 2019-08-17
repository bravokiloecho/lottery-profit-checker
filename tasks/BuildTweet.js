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
	tweetText1 += `${cashWon} and ${freeTicketsWon} free tickets were won `
	tweetText1 += `with ${ticketsBought + previousFreeTickets}. `
	tweetText1 += `${moneySpent} bought ${ticketsBought} tickets`
	if (previousFreeTickets) {
		tweetText1 += ` with an additional ${previousFreeTickets} free tickets used from the previous draw. `
	} else {
		tweetText1 += '. '
	}

	tweetText1 += `This results in a ${earningsWord} of ${roundEarnings} for this round.\n`

	// SECOND TWEET
	tweetText2 += `${accumulatedEarnings} has now been won `
	tweetText2 += `after ${roundsPlayed} ${roundsWord}, and a total spend of ${accumulatedSpend}. `
	tweetText2 += `The overall ${accumulatedEarningsWord} is currently ${accumulatedProfitLoss}.`

	return [tweetText1, tweetText2]
}

const BuildTweet = (data) => {
	// Get tweets
	return formTweet(data)
}

module.exports = BuildTweet
