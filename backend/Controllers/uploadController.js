
const db = require("../Config/dbConfig");
const generateUniqueToken = require("../Config/generateToken");
const uploadToAWS = require("../Middleware/awsUpload");
const uploadToAWSVideo = require("../Middleware/awsUploadVideo");

const getReportDocument = (req, res) => {
    const LeadId = req.query.leadId;
    const sql = "SELECT * FROM ReportDocuments WHERE LeadId =?";
    db.query(sql, [LeadId], (error, results) => {
      if (error) {
        console.error("Error while fetching the report documents:", error);
        return res
          .status(500)
          .json({ error: "Error inserting data into VehicleDetails." });
      }
  
      return res.status(200).json({ results });
    });
  };

const getDocuments = (req, res) => {
    const LeadId = req.query.LeadId;
    console.log("get", LeadId);
    const sql = "SELECT * FROM DocumentList WHERE LeadId =?";
    db.query(sql, [LeadId], (err, result) => {
      if (err) {
        // console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(result);
    });
  };

 const uploadClaimMedia = (req, res) => {
    const {
      garage,
      fileUrl,
      fileName,
      reportType,
      LeadId,
      isLastChunk,
      uploadedBy,
      file,
    } = req.body;
  
    uploadToAWS(file, fileName)
      .then((Location) => {
        const insertUploadDetails = `
          INSERT INTO ReportDocuments (
            LeadId,
            FileName,
            FilePath,
            UploadedBy,
            GarageName,
            ReportType
          ) VALUES (
            '${LeadId}',
            '${fileName}',
            '${Location}',
            '${uploadedBy}',
            '${garage}',
            '${reportType}'
          );
        `;
  
        // Execute the SQL queries individually
  
        db.query(insertUploadDetails, (error, results) => {
          if (error) {
            console.error("Error inserting data into VehicleDetails:", error);
            return res
              .status(500)
              .json({ error: "Error inserting data into VehicleDetails." });
          }
  
          return res.status(200).json({ Location });
        });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      });
  };

 const uploadDocument = (req, res) => {
    const { data, leadId } = req.body;
  console.log('data',data);
    const array = data;
  
    const currentLeadId = data[0].leadId;
  
    array.map((data, index) => {
      let photo1 = "",
        photo2 = "",
        photo3 = "",
        photo4 = "",
        photo5 = "",
        photo6 = "";
      let photoAtt1 = "",
        photoAtt2 = "",
        photoAtt3 = "",
        photoAtt4 = "",
        photoAtt5 = "",
        photoAtt6 = "";
      let photo1Timestamp = "",
        photo2Timestamp = "",
        photo3Timestamp = "",
        photo4Timestamp = "",
        photo5Timestamp = "",
        photo6Timestamp = "";
      let photo1Latitude = "",
        photo2Latitude = "",
        photo3Latitude = "",
        photo4Latitude = "",
        photo5Latitude = "",
        photo6Latitude = "";
      let photo1Longitude = "",
        photo2Longitude = "",
        photo3Longitude = "",
        photo4Longitude = "",
        photo5Longitude = "",
        photo6Longitude = "";
  
      if (data.data[0][0] || data.data) {
        photo1 = data.data[0][0].url  || data.data[0];
        // console.log("data.data[0]",data.data[0]);
        // photo1 = data.data[0]
        photoAtt1 = data.data[0][0].name || data.docName;
        photo1Timestamp = data.data[0][0]?.time;
        photo1Latitude = data.data[0][0]?.location?.split(",")[0];
        photo1Longitude = data.data[0][0]?.location?.split(",")[1];

      }
  
      if (data.data[1]?.length > 0) {
        photo2 = data.data[1][0].url;
        photoAtt2 = data.data[1][0].name;
        photo2Timestamp = data.data[1][0]?.time;
        photo2Latitude = data.data[1][0]?.location?.split(",")[0];
        photo2Longitude = data.data[1][0]?.location?.split(",")[1];
      }
      if (data.data[2]?.length > 0) {
        photo3 = data.data[2][0].url;
        photoAtt3 = data.data[2][0].name;
        photo3Timestamp = data.data[2][0]?.time;
        photo3Latitude = data.data[2][0]?.location.split(",")[0];
        photo3Longitude = data.data[2][0]?.location.split(",")[1];
      }
      if (data.data[3]?.length > 0) {
        photo4 = data.data[3][0].url;
        photoAtt4 = data.data[3][0].name;
        photo4Timestamp = data.data[3][0]?.time;
        photo4Latitude = data.data[3][0]?.location.split(",")[0];
        photo4Longitude = data.data[3][0]?.location.split(",")[1];
      }
      if (data.data[4]?.length > 0) {
        photo5 = data.data[4][0].url;
        photoAtt5 = data.data[4][0].name;
        photo5Timestamp = data.data[4][0]?.time;
        photo5Latitude = data.data[4][0]?.location.split(",")[0];
        photo5Longitude = data.data[4][0]?.location.split(",")[1];
      }
      if (data.data[5]?.length > 0) {
        photo6 = data.data[5][0].url;
        photoAtt6 = data.data[5][0].name;
        photo6Timestamp = data.data[5][0]?.time;
        photo6Latitude = data.data[5][0]?.location.split(",")[0];
        photo6Longitude = data.data[5][0]?.location.split(",")[1];
      }
  console.log("Photo1",photo1)
      const insertUploadDetails = `
      INSERT INTO DocumentList (
        LeadId,
        DocumentName,
        Photo1,
        Photo2,
        Photo3,
        Photo4,
        Photo5,
        Photo6,
        Attribute1,
        Attribute2,
        Attribute3,
        Attribute4,
        Attribute5,
        Attribute6,
        Photo1Latitude,
        Photo2Latitude,
        Photo3Latitude,
        Photo4Latitude,
        Photo5Latitude,
        Photo6Latitude,
        Photo1Longitude,
        Photo2Longitude,
        Photo3Longitude,
        Photo4Longitude,
        Photo5Longitude,
        Photo6Longitude,
        Photo1Timestamp,
        Photo2Timestamp,
        Photo3Timestamp,
        Photo4Timestamp,
        Photo5Timestamp,
        Photo6Timestamp
      ) VALUES (
        '${data.leadId}',
        '${data.docName}',
        '${photo1}',
        '${photo2}',
        '${photo3}',
        '${photo4}',
        '${photo5}',
        '${photo6}',
        '${photoAtt1}',
        '${photoAtt2}',
        '${photoAtt3}',
        '${photoAtt4}',
        '${photoAtt5}',
        '${photoAtt6}',
        '${photo1Timestamp}',
        '${photo2Timestamp}',
        '${photo3Timestamp}',
        '${photo4Timestamp}',
        '${photo5Timestamp}',
        '${photo6Timestamp}',
        '${photo1Latitude}',
        '${photo2Latitude}',
        '${photo3Latitude}',
        '${photo4Latitude}',
        '${photo5Latitude}',
        '${photo6Latitude}',
        '${photo1Longitude}',
        '${photo2Longitude}',
        '${photo3Longitude}',
        '${photo4Longitude}',
        '${photo5Longitude}',
        '${photo6Longitude}'
      );
    `;
  
      // console.log(insertUploadDetails);
  
      db.query(insertUploadDetails, (error, results) => {
        if (error) {
          console.error("Error inserting data into Upload Details:", error);
          return res
            .status(500)
            .json({ error: "Error inserting data into DocumentDetails." });
        }
      });
    });
  
    const claimToken = generateUniqueToken();
  
    const insertTokeDteials = `
    UPDATE ClaimDetails
    SET Token='${claimToken}'
    WHERE LeadId = ${currentLeadId};
    `;
  
    db.query(insertTokeDteials, (error, results) => {
      if (error) {
        console.error("Error inserting data into CL Details:", error);
        return res.status(500).json({ error: "Error." });
      }
      return res.status(200).json({ message: "Data inserted successfully." });
    });
  };


 const uploadMedia = async(req, res) => {
  try {
    const {file,name}=req.body;
    const filesData = file;
    const nameInfo = name;

  
    const results = [];
  

    for (let i = 0; i < filesData.length; i++) {
      const fileData = filesData[i]; // Use a different name for the loop iteration
      const fileName = nameInfo[i];

      // Check if the file data starts with "data:image/"
      if (fileData.startsWith("data:image/") || fileData.startsWith("'data:application/pdf")) {
        const data = await uploadToAWS(fileData, fileName);
        results.push(data);
      } else if (fileData.startsWith("data:video/")) {
        const prefixToRemove = "data:video/webm;base64,";
        const dataWithoutPrefix = fileData.substring(prefixToRemove.length);
      
        const data = await uploadToAWSVideo(dataWithoutPrefix, fileName);
        // const data = await uploadToAWSVideo(fileData, fileName);
        // console.log('BLOBB',fileData);
        results.push(data);
      } else {
        console.log(`Unsupported file format for ${fileName}`);
        // Optionally handle the error or skip the file
        continue;
      }
    }
    console.log("result",results);
    return res.status(200).json({ data: results });
  } catch (error) {
    console.log("Error log", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
  
  };

  const verifyReportUpload = (req, res) => {
    const { userName, reportId } = req.body;
    const updateVerifyReport = `
    UPDATE ReportDocuments
          SET
          VerifiedBy = '${userName}',
          IsVerified = '${1}'
          WHERE ReportId = ${reportId};
    `;
    db.query(updateVerifyReport, (err, result2) => {
      if (err) {
        console.error(err);
        res
          .status(500)
          .send("Internal Server Error while updating the verified status");
        return;
      }
      // console.log(result2[0].Token === token);
      res.status(200).send("Successfully Updated!!");
    });
  };

  module.exports={
    getReportDocument,
    getDocuments,
    uploadClaimMedia,
    uploadDocument,
    uploadMedia,
    verifyReportUpload
};