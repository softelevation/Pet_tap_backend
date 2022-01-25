/**
 * Create PDF from HTML and send the URL of PDF. 
 * You can add Header/Footer in your PDF also
 */
var pdf = require("html-pdf");  // npm install html-pdf — save
global.createPDFFile = function (htmlString, fileName, callback) {
var options = {
    format: 'Letter',
    header: {
       "height": '15mm',
       "contents": "<img alt='Clintek logo' height='100' width='100' src='http://52.207.115.173:9191/files/5a6597eb7a67600c64ce52cf/?api_key=25BDD8EC59070421FDDE3C571182F6F12F5AAF99FF821A285884E979F3783B23'>"
          },
       "timeout": 600000,
       "footer": {
       "height": "15mm",
       "contents": {
        first: "<div><span>1</span></div>",
         default: "<div><span>Appointment Report</span></div>", // fallback value
         last: "<div><span>Last Page</span></div>",
       }
    }
};
/**
 * It will create PDF of that HTML into given folder.
 */ 
pdf.create(htmlString, options).toFile('./public/pdf/' + fileName, function (err, data) {
    if (err) return console.log(err);
    return callback(null,'/pdf/' + fileName);
  });
}

module.exports = global;