export interface AjaxOptions {
  headers?: string[]
}

export class Data {
  public static toJson(data: any = {}): string {
    return JSON.stringify(data)
  }

  public static toQuery(data: any = {}): string {
    let segments: string[] = []

    for (let key in data)
      segments.push(`${key}=${data[key]}`)

    return segments.join('&')
  }
}

export class Ajax {
  private xhr: XMLHttpRequest = null

  constructor(public url: string, public options: AjaxOptions = {}) {
    this.xhr = new XMLHttpRequest()
  }

  public send(data: string = ''): Promise<string> {
    let { xhr, options } = this

    return new Promise((resolve, reject) => {
      for (let header of options.headers || []) {
        if (typeof header === 'string') {
          let [name, value] = header.split('=')

          if (name && value)
            xhr.setRequestHeader(name, value)
        }
      }

      xhr.onreadystatechange = () => {
        if (xhr.readyState !== 4)
          return

        xhr.onerror = reject

        resolve(xhr.response)
      }

      xhr.send(data)
    })
  }

  public async get(data: object = {}): Promise<string> {
    let { url, xhr, send } = this
    let datas = Data.toQuery(data)

    xhr.open('GET', datas ? [url, datas].join('?') : url, true)

    return await send.apply(this, [null])
  }

  public async post(data: object = {}, urlen: boolean = false): Promise<string> {
    let { url, xhr, options, send } = this
    let datas: string = ''

    xhr.open('POST', url, true)

    if (urlen) {
      datas = Data.toQuery(data)
      options.headers.push('Content-Type=application/x-www-form-urlencoded')
    }
    else {
      datas = Data.toJson(data)
      options.headers.push('Content-Type=application/json')
    }

    return await send.apply(this, [datas || null])
  }
} 