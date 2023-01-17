const Log = require("./Log");
const fs = require('fs');
const XLSX = require('xlsx');
const path = require("path");

class ExcelUtil {

    /**
     * Read Excel file and return data as JSON Object
     * @param {String} filePath - absolute file path of the excel file
     * @param {Number} [worksheetNumber = 0] - worksheet index starts at 0
     * @param {Boolean} [includeEmptyCells = true] - if true - empty cells are shown as sunll
     * @returns data as JSON Object
     */
    static readExcelToJson(filePath, worksheetNumber = 0, includeEmptyCells) {
        const workbook = XLSX.readFile(filePath);
        var sheet_name_list = workbook.SheetNames;
        let options = (includeEmptyCells == true) ? { raw: true } : { raw: true, defval: null }
        return (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[worksheetNumber]], options))
    }

    /**
     * Convert Excel, Worksheet 0 to CSV file
     * @param {*} filePath - absolute file path of the excel file
     * @param {*} outputFilePath - absolute destination file path of csv output
     */
    static readExcelToCSV(filePath, outputFilePath) {
        const workbook = XLSX.readFile(filePath);
        XLSX.writeFile(workbook, outputFilePath, { bookType: 'csv' })
    }


    /**
     * Read CSV file and return data as JSON Object
     * @param {*} filePath - absolute file path of the CSV file
     * @returns data as JSON Object
     */
    static readCsvToJson(filePath) {
        const workbook = XLSX.readFile(filePath, { raw: true, cellDates: true, cellNF: false, cellText: false });
        var sheet_name_list = workbook.SheetNames;
        let options = { raw: false, defval: null, header: 1 }
        return (XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]], options))
    }

}
module.exports = ExcelUtil;