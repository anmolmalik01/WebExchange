import User from '../../../models/User';
import db from '../../../utils/db';

const handler = async (req, res) => {
  await db.connect();
  const user = await User.findOne(req.query.name);
  await db.disconnect();
  res.send(user);
};

export default handler;