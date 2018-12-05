import { AbstractFactory } from './AbstractFactory.class'
import { IShape } from './Shape.interface'
import { IColor } from './Color.interface'

class ColorFactory extends AbstractFactory {
  public getShape(): IShape {
    return null
  }
  public getColor(): IColor {
    return null
  }
}

export {
  ColorFactory,
}
