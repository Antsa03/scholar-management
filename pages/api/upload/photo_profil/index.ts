import { IncomingForm } from 'formidable';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import mv from 'mv';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.parse(req, (err, fields, files: any) => {
        if (err) return reject(err);
        const oldPath = files.file[0].filepath; // Changed this line
        const newPath = path.join(process.cwd(), '/public/img/photo_profil', files.file[0].originalFilename);

        mv(oldPath, newPath, function (err: any) {
            if (err) return reject(err);
            resolve({ fields, files });
        });
    });
});

  res.status(200).json(data);
};
