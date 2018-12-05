import { IColor } from './Color.interface'
import { IShape } from './Shape.interface'

abstract class AbstractFactory {
  public abstract getShape(type: string): IShape
  public abstract getColor(color: string): IColor
}

export {
  AbstractFactory,
}
