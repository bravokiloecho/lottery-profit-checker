const env = require('node-env-file')
const path = require('path')
const Twitter = require('twitter')

env(`${path.join(__dirname, '..')}/.env`)

const twitterKeys = {
	consumer_key: process.env.TWITTER_CONSUMER_KEY,
	consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
	access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
	access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
}

const client = new Twitter(twitterKeys)

const params = { screen_name: 'lottery_sim_bot' }

const postTweet = (status, id) => {
	const body = {
		status,
	}

	if (id) {
		body.in_reply_to_status_id = id
		body.status = `@${params.screen_name} ${body.status}`
	}

	return new Promise((resolve, reject) => {
		client.post('statuses/update', body, (error, tweet) => {
			if (error) {
				reject(error)
				return
			}
			// Tweet body
			resolve(tweet)
		})
	})
}

const PostTweets = async (tweets) => {
	const [tweet1, tweet2] = tweets
	// Post first tweet
	const { id_str: id } = await postTweet(tweet1)
	// Post second tweet
	await postTweet(tweet2, id)
	// Finish
	return 'Done!'
	// console.log(response)
}

module.exports = PostTweets
