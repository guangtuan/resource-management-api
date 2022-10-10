import * as bodyParser from "body-parser"
import * as express from 'express'
import env from '../src/framework/env'
import db from '../src/framework/db'
import urlJoin from './url'

import spaceApi from './space/api'

const createApp = () => {
    const app = express()
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(cors())
    return app
}

const appInit = async () => {
    const app = createApp()

    ;[spaceApi].forEach(async ({ base, apis }) => {
        apis.forEach(async (api) => {
            const actualUrl = urlJoin(['api', base, api.url])
            console.log(`actual url is ${actualUrl}, method is ${api.method}`)
            app[api.method]('/' + actualUrl, async (req: express.Request, res: express.Response) => {
                const result = await api.handler(req, res)
                res.status(200)
                res.json(result)
                res.end()
            })
        })
    })

    app.listen(env.webPort, () => {
        console.log('app listen on', env.webPort)
        // console.log(
        //     app._router.stack
        //         .map(({ route }) => route)
        //         .filter((_) => !!_)
        //         .map(({ path }) => path),
        // )
    })
}

;(async () => {
    try {
        await db.init()
        await appInit()
    } catch (e) {
        console.error(e)
        await db.close()
    }
})()
function cors(): any {
    throw new Error("Function not implemented.")
}

