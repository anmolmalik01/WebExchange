// ============================= post request to save data =============================

import { getSession } from 'next-auth/react';
import UserDetails from '../../models/UserDetails';
import db from '../../util/db';

const handler = async (req, res) => {

  console.log(req.body)

  const session = await getSession({ req });
  const { user } = session;

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }


  try {

    await db.connect();

    const newUserDetails = new UserDetails({
      ...req.body.data,
      userId: user._id,
    });

    await newUserDetails.save()
    res.status(201).json({ success: true, data: newUserDetails })
  }
  catch (error) {
    res.status(400).json({ success: false })
  }

}

export default handler;