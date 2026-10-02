// Google Apps Script to auto-save to Google Docs AND Google Sheets
// Setup:
// 1. Go to script.google.com -> New Project
// 2. Paste code below
// 3. Optional: Add SPREADSHEET_ID if writing to existing Google Sheet
// 4. Deploy -> New deployment -> Web app (Execute as: Me, Access: Anyone)
// 5. Copy Web App URL into .env as VITE_GOOGLE_DOCS_WEBHOOK_URL

var SPREADSHEET_ID = ""; // Optional: Paste your Google Sheet ID here if using existing sheet

function sanitize(val) {
  if (val === null || val === undefined) return "";
  var str = String(val);
  // Single quote prefix prevents Google Sheets from interpreting '+' (e.g. +91 phone number) or '=' as formula
  if (str.charAt(0) === '+' || str.charAt(0) === '=' || str.charAt(0) === '-' || str.charAt(0) === '@') {
    return "'" + str;
  }
  return str;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // 1. Create Google Doc
    var doc = DocumentApp.create('Inquiry - ' + data.fullName + ' (' + data.timestamp + ')');
    var body = doc.getBody();

    body.appendParagraph('PROPERTY INQUIRY SUBMISSION').setHeading(DocumentApp.ParagraphHeading.HEADING1);
    body.appendParagraph('Timestamp: ' + data.timestamp);
    body.appendParagraph('Full Name: ' + data.fullName);
    body.appendParagraph('Phone: ' + data.phone);
    body.appendParagraph('Purpose: ' + data.purpose);
    body.appendParagraph('Preferred Locations: ' + data.locations);
    body.appendParagraph('Property Type: ' + data.propertyType);
    body.appendParagraph('Plot Size: ' + data.plotSize);
    body.appendParagraph('Budget: ' + data.budget);
    body.appendParagraph('Timeline: ' + data.timeline);
    body.appendParagraph('\nFull Inquiry Text:\n' + data.fullText);

    doc.saveAndClose();

    // 2. Save to Google Sheets (Create or Append)
    var sheet;
    if (SPREADSHEET_ID) {
      sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    } else {
      var ss = SpreadsheetApp.create('Property Submissions Ledger');
      sheet = ss.getActiveSheet();
      sheet.appendRow([
        'Timestamp', 'Full Name', 'Phone', 'Purpose', 'Locations',
        'Property Type', 'Plot Size', 'Budget', 'Timeline', 'Doc URL'
      ]);
    }

    sheet.appendRow([
      sanitize(data.timestamp),
      sanitize(data.fullName),
      sanitize(data.phone),
      sanitize(data.purpose),
      sanitize(data.locations),
      sanitize(data.propertyType),
      sanitize(data.plotSize),
      sanitize(data.budget),
      sanitize(data.timeline),
      doc.getUrl()
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      docUrl: doc.getUrl()
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
