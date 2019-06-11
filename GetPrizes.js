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

function getJackpot(html) {

  const $ = cheerio.load(html)
  let jackpot = $('#game_header_intro').text()
  jackpot = jackpot.split('£')[1]
  jackpot = jackpot.replace(/,/g, '')
  jackpot = parseFloat(jackpot)

  return jackpot
}

// EXPORT
const GetPrizes = async function (drawNumber) {
  // Define fixed prizes
  const prizes = {
    fivePlusBonus: 1000000,
    five: 1750,
    four: 140,
    three: 30,
    two: 'Free Lotto Lucky Dip',
  }

  const resultsHtml = await downloadResultsPage(drawNumber)
  prizes.jackpot = getJackpot(resultsHtml)
  return prizes
}

module.exports = GetPrizes