const appDiv = document.querySelector('#app')

import TAGS from './tags'
import { PropType } from './PropType.enum'
import './rtc'

interface IQuery {
    div: IQuery,
    n: (idx: number) => IQuery,
    id: (value: string) => IQuery
}

/**
 * E
 */
class E {
    public Q: IQuery
    private current: Element
    constructor(private root: Element) {
        this.current = root
        const that = new Proxy({}, {
            get: (target, prop: string) => {
                const propType = this.getPropType(prop)
                switch (propType) {
                    case PropType.Tag: {
                        this.current = this.firstChild(prop)
                        return this.Q
                    }
                    case PropType.Query: {
                        switch (prop) {
                            case 'n': {
                                return (n: number) => {
                                    const sibling = this.nSibling(n)
                                    this.current = sibling
                                    return this.Q
                                }
                            }
                            default: {
                                return (val: string | number) => {
                                    return this.Q
                                }
                            }
                        }
                    }
                    case PropType.Value: {
                        const cur = this.current
                        this.current = root
                        return cur
                    }
                    default: {
                        return this.Q
                    }
                }
            },
        })
        this.Q = that as IQuery
    }

    private getPropType(prop: string): PropType {
        if (TAGS.indexOf(prop) > -1) {
            return PropType.Tag
        } else if (prop === 'n' || prop === 'id') {
            return PropType.Query
        } else {
            return PropType.Value
        }
    }

    private nSibling(n: number): Element {
        let sibling = this.current, i = 0, safe = 0
        while (sibling = sibling.nextElementSibling) {
            if (sibling.nodeName === this.current.nodeName) {
                i ++
                if (i === n)
                    return sibling
            }
            safe ++
            if (safe === 68) break
        }
        return null
    }

    private firstChild(tag: string): Element {
        const entry = this.current.childNodes.entries()
        let res
        while ((res = entry.next())) {
            if (res.done) break
            const [i, n] = res.value
            if (n.nodeType === 1 && n.nodeName === tag.toUpperCase()) {
                return n as Element
            }
        }
        return null
    }
}

const q = new E(appDiv).Q

const ws = new WebSocket('ws://121.40.165.18:8800')

ws.onopen = (ev) => {
    console.info('open')
    ws.send('Hello')
}

ws.onerror = (ev) => {
    console.info('error')
}

ws.onclose = (ev) => {
    console.info('close')
}

ws.onmessage = (msg) => {
    console.info('message')
    const div = document.createElement('div')
    div.innerHTML = msg.data
    div.style.border = '1px solid #ddd'
    div.style.margin = '6px 8px'
    div.style.padding = '8px'
    document.body.appendChild(div)
    // console.info(msg.data)
}
// ws.send()

ws.close()
