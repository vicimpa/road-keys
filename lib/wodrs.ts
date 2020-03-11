import { Ajax } from './ajax'
import utils from './utils'

export default class Words {
  public static words: string[] = []

  public static get(min: number = 0, max: number = null): string {
    let selects: string[] = []

    for (let word of this.words)
      if (word.length > min && (word.length < max || !max))
        selects.push(word)

    return utils.randArray(selects)
  }

  public static async load(): Promise<void> {
    let ajax = new Ajax('assets/base')

    let words = await ajax.get()

    for (let word of words.split('\n'))
      this.words.push(word)

    return
  }
}