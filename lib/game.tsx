import * as React from 'react'
import * as ReactDOM from 'react-dom'

import GameQuest from '../components/game-quest'
import GameInput from '../components/game-input'
import GameText from '../components/game-text'
import GamePlay, { IGamePlayState } from '../components/game-play'

const main = document.querySelector('.main')

export default class Game {
  public static quest(id: string, text: string, ...vars: string[]): Promise<string> {
    return new Promise(resolve => {
      ReactDOM.render(<GameQuest oninput={resolve} key={id} text={text} vars={vars} />, main)
    })
  }

  public static input(id: string, text: string, limit: number): Promise<string> {
    return new Promise(resolve => {
      ReactDOM.render(<GameInput oninput={resolve} key={id} text={text} limit={limit} />, main)
    })
  }

  public static showtext(id: string, text: string, delay: number = 0): Promise<() => void> {
    return new Promise(resolve => {
      ReactDOM.render(<GameText oninput={resolve} key={id} text={text} delay={delay} />, main)
    })
  }

  public static play(id: string = 'plaing', state: IGamePlayState): Promise<IGamePlayState> {
    return new Promise(resolve => {
      ReactDOM.render(<GamePlay oninput={resolve} key={id} state={state} />, main)
    })
  }

  public static delay(value: number = 100): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, value)
    })
  }
}