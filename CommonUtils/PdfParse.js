const Log = require("./Log");
const fs = require('fs');
const pdf = require('pdf-parse');
const pdf2table = require('pdf2table');
const path = require("path");

class PdfParse {
    static text

    /**
     * Extract tables from PDF; The 'tables' are extracted as an array of rows.
     * @param {*} pathPdf 
     */
    static async readFilePdfTable(pathPdf) {
        let dataBuffer = fs.readFileSync(pathPdf)

        const pdf2TablePromise = (buffer) => {
            return new Promise((resolve, reject) => {
                pdf2table.parse(buffer, function (err, rows, rowsdebug) {
                    if (err) return reject(err);
                    resolve(rows)
                })
            })
        };

        return pdf2TablePromise(dataBuffer)

    }


    /**
     * Parse text from a PDF file
     * @param {*} pathPdf - pdf file path 
     */
    static async readFilePdfText(pathPdf) {
        let dataBuffer = fs.readFileSync(pathPdf)
        return await this.readBufferPdfText(dataBuffer)
    }

    /**
     * Paser text from pdf buffer
     * @param {*} dataBuffer - pdf buffer 
     */
    static async readBufferPdfText(dataBuffer) {
        return pdf(dataBuffer).then(data => {
            this.text = data.text
            return this.text
        });
    }


}
module.exports = PdfParse;