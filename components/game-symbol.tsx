import * as React from 'react'
import { Component } from 'react'

export default class GameSymbol extends Component<{ symbol: string, className: string }, {}> {
  public render() {
    let { symbol, className } = this.props
    return (
      <div className={`${className} game-symbol sym${symbol.charCodeAt(0)}`}></div>
    )
  }
}