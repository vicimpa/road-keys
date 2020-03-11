import * as React from 'react'
import { Component } from 'react'

import Lang from '../lib/lang'
import * as input from '../lib/keyboard'

import Symbol from './game-symbol'

export default class GameQuest extends Component<{ oninput: (key: string) => void, text: string, vars: string[] }, { className: string, select: string, text: string }> {
  constructor(props: any) {
    super(props)
    this.state = { className: 'game-view', select: '', text: Lang.get(props.text) }
  }
  public componentDidMount() {
    let { vars, oninput, text } = this.props

    input.subscribe((e) => {
      if (vars.indexOf(e) === -1)
        return

      let key = e

      if (text === 'select_lang')
        Lang.lang = e

      this.setState({ text: Lang.get('good'), select: key })

      input.subscribe(null)

      setTimeout(() => {
        this.setState({ className: 'game-view drop' })

        window.addEventListener('animationend', function v(e) {
          if (e.target !== this.refs['input'])
            return

          window.removeEventListener('animationend', v)
          oninput(key)
        }.bind(this))
      }, 800)
    })
  }

  public drop() {

  }

  public render() {
    let { className, select, text } = this.state
    let { vars } = this.props
    return (
      <div className={className}>
        <div className='game-middle'>
          <div key={text} className='game-text'>
            {Lang.get(text)}
          </div>
          <div className='game-input select' ref='input'>
            {vars.map((e, i) => (<Symbol className={(e === select ? 'this' : '')} key={`var${e}${i}`} symbol={e} />))}
          </div>
        </div>
      </div>
    )
  }
}