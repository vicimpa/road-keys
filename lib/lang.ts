import { Ajax } from './ajax'
import utils from './utils'

export default class Lang {
  public static lang: string = 'e'

  public static r: string[] = [
    'good=Хорошо;Прекрасно;Замечательно;Превосходно;Восхитительно',
    'load=Загрузка;Подождите;Думаю;Что то делаю'
  ]
  public static e: string[] = [
    'select_lang=Русский [R] | English [E]',
    'good=Good;Nice;Perfect;Very good',
    'load=Loading;Please wait'
  ]

  public static get(code: string, ...args: Array<string | number>): string {
    let { lang } = this

    if (code.indexOf(' ') === -1) {
      let re = new RegExp(`${code}=`, '')

      for (let ph of this[lang]) {
        if (re.test(ph)) {
          ph = ph.replace(re, '')
          code = utils.randArray(ph.split(';'))
        }
      }
    }

    for (let arg of args)
      code = code.replace('&', `${arg}`)

    return code

  }

  public static async load() {
    let { lang } = this
    let ajax = new Ajax(`assets/${lang === 'r' ? 'ru_RU' : 'en_US'}`)

    for (let ph of (await ajax.get()).split('\n'))
      this[lang].push(ph)
  }
} 