
const cloudinary = require('cloudinary').v2;


cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_SECRET,
});

module.exports = async (req, res) => {
  if (req.method === 'DELETE') {
    const { public_id } = req.body;

    if (!public_id) {
      return res.status(400).json({ error: 'No public_id provided' });
    }

    try {
      const result = await cloudinary.uploader.destroy(public_id);
      return res.status(200).json({ result });
    } catch (error) {
      return res.status(500).json({ error: 'Failed to delete image', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} not allowed`);
  }
};
