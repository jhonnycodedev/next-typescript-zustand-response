// Na pasta pages/api/upload.js

import nextConnect from 'next-connect';
import multer from 'multer';

// Configuração do multer para salvar arquivos na pasta 'public/images'
const upload = multer({ dest: 'public/images/' });

const handler = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

handler.use(upload.single('file')); // 'file' é o nome do campo no formulário

handler.post((req, res) => {
  if (req.file) {
    console.log('Upload de arquivo realizado com sucesso:', req.file);
    res.json({ status: 'success', filePath: `/images/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
  }
});

export default handler;
