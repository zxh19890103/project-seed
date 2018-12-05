import { AbstractFactory } from './AbstractFactory.class'

class FactoryProducer {
  public getFactory(): AbstractFactory {
    return null
  }
}

export {
  FactoryProducer,
}
