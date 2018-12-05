import { IColor } from './Color.interface'

export class Blue implements IColor {
  public fill(): void {
    console.log(`Color Blue`)
  }
}
