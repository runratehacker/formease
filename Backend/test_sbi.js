import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFDocument } from 'pdf-lib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function test() {
    try {
        // Mock request object
        const req = {
            body: {
                formFields: {
                    Date: { type: 'text', filled: true, value: '2023' }
                }
            }
        };
        const res = {
            setHeader: () => {},
            status: (code) => ({
                send: (data) => console.log('Success, sent bytes:', data.length),
                json: (data) => console.log('Error JSON:', data)
            })
        };

        const { default: fillForm } = await import('file://y:/SkillYog/PROJECT/GENAI/Backend/controllers/Form/downloadAccountOpeningController.js');
        await fillForm(req, res);
    } catch (e) {
        console.error("Test failed:", e);
    }
}
test();
