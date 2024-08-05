import { NextResponse } from 'next/server';
import ExcelJS from 'exceljs';
import { db } from '../../../firebaseConfig';

export const runtime = 'edge';

const parseExcelFile = async (fileBuffer) => {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(fileBuffer);
    const sheet = workbook.worksheets[0];
    const numbers = sheet.getSheetValues();

    // Assuming the first row contains headers
    const headerRow = numbers[1];
    const dataRows = numbers.slice(2);

    // Convert data to objects with headers as keys
    return dataRows.map(row => {
        const obj = {};
        headerRow.forEach((header, index) => {
            if (header) {
                obj[header] = row[index] || '';
            }
        });
        return obj;
    });
};

const saveToDatabase = async (dataObjects) => {
    await Promise.all(dataObjects.map(async (number) => {
        await db.collection('numbers').add(number);
    }));
};

export default async (req) => {
    if (req.method === 'POST') {
        try {
            const formData = await req.formData();
            const file = formData.get('file');

            if (!file) {
                return new NextResponse(JSON.stringify({ success: false, error: 'No file uploaded' }), { status: 400 });
            }

            const fileBuffer = Buffer.from(await file.arrayBuffer());
            const dataObjects = await parseExcelFile(fileBuffer);
            await saveToDatabase(dataObjects);

            return new NextResponse(JSON.stringify({ success: true }), { status: 200 });
        } catch (error) {
            console.error('Error processing file:', error);
            return new NextResponse(JSON.stringify({ success: false, error: 'Error processing file' }), { status: 500 });
        }
    } else {
        return new NextResponse(`Method ${req.method} Not Allowed`, { status: 405 });
    }
};
