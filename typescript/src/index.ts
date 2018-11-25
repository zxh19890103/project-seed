import { Animal } from './Animal'

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('Hello, World')
    }, 2 * 1000)
})

promise.then(word => {
    console.log(word)
})

promise.catch(word => {
    console.log(word)
})

const animal = new Animal()
animal.roar()