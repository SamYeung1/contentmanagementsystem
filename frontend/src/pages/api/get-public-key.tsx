import type { NextApiRequest, NextApiResponse } from 'next'
import * as fs from "fs";
export default function GET(req: NextApiRequest, res: NextApiResponse) {
    res.status(200).send(fs.readFileSync(process.env.PUBLIC_KEY_PATH!!, 'utf8'));
}