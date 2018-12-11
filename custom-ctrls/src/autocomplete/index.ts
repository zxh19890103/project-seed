import './style.scss'
import { getElementViewPosition } from './position'
import spinnerHtml from './spinner'
import data from './mock.json'

class AutoComplete {

  private el: HTMLInputElement
  private results: Array<{ value: string, text: string }> = []
  private dropdownElement: HTMLDivElement = null
  private selectedIndex: number = 0
  private selection: { value: string, text: string } = null
  private shown: boolean = false
  private queryString: string = ''

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

  constructor(input: string, options: any) {
    this.el = document.querySelector(input)
    const lisener = (e: KeyboardEvent) => {
      const keyCode = e.keyCode || e.which
      if (keyCode === 13) {
        // todo: focus on dropdown.
        if (this.el.value === this.queryString) return
        this.queryString = this.el.value
        this.search()
        return
      } else if (keyCode === 38 || keyCode === 40) {
        if (this.dropdownElement && this.shown) {
          this.dropdownElement.focus()
        }
      } else if (keyCode === 8) {
        if (this.dropdownElement && this.shown) {
          this.hideDropdown()
        }
      }
    }
    this.el.addEventListener('keyup', lisener)
    this.el.addEventListener('focus', this.showDropdown.bind(this))
    document.addEventListener('click', (ev) => {
      if (ev.target === this.el || ev.target === this.dropdownElement) {
        return
      }
      this.hideDropdown()
    })
    this.el.addEventListener('click', (ev) => {
      ev.stopPropagation()
    })
  }

  search() {
    this.loadDropdown()
    this.showLoading()
    setTimeout(() => {
      this.results = data
        .filter((i: any) => i.title.indexOf(this.queryString) > -1)
        .map((i: any) => {
          return { value: i.id, text: i.title }
        })
      this.fillOptions()
    }, 3 * 1000)
  }

  loadDropdown() {
    if (this.dropdownElement) {
      document.body.removeChild(this.dropdownElement)
      this.dropdownElement = null
      this.shown = false
    }
    const wrap = document.createElement('div')
    wrap.className = 'singhi-autocomplete__dropdown'
    wrap.tabIndex = 5
    const pos = getElementViewPosition(this.el)
    const w = this.el.clientWidth
    const h = this.el.clientHeight
    wrap.style.top = `${pos.top + h + 5}px`
    wrap.style.left = `${pos.left}px`
    wrap.style.width = `${w}px`
    wrap.addEventListener('keyup', (e: KeyboardEvent) => {
      e.stopPropagation()
      const keyCode = e.keyCode || e.which
      this.doSelect(keyCode)
    })
    wrap.addEventListener('click', (e: MouseEvent) => {
      e.stopPropagation()
      const target = e.target as HTMLElement
      this.doOptionClick(target)
    })
    document.body.appendChild(wrap)
    this.dropdownElement = wrap
    // this.dropdownElement.focus()
    this.showDropdown()
  }

  fillOptions() {
    if (!this.dropdownElement) return
    if (this.results.length === 0) {
      this.dropdownElement.innerHTML = '<div class="singhi-autocomplete__empty">没有数据</div>'
      return
    }
    this.dropdownElement.innerHTML = ''
    const ul = document.createElement('ul')
    ul.className = 'singhi-autocomplete__dropdown-list'
    this.dropdownElement.appendChild(ul)
    this.results.forEach((item, index) => {
      const li = document.createElement('li')
      li.innerText = item.text
      li.className = 'singhi-autocomplete__dropdown-item'
      li.setAttribute('data-value', item.value)
      li.setAttribute('data-index', '' + index)
      ul.appendChild(li)
    })
    this.setCurrent(0)
  }

  showLoading() {
    if (!this.dropdownElement) return
    this.dropdownElement.innerHTML = spinnerHtml
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

  doOptionClick(target: HTMLElement) {
    if (target.nodeName !== 'LI') {
      let safe = 0
      while (target = target.parentElement) {
        if (target.nodeName === 'LI') break
        safe ++
        if (safe > 3) break
      }
    }
    if (target && target.nodeName === 'LI') {
      const index = Number(target.getAttribute('data-index'))
      this.setCurrent(index)
      this.doSelect(13)
    }
  }

  setCurrent(index: number) {
    if (index < 0 || index >= this.results.length) return
    const ul = this.dropdownElement.querySelector('ul')
    if (!ul) return
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
    this.queryString = this.text
  }
}

export {
  AutoComplete,
}
