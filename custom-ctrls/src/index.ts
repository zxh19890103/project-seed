import { AutoComplete } from './autocomplete'

new AutoComplete('input[name=abc]', {})

const dot = document.getElementsByClassName('dot')[0] as HTMLDivElement

const button = document.getElementsByClassName('button')[0]
button.addEventListener('mouseenter', (e: MouseEvent) => {
  const x = e.clientX - e.offsetX
  const y = e.clientY - e.offsetY
  console.log(x, y)
  dot.style.top = y + 'px'
  dot.style.left = x + 'px'
})
