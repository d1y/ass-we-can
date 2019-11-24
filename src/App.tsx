import 'bulma/css/bulma.css'
import React from 'react'
import Lite from './lite.json'
const lists: any = []

for(var i=0,len=Lite.length;i<len;i+=6){
  lists.push(Lite.slice(i,i+6))
}

function openGV() {

}

const Link = (props: any)=> (
  <span>
      <a href={ props.href } target="_blank" rel="noopener noreferrer">
        { props.children }
      </a>
    </span>
)

let audio_dom: any = null

const gv_url = `https://play.google.com/store/apps/details?id=com.matthew_saeli.gachisoundboard&hl=zh`

const play = (url: string)=> {
  audio_dom.src = url
  audio_dom.play()
}

const App: React.FC = () => {
  const center = { textAlign: 'center' }
  return (
    <div className="App box container">
      { (lists).map((item: any, index: number)=> {
        return (
          <div className="columns" key={ index }>
            { item.map(((sub: any, subIndex: number)=> {
               return (
                <div className="column" key={ subIndex } onClick={ e=> {
                  play(`audio/${ sub['audio'][0] + '/' + sub['audio'][1] }`)
                } }>
                  <div style={ (center as any) }>
                    <img src={ `face/${ sub['face'] }` } />
                  </div>
                  <p style={ (center as any) }> { sub.text } </p>
                </div>
              )
            })) }
          </div>
        )
      }) }
      <p style={{ textAlign: 'center' }} onClick={ openGV }>
        <Link href={ gv_url }>Gachimuchi♂ Soundboard♂</Link>
      </p>
      <audio ref={ event=> audio_dom = event } src=""></audio>
    </div>
  )
}

export default App;
