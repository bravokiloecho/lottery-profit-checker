const cron = require('node-cron')

const logDate = () => {
	console.log(new Date())
}

const StartCron = (func = () => {}) => {
	// Every Wednesday and Saturday at 21:00
	const cronPattern = '0 20 * * Wednesday,Saturday'
	console.log('valid?', cron.validate(cronPattern))
	cron.schedule(cronPattern, () => {
		console.log('Run tasks')
		logDate()
		func()
	}, {
		scheduled: true,
		timezone: 'Europe/London',
	})
	console.log('Start cron')
}

module.exports = StartCron
