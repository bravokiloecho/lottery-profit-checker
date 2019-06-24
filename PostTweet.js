function formTweet(data) {
	const {
		isProfit,
		isAccumulatedProfit,
		jackpotWon,
		drawDate,
		moneySpent,
		ticketsBought,
		previousFreeTickets,
		cashWon,
		freeTicketsWon,
		roundEarnings,
		roundsPlayed,
	} = data

	// Define whether word is profit or loss
	const earningsWord = isProfit ? 'profit' : 'loss'
	const accumulatedEarningsWord = isAccumulatedProfit ? 'profit' : 'loss'

	let tweetText = ''

	if (jackpotWon) {
		tweetText += '*** JACKPOT ***\n\n'
	}

	tweetText += `On ${drawDate}, `

	tweetText += `${moneySpent} bought ${ticketsBought} tickets`
	if (previousFreeTickets) {
		tweetText += ` with an additional ${previousFreeTickets} free tickets used`
	}

	tweetText += '.\n'

	tweetText += `${cashWon} and ${freeTicketsWon} free tickets were won, `
	tweetText += `resulting in a ${earningsWord} of ${roundEarnings}.\n`


	// tweetText += `After ${roundsPlayed} rounds, `
	// tweetText += `After ${roundsPlayed} rounds, `

	return tweetText
}

const PostTweet = (data) => {
	const tweet = formTweet(data)
	console.log(tweet)
	console.log(tweet.length);
}

module.exports = PostTweet
