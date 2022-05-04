import { NextApiRequest, NextApiResponse } from 'next'

type Response = {
    error?: string
    borrowing?: number
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    try {
        if (req.method === 'POST') {
            if (!req.body) res.status(400).json({ error: 'missing request body' })
            const body = JSON.parse(req.body)
            if (!body.total_income) res.status(400).json({ error: 'missing property total_income' })
            if (!body.total_liabilities) res.status(400).json({ error: 'missing property total_liabilities' })
            if (typeof(body.total_income) !== "number") res.status(400).json({ error: 'property total_income is not a number' })
            if (typeof(body.total_liabilities) !== "number") res.status(400).json({ error: 'property total_liabilities is not a number' })
            res.status(200).json({ borrowing: body.total_income * 5 - body.total_liabilities })
        }
        else res.status(405).json({ error: 'method not allowed' })
    } catch (err) {
        res.status(500).json({ error: 'server error' })
    }
}