
const db = require("../Config/dbConfig");

const updateFinalReport = (req,res)=>{

  console.log("Updating final report", req.body);
    const {
      PolicyType ,
      TypeOfDate,
      IDV  ,
      PolicyPeriodStart,
      PolicyPeriodEnd ,
      HPA ,
      ClaimServicingOffice,
      OwnerSRST,
      VehicleMakeVariantModelColor,
      DateOfIssue,
      MailRecieveDate,
      ValidFrom,
      VehicleType,
      ValidUntilNtv,
      ValidUntilTv,
      phoneNumber,
      AntiTheft,
      RegLadenWt,
      RemarkIfRLW,
      Pin,
      DateOfRegistration,
      PlaceOfSurvey,
      UnladenWT,
      RemarkIfULW,
      VehicleRemark,
      InsuranceCompanyNameAddress,
      InsuredAddress,InsuredMailAddress,
      InsuredMobileNo1,
      InsuredMobileNo2,
      InsuredName,
      requestType,
      ClaimNumber,
      EngineType,
      DateRegistration,
      PUCNumber,
      TransferDate,
      AddedBy,
      Verification,
      GarageAddedBy,
      InspectionDate,
      GarageContactNo1,
      GarageContactNo2,
      GarageNameAndAddress,
      ClaimAddedDateTime,
      PolicyIssuingOffice,
      PolicyNumber,
      DriverName,
      DriverAddedDate,
      IssuingAuthority,
      LicenseNumber,
      LicenseType,
      BadgeNumber,
      driverRemark,
      VehicleRegisteredNumber,
      RegisteredOwner,
      VehicleChassisNumber,
      EngineNumber,
      VehicleTypeOfBody,
      VehicleCubicCapacity,
      VehicleClassOfVehicle,
      VehicleFuelType,
      VehicleOdometerReading,
      VehiclePreAccidentCondition,
      VehicleModel,
      VehicleTaxParticulars,
      VehicleSeatingCapacity,
      AccidentAddedDateTime,
      AccidentTime,
      PlaceOfLoss,
      SurveyAllotmentDate,
      SurveyConductedDate,
  
      FitnessCertificate,
      FitnessFrom,
      FitnessTo,
      PermitTo,
      PermitNo,
      PermitFrom,
      TypeOfPermit,
      Authorization,
      AreasOfoperation,
      commercialRemark,
      FinalReportNotes,
  
      DetailsOfLoads,
      CauseOfAccident,
      PoliceAction,
      ThirdPartyLoss,
      Assessment,
      leadId,

      TotalLabor,
      TotalEstimate,
      LessExcess,
      ExpectedSalvage,
      MetalPercent,
      RemarkOnSalvage,
      TotalCostOfParts,
      AccidentInspectionDate,
      Other,
      GrandTotal,
      DepreciationOnParts,
      NetAssessedAmount,
      SavageDepreciationDetails,
      CashLess,
      NoteOfSelf,
      RepairAutoDate,
      RepairCompletionDate,
      PartyAgreed,
      ReasonThereofDelay,
      AnyFurtherConversation,
      RepairingPhotoDate,
      ReinspectionDate,
    
      SalveDestroy,
      BillNo,
      BillDate,
      BillAmount,
      setVehicleUpto,
      AddedDateTime,
      Endurance,
      OtherRemark,
      TotalLoss,
      DateOfBirth,
      IMT,
      ValidUpto,
      phyCheck
    } = req.body;

    const updateDriverDetails = `
    UPDATE DriverDetails
    SET
    AddedDate = '${DriverAddedDate}' ,
    DriverName = '${DriverName}',
    LicenseNumber='${LicenseNumber}',
    LicenseType='${LicenseType}',
    IssuingAuthority = '${IssuingAuthority}',
    DateOfIssue = '${DateOfIssue}',
    ValidFrom='${ValidFrom}',
    ValidUntilNtv = '${ValidUntilNtv}',
    ValidUntilTv = '${ValidUntilTv}',
    BadgeNumber='${BadgeNumber}',
    Remark='${driverRemark}',
    DateOfBirth='${DateOfBirth}',
    ValidUpto='${ValidUpto}'
    WHERE LeadID = ${leadId};
  `;

  // Update ClaimDetails query with CASE statement
  const updateClaimDetails = `
    UPDATE ClaimDetails
    SET
    InsuranceCompanyNameAddress = '${InsuranceCompanyNameAddress}',
    SurveyType = '${""}',
    PolicyIssuingOffice='${PolicyIssuingOffice}',
    PolicyNumber = '${PolicyNumber}',
    PolicyPeriodStart='${PolicyPeriodStart}',
    PolicyPeriodEnd='${ PolicyPeriodEnd}' ,
    ClaimNumber = '${ClaimNumber}',
    ClaimServicingOffice='${ClaimServicingOffice}',
    InspectionType = '${""}',
    PolicyType='${PolicyType}',
    IDV='${IDV}',
    MailRecieveDate='${MailRecieveDate}',
    HPA='${HPA}',
    AddedDateTime = '${AddedDateTime}',
    TotalLoss = ${(TotalLoss) ? 1 : 0},
    IMT = ${(IMT) ? 1 : 0}
    WHERE LeadID = ${leadId};
  `;

 

  // Update VehicleDetails query with CASE statement
   
  const updateVehicleDetails = `
    UPDATE VehicleDetails
    SET
    TypeOfVerification = '${Verification}',
    RegisteredNumber = '${VehicleRegisteredNumber}',
    RegisteredOwner='${RegisteredOwner}',
    TransferDate = '${TransferDate}',
    DateOfRegistration = '${DateRegistration}',
    MakeVariantModelColor = '${VehicleMakeVariantModelColor}',
    EngineNumber='${EngineNumber}',
    ChassisNumber = '${VehicleChassisNumber}',
    TypeOfBody = '${VehicleTypeOfBody}',
    ClassOfVehicle = '${VehicleClassOfVehicle}',
    PreAccidentCondition='${VehiclePreAccidentCondition}',
    SeatingCapacity = '${VehicleSeatingCapacity}',
    CubicCapacity = '${VehicleCubicCapacity}',
    FuelType = '${VehicleFuelType}',
    TaxParticulars='${VehicleTaxParticulars}',
    OdometerReading = '${VehicleOdometerReading}',
    PucNumber='${PUCNumber}',
    OwnerSrDate='${OwnerSRST}',
    RegLadenWt='${(RegLadenWt)}',
    RemarkIfRLW='${RemarkIfRLW}',
    UnladenWT='${(UnladenWT)}',
    RemarkIfULW='${RemarkIfULW}',
    Remark='${VehicleRemark}',
    VehicleType='${VehicleType}',
    AntiTheft='${AntiTheft}'
    WHERE LeadID = ${leadId};
  `;

  // Update GarageDetails query with CASE statement
  const updateGarageDetails = `
    UPDATE GarageDetails
    SET
    GarageNameAndAddress = '${GarageNameAndAddress}',
    GarageContactNo1 = '${GarageContactNo1}',
    GarageContactNo2='${GarageContactNo2}',
    AddedBy='${GarageAddedBy}'
    WHERE LeadID = ${leadId};
  `;

  // Update InsuredDetails query with CASE statement
  const updateInsuredDetails = `
    UPDATE InsuredDetails
    SET
    InsuredName = '${InsuredName}',
    InsuredMobileNo1 = '${InsuredMobileNo1}',
    InsuredMobileNo2='${InsuredMobileNo2}',
    InsuredMailAddress = '${InsuredMailAddress}',
    InsuredAddress = '${InsuredAddress}'
    WHERE LeadID = ${leadId};
  `;

  // Update AccidentDetails query with CASE statement
  const updateAccidentDetails = `
    UPDATE AccidentDetails
    SET
    PlaceOfLoss = '${PlaceOfLoss}',
    SurveyConductedDate ='${SurveyConductedDate}',
    Pin='${Pin}',
    InspectionDate='${InspectionDate}',
    PlaceOfSurvey='${PlaceOfSurvey}',
    DetailsOfLoads='${DetailsOfLoads}',
    CauseOfAccident='${CauseOfAccident}',
    PoliceAction='${PoliceAction}',
    ThirdPartyLoss='${ThirdPartyLoss}',
    Assessment='${Assessment}',
    DateOfAccident='${AccidentAddedDateTime}',
    TimeOfAccident='${AccidentTime}'
    WHERE LeadID = ${leadId};
  `;

    const insertIntoCommercialVehicleDetails = `
    INSERT INTO CommercialVehicleDetails (
      FitnessCertificate,
        FitnessFrom,
        FitnessTo,
        PermitTo,
        PermitNo,
        PermitFrom,
      TypeOfPermit,
      Authorization,
      AreasOfoperation,
      Remark,
      LeadID 
    ) VALUES (
      '${FitnessCertificate}',
     '${FitnessFrom}',
     '${FitnessTo }', 
     '${PermitTo}',
      '${PermitNo}',
     '${PermitFrom}',
      '${TypeOfPermit}',
      '${Authorization}',
      '${AreasOfoperation}',
      '${commercialRemark}',
      '${(leadId)}'
    );
    `;
  
    const updateCommercialVehicleDetails = `
    UPDATE CommercialVehicleDetails
          SET
          FitnessCertificate = '${FitnessCertificate}',
          FitnessFrom ='${FitnessFrom}' ,
          FitnessTo='${FitnessTo}',
          PermitTo='${PermitTo}',
          PermitNo='${PermitNo}',
          PermitFrom='${PermitFrom}',
          TypeOfPermit='${TypeOfPermit}',
          Authorization='${Authorization}',
          AreasOfoperation='${AreasOfoperation}',
          Remark='${commercialRemark}'
          WHERE LeadID = ${leadId};
    `;

    const updateSummaryDetails = `
    UPDATE SummaryReport
          SET
          TotalLabour = '${TotalLabor}',
          TotalEstimate ='${TotalEstimate}' ,
          TotalCostOfParts='${TotalCostOfParts}',
          LessExcess='${LessExcess}',
          ExpectedSalvage='${ExpectedSalvage}',
          MetalPercent='${MetalPercent}',
          RemarkOnSalvage='${RemarkOnSalvage}',
          Other='${Other}',
          GrandTotal='${GrandTotal}',
          DepreciationOnParts='${DepreciationOnParts}',
          NetAssessedAmount='${NetAssessedAmount}',
          SavageDepreciationDetails='${SavageDepreciationDetails}',
          CashLess=${CashLess?1:0},
          NoteOfSelf='${NoteOfSelf}',
          RepairAutoDate='${RepairAutoDate}',
          RepairCompletionDate='${RepairCompletionDate}',
          PartyAgreed='${PartyAgreed}', 
          ReasonThereofDelay='${ReasonThereofDelay}',
          AnyFurtherConversation='${AnyFurtherConversation}',
          RepairingPhotoDate='${RepairingPhotoDate}',
          ReinspectionDate='${ReinspectionDate}',
          SalveDestroy='${SalveDestroy}',
          BillNo='${BillNo}',
          BillDate='${BillDate}',
          BillAmount='${BillAmount}',
          Endurance='${Endurance}',
          OtherRemark='${OtherRemark}',
          SummaryNotes='${FinalReportNotes}'
          WHERE LeadId = ${leadId};
    `;
  
    const insertSummaryDetails = `
      INSERT INTO SummaryReport (
        LeadId, TotalLabour, TotalEstimate, TotalCostOfParts, LessExcess, ExpectedSalvage, MetalPercent, RemarkOnSalvage,
       Other, GrandTotal, DepreciationOnParts, NetAssessedAmount, SavageDepreciationDetails, CashLess,
        NoteOfSelf, RepairAutoDate, RepairCompletionDate, PartyAgreed, ReasonThereofDelay, AnyFurtherConversation,
        RepairingPhotoDate, ReinspectionDate, SalveDestroy, BillNo, BillDate, BillAmount, Endurance,OtherRemark,SummaryNotes
      ) VALUES (
        ${leadId}, ${TotalLabor}, ${TotalEstimate}, ${TotalCostOfParts}, ${LessExcess}, ${ExpectedSalvage}, ${MetalPercent},
        '${RemarkOnSalvage}', '${Other}', ${GrandTotal}, ${DepreciationOnParts}, ${NetAssessedAmount},
        '${SavageDepreciationDetails}', '${CashLess}', '${NoteOfSelf}', '${RepairAutoDate}', '${RepairCompletionDate}',
        '${PartyAgreed}', '${ReasonThereofDelay}', '${AnyFurtherConversation}', '${RepairingPhotoDate}', '${ReinspectionDate}',
        '${SalveDestroy}', '${BillNo}', '${BillDate}', '${BillAmount}', '${Endurance}','${OtherRemark}','${FinalReportNotes}'
      );
    `;


    
    db.query(updateClaimDetails, (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
  });

  db.query(updateAccidentDetails, (err, result2) => {
    if (err) {
      console.error(err);
      res.status(500).send("Internal Server Error");
      return;
    }
   
  });
    db.query(updateDriverDetails, (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
     
    });
    db.query(updateGarageDetails, (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
     
    });
  
    db.query(updateInsuredDetails, (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
     
    });
    db.query(updateVehicleDetails, (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
     
    });

   
  
    db.query("SELECT * FROM SummaryReport WHERE LeadId=?",[leadId], (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
     
        const query = result2?.length ? updateSummaryDetails : insertSummaryDetails;
        
        
      db.query(query, (err, result2) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        
      });
    
    });


    db.query("SELECT * FROM CommercialVehicleDetails WHERE LeadID=?",[leadId], (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
     
        const query = result2?.length ? updateCommercialVehicleDetails : insertIntoCommercialVehicleDetails;
        
      db.query(query, (err, result2) => {
        if (err) {
          console.error(err);
          res.status(500).send("Internal Server Error");
          return;
        }
        
      });
    
    });
  

  


  
    res.status(200).send("Successfully Updated!!");

  };

  module.exports={updateFinalReport}
  
