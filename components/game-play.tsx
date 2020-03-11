import * as React from 'react'
import { Component } from 'react'

import Words from '../lib/wodrs'
import Lang from '../lib/lang'
import * as inp from '../lib/keyboard'

import Symbol from './game-symbol'

export interface IGamePlayProps {
  oninput: (state: IGamePlayState) => void
  state: IGamePlayState
}

export interface IGamePlayState {
  className?: string
  text?: string
  input?: string
  limit?: number
  word?: string
  score: number
  attempts: number
  level: number
  exit?: boolean
  time?: number
  name: string
  fail?: boolean
}

export default class GamePlay extends Component<IGamePlayProps, IGamePlayState> {
  constructor(props: IGamePlayProps) {
    super(props)

    let { score, level, attempts, name, time } = props.state

    this.state = {
      className: 'game-view',
      text: '',
      input: '',
      limit: 0,
      word: '',
      score: score,
      level: level,
      attempts: attempts,
      exit: false,
      time: time > 0 ? time : 30000,
      name: name,
      fail: false
    }
  }

  public setWord(word: string) {
    word = word.trim()
    this.setState({ text: Lang.get('word', word), limit: word.length, word: word })
  }

  public componentDidMount() {
    let { oninput } = this.props

    this.setWord(Words.get())

    let int = () => {
      let { time, attempts } = this.state

      this.setState({ time: time - 10 })

      if (time < 0) {
        time = 0
        clearInterval(interval)
        this.setState({ fail: true, className: 'game-view fail' })
        inp.subscribe(null)

        window.addEventListener('animationend', function v(e) {
          if (e.target !== this.refs['input'])
            return

          window.removeEventListener('animationend', v)

          setTimeout(() => {
            this.drop()
            oninput(this.state)
          }, 1000)
        }.bind(this))
      }
    }

    let interval = setInterval(int, 10)

    let oninp = (e) => {
      let { input, limit, word, time, score } = this.state

      if (e.length === 1 && e !== ' ' && input.length < limit)
        input = input + e

      this.setState({ input: input })

      input.split('').map((e, i) => {
        if (e !== word[i])
          this.setState({ time: 0 })
      })

      if (input == word) {
        clearInterval(interval)
        inp.subscribe(null)
        this.setState({ time: time + word.length * 800, className: 'game-view success', score: score + word.length * 1 })
        window.addEventListener('animationend', async function v(e) {
          if (e.target !== this.refs['input'])
            return

          window.removeEventListener('animationend', v)

          setTimeout(() => {
            this.drop()
            oninput(this.state)
          }, 1000)
        }.bind(this))
      }
    }

    inp.subscribe(oninp)
  }

  public drop() {
    let { oninput } = this.props

    this.setState({ className: 'game-view drop' })

    window.addEventListener('animationend', function v(e) {
      if (e.target !== this.refs['input'])
        return

      window.removeEventListener('animationend', v)
      oninput(this.state)
    }.bind(this))
  }

  public render() {
    let { className, text, input, name, score, level, attempts, time } = this.state
    return (
      <div className={className}>
        <div className='game-header'>
          <p>{Lang.get('name')}: <b ref="name">{name}</b></p>
          <p>{Lang.get('score')}: <b ref="score">{score}</b></p>
          <p>{Lang.get('level')}: <b ref="level">{level}</b></p>
          <p>{Lang.get('attempts')}: <b ref="attempts">{attempts}</b></p>
          <p>{Lang.get('time')}: <b ref="time">{((time > 0 ? time : 0) / 1000).toFixed(2)}</b></p>
        </div>
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