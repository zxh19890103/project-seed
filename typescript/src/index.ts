const appDiv = document.querySelector('#app')

import TAGS from './tags'

class E {
    Q: any
    current: Element
    constructor(private root: Element) {
        this.current = root
        const that = new Proxy({}, {
            get: (target, prop: string) => {
                if (prop === 'value') {
                    const cur = this.current
                    this.current = root
                    return cur
                }
                if (TAGS.indexOf(prop) > -1) {
                    this.current = this.firstChild(prop)
                    return this.Q
                } else if (/^i\d$/.test(prop)) {
                    this.current = this.nSibling(Number(prop[1]))
                    return this.Q
                }
                return prop
            }
        })
        this.Q = that
    }

    private nSibling(n: number): Element {
        if (n === 0) return this.current
        let sibling = null, i = 0, MAX = 10
        while (sibling = this.current.nextElementSibling) {
            if (!sibling) break
            if (sibling.nodeName === this.current.nodeName) {
                i ++
            }
            if (i === n || i === MAX) break
        }
        return sibling
    }

    private firstChild(tag: string) : Element {
        const entry = this.current.childNodes.entries()
        let res
        while((res = entry.next())) {
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
console.log(q.h3.span.i.value)
console.log(q.div.i2.value)