import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';

type Data =
| { message: string }
| IEntry[]
| IEntry

export default function (req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getEntries( res );

        case 'POST':
            return postEntries(req, res)

        default:
            return res.status(400).json({ message: 'El endpoint no existe' });
    }
}

const getEntries = async( res: NextApiResponse<Data> ) => {
    await db.connect();
    const entries = await Entry.find().sort({  createdAt: 'ascending' });
    await db.disconnect();

    res.status(200).json( entries );
}

const postEntries = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { description = '' } = req.body;

    const newEnty = new Entry({
        description,
        createdAt: Date.now(),
    });

    try {
        await db.connect();
        await newEnty.save();
        await db.disconnect();

        return res.status(201).json( newEnty );
    } catch (e) {
        await db.disconnect();
        console.log({e});
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
    }

}