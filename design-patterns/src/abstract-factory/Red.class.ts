import { IColor } from './Color.interface'

export class Red implements IColor {
  public fill(): void {
    console.log(`Color Red`)
  }
}
