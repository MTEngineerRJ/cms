
const db = require("../Config/dbConfig");
const axios = require('axios');

const generateUniqueToken = require("../Config/generateToken");

const addClaim =  (req, res) => {
    const {
      SurveyType,
      ReferenceNo,
      PolicyIssuingOffice,
      PolicyNumber,
      PolicyPeriodStart,
      PolicyPeriodEnd,
      ClaimNumber,
      BrokerMailAddress,
      ClaimServicingOffice,
      AddedBy,
      Region,
      InspectionType,
      IsClaimCompleted,
      IsActive,
      InsuredName,
      InsuredMobileNo1,
      InsuredMobileNo2,
      InsuredMailAddress,
      InsuredAddress,
      GarageMailAddress,
      RegisteredNumber,
      GarageNameAndAddress,
      GarageContactNo1,
      GarageContactNo2,
      PlaceOfLoss,
      NatureOfLoss,
      EstimatedLoss,
    } = req.body;


   
    const authorizationHeader = req.headers.authorization;
  
    const token = authorizationHeader.substring("Bearer ".length);
  
    const generatedToken = generateUniqueToken();
    const insertClaimDetails = `
      INSERT INTO ClaimDetails (
        SurveyType,
        ReferenceNo,
        PolicyNumber,
        PolicyPeriodStart,
        PolicyPeriodEnd,
        ClaimServicingOffice,
        AddedBy,
        Region,
        InspectionType,
        IsClaimCompleted,
        BrokerMailAddress,
        InsuredToken,
        PolicyIssuingOffice,
        IsActive
      ) VALUES (
        '${SurveyType}',
        '${ReferenceNo}',
        '${PolicyNumber}',
        '${PolicyPeriodStart}',
        '${PolicyPeriodEnd}',
        '${ClaimServicingOffice}',
        '${(AddedBy)}',
        '${Region}',
        '${InspectionType}',
        ${parseInt(IsClaimCompleted)},
        '${BrokerMailAddress}',
        '${generatedToken}',
        '${PolicyIssuingOffice}',
        ${parseInt(IsActive)}
      );
    `;
    
  const generateReference = (leadId) => {
      const firstThreeLetters = Region?.slice(0, 3);
  
      const now = new Date();
      const yy = String(now.getFullYear()).slice(-2);;
      const mm = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
      const result = `${firstThreeLetters}/${yy}-${mm}/${leadId}`;
  
      return result;
    };
    
    db.query(insertClaimDetails, (error, results) => {
      if (error) {
        console.error("Error inserting data into ClaimDetails:", error);
        return res
          .status(500)
          .json({ error: "Error inserting data into ClaimDetails." });
      }
  
      db.query(
        "SELECT LeadId FROM ClaimDetails ORDER BY LeadId DESC LIMIT 1",
        (error, results) => {
          if (error) {
            console.error("Error inserting data into ClaimDetails:", error);
            return res
              .status(500)
              .json({ error: "Error inserting data into ClaimDetails." });
          }
          console.log(results);
          const addLeadId = results[0].LeadId;
          //   const ReferenceNo=  generateReference(addLeadId)
          // const update_query = `UPDATE ClaimDetails SET ReferenceNo = '${ReferenceNo}' where LeadID=${addLeadId}`
          // db.query(update_query, (error, results) => {
          //   if (error) {
          //     console.error("Error updating data into Reference Number:", error);
          //     return res
          //       .status(500)
          //       .json({ error: "Error updating data into Reference Number." });
          //   }})
          const insertVehicleDetails = `
      INSERT INTO VehicleDetails (
        RegisteredNumber,
        LeadId 
      ) VALUES (
        '${RegisteredNumber}',
        ${parseInt(results[0].LeadId)}
      );
    `;
  
          const statusDetails = `
      INSERT INTO ClaimStatus (
        Status,
        SubStatus,
        LeadId 
      ) VALUES (
        ${1},
        ${2},
        ${parseInt(results[0].LeadId)}
      );
    `;
  
          const insertGarageDetails = `
      INSERT INTO GarageDetails (
        GarageNameAndAddress,
        GarageContactNo1,
        GarageContactNo2,
        GarageMailAddress,
        LeadId 
      ) VALUES (
        '${GarageNameAndAddress}',
       '${GarageContactNo1}',
        '${GarageContactNo2}',
        '${GarageMailAddress}',
        ${parseInt(results[0].LeadId)}
      );
    `;
  
          const insertAccidentDetails = `
      INSERT INTO AccidentDetails (
        PlaceOfLoss,
        NatureOfLoss,
        EstimatedLoss,
        LeadId
      ) VALUES (
        '${PlaceOfLoss}',
        '${NatureOfLoss}',
        '${(EstimatedLoss)}',
        ${parseInt(results[0].LeadId)}
      );
    `;
  
          const insertDriverDetails = `
      INSERT INTO DriverDetails (
        LeadId
      ) VALUES (
        ${parseInt(results[0].LeadId)}
      );
    `;

    const insertFeeDetails = `
    INSERT INTO BillReportFees (
      LeadID
    ) VALUES (
      ${parseInt(results[0].LeadId)}
    );
  `;
  
          const insertInsuredDetails = `
      INSERT INTO InsuredDetails (
        InsuredName,
        InsuredMobileNo1,
        InsuredMobileNo2,
        InsuredMailAddress,
        LeadId
      ) VALUES (
        '${InsuredName}',
        '${InsuredMobileNo1}',
        '${InsuredMobileNo2}',
        '${InsuredMailAddress}',
        ${parseInt(results[0].LeadId)}
      );
    `;

    const insertCommercialDetails = `
    INSERT INTO CommercialVehicleDetails (
      LeadId
    ) VALUES (
      ${parseInt(results[0].LeadId)}
    );
  `;


//   const insertSummaryDetails = `
//   INSERT INTO CommercialVehicleDetails (
//     LeadId
//   ) VALUES (
//     ${parseInt(results[0].LeadId)}
//   );
// `;

   
          // Execute the SQL queries individually
  
          db.query(insertVehicleDetails, (error, results) => {
            if (error) {
              console.error("Error inserting data into VehicleDetails:", error);
              return res
                .status(500)
                .json({ error: "Error inserting data into VehicleDetails." });
            }
  
            db.query(insertGarageDetails, (error, results) => {
              if (error) {
                console.error("Error inserting data into GarageDetails:", error);
                return res
                  .status(500)
                  .json({ error: "Error inserting data into GarageDetails." });
              }
  
              db.query(insertAccidentDetails, (error, results) => {
                if (error) {
                  console.error(
                    "Error inserting data into AccidentDetails:",
                    error
                  );
                  return res.status(500).json({
                    error: "Error inserting data into AccidentDetails.",
                  });
                }

                db.query(insertCommercialDetails, (error, results) => {
                  if (error) {
                    console.error(
                      "Error inserting data into CommercialDetails:",
                      error
                    );
                    return res.status(500).json({
                      error: "Error inserting data into CommercialDetails.",
                    });
                  }
                });
  
                db.query(insertInsuredDetails, (error, results) => {
                  if (error) {
                    console.error(
                      "Error inserting data into InsuredDetails:",
                      error
                    );
                    return res.status(500).json({
                      error: "Error inserting data into InsuredDetails.",
                    });
                  }

                  db.query(insertFeeDetails, (error, results) => {
                    if (error) {
                      console.error(
                        "Error inserting data into FeeDetails:",
                        error
                      );
                      return res.status(500).json({
                        error: "Error inserting data into FeeDetails.",
                      });
                    }
                  });

                  db.query(statusDetails, (error, results) => {
                    db.query(insertDriverDetails, (error, results) => {
                      if (error) {
                        console.error(
                          "Error inserting data into DriverDetails:",
                          error
                        );
                        return res.status(500).json({
                          error: "Error inserting data into DriverDetails.",
                        });
                      }

                      // db.query(insertSummaryDetails, (error, results) => {
                      //   if (error) {
                      //     console.error(
                      //       "Error inserting data into DriverDetails:",
                      //       error
                      //     );
                      //     return res.status(500).json({
                      //       error: "Error inserting data into InsuredDetails.",
                      //     });
                      //   }
                      // });
    

                      // db.query(insertSummaryDetails, (error, results) => {
                      //   if (error) {
                      //     console.error(
                      //       "Error inserting data into DriverDetails:",
                      //       error
                      //     );
                      //     return res.status(500).json({
                      //       error: "Error inserting data into InsuredDetails.",
                      //     });
                      //   }
                      // });
    
                      if(InsuredMailAddress !== "" ){
                      axios
                        .post(
                          `${process.env.BACKEND_DOMAIN}/email/sendEmail/1`,
                          {
                            vehicleNo: RegisteredNumber,
                            PolicyNo: PolicyNumber,
                            Insured: InsuredName,
                            toMail: InsuredMailAddress,
                            Date: new Date(),
                            leadId: addLeadId,
                            type : 1
                          },
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                              "Content-Type": "application/json",
                            },
                          }
                        )
                        .then((ressss) => {
                          console.log(ressss);
                        })
                        .catch((Er) => {
                          return res.status(500).json({
                            error:
                              "Error sending email into Acknowldegment Mail.",
                          });
                        });
                      }
                        if (GarageMailAddress !== "") {
                          axios
                            .post(
                              `${process.env.BACKEND_DOMAIN}/email/sendEmail/2`,
                              {
                                vehicleNo: RegisteredNumber,
                                PolicyNo: PolicyNumber,
                                Insured: InsuredName,
                                toMail: GarageMailAddress,
                                Date: new Date(),
                                leadId:addLeadId,
                                type : 2
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((ressss) => {
                             console.log(ressss);
                            })
                            .catch((Er) => {
                              return res.status(500).json({
                                error: "Error sending email into Garage Mail.",
                              });
                            });
                        }
                        if (BrokerMailAddress !== "") {
                          axios
                            .post(
                              `${process.env.BACKEND_DOMAIN}/email/sendEmail/2`,
                              {
                                vehicleNo: RegisteredNumber,
                                PolicyNo: PolicyNumber,
                                Insured: InsuredName,
                                toMail: BrokerMailAddress,
                                Date: new Date(),
                                leadId:addLeadId,
                                type : 3
                              },
                              {
                                headers: {
                                  Authorization: `Bearer ${token}`,
                                  "Content-Type": "application/json",
                                },
                              }
                            )
                            .then((ressss) => {
                              console.log(ressss);
                            })
                            .catch((Er) => {
                              return res.status(500).json({
                                error:
                                  "Error sending email into Broker Mail.",
                              });
                            });

                          

                          
                        }
  
                      //garage
                      return res.status(200).json({
                        message: "Data inserted successfully.",
                      });
                      //broker
                    });
                  });
                });
              });
            });
          });
        }
      );
    });
  };
  

