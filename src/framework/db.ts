import { MongoClient, Collection } from 'mongodb'

const { dbUri } = require('./env')

const client = new MongoClient(dbUri)

const init = async (): Promise<MongoClient> => {
    return client.connect()
}

const close = async (): Promise<void> => {
    await client.close()
}

export default {
    init,
    close,
    collection: (name: string): Collection =>
        client.db('resourceManagement').collection(name),
}
