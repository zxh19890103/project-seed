import { IShape } from './Shape.interface'

class Rectange implements IShape {
  public draw() {
    console.log('Draw Rectange')
  }
}

export {
  Rectange,
}
