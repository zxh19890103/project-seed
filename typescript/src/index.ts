const appDiv = document.querySelector('#app')

import './body.less'
import './style.scss'

import TAGS from './tags'
import { PropType } from './PropType.enum'
import './Bird'

import './farmer.jpg'

const ioAsync = import(/* webpackChunkName: "sock" */'socket.io-client')

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

if (module.hot) {
  module.hot.accept(['./Bird', './Animal'], () => {
    console.log('Accepting Good!')
   })
}
