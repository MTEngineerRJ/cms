 
const db = require("../Config/dbConfig");

 
 const upload = (req, res) => {
    const {
  LeadId,
  Type,
  ProfessionalFees,
  TotalKM,
  Visits,
  Conveyance,
  Photos,
  Charge,
  Photos_cd,
  Cgst,
  Igst,
  Sgst,
  Total,
  ModeOfpayement,
  BillID,
  FeebasedOn,
  Remrk,
  KmRate,
  PhotsRate,
  EstimateAmt,
  AssessedAmt,
  InsuranceCompanyName,
  Branch,
  BillTo,
  Others,
  BillDate
    } = req.body;

    const updateQuery = `
  UPDATE BillReportFees
  SET
    Type = '${Type}',
    ProfessionalFees = '${ProfessionalFees}',
    TotalKM = '${TotalKM}',
    Visits = '${Visits}',
    Conveyance = '${Conveyance}',
    Photos = '${Photos}',
    Charge = '${Charge}',
    Photos_cd = '${Photos_cd}',
    Cgst = '${Cgst}',
    Igst = '${Igst}',
    Sgst = '${Sgst}',
    Total = '${Total}',
    FeebasedOn = '${FeebasedOn}',
    Remrk = '${Remrk}',
    KmRate = '${KmRate}',
    PhotsRate = '${PhotsRate}',
    EstimateAmt = '${EstimateAmt}',
    AssessedAmt = '${AssessedAmt}',
    InsuranceCompanyName = '${InsuranceCompanyName}',
    Branch = '${Branch}',
    BillTo = '${BillTo}',
    Others = '${Others}',
    BillDate = '${BillDate}',
    BillID = '${BillID}'
  WHERE LeadId = '${LeadId}';
`;

    db.query("SELECT * FROM BillReportFees WHERE LeadID=?",[LeadId],  (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
  
     
      const query = result.length > 0 ?  updateQuery : insertQuery;
   
    db.query(query,  (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
      }
  
        return res.status(200).json({ message: "Successfully uploaded the fee report! ",result });
      
    });
  });
    
  };

  const getFeeReport = async (req, res) => {
    const leadId = req.query.LeadId;

  
    const executeQuery = (query, values) => {
      return new Promise((resolve, reject) => {
        db.query(query, values, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result[0]);
          }
        });
      });
    };
  
    try {
      const feeDetails = await executeQuery(
        "SELECT * FROM BillReportFees WHERE LeadID=?",
        [leadId]
      );
      const driverDetails = await executeQuery(
        "SELECT * FROM DriverDetailsOnline WHERE LeadID=?",
        [leadId]
      );
      const vehicleOnlineDetails = await executeQuery(
        "SELECT * FROM VehicleDetailsOnline WHERE LeadId=?",
        [leadId]
      );
      const vehicleDetails = await executeQuery(
        "SELECT * FROM VehicleDetails WHERE LeadId=?",
        [leadId]
      );
      const accidentDetails = await executeQuery(
        "SELECT * FROM AccidentDetails WHERE LeadID=?",
        [leadId]
      );  
      
      const claimDetails = await executeQuery(
        "SELECT * FROM ClaimDetails WHERE LeadId=?",
        [leadId]
      );
     
    
      const combinedResult = {
        feeDetails,
        driverDetails,
        claimDetails,
        vehicleDetails,
        vehicleOnlineDetails,
        feeDetails,
        accidentDetails : accidentDetails,
      };

      res.json(combinedResult);
      res.status(200).send()
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
 };

  module.exports={upload,getFeeReport};