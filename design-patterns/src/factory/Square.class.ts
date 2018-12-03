import { IShape } from './Shape.interface'

class Square implements IShape {
  public draw() {
    console.log('Draw Square')
  }
}

export {
  Square,
}
