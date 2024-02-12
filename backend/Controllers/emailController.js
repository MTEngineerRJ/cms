
const db = require("../Config/dbConfig");
const emailHandler = require("../Config/getEmailContent");

const generateUniqueToken = require("../Config/generateToken");

 const sendEmail1 = (req, res) => {
    const { vehicleNo, PolicyNo, Insured, Date, leadId, toMail } = req.body;
  
    const sql = "SELECT * FROM ClaimStatus WHERE LeadId =?";
    db.query(sql, [leadId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      const content = emailHandler(result[0].Status);
  
      const generatedToken = generateUniqueToken();
      const insertClaimDetails = `
          UPDATE ClaimDetails
          SET
          Token = '${generatedToken}'
          WHERE LeadId = ${leadId};
        `;
      db.query(insertClaimDetails, (err, result2) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }
  
        const emailContent = `
      Dear Sir/Madam,
  
      Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
  
        We are Appointed for the survey of vehicle no.${vehicleNo}, Insured:${Insured} & Policy No.-${PolicyNo} on ${Date} from the United India 
      Insurance co. Ltd., So we request you please provide the complete contact deatils & mails of Repairer/insured. So that we 
      can procedd further in your case and we also request 
      you to provide the following details as follows:-
  
      ${content}
  
          Please provide the clear copy of all the documents so that the claim processing can be fast or
        <p><a href=https://claims-app-phi.vercel.app/documents/${leadId}?token=${generatedToken}&content=${""} target="_blank">Click me</a> to fill the documents information .</p>
  
      Note:-  If We Cannot get the response with in 02 days we will inform the insurer that the insured is not interseted in the
              claim. So close the file as"No Claim" in non copperation & non submission of the documents. 
  
    `;
  
        const mailOptions = {
          from: "infosticstech@gmail.com",
          to: toMail,
          subject: "Survey Request for Vehicle Claim",
          text: emailContent,
        };
  
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
          }
        });
      });
    });
  };
  
  const sendCustomEmail = (req, res) => {
    const {
      vehicleNo,
      PolicyNo,
      Insured,
      Date,
      content,
      content2,
      leadId,
      toMail,
      fromEmail,
      subject,
      body,
    } = req.body;
  
    const sql = "SELECT Token FROM ClaimDetails WHERE LeadId =?";
    db.query(sql, [leadId], (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
  
      if (!result2[0]?.Token) {
        const generatedToken = generateUniqueToken();
        const insertClaimDetails = `
        UPDATE ClaimDetails
        SET
        Token = '${generatedToken}'
        WHERE LeadId = ${leadId};
      `;
        db.query(insertClaimDetails, (err, result2) => {
          if (err) {
            console.error(err);
            res.status(500).send("Internal Server Error");
            return;
          }
  
          const emailContent = `
          ${body}
  
          ${content}
  
              Please provide the clear copy of all the documents so that the claim processing can be fast or
            <p><a href=https://claims-app-phi.vercel.app/documents/${leadId}?token=${generatedToken}&content=${encodeURIComponent(
            content2
          )} target="_blank">Click me</a> to fill the documents information .</p>
  
          Note:-  If We Cannot get the response with in 02 days we will inform the insurer that the insured is not interseted in the
                  claim. So close the file as"No Claim" in non copperation & non submission of the documents. 
  
        `;
  
          const mailOptions = {
            from: fromEmail,
            to: toMail,
            subject: subject,
            text: emailContent,
          };
  
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              res.status(500).send("Internal Server Error");
            } else {
              console.log("Email sent: " + info.response);
              res.status(200).send("Email sent successfully");
            }
          });
        });
      } else {
        const emailContent = `
        ${body}
  
        ${content}
  
            Please provide the clear copy of all the documents so that the claim processing can be fast or
          <p><a href=https://claims-app-phi.vercel.app/documents/${leadId}?token=${
          result2[0].Token
        }&content=${encodeURIComponent(
          content2
        )} target="_blank">Click me</a> to fill the documents information .</p>
  
        Note:-  If We Cannot get the response with in 02 days we will inform the insurer that the insured is not interseted in the
                claim. So close the file as"No Claim" in non copperation & non submission of the documents. 
  
      `;
  
        const mailOptions = {
          from: fromEmail,
          to: toMail,
          subject: subject,
          text: emailContent,
        };
  
        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
          } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully");
          }
        });
      }
    });
  };
  
 const sendEmail2= (req, res) => {
    //garage email
    const { vehicleNo, PolicyNo, Insured, toMail, Date } = req.body;
  
    const emailContent = `
      Dear Sir/Madam,
  
      Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
  
        We are Appointed for the survey of vehicle no.${vehicleNo}, Insured:${Insured} & Policy No.-${PolicyNo} on ${Date} and the approval
        is as follows;-
       Parts
       1) Fr Bumper- New Allowed
       2) FR Grill- New Allowed
       3) LH Head LIght- new Allowed
       4) LH Fender0- Repair Allowed
       Labour
       1) Fr Bumper- R/R-150, Painting-2500
       2) LH Head Light- R/R-100
       3) LH Fender- Denting-250, Painting-2200
       
           Further approval will be provided after dismentaling of the vehicle.
       
       Note:- Pleasae consider that the the claim is payable  subject to policy terms & conditions & Cashless facility will be allowed 
              Subject to all the documents get verified from online. It is for your information please.
    `;
  
    const mailOptions = {
      from: "infosticstech@gmail.com",
      to: toMail,
      subject: "Survey Request for Vehicle Claim",
      text: emailContent,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  };
  
  const sendEmail3 = (req, res) => {
    //
    const { date, toMail } = req.body;
  
    const currentDate = new Date();
  
    const emailContent = `
    Dear Sir/Madam,
  
    Greeting from the MT Engineers Legal Investigator Pvt. Ltd.,
    
     We have conducted the online survey on ${currentDate} & also mailed you regarding the documents on ${date} and now again we rquest you
    to please provide the follwong documents to procedd further in your case:-
    
    1) What is the Status of the said vheicle
    2) How much time it will take to repair the vehicle
    3) Please provide UR & RI Snaps
    4) Invoice Bill duly signed & stamped of dealer
    5) Payment receipt duly signed & stamped of dealer
    6) Previous Year Policy
    7) Pan Card
    8) Please destorey the items properly in the RI, Otherwise we will treat the part is repaired
       
        Please provide the clear copy of all the documents so that the claim processing can be fast
    
    Note:- If We Cannot get the response with in 01 day we will inform the insurer that the insured is not interseted in the
            claim. So close the file as"No Claim" in non copperation & non submission of the documents. 
    `;
  
    const mailOptions = {
      from: "infosticstech@gmail.com",
      to: toMail,
      subject: "Survey Request for Vehicle Claim",
      text: emailContent,
    };
  
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  };

  module.exports={sendEmail1,sendEmail2,sendEmail3,sendCustomEmail};