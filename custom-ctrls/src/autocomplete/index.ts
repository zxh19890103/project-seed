import { getElementViewPosition } from './position'
import './style.scss'

const button = document.querySelector('.button')

button.addEventListener('click', (e: MouseEvent) => {
  const pos = getElementViewPosition(e.target as HTMLButtonElement)
  console.log(pos)
})
