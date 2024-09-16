export const download_csv_by_headers= (filename : string, words : string[], callback: () => void) => {
  // Function to convert array to CSV
  const content = convertToCSV(words);
  const csvBlob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(csvBlob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.click();
  callback();
};


const convertToCSV = (headers: string[]) => {
  // Escape special characters
  const escape = (str: string) => str.replace(/"/g, '""');

  // Build CSV content
  const csvRows = [];

  // Add header row
  csvRows.push(headers.map(escape).join(','));

  // // Add data rows
  // const rowValues = headers.map((header) => escape(header));
  // csvRows.push(rowValues.join(','));

  // console.log(csvRows)
  return csvRows.join('\n');
};

