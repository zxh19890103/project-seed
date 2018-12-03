import { ShapeFactory } from './ShapeFactory.class'

const sf = new ShapeFactory()

const retangle = sf.getShape('r')
retangle.draw()

const cirlcle = sf.getShape('c')
cirlcle.draw()

const square = sf.getShape('s')
square.draw()
