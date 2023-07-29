import express from 'express';
import eventSchemaRouter from './routes/eventSchemaRouter';
import config from 'config';
import eventRouter from './routes/eventRouter';
import chartRouter from './routes/chartRouter'


const port = config.get('server.port');
const clientHost = config.get('client.host');
const app = express()

app.use(express.json())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", clientHost); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})
app.use(eventSchemaRouter)
app.use(eventRouter)
app.use(chartRouter)

app.listen(port, () => {
    console.log("app is up");
})