import * as Mongoose from 'mongoose'
class Connection {
    static connect() {
        Mongoose.connect('mongodb://localhost/warriors')
        const connection = Mongoose.connection
        connection.once('open', () => {
            console.log('mongodb active!!')
        })
        connection.once('error', () => {
            console.log('error on connection')
        })

    }
}
export default Connection