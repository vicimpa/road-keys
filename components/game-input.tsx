import * as React from 'react'
import { Component } from 'react'

import Lang from '../lib/lang'
import * as inp from '../lib/keyboard'

import Symbol from './game-symbol'

export default class GameInput extends Component<{ oninput: (key: string) => void, text: string, limit: number }, { className: string, text: string, input: string }> {
  constructor(props: any) {
    super(props)
    this.state = { className: 'game-view', text: Lang.get(props.text) || props.text, input: '' }
  }
  public componentDidMount() {
    let { oninput, text, limit } = this.props

    inp.subscribe((e) => {
      let { input } = this.state

      if (e === 'Enter') {
        let key = e

        this.setState({ text: Lang.get('good') })

        inp.subscribe(null)

        setTimeout(() => {
          this.setState({ className: 'game-view drop' })

          window.addEventListener('animationend', function v(e) {
            if (e.target !== this.refs['input'])
              return

            window.removeEventListener('animationend', v)
            oninput(input)
          }.bind(this))
        }, 800)
      }

      if (e === 'Backspace')
        this.setState({ input: input.substr(0, input.length - 1) })

      if (e.length !== 1 || e === ' ')
        return

      if (input.length < limit)
        this.setState({ input: input + e })
    })
  }

  public drop() {

  }

  public render() {
    let { className, text, input } = this.state
    return (
      <div className={className}>
        <div className='game-middle'>
          <div key={text} className='game-text'>
            {Lang.get(text) || text}
          </div>
          <div className='game-input' ref='input'>
            {(input || ' ').split('').map((e, i) => (<Symbol className={''} key={`var${e}${i}`} symbol={e} />))}
          </div>
        </div>
      </div>
    )
  }
}