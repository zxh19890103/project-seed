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
                } else if (/^i[1-9]$/.test(prop)) {
                    this.current = this.nSibling(Number(prop[1]))
                    return this.Q
                }
                return prop
            }
        })
        this.Q = that
    }

    private nSibling(n: number): Element {
        let sibling = this.current, i = 0, safe = 0
        while (sibling = sibling.nextElementSibling) {
            if (sibling.nodeName === this.current.nodeName) {
                i ++
                if (i === n) return sibling
            }
            safe ++
            if (safe === 68) break
        }
        return null
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
console.log(q.div.n(2).value) // index like div:eq(N)
console.log(q.div.class('.i').value)
console.log(q.div.value)