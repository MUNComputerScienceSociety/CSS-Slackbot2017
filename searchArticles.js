var Feed = require('rss-to-json')
const Cheerio = require('cheerio')
const Url = require('url')
const Slug = require('slug')



module.exports = function (topic,callback) {

        const formatList = (apiList) => {
            return apiList.map(
                (oldListItem) => {
                    var newListItem = {}
                    const parsedHtml = Cheerio.load(oldListItem.description)
                    newListItem['url'] = Url.parse(oldListItem.url, true).query.url
                    newListItem['imageUrl'] = parsedHtml('img').attr('src')
                    newListItem['publication'] = parsedHtml('[size="-2"]').text()
                    newListItem['title'] = parsedHtml('.lh > a > b').text()
                    newListItem['description'] = parsedHtml('.lh > font:nth-of-type(2)').html()
                    newListItem['created'] = oldListItem.created
                    newListItem['urlSlug'] = Slug(newListItem['title'])
                    return newListItem
                }
            )
        }
        

        Feed.load('https://news.google.com/news/section?output=rss&q=' + topic,
            function (err, rss) {
                if (err) {
                    return console.log('something bad happened', err)
                }

                 const formattedList = formatList(rss.items)

                 callback(formattedList)
                 

                
           }
        )
    
        
  }

