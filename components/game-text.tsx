import * as React from 'react'
import { Component } from 'react'

import Lang from '../lib/lang'
import * as inp from '../lib/keyboard'

export default class GameText extends Component<{ oninput: (func: () => void) => void, text: string, delay: number }, { className: string, text: string }> {
  constructor(props: any) {
    super(props)
    this.state = { className: 'game-view', text: Lang.get(props.text) || props.text }
  }
  public componentDidMount() {
    let { delay, oninput } = this.props

    if (delay) {
      inp.subscribe((e) => {
        if (e === 'Enter') {
          this.drop()
          clearTimeout(timeout)
        }
      })

      let timeout = setTimeout(() => {
        this.drop()
        clearTimeout(timeout)
      }, delay)
    }
    else
      oninput(this.drop.bind(this))
  }

  public drop() {
    let { oninput } = this.props
    this.setState({ className: 'game-view drop' })

    window.addEventListener('animationend', function v(e) {
      if (e.target !== this.refs['text'])
        return

      oninput(null)
      window.removeEventListener('animationend', v)
    }.bind(this))
  }

  public render() {
    let { className, text } = this.state
    return (
      <div className={className}>
        <div className='game-middle'>
          <div key={text} ref="text" className='game-text'>
            {Lang.get(text) || text}
          </div>
        </div>
      </div>
    )
  }
}