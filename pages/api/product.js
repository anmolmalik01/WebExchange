// ============================= post request to save data =============================

import { getSession } from 'next-auth/react';
import Product from '../../models/Product';
import db from '../../util/db';

const handler = async (req, res) => {
    
    const session = await getSession({ req });
    const { user } = session;
    
    if (!session) {
        return res.status(401).send('signin required');
    }

    await db.connect();
    const newProduct = new Product({
        ...req.body,
        user: user._id,
    });

    const product = await newProduct.save();
    res.status(201).send(product);
};
export default handler;