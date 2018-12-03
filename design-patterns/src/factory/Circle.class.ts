import { IShape } from './Shape.interface'

class Circle implements IShape {
  public draw() {
    console.log('Draw Circle')
  }
}

export {
  Circle,
}
