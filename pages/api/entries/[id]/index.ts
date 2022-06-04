import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, IEntry } from '../../../../models';

type Data =
| { message: string }
| IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    // const { id } = req.query;

    // if(!mongoose.isValidObjectId(id)) {
    //     return res.status(400).json({ message: 'El id no es valido' + id });
    // }

    switch (req.method) {
        case 'GET':
            return getEntry(req, res);

        case 'PUT':
            return updateEntry(req, res);

        case 'DELETE':
            return deleteEntry(req, res);

        default:
            return res.status(400).json({ message: 'EL metodo no existe' });
    }

}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryInDB =  await Entry.findById(id);

    await db.disconnect();

    if( !entryInDB ) {
        return res.status(404).json({ message: 'No  hay entrada con ese ID:' + id });
    }

    res.status(200).json( entryInDB );
}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToUpdate =  await Entry.findById(id);

    if( !entryToUpdate ) {
        return res.status(404).json({ message: 'No  hay entrada con ese ID:' + id });
    }

    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status,
    } = req.body;

    try {
        const updateEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new: true});
        // entryToUpdate.description = description;
        // entryToUpdate.status = status;
        // entryToUpdate.save();
        res.status(200).json( updateEntry! );
    } catch (e) {
        await db.disconnect();
        res.status(400).json({ message: 'Bad request' });
    }

}

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    await db.connect();

    const entryToDelete =  await Entry.findById(id);

    if( !entryToDelete ) {
        return res.status(404).json({ message: 'No  hay entrada para borrar con ese ID:' + id });
    }

    try {
        const deleteEntry = await Entry.findByIdAndRemove(id);

        res.status(200).json( deleteEntry! );
    } catch (e) {
        await db.disconnect();
        res.status(400).json({ message: 'Bad request' });
    }

}