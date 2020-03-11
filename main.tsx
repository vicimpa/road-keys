import Game from './lib/game'
import Lang from './lib/lang'
import Words from './lib/wodrs'
import { IGamePlayState } from './components/game-play'

import './main.scss'

let start = false, name: string = 'Player', loaded = false, starts = false
async function main() {
  if (!loaded) {
    let stopDelay = await Game.showtext('load', 'load')
    await Words.load()
    await Lang.load()
    await Game.delay(800)
    stopDelay()

    loaded = true
  }

  if (!start) {
    await Game.showtext('Привет', 'Привет. Писать только на английской раскладке!', 3000)
    await Game.showtext('hi', 'Hi. Write only on the English keyboard!', 3000)
    Lang.lang = await Game.quest('lang', 'select_lang', 'r', 'e')
    await Lang.load()
    name = await Game.input('name', 'enter_name', 10)

    if (await Game.quest('ready', Lang.get('ready', name), 'y', 'n') === 'n')
      return main()

    start = true
  }

  let steps = ['3', '2', '1', 'go']

  let game: IGamePlayState = {
    score: 0,
    level: 1,
    attempts: 3,
    name: name
  }

  while (game.attempts > 0) {
    if (!starts) {
      for (let step of steps) {
        await Game.showtext(step, step, 1000)
      }

      starts = true
    }

    game = await Game.play(`plaing${game.level}${game.time}${game.score}${game.attempts}`, game)

    if (game.fail)
      game.attempts--
  }

  if (await Game.quest(`s${game.level}`, Lang.get('play_again', `${game.score}`), 'y', 'n') === 'y')
    return main()
  else
    await Game.showtext('goodbuy', 'goodbuy')
}

window.addEventListener('load', () => main().catch(console.error))
