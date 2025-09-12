import crypto from 'crypto'
import multer from 'multer'
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
    upload(folder: string) {
        return{
            storage: multer.diskStorage({
                destination: resolve(__dirname, '..', '..', folder),
                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString('hex');
                    const fileName = `${fileHash}-${extname(file.originalname)}`;

                    return callback(null, fileName);
                }
            }),
            limits: {
                fileSize: 10 * 1024 * 1024, // 10MB máximo por arquivo
                files: 1
            },
            fileFilter: (request: any, file: any, callback: any) => {
                const allowedMimeTypes = [
                    'image/jpeg',
                    'image/jpg', 
                    'image/png',
                    'image/gif',
                    'image/webp'
                ];

                const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
                const fileExtension = extname(file.originalname).toLowerCase();

                // Verificar nome do arquivo para evitar path traversal
                if (file.originalname.includes('..') || file.originalname.includes('/') || file.originalname.includes('\\')) {
                    return callback(new Error('Nome de arquivo inválido'), false);
                }

                // Verificar tamanho do nome do arquivo
                if (file.originalname.length > 255) {
                    return callback(new Error('Nome de arquivo muito longo'), false);
                }

                if (allowedMimeTypes.includes(file.mimetype) && allowedExtensions.includes(fileExtension)) {
                    return callback(null, true);
                } else {
                    return callback(new Error('Tipo de arquivo não permitido. Use apenas: JPG, JPEG, PNG, GIF, WEBP'), false);
                }
            }
        }
    }
}