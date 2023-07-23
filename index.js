const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const listings = []

app.get('/', (req , res) => {res.json('Welcome to my aqar API')
})

app.get('/aqar', (req , res) => { axios.get('https://sa.aqar.fm/')
.then((response) => {
    const html = response.data
    const $ = cheerio.load(html)

    $((".listing_LinkedListingCard__5SRvZ"), html).each(function(){
        const title = $(this).find('a').text()
        const url = $(this).find('a').attr('href')
        const city = $(this).find('div.listingCard_city__ApOJt').text()
        const district = $(this).find('div.listingCard_district__5U3jm').text()
        const price = $(this).find('div.listingCard_price__N5eJ4').text()
        const space = $(this).find('div.listingCard_spec__iKaqt').text()
        const description = $(this).find('div.listingCard_description__dMJy_').text()
        listings.push({
            title,  url: 'https://sa.aqar.fm/' + url,
            price, space, city, district, description
        })
    })

    res.json(listings)
    }).catch((err)=>console.log(err))
})

app.listen(PORT, () =>console.log(`server running on PORT ${PORT}`))



