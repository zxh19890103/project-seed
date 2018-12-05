import { IColor } from './Color.interface'

export class Green implements IColor {
  public fill(): void {
    console.log(`Color Green`)
  }
}
