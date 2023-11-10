import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())
aoo.use(cookieParser())

app.get('/', async (req, res) => {
    res.status(200).json({
        'message': 'Hello world'
    });
})

app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port ' + process.env.PORT)
})
