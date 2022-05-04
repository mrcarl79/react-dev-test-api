import { NextApiRequest, NextApiResponse } from 'next'
import { json } from 'stream/consumers'

type Response = {
    error?: string
    borrowing?: number
    property_price?: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    try {
        if (req.method === 'POST') {
            if (!req.body) res.status(400).json({ error: 'missing request body' })

            let body;
            if (req.headers['content-type'] === "text/plain")
                body = JSON.parse(req.body)
            else if (req.headers['content-type'] === "application/json")
                body = req.body
            else
                res.status(400).json({ error: 'wrong content type' })

            if (!body.total_income) res.status(400).json({ error: 'missing property total_income' })
            if (!body.total_liabilities) res.status(400).json({ error: 'missing property total_liabilities' })
            if (!body.deposit) res.status(400).json({ error: 'missing property deposit' })
            if (typeof(body.total_income) !== "number") res.status(400).json({ error: 'property total_income is not a number' })
            if (typeof(body.total_liabilities) !== "number") res.status(400).json({ error: 'property total_liabilities is not a number' })
            if (typeof(body.deposit) !== "number") res.status(400).json({ error: 'property deposit is not a number' })
            
            const borrowing = body.total_income * 5 - body.total_liabilities
            res.status(200).json({ borrowing: borrowing, property_price: borrowing + body.deposit })
        }
        else res.status(405).json({ error: 'method not allowed' })
    } catch (err) {
        res.status(500).json({ error: 'server error' })
    }
}