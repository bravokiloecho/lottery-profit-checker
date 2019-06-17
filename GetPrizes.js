/*
*
Get the prize money values for the draw
*
*/

const curl = require('curlrequest')
const cheerio = require('cheerio')

// Gets the markup for the results page
function downloadResultsPage(drawNumber) {
  const url = `https://www.national-lottery.co.uk/results/lotto/draw-history/prize-breakdown/${ drawNumber }`
  const options = {
    url
  }

  return new Promise(function (resolve, reject) {
    curl.request(options, function (err, html) {
      if (err) {
        reject(err)
        return
      }
      resolve(html)
    })
  })
}

function getTotalJackpot($) {
  const jackpot = $('#game_header_intro').text()
  const jackpotFloat = convertPrizeToFloat( jackpot )
  return jackpotFloat
}

function getSharedJackpot($) {
  const prize = $('#prize_per_player_0').children().first().text()
  const prizeFloat = convertPrizeToFloat(prize)
  return prizeFloat
}

function convertPrizeToFloat(string) {
  string = string.split('£')[1]
  string = string.replace(/,/g, '')
  string = parseFloat(string)
  return string
}

// EXPORT
const GetPrizes = async function (drawNumber) {
  const resultsHtml = await downloadResultsPage(drawNumber)
  const $ = cheerio.load(resultsHtml)

  const jackpot = getTotalJackpot($)
  const sharedJackpot = getSharedJackpot($)

  return {
    fivePlusBonus: 1000000,
    five: 1750,
    four: 140,
    three: 30,
    two: 'Free Lotto Lucky Dip',
    jackpot: !!sharedJackpot || jackpot
  }
}

module.exports = GetPrizes