const getSpecificClaim = async (req, res) => {
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
      const claimDetails = await executeQuery(
        "SELECT * FROM ClaimDetails WHERE LeadID=?",
        [leadId]
      );
      const insuredDetails = await executeQuery(
        "SELECT * FROM InsuredDetails WHERE LeadID=?",
        [leadId]
      );
      const accidentDetails = await executeQuery(
        "SELECT * FROM AccidentDetails WHERE LeadID=?",
        [leadId]
      );
      const driverDetails = await executeQuery(
        `SELECT 
        LicenseNumber,
        DriverName,
        Vov,
        ValidUpto,
        RtoName,
        Address,
        Mobile,
        BloodGroup,
        Gender,
        FatherName,
        DateOfBirth,
        DateOfIssue,
        IssuingAuthority,
        BadgeNumber,
        Remark,
        LicenseType,
        DateOfBirth,
        TypeOfverification,
        ValidUpto,
        LeadID
        FROM DriverDetails WHERE LeadID=?`,
        [leadId]
      );
      const vehicleOnlineDetails = await executeQuery(
        `SELECT RegisteredNumber,
        TypeOfBody,
        DateOfRegistration,
        EngineNumber,
        ChassisNumber,
        FuelType,
        MakerDesc,
        MakerModel,
        CubicCapacity,
        SeatingCapacity,
        FitUpto,
        PasiaModelCode,
        VehicleType,
        BancsModelCode,
        BancsMakeCode,
        BancsSubtypeCode,
        BancsBodyType,
        BancsVehicleClass,
        BancsVehicleSegment,
        RcRtoCode,
        VehicleRcStatus,
        VehicleBlackListStatus,
        VehicleRegistedAt,
        ManufactureMonthYear,
        PermanentAddress,
        ClassOfVehicle,
        RegisteredOwner,
        VehicleInsuranceUpto,
        PucValidUntil,
        PucNumber,
        VehicleInsuranceCompany,
        MakeVariantModelColor,
        TaxParticulars,
        TypeOfVerification,
        VehicleClassDescription,
        LeadId
         FROM VehicleDetailsOnline WHERE LeadId=?`,
        [leadId]
      );
      const driverOnlineDetails = await executeQuery(
        `SELECT 
        LicenseNumber,
        DriverName,
        Vov,
        ValidUpto,
        RtoName,
        Address,
        Mobile,
        BloodGroup,
        Gender,
        FatherName,
        DateOfBirth,
        DateOfIssue,
        IssuingAuthority,
        BadgeNumber,
        Remark,
        LicenseType,
        LeadID
        FROM DriverDetailsOnline WHERE LeadID=?`,
        [leadId]
      );
      const vehicleDetails = await executeQuery(
        `SELECT  
        RegisteredNumber,
        TypeOfBody,
        DateOfRegistration,
        EngineNumber,
        ChassisNumber,
        FuelType,
        MakerDesc,
        MakerModel,
        CubicCapacity,
        SeatingCapacity,
        FitUpto,
        PasiaModelCode,
        VehicleType,
        BancsModelCode,
        BancsMakeCode,
        BancsSubtypeCode,
        BancsBodyType,
        BancsVehicleClass,
        BancsVehicleSegment,
        RcRtoCode,
        VehicleRcStatus,
        VehicleBlackListStatus,
        VehicleRegistedAt,
        ManufactureMonthYear,
        PermanentAddress,
        ClassOfVehicle,
        RegisteredOwner,
        VehicleInsuranceUpto,
        PucValidUntil,
        PucNumber,
        VehicleInsuranceCompany,
        MakeVariantModelColor,
        TaxParticulars,
        OwnerSrDate,
        RegLadenWt,
        RemarkIfRLW,
        UnladenWT,
        RemarkIfULW,
        Remark,
        OdometerReading,
        AntiTheft,
        PreAccidentCondition,
        FitUpto,
        TransferDate,
        AddedBy,
        VehicleClassDescription,
        LeadID
        FROM VehicleDetails WHERE LeadID=?`,
        [leadId]
      );
      const garageDetails = await executeQuery(
        "SELECT * FROM GarageDetails WHERE LeadID=?",
        [leadId]
      );
      const summaryDetails = await executeQuery(
        "SELECT * FROM SummaryReport WHERE LeadId=?",
        [leadId]
      );
      const claimStatus = await executeQuery(
        "SELECT * FROM ClaimStatus WHERE LeadID=?",
        [leadId]
      );
  
      const commercialVehicleDetails = await executeQuery(
        "SELECT * FROM CommercialVehicleDetails WHERE LeadID=?",
        [leadId]
      );
  
      const combinedResult = {
        claimDetails,
        insuredDetails,
        accidentDetails : accidentDetails,
        driverDetails,
        vehicleDetails,
        garageDetails:garageDetails,
        claimStatus,
        vehicleOnlineDetails,
        driverOnlineDetails,
        commercialVehicleDetails,
        summaryDetails
      };
  
      // console.log(combinedResult)
      // console.log(combinedResult)
  
      res.json(combinedResult);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
 };


 const updateClaim = async(req, res) => {
  
  const {
    InsuredName,
    InsuredMailAddress,
    InsuredMobileNo1,
    InsuredMobileNo2,
    ClaimNumber,
    PolicyIssuingOffice,
    ClaimRegion,
    ClaimServicingOffice,
    InspectionType,
    SurveyType,
    PolicyPeriodStart,
    PolicyPeriodEnd,
    CubicCapacity,
    InsuranceCompanyNameAddress,
    InsuredAddedBy,
    VehicleMakeVariantModelColor,
    VehicleTypeOfBody,
    VehicleRegisteredNumber,
    VehicleDateOfRegistration,
    VehiclePucNumber,
    VehicleRegisteredOwner,
    VehicleTransferDate,
    VehicleEngineNumber,
    VehicleAddedBy,
    IssuingAuthority,
    LicenseNumber,
    LicenseType,
    VehicleChassisNumber,
    VehicleFuelType,
    DriverName,
    DriverAddedDate,
    DriverTypeOfVerification,
    GarageNameAndAddress,
    GarageAddedBy,
    GarageContactNo1,
    GarageContactNo2,
    VehicleClassDescription,
    MakerDesc,
    MakerModel,
    ManufactureMonth,
    VehicleGvw,
    VehicleCubicCap,
    VehicleSeatingCapacity,
    VehiclePermanentAddress,
    FitUpto,
    PasiaModelCode,
    RcInsuranceComp,
    RcInsuranceUpto,
    RcRegisteredAt,
    RcBlacklistStatus,
    RcVehicleType,
    BancsModelCode,
    BancsMakeCode,
    BancsSubtypeCode,
    BancsBodyType,
    BancsVehicleClass,
    BancsVehicleSegment,
    RcRtoCode,
    VehicleRcStatus,
    VehicleBlackListStatus,
    VehicleRegistedAt,
    VehicleInsuranceCompany,
    ManufactureMonthYear,
    PermanentAddress,
    ClassOfVehicle,
    insuredAddedBy,
    SeatingCapacity,
    FatherName,
    Gender,
    BloodGroup,
    Mobile,
    Address,
    RtoName,
    ValidUpto,
    ValidFrom,
    driverRemark,
    DateOfBirth,
    Vov,
    Photo,
    Pht,
    BadgeNumber,
    IsDriverDetailsFetched,
    IsRcDetailsFetched,
    DateOfIssue,

    LeadId,
  } = req.body;


  console.log(ValidFrom);
    const updateClaimDetails = `
    UPDATE ClaimDetails
    SET
    PolicyIssuingOffice = ${PolicyIssuingOffice ? `${PolicyIssuingOffice}` : ''},
    Region = '${ClaimRegion}',
    ClaimServicingOffice = ${ClaimServicingOffice ? `${ClaimServicingOffice}` : ''},
    InspectionType = '${InspectionType}',
    SurveyType = '${SurveyType}',
    PolicyPeriodStart = ${PolicyPeriodStart ? `${PolicyPeriodStart}` : ''},
    PolicyPeriodEnd = ${PolicyPeriodEnd ? `${PolicyPeriodEnd}` : ''},
    IsDriverDetailsFetched = ${IsDriverDetailsFetched ? IsDriverDetailsFetched : ''},
    IsRcDetailsFetched = ${IsRcDetailsFetched ? IsRcDetailsFetched : ''},
    InsuranceCompanyNameAddress = ${InsuranceCompanyNameAddress ? `${InsuranceCompanyNameAddress}` : ''}
    WHERE LeadId = ${LeadId};
  `;
  
  // Update DriverDetails
  const updateDriverDetails = `
    UPDATE DriverDetails
    SET
    IssuingAuthority = ${IssuingAuthority ? `${IssuingAuthority}` : ''},
    LicenseNumber = '${LicenseNumber}',
    LicenseType = '${LicenseType}',
    DriverName = '${DriverName}',
    AddedDate = ${DriverAddedDate ? `${DriverAddedDate}` : ''},
    Pht = ${Pht ? `${Pht}` : ''},
    Photo = ${Photo ? `${Photo}` : ''},
    Vov = ${Vov ? `${Vov}` : ''},
    ValidUpto = ${ValidFrom ? `${ValidFrom}` : ''},
    RtoName = ${RtoName ? `${RtoName}` : ''},
    Address = ${Address ? `${Address}` : ''},
    Mobile = ${Mobile ? `${Mobile}` : ''},
    BloodGroup = ${BloodGroup ? `${BloodGroup}` : ''},
    Gender = ${Gender ? `${Gender}` : ''},
    FatherName = ${FatherName ? `${FatherName}` : ''},
    BadgeNumber='${BadgeNumber}',
    DateOfBirth = ${DateOfBirth ? `${DateOfBirth}` : ''},
    DateOfIssue = ${DateOfIssue ? `${DateOfIssue}` : ''},
    TypeOfVerification = '${DriverTypeOfVerification}',
    DateOfBirth='${DateOfBirth}'
    WHERE LeadID = ${LeadId};
  `;
  
  // Update VehicleDetails
  const updateVehicleDetails = `
  UPDATE VehicleDetails
  SET 
    RegisteredNumber = ${VehicleRegisteredNumber ? `${VehicleRegisteredNumber}` : ''},
    MakeVariantModelColor = ${VehicleMakeVariantModelColor ? `${VehicleMakeVariantModelColor}` : ''},
    TypeOfBody = ${VehicleTypeOfBody ? `${VehicleTypeOfBody}` : ''},
    DateOfRegistration = ${VehicleDateOfRegistration ? `${VehicleDateOfRegistration}` : ''},
    TransferDate = ${VehicleTransferDate ? `${VehicleTransferDate}` : ''},
    EngineNumber = ${VehicleEngineNumber ? `${VehicleEngineNumber}` : ''},
    AddedBy = ${VehicleAddedBy ? `${VehicleAddedBy}` : ''},
    ChassisNumber = ${VehicleChassisNumber ? `${VehicleChassisNumber}` : ''},
    FuelType = ${VehicleFuelType ? `${VehicleFuelType}` : ''},
    MakerDesc = ${MakerDesc ? `${MakerDesc}` : ''},
    MakerModel = ${MakerModel ? `${MakerModel}` : ''},
    CubicCapacity = ${CubicCapacity ? `${CubicCapacity}` : ''},
    FitUpto = ${FitUpto ? `${FitUpto}` : ''},
    PasiaModelCode = ${PasiaModelCode ? `${PasiaModelCode}` : ''},
    VehicleType = ${RcVehicleType ? `${RcVehicleType}` : ''},
    BancsModelCode = ${BancsModelCode ? `${BancsModelCode}` : ''},
    BancsMakeCode = ${BancsMakeCode ? `${BancsMakeCode}` : ''},
    BancsSubtypeCode = ${BancsSubtypeCode ? `${BancsSubtypeCode}` : ''},
    BancsBodyType = ${BancsBodyType ? `${BancsBodyType}` : ''},
    BancsVehicleClass = ${BancsVehicleClass ? `${BancsVehicleClass}` : ''},
    BancsVehicleSegment = ${BancsVehicleSegment ? `${BancsVehicleSegment}` : ''},
    RcRtoCode = ${RcRtoCode ? `${RcRtoCode}` : ''},
    VehicleRcStatus = ${VehicleRcStatus ? `${VehicleRcStatus}` : ''},
    VehicleBlackListStatus = ${VehicleBlackListStatus ? `${VehicleBlackListStatus}` : ''},
    VehicleRegistedAt = ${VehicleRegistedAt ? `${VehicleRegistedAt}` : ''},
    VehicleInsuranceCompany = ${VehicleInsuranceCompany ? `${VehicleInsuranceCompany}` : ''},
    ManufactureMonthYear = ${ManufactureMonthYear ? `${ManufactureMonthYear}` : ''},
    PermanentAddress = ${PermanentAddress ? `${PermanentAddress}` : ''},
    ClassOfVehicle = ${ClassOfVehicle ? `${ClassOfVehicle}` : ''},
    RegisteredOwner = ${VehicleRegisteredOwner ? `${VehicleRegisteredOwner}` : ''},
    SeatingCapacity = ${SeatingCapacity ? `${SeatingCapacity}` : ''},
    VehicleInsuranceUpto = ${RcInsuranceUpto ? `${RcInsuranceUpto}` : ''}
  WHERE LeadId = ${LeadId};
`;
  
  // Update GarageDetails
  const updateGarageDetails = `
    UPDATE GarageDetails
    SET
    GarageNameAndAddress = ${GarageNameAndAddress ? `${GarageNameAndAddress}` : ''},
    GarageContactNo1 = ${GarageContactNo1 ? `${GarageContactNo1}` : ''},
    GarageContactNo2 = ${GarageContactNo2 ? `${GarageContactNo2}` : "''"},
    AddedBy = ${GarageAddedBy ? `${GarageAddedBy}` : ''}
    WHERE LeadId = ${LeadId};
  `;
  
  // Update InsuredDetails
  const updateInsuredDetails = `
    UPDATE InsuredDetails
    SET
    InsuredName = ${InsuredName ? `${InsuredName}` : ''},
    InsuredMobileNo1 = ${InsuredMobileNo1 ? `${InsuredMobileNo1}` : ''},
    InsuredMobileNo2 = ${InsuredMobileNo2 ? `${InsuredMobileNo2}` : ''},
    InsuredMailAddress = '${InsuredMailAddress}'
    WHERE LeadId = ${LeadId};
  `;
  
    db.query(updateClaimDetails, (error, results) => {
      if (error) {
        console.error("Error updating data in ClaimDetails:", error);
        return res
          .status(500)
          .json({ error: "Error updating data in ClaimDetails." });
      }
  
      db.query(updateDriverDetails, (error, results) => {
        if (error) {
          console.error("Error updating data in ClaimDetails:", error);
          return res
            .status(500)
            .json({ error: "Error updating data in ClaimDetails." });
        }
  
        db.query(updateVehicleDetails, (error, results) => {
          if (error) {
            console.error("Error updating data in VehicleDetails:", error);
            return res
              .status(500)
              .json({ error: "Error updating data in VehicleDetails." });
          }
  
          db.query(updateGarageDetails, (error, results) => {
            if (error) {
              console.error("Error updating data in GarageDetails:", error);
              return res
                .status(500)
                .json({ error: "Error updating data in GarageDetails." });
            }
  
            db.query(updateInsuredDetails, (error, results) => {
              if (error) {
                console.error("Error updating data in InsuredDetails:", error);
                return res
                  .status(500)
                  .json({ error: "Error updating data in InsuredDetails." });
              }
  
              res.status(200).json({ message: "Data updated successfully." });
            });
          });
        });
      });
    });
  };


  const getAllClaims = (req, res) => {
    const region = req.query.region;
    const sql = "CALL GetPolicyInfoByRegion(?)";
    db.query(sql, [null], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }
      res.send(result);
    });
  };

   const getClaimDetails = (req, res) => {
    const { token,type, leadId } = req.body;
   
    const sql = "SELECT InsuredToken ,ImageToken , VideoToken FROM ClaimDetails WHERE LeadId =?";
    db.query(sql, [leadId], (err, result2) => {
      if (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
        return;
      }

      const stat1 =  result2[0]?.InsuredToken === token && String(type) === "1";
      const stat2 =  result2[0]?.ImageToken === token && String(type) === "2";
      const stat3 =  result2[0]?.VideoToken === token && String(type) === "3";
      console.log(type,token, result2[0]?.InsuredToken,  result2[0]?.ImageToken ,result2[0]?.VideoToken)
      console.log(stat1, stat2, stat3)
      if (stat1 || stat2 || stat3) {
        // console.log(result2[0].Token === token);
           res.status(200).send("Successfully found!!");
       
      }  else {
        res.status(403).send("Forbidden Access!");
      }
    });
  };


  const updateDriverDetails=(req,res)=>{

    const {
      IssuingAuthority,
      LicenseNumber,
      LicenseType,
      DriverName,
      DriverAddedDate,
      DriverTypeOfVerification,
      FatherName,
      Gender,
      BloodGroup,
      Mobile,
      Address,
      RtoName,
      ValidUpto,
      Vov,
      Photo,
      Pht,
      DateOfBirth,
      DateOfIssue,
  
      LeadId,
    } = req.body;

    const updateDriverDetails = `
    UPDATE DriverDetails
    SET
    IssuingAuthority = '${IssuingAuthority ? `${(IssuingAuthority)}` : ''}',
    LicenseNumber = '${LicenseNumber}',
    LicenseType = '${LicenseType}',
    DriverName = '${DriverName}',
    ValidUpto =' ${ValidUpto ? `${ValidUpto}` : ''}',
    RtoName = '${RtoName ? `${RtoName}` : ''}',
    Address =' ${Address ? `${Address}` : ''}',
    Mobile = '${Mobile ?`${(Mobile)}` : ''}',
    BloodGroup = '${BloodGroup ? `${BloodGroup}` : ''}',
    Gender = '${Gender ? `${Gender}` : ''}',
    FatherName = '${FatherName ? `${FatherName}` : ''}',
    DateOfBirth =' ${DateOfBirth ? `${DateOfBirth}` : ''}',
    DateOfIssue = '${DateOfIssue ? `${DateOfIssue}` : ''}',
    TypeOfVerification = '${DriverTypeOfVerification}'
    WHERE LeadID = ${LeadId};
  `;

  console.log(updateDriverDetails)

  db.query(updateDriverDetails, (error, results) => {
    if (error) {
      console.log(error)
      console.error(`Error updating data in ${LeadId} specific DRIVER details:`, error);
      return res
        .status(500)
        .json({ error: `Error updating data in ${LeadId} specific DRIVER details:` });
    }
    res.status(200).json({ message: "Data updated successfully." });
  });
  
  }

  const updateClaimDetails = (req,res)=>{
    const {
      InsuredName,
      InsuredMailAddress,
      InsuredMobileNo1,
      InsuredMobileNo2,
      PolicyIssuingOffice,
      ClaimRegion,
      ClaimServicingOffice,
      InspectionType,
      SurveyType,
      PolicyPeriodStart,
      PolicyPeriodEnd,
      InsuranceCompanyNameAddress,
      insuredAddedBy,
      IsDriverDetailsFetched,
      IsRcDetailsFetched,
  
      LeadId,
    } = req.body;

    const updateClaimDetails = `
    UPDATE ClaimDetails
    SET
    PolicyIssuingOffice = '${PolicyIssuingOffice ? `${PolicyIssuingOffice}` : ''}',
    Region = '${ClaimRegion}',
    ClaimServicingOffice = '${ClaimServicingOffice ? `${ClaimServicingOffice}` : ''}',
    InspectionType = '${InspectionType}',
    SurveyType = '${SurveyType}',
    PolicyPeriodStart = '${PolicyPeriodStart ? `${PolicyPeriodStart}`: ''}',
    PolicyPeriodEnd ='${PolicyPeriodEnd ? `${PolicyPeriodEnd}` : ''}',
    IsDriverDetailsFetched = ${IsDriverDetailsFetched ? IsDriverDetailsFetched : ''},
    IsRcDetailsFetched = ${IsRcDetailsFetched ? IsRcDetailsFetched : ''},
    InsuranceCompanyNameAddress = '${InsuranceCompanyNameAddress ? `${InsuranceCompanyNameAddress}` : ''}'
    WHERE LeadId = ${LeadId};
  `;


  const updateInsuredDetails = `
    UPDATE InsuredDetails
    SET
    InsuredName = '${InsuredName ? `${InsuredName}` : ''}',
    InsuredMobileNo1 = '${InsuredMobileNo1 ? `${InsuredMobileNo1}` : ''}',
    InsuredMobileNo2 = '${InsuredMobileNo2 ? `${InsuredMobileNo2}` : ''}',
    InsuredMailAddress = '${InsuredMailAddress}'
    WHERE LeadId = ${LeadId};
  `;

   db.query(updateClaimDetails, (error, results) => {
    if (error) {
      console.error(`Error updating data in ${LeadId} specific CLAIM details:`, error);
      return res
        .status(500)
        .json({ error: `Error updating data in ${LeadId} specific CLAIM details:`});
    }
    db.query(updateInsuredDetails, (error, results) => {
      if (error) {
        console.error(`Error updating data in ${LeadId} specific INSURED details:`, error);
        return res
          .status(500)
          .json({ error: `Error updating data in ${LeadId} specific INSURED details:` });
      }
      res.status(200).json({ message: "Data updated successfully." });
    });
  });

  }

  const updateVehicleDetails=(req,res)=>{
    const {
      VehicleMakeVariantModelColor,
      VehicleTypeOfBody,
      VehicleRegisteredNumber,
      CubicCapacity,
      VehicleDateOfRegistration,
      VehiclePucNumber,
      VehicleRegisteredOwner,
      VehicleTransferDate,
      VehicleEngineNumber,
      VehicleAddedBy,
      VehicleChassisNumber,
      VehicleFuelType,
      MakerDesc,
      MakerModel,
      VehicleCubicCap,
      FitUpto,
      PasiaModelCode,
      RcInsuranceUpto,
      RcVehicleType,
      BancsModelCode,
      BancsMakeCode,
      BancsSubtypeCode,
      BancsBodyType,
      BancsVehicleClass,
      BancsVehicleSegment,
      RcRtoCode,
      VehicleRcStatus,
      VehicleBlackListStatus,
      VehicleRegistedAt,
      VehicleInsuranceCompany,
      ManufactureMonthYear,
      PermanentAddress,
      ClassOfVehicle,
      SeatingCapacity,
      LeadId,
    } = req.body;

   // Update VehicleDetails
   const updateVehicleDetails = `
   UPDATE VehicleDetails
   SET 
     RegisteredNumber = '${VehicleRegisteredNumber ? `${VehicleRegisteredNumber}` : ''}',
     MakeVariantModelColor ='${VehicleMakeVariantModelColor}',
     TypeOfBody = '${VehicleTypeOfBody ? `${VehicleTypeOfBody}` : ''}',
     DateOfRegistration = '${VehicleDateOfRegistration ? `${VehicleDateOfRegistration}` : ''}',
     TransferDate = '${VehicleTransferDate ? `${VehicleTransferDate}` : ''}',
     EngineNumber = '${VehicleEngineNumber ? `${VehicleEngineNumber}` : ''}',
     AddedBy = '${VehicleAddedBy}',
     ChassisNumber = '${VehicleChassisNumber ? `${VehicleChassisNumber}` : ''}',
     FuelType = '${VehicleFuelType ? `${VehicleFuelType}` : ''}',
     MakerDesc = '${MakerDesc ? `${MakerDesc}` : ''}',
     MakerModel = '${MakerModel ? `${MakerModel}` : ''}',
     CubicCapacity = '${parseInt(CubicCapacity)}',
     FitUpto = '${FitUpto ?'${FitUpto}' : ''}',
     PasiaModelCode = '${PasiaModelCode ? `${PasiaModelCode}` : ''}',
     VehicleType =' ${RcVehicleType ? `${RcVehicleType}` : ''}',
     BancsModelCode = '${BancsModelCode ? `${BancsModelCode}` : ''}',
     BancsMakeCode = '${BancsMakeCode ? `${BancsMakeCode}` : ''}',
     BancsSubtypeCode = '${BancsSubtypeCode ? `${BancsSubtypeCode}` : ''}',
     BancsBodyType = '${BancsBodyType ? `${BancsBodyType}` : ''}',
     BancsVehicleClass = '${BancsVehicleClass ? `${BancsVehicleClass}` : ''}',
     BancsVehicleSegment = '${BancsVehicleSegment ? `${BancsVehicleSegment}' `: ''}',
     RcRtoCode = '${RcRtoCode ? `${RcRtoCode}` : ''}',
     VehicleRcStatus = '${VehicleRcStatus ? `${VehicleRcStatus}' `: ''}',
     VehicleBlackListStatus = '${VehicleBlackListStatus ? `${VehicleBlackListStatus}` : ''}',
     VehicleRegistedAt = '${VehicleRegistedAt ? `${VehicleRegistedAt}`: ''}',
     VehicleInsuranceCompany = '${VehicleInsuranceCompany ? `${VehicleInsuranceCompany}` : ''}',
     ManufactureMonthYear = '${ManufactureMonthYear ? `${ManufactureMonthYear}` : ''}',
     PermanentAddress = '${PermanentAddress ? `${PermanentAddress}`: ''}',
     ClassOfVehicle = '${ClassOfVehicle ? `${ClassOfVehicle}` : ''}',
     RegisteredOwner = '${VehicleRegisteredOwner ? `${VehicleRegisteredOwner}` : ''}',
     SeatingCapacity = '${SeatingCapacity ? `${SeatingCapacity}` : ''}',
     VehicleInsuranceUpto = '${RcInsuranceUpto ? `${RcInsuranceUpto}` : ''}'
   WHERE LeadId = ${LeadId};
 `;

 console.log(updateVehicleDetails);

  db.query(updateVehicleDetails, (error, results) => {
    if (error) {
      console.error(`Error updating data in ${LeadId} specific VEHICLE details:`, error);
      return res
        .status(500)
        .json({ error: `Error updating data in ${LeadId} specific EVHICLVE details:`});
    }
    res.status(200).json({ message: "Data updated successfully." });
  });
  
  }

  const garageDetails = (req,res)=>{

    const {
      GarageNameAndAddress,
      GarageAddedBy,
      GarageContactNo1,
      GarageContactNo2,
      LeadId,
    } = req.body;

    const updateGarageDetails = `
    UPDATE GarageDetails
    SET
    GarageNameAndAddress = '${GarageNameAndAddress ? `${GarageNameAndAddress}` : ''}',
    GarageContactNo1 =' ${GarageContactNo1 ? `${GarageContactNo1}` : ''}',
    GarageContactNo2 = '${GarageContactNo2 ? `${GarageContactNo2}` : "''"}',
    AddedBy = '${GarageAddedBy ? `${GarageAddedBy}` : ''}'
    WHERE LeadId = ${LeadId};
  `;

    db.query(updateGarageDetails, (error, results) => {
      if (error) {
        console.error(`Error updating data in ${LeadId} specific GARAGE details:`, error);
        return res
          .status(500)
          .json({ error: `Error updating data in ${LeadId} specific GARAG details:` });
      }
      res.status(200).json({ message: "Data updated successfully." });
    });
  }



module.exports={addClaim,
                getSpecificClaim,
                updateClaim,
                getAllClaims,
                getClaimDetails,
              updateClaimDetails,
              updateDriverDetails,
              updateVehicleDetails,
              garageDetails
            }
module.exports={addClaim,
                getSpecificClaim,
                updateClaim,
                getAllClaims,
                getClaimDetails,
              updateClaimDetails,
              updateDriverDetails,
              updateVehicleDetails,
              garageDetails
            }
