import { IShape } from './Shape.interface'

export class Rectangle implements IShape {
  public draw() {
    console.log(`Shape Rectangle`)
  }
}
