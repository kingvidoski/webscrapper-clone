// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { adminDb } from "../../firebaseAdmin";
import * as admin from "firebase-admin";

type Data = {
    collection_id: string
    start_eta: number,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {

    try {
        const { search } = req.body;

        console.log("SEARCH IS >>>", search);

        const response = await fetch(`https://api.brightdata.com/dca/trigger?collector=c_lfn92l0g2ibs1tq7t&queue_next=1`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.BRIGHT_DATA_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                search,
            }),
        });

        const data = await response.json();
        console.log("DATA IS >>>", data);

        const { collection_id, start_eta } = data;

        await adminDb.collection('searches').doc(collection_id).set({
            search,
            start_eta,
            status: "pending",
            updatedAt: start_eta,
        })


        res.status(200).json({collection_id, start_eta})
        
    } catch (err: any) {
        console.log("ERROR IS >>>", err);

        // return res.status(500).json({error: err.message})
    }
}
