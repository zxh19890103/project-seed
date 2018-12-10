import './style.scss'
import { getElementViewPosition } from './position'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'

class AutoComplete {
  private el: HTMLInputElement
  private results: Array<{ value: string, text: string }> = []
  private dropdownElement: HTMLDivElement = null
  private selectedIndex: number = 0
  private selection: { value: string, text: string } = null
  private shown: boolean = false

  constructor(input: string, options: any) {
    this.el = document.querySelector(input)
    const lisener = (e: KeyboardEvent) => {
      const keyCode = e.keyCode || e.which
      if (keyCode === 13) {
        // todo: focus on dropdown.
        const queryString = this.el.value
        this.search(queryString)
        return
      } else if (keyCode === 38 || keyCode === 40) {
        if (this.dropdownElement && this.shown) {
          this.dropdownElement.focus()
        }
      }
    }
    this.el.addEventListener('keyup', lisener)
    this.el.addEventListener('focus', this.showDropdown.bind(this))
    // this.el.addEventListener('blur', this.hideDropdown.bind(this))
  }

  search(queryString: string) {
    console.log(queryString)
    setTimeout(() => {
      this.results = [
        { text: 'Ronnie', value: '001' },
        { text: 'Selby', value: '002' },
        { text: 'Mark', value: '003' },
        { text: 'John', value: '004' },
      ]
      this.loadDropdown()
    }, 400)
  }

  loadDropdown() {
    if (this.dropdownElement) {
      document.body.removeChild(this.dropdownElement)
      this.dropdownElement = null
    }
    const wrap = document.createElement('div')
    wrap.style.display = 'none'
    wrap.className = 'kye-autocomplete__dropdown'
    wrap.tabIndex = 5
    const ul = document.createElement('ul')
    ul.className = 'kye-autocomplete__dropdown-list'
    this.results.forEach((item, index) => {
      const li = document.createElement('li')
      li.innerText = item.text
      li.setAttribute('data-value', item.value)
      li.setAttribute('data-index', '' + index)
      ul.appendChild(li)
    })
    wrap.appendChild(ul)
    wrap.addEventListener('keyup', (e: KeyboardEvent) => {
      e.stopPropagation()
      const keyCode = e.keyCode || e.which
      this.doSelect(keyCode)
    })
    wrap.addEventListener('click', (e: MouseEvent) => {
      let target = e.target as HTMLElement
      if (target.nodeName !== 'LI') {
        let safe = 0
        while (target = target.parentElement) {
          if (target.nodeName === 'LI') break
          safe ++
          if (safe > 3) break
        }
      }
      if (target.nodeName === 'LI') {
        const index = Number(target.getAttribute('data-index'))
        this.setCurrent(index)
      }
    })
    document.body.appendChild(wrap)
    this.dropdownElement = wrap
    this.dropdownElement.focus()
    this.showDropdown()
    this.setCurrent(0)
  }

  hideDropdown() {
    if (!this.dropdownElement || !this.shown) return
    this.dropdownElement.style.display = 'none'
    this.shown = false
  }

  showDropdown() {
    if (!this.dropdownElement || this.shown) return
    this.dropdownElement.style.display = 'block'
    this.shown = true
  }

  doSelect(keyCode: number) {
    if (keyCode === 38) {
      // up
      this.setCurrent(this.selectedIndex - 1)
    } else if (keyCode === 40) {
      // down
      this.setCurrent(this.selectedIndex + 1)
    } else if (keyCode === 13) {
      // select
      this.selection = this.results[this.selectedIndex]
      this.setInput()
      this.hideDropdown()
    }
  }

  setCurrent(index: number) {
    if (index < 0 || index >= this.results.length) return
    const ul = this.dropdownElement.querySelector('ul')
    const len = ul.children.length
    let current = null
    for (let i = 0; i < len; i ++) {
      current = ul.children.item(i)
      if (current.hasAttribute('data-active')) {
        if (index === i) break
        else current.removeAttribute('data-active')
      } else {
        if (index === i) {
          current.setAttribute('data-active', 'on')
        }
      }
    }
    this.selectedIndex = index
  }

  setInput() {
    this.el.setAttribute('data-value', this.value)
    this.el.value = this.text
  }

  get value() {
    if (this.selection) {
      return this.selection.value
    }
    return null
  }

  get text() {
    if (this.selection) {
      return this.selection.text
    }
    return ''
  }
}

export {
  AutoComplete,
}
