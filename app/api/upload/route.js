import multer from 'multer';
import ExcelJS from 'exceljs';
import { db } from '../../../firebaseConfig';

const upload = multer({ dest: 'uploads/' });
const uploadMiddleware = upload.single('file');

const handler = async (req, res) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const sheet = workbook.worksheets[0]; // Get the first worksheet
    const numbers = sheet.getSheetValues();

    // Assuming the first row contains headers
    const headerRow = numbers[1];
    const dataRows = numbers.slice(2);

    // Convert data to objects with headers as keys
    const dataObjects = dataRows.map(row => {
        const obj = {};
        headerRow.forEach((header, index) => {
            if (header) {
                obj[header] = row[index] || '';
            }
        });
        return obj;
    });

    // Save numbers to the database
    await Promise.all(dataObjects.map(async (number) => {
        await db.collection('numbers').add(number);
    }));

    res.status(200).json({ success: true });
};

export const runtime = 'edge';

export default async (req, res) => {
    if (req.method === 'POST') {
        return new Promise((resolve, reject) => {
            uploadMiddleware(req, res, (err) => {
                if (err) {
                    res.status(500).json({ success: false, error: 'Error uploading file' });
                    return reject();
                }
                handler(req, res).then(resolve).catch(reject);
            });
        });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
