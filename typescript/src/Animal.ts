import * as io from 'socket.io-client'

class Animal {
    public roar() {
        const what: string = 'I am an Animal.'
        console.log(what)
    }
}

const socket = io('ws://localhost:443')

socket.open()

export {
    Animal,
}
