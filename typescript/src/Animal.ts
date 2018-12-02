import './Bird'

class Animal {
  public roar() {
    const what: string = 'I am an Animal.'
    console.log(what)
  }
}

new Animal().roar()

export {
  Animal,
}
