import { IShape } from './Shape.interface'

class Circle implements IShape {
  public draw() {
    console.log(`Shape Circle`)
  }
}

export {
  Circle,
}
