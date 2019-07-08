const cron = require('node-cron')

const StartCron = (func = () => {}) => {
	// Every Wednesday and Saturday at 21:00
	const cronPattern = '* 21 * * Wednesday,Saturday'
	cron.schedule(cronPattern, () => {
		func()
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	})
}

module.exports = StartCron
