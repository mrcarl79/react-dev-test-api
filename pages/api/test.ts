import { NextApiRequest, NextApiResponse } from 'next'

type Response = {
    borrowing: number
}

type NextApiRequestWithExtras = NextApiRequest & {
    total_income: number
    total_liabilities: number
}

export default function handler(req: NextApiRequestWithExtras, res: NextApiResponse<Response>) {
    if (req.method === 'POST') res.status(200).json({ borrowing: req.total_income * 5 - req.total_liabilities })
    else res.status(400).end(`Invalid Data`)
}