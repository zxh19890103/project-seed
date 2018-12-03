import { Circle } from './Circle.class'
import { Rectange } from './Rectangle.class'
import { Square } from './Square.class'
import { IShape } from './Shape.interface'

class ShapeFactory {
  public getShape(shape: string): IShape {
    switch (shape) {
      case 'c':
        return new Circle()
      case 's':
        return new Square()
      case 'r':
        return new Rectange()
      default:
        return new Circle()
    }
  }
}

export {
  ShapeFactory,
}
