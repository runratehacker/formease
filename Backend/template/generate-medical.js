import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs';

async function createMedicalIntakeForm() {
  try {
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const form = pdfDoc.getForm();

    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================
    const drawLabel = (page, text, x, y, size = 10, font = helvetica, color = rgb(0,0,0)) => {
      page.drawText(text, { x, y, size, font, color });
    };

    const createField = (page, name, x, y, width, height = 18) => {
      const field = form.createTextField(name);
      field.addToPage(page, {
        x, y, width, height,
        borderColor: rgb(0.7, 0.7, 0.7), borderWidth: 1, 
        backgroundColor: rgb(0.98, 0.98, 0.98) 
      });
    };

    const createCheckbox = (page, name, label, x, y) => {
      const cb = form.createCheckBox(name);
      cb.addToPage(page, { x, y, width: 12, height: 12, borderColor: rgb(0,0,0), borderWidth: 1 });
      page.drawText(label, { x: x + 16, y: y + 2, size: 10, font: helvetica });
    };

    const drawSectionHeader = (page, text, y) => {
      page.drawRectangle({ x: 30, y: y - 5, width: 535, height: 22, color: rgb(0.2, 0.4, 0.6) });
      page.drawText(text, { x: 40, y: y, size: 12, font: helveticaBold, color: rgb(1, 1, 1) });
    };

    // ==========================================
    // PAGE 1 : General Information
    // ==========================================
    const page1 = pdfDoc.addPage([595, 842]);
    let y1 = 790;

    // --- 1. VECTOR LOGO HEADER ---
    const logoX = 40;
    const sqSize = 14;
    page1.drawRectangle({ x: logoX, y: y1, width: sqSize, height: sqSize, color: rgb(0.1, 0.3, 0.6) });
    page1.drawRectangle({ x: logoX + 16, y: y1, width: sqSize, height: sqSize, color: rgb(0.2, 0.5, 0.8) });
    page1.drawRectangle({ x: logoX + 32, y: y1, width: sqSize, height: sqSize, color: rgb(0.4, 0.7, 0.9) });
    page1.drawRectangle({ x: logoX + 48, y: y1, width: sqSize, height: sqSize, color: rgb(0.6, 0.8, 0.9) });

    drawLabel(page1, 'Cleveland Clinic', 120, y1 + 2, 16, helveticaBold, rgb(0.1, 0.3, 0.6));
    drawLabel(page1, 'Wellness', 120, y1 - 12, 12, helvetica, rgb(0.4, 0.4, 0.4));
    
    drawLabel(page1, 'Center for Integrative Medicine', 380, y1 + 2, 12, helveticaBold);
    drawLabel(page1, 'Medical History Intake Form', 415, y1 - 12, 11, helvetica);

    y1 -= 50;

    // --- 2. THE FIELDS ---
    drawLabel(page1, "Today's Date:", 415, y1 + 4);
    createField(page1, 'TodaysDate', 490, y1, 75);

    y1 -= 40;
    drawSectionHeader(page1, 'GENERAL INFORMATION', y1);

    // Row 1: Name
    y1 -= 40;
    drawLabel(page1, 'Name*:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'FirstName', 80, y1, 150);
    createField(page1, 'MiddleName', 240, y1, 150);
    createField(page1, 'LastName', 400, y1, 165);
    
    drawLabel(page1, '(First Name)', 125, y1 - 12, 8, helvetica, rgb(0.4,0.4,0.4));
    drawLabel(page1, '(Middle Name)', 280, y1 - 12, 8, helvetica, rgb(0.4,0.4,0.4));
    drawLabel(page1, '(Last Name)', 455, y1 - 12, 8, helvetica, rgb(0.4,0.4,0.4));

    // Row 2: Vitals & Gender
    y1 -= 45;
    drawLabel(page1, 'Date of Birth:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'DOB', 105, y1, 80);
    
    drawLabel(page1, 'Age:', 200, y1 + 4, 10, helveticaBold);
    createField(page1, 'Age', 230, y1, 40);

    drawLabel(page1, 'Height:', 285, y1 + 4, 10, helveticaBold);
    createField(page1, 'Height', 330, y1, 60);

    drawLabel(page1, 'Weight:', 405, y1 + 4, 10, helveticaBold);
    createField(page1, 'Weight', 450, y1, 60);

    // Row 3: Gender & Language
    y1 -= 35;
    drawLabel(page1, 'Gender:', 30, y1 + 4, 10, helveticaBold);
    createCheckbox(page1, 'GenderMale', 'Male', 80, y1 + 2);
    createCheckbox(page1, 'GenderFemale', 'Female', 130, y1 + 2);

    drawLabel(page1, 'Primary Language:', 200, y1 + 4, 10, helveticaBold);
    createField(page1, 'PrimaryLang', 300, y1, 90);

    drawLabel(page1, 'Secondary:', 405, y1 + 4, 10, helveticaBold);
    createField(page1, 'SecondaryLang', 475, y1, 90);

 // Row 4: Primary Address Line 1
    y1 -= 45;
    drawLabel(page1, 'Primary Address:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'AddressLine1', 130, y1, 435);
    drawLabel(page1, '(Line 1)', 330, y1 - 12, 8, helvetica, rgb(0.4,0.4,0.4));

    //  Address Line 2
    y1 -= 35;
    drawLabel(page1, 'Address Line 2:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'AddressLine2', 130, y1, 435);
    drawLabel(page1, '(Line 2)', 330, y1 - 12, 8, helvetica, rgb(0.4,0.4,0.4));

    //  City, State, Pin Code (Spanning the full 435-point width)
    y1 -= 37;
    drawLabel(page1, 'City:', 50, y1 + 4, 10, helveticaBold);
    createField(page1, 'City', 80, y1, 125);
    
    drawLabel(page1, 'State:', 225, y1 + 4, 10, helveticaBold);
    createField(page1, 'State', 260, y1, 125);

    drawLabel(page1, 'Pin Code:', 400, y1 + 4, 10, helveticaBold);
    createField(page1, 'PinCode', 455, y1, 100);

    // Row 5: Simplified Contact Numbers (Phone & Email only)
    y1 -= 45;
    drawLabel(page1, 'Contact Information:', 30, y1 + 4, 10, helveticaBold);
    
    drawLabel(page1, 'Phone No:', 150, y1 + 4);
    createField(page1, 'Phone', 210, y1, 130);
    
    drawLabel(page1, 'E-Mail:', 360, y1 + 4);
    createField(page1, 'Email', 400, y1, 165);

    // Row 6: Emergency Contact
    y1 -= 45;
    page1.drawRectangle({ x: 25, y: y1 - 40, width: 545, height: 75, color: rgb(0.95, 0.95, 0.95), borderColor: rgb(0.8, 0.8, 0.8), borderWidth: 1 });
    
    drawLabel(page1, 'Emergency Contact', 35, y1 + 10, 11, helveticaBold, rgb(0.8, 0.2, 0.2));

    drawLabel(page1, 'Name:', 35, y1 - 15, 10, helveticaBold);
    createField(page1, 'EmergencyName', 75, y1 - 20, 220);

    drawLabel(page1, 'Phone Number:', 310, y1 - 15, 10, helveticaBold);
    createField(page1, 'EmergencyPhone', 400, y1 - 20, 160);

    // --- 3. ADDITIONAL FIELDS ---
    // Dropping y1 down to clear the Emergency Contact box
    y1 -= 75; 

    // Row 7: Occupation
    drawLabel(page1, 'Occupation:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'Occupation', 100, y1, 250);

    // Row 8: Highest Education Level
    y1 -= 40;
    drawLabel(page1, 'Highest Education Level:', 30, y1 + 4, 10, helveticaBold);
    // Added three checkboxes neatly aligned horizontally
    createCheckbox(page1, 'EduHighSchool', 'High School', 180, y1 + 2);
    createCheckbox(page1, 'EduGraduate', 'Graduate', 280, y1 + 2);
    createCheckbox(page1, 'EduPostGrad', 'Post Graduate', 360, y1 + 2);

    // Row 9: Primary Physician
    y1 -= 40;
    drawLabel(page1, 'Primary Physician Name:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'PhysicianName', 160, y1, 170);

    drawLabel(page1, 'Phone No:', 350, y1 + 4, 10, helveticaBold);
    createField(page1, 'PhysicianPhone', 410, y1, 155);

    // Row 10: Referred By
    y1 -= 40;
    drawLabel(page1, 'Referred By:', 30, y1 + 4, 10, helveticaBold);
    createField(page1, 'ReferredBy', 100, y1, 250);


    // PAGE 2 

    // ==========================================
    // PAGE 2 : Medical Questionnaire
    // ==========================================
    const page2 = pdfDoc.addPage([595, 842]);
    let y2 = 790;

    drawSectionHeader(page2, 'MEDICAL QUESTIONNAIRE', y2);
    
    // Subheading
    y2 -= 35;
    drawLabel(page2, 'HEALTH CONCERNS', 30, y2, 11, helveticaBold, rgb(0.2, 0.4, 0.6));

    // Question 1
    y2 -= 25;
    drawLabel(page2, 'When was the last time you felt well?', 30, y2, 10, helveticaBold);
    y2 -= 22;
    createField(page2, 'HealthConcernsQ1', 30, y2, 535);

    // Question 2
    y2 -= 35;
    drawLabel(page2, 'Did something trigger your change in health?', 30, y2, 10, helveticaBold);
    y2 -= 22;
    createField(page2, 'HealthConcernsQ2', 30, y2, 535);

    // Question 3
    y2 -= 35;
    drawLabel(page2, 'What makes you feel better?', 30, y2, 10, helveticaBold);
    y2 -= 22;
    createField(page2, 'HealthConcernsQ3', 30, y2, 535);

    // Question 4
    y2 -= 35;
    drawLabel(page2, 'What makes you feel worse?', 30, y2, 10, helveticaBold);
    y2 -= 22;
    createField(page2, 'HealthConcernsQ4', 30, y2, 535);

    // ==========================================
    // Describe Problems Section
    // ==========================================
    y2 -= 55;
    drawSectionHeader(page2, 'DESCRIBE PROBLEMS', y2);

    // Sub-headers for the grid columns
    y2 -= 30;
    drawLabel(page2, 'NO', 30, y2, 10, helveticaBold);
    drawLabel(page2, 'PROBLEM DESCRIPTION', 50, y2, 10, helveticaBold);
    drawLabel(page2, 'SEVERITY', 350, y2, 10, helveticaBold);

    // Generate 5 numbered rows automatically using a loop
    for (let i = 1; i <= 5; i++) {
      y2 -= 35;
      
      // Numbering (1., 2., etc.)
      drawLabel(page2, `${i}.`, 30, y2 + 4, 10, helveticaBold);
      
      // Text Field for the Problem
      createField(page2, `Problem${i}Desc`, 50, y2, 280);
      
      // Severity Checkboxes aligned to the right side
      createCheckbox(page2, `Prob${i}Mild`, 'Mild', 350, y2 + 3);
      createCheckbox(page2, `Prob${i}Mod`, 'Moderate', 410, y2 + 3);
      createCheckbox(page2, `Prob${i}Sev`, 'Severe', 500, y2 + 3);
    }
    // ==========================================
    // Treatment Approach Section
    // ==========================================
    y2 -= 55;
    drawSectionHeader(page2, 'TREATMENT APPROACH ( FOR ABOVE PROBLEMS )', y2);

    // Sub-headers for the grid columns
    y2 -= 30;
    drawLabel(page2, 'NO', 30, y2, 10, helveticaBold);
    drawLabel(page2, 'TREATMENT DESCRIPTION', 50, y2, 10, helveticaBold);

    // Generate 5 numbered rows automatically using a loop
    for (let i = 1; i <= 5; i++) {
      y2 -= 35;
      
      // Numbering (1., 2., etc.)
      drawLabel(page2, `${i}.`, 30, y2 + 4, 10, helveticaBold);
      
      // Text Field for the Treatment Description (Spans most of the width)
      createField(page2, `Treatment${i}Desc`, 50, y2, 430);
      
      // Success Checkbox aligned to the far right
      createCheckbox(page2, `Treat${i}Success`, 'Success', 495, y2 + 3);
    }


    // Page 3 
    // ==========================================
    // ==========================================
    // PAGE 3 : Allergies & Injuries
    // ==========================================
    const page3 = pdfDoc.addPage([595, 842]);
    let y3 = 790;

    // ==========================================
    // Allergies Section
    // ==========================================
    drawSectionHeader(page3, 'ALLERGIES', y3);

    y3 -= 35;
    // Column Headers
    drawLabel(page3, 'MEDICATION / SUPPLEMENT / FOOD', 50, y3, 10, helveticaBold);
    drawLabel(page3, 'REACTION', 320, y3, 10, helveticaBold);

    // Generate 4 rows for Allergies
    for (let i = 1; i <= 4; i++) {
      y3 -= 25;
      // Medication/Supplement/Food Field
      createField(page3, `AllergyItem${i}`, 50, y3, 250);
      
      // Reaction Field
      createField(page3, `AllergyReaction${i}`, 320, y3, 220);
    }

    // ==========================================
    // Injuries Section
    // ==========================================
    y3 -= 55;
    drawSectionHeader(page3, 'INJURIES', y3);

    // Row 1: The checkboxes spread across the line
    y3 -= 35;
    createCheckbox(page3, 'InjBack', 'Back Injury', 30, y3);
    createCheckbox(page3, 'InjHead', 'Head Injury', 125, y3);
    createCheckbox(page3, 'InjNeck', 'Neck Injury', 220, y3);
    createCheckbox(page3, 'InjBroken', 'Broken Bones', 315, y3);
    createCheckbox(page3, 'InjOther', 'Other', 420, y3);
    
    // Text field for "Other" description spanning to the right margin
    createField(page3, 'InjOtherDesc', 475, y3, 90);

    // Row 2: Artificial joints question
    y3 -= 35;
    drawLabel(page3, 'Do you have any artificial joints or implants?', 30, y3 + 4, 10, helvetica);
    createCheckbox(page3, 'ImplantsYes', 'Yes', 260, y3 + 2);
    createCheckbox(page3, 'ImplantsNo', 'No', 310, y3 + 2);

    
    // ==========================================
    // Hospitalization Section
    // ==========================================
    y3 -= 55;
    drawSectionHeader(page3, 'HOSPITALIZATIONS', y3); 

    y3 -= 35;
    // Column Headers
    drawLabel(page3, 'DATE', 50, y3, 10, helveticaBold);
    drawLabel(page3, 'REASON', 320, y3, 10, helveticaBold);

    // Generate 4 rows 
    for (let i = 1; i <= 4; i++) {
      y3 -= 25;
      // Medication/Supplement/Food Field
      createField(page3, `DateHospitalized${i}`, 50, y3, 250);
      
      // Reaction Field
      createField(page3, `ReasonHospitalized${i}`, 320, y3, 220);
    }



    const pdfBytes = await pdfDoc.save();
    fs.writeFileSync('medical-intake-template.pdf', pdfBytes);
    
    console.log('Success! medical-intake-template.pdf generated.');

  } catch (error) {
    console.error('Error generating form:', error);
  }
}

createMedicalIntakeForm();