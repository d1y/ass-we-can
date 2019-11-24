/*
** create by @d1y in 2019-11-24
** https://twitter.com/GachiSoundboard
*/
const got = require('got')
const down = require('download')
const cheerio = require('cheerio')
const path = require('path')
let website = `http://soundboard.ass-we-can.com`
// website = `http://ass-we-can.com`

const download = async arr=> {
  arr.forEach((item, index)=> {
    const audio = item['audio']
    let url = item['raw_face']
    const audio_url = item['raw_audio']
    Save(url, 'face')
    Save(audio_url, `audio/${ audio[0] }`)
    console.log('开始下载: ', index)
  })
}

const Save = async (url, _path)=> {
  setTimeout(()=> {
    down(url, `public/${ _path }`, {
      filename: path.basename(url)
    })
  }, 1000 * Math.random())
}

;(async ()=> {
  const time = (new Date).valueOf
  const html = await got(website+`?${ time }`)
  const $ = cheerio.load(html.body)
  const lists = $('.col-md-2')
  const datas = []
  console.log('发起请求中')
  for (let i=0; i<lists.length; i++) {
    const now = lists[i]
    let face = now.children[1]['children'][0]['attribs']['src']
    let text = now.children[3]['children'][0]['data']
    let audio = now.children[5]['attribs']['src']
    let facename = path.basename(face)
    let feel = (()=> {
      let arr = audio.split('/')
      let len = arr.length
      return [ arr[len-2], arr[len-1] ]
    })()
    audio = website + audio
    face = website + face.substr(2, face.length)
    datas.push({ 
      raw_face: face,
      raw_audio: audio,
      text,
      face: facename,
      audio: feel
    })
  }
  download(datas)
  // fs.writeFileSync(`dev.json`, JSON.stringify(datas))
})()