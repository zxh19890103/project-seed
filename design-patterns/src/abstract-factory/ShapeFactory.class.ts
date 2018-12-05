import { AbstractFactory } from './AbstractFactory.class'
import { IShape } from './Shape.interface'
import { IColor } from './Color.interface'
import { Rectangle } from './Rectangle.class'
import { Circle } from './Circle.class'
import { Square } from './Square.class'

class ShapeFactory extends AbstractFactory {
  public getShape(type: string): IShape {
    switch (type) {
      case 'r':
        return new Rectangle()
      case 'c':
        return new Circle()
      case 's':
        return new Square()
      default:
        return null
    }
  }
  public getColor(): IColor {
    return null
  }
}

export {
  ShapeFactory,
}
