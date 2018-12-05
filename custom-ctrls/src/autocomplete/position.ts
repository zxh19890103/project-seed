const getElementViewLeft = (element: HTMLElement) => {
  let actualLeft = element.offsetLeft
  let current = element.offsetParent as HTMLElement
  while (current !== null) {
    actualLeft += current.offsetLeft
    current = current.offsetParent as HTMLElement
  }
  let elementScrollLeft
  if (document.compatMode === 'BackCompat') {
    elementScrollLeft = document.body.scrollLeft
  } else {
    elementScrollLeft = document.documentElement.scrollLeft
  }
  return actualLeft - elementScrollLeft
}

const getElementViewTop = (element: HTMLElement) => {
  let actualTop = element.offsetTop
  let current = element.offsetParent as HTMLElement
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent as HTMLElement
  }
  let elementScrollTop
  if (document.compatMode === 'BackCompat') {
    elementScrollTop = document.body.scrollTop
  } else {
    elementScrollTop = document.documentElement.scrollTop
  }
  return actualTop - elementScrollTop
}

const getElementViewPosition = (element: HTMLElement) => {
  const top = getElementViewTop(element)
  const left = getElementViewLeft(element)
  return {
    left,
    top,
  }
}

export {
  getElementViewLeft,
  getElementViewTop,
  getElementViewPosition,
}
