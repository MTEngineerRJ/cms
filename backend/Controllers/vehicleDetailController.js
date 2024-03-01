const db = require("../Config/dbConfig");
const axios = require("axios");
const convertObjectToString = require("../Config/getObjectToString");

const getSpecificVehicleDetails = async (req, res) => {
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
    const vehicleDetails = await executeQuery(
      "SELECT * FROM VehicleDetails WHERE LeadId=?",
      [leadId]
    );
    
    const combinedResult = {
      vehicleDetails
    };


    res.json(combinedResult);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};



 const getOnlineVehicleData = (req, res) => {

  const vehicleNo=req.query.vehicleNo;
  const leadId = req.query.leadId;


    axios.get("https://api.apiseva.co.in/api/verification_pv2/rc_verify",{
      params:{
        apikey:process.env.API_KEY_VEHICLE_DETAIL,
        agent_code:process.env.AGENT_CODE,
        client_order_id:process.env.CLIENT_ORDER_ID,
        vehicle_number:vehicleNo
      }
    })
    .then((result)=>{
      console.log(result.data.vehicleDetails?.Data.result);
      const details = result.data.vehicleDetails?.Data.result;
      const stringformat = convertObjectToString(details);
      
      console.log(result);
      const additionalInfo = result?.data?.additionalInfo;
      const stringformat2 = convertObjectToString(additionalInfo);
      console.log("details",stringformat);
      console.log("additionalInfo",stringformat2);

      const surveyType = details?.VehicleType === "2W" ? "Motor2W" : "Motor4W";
      
      if(!details){
        return res.status(500).send("Internal Server Error");
      }
      const insertVehicleDetails = `
      INSERT INTO VehicleDetailsOnline (
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
        ApiResponse,
        PucValidUntil,
        PucNumber,
        MakeVariantModelColor,
        TaxParticulars,
        RegLadenWt,
        VehicleClassDescription,
        StateCode,
        VehicleInsuranceCompany,
        OtherInfo,
        LeadId
    )
    VALUES (
      '${details?.rc_regn_no}',
        '${additionalInfo?.bodyType}',
        '${details?.rc_regn_dt}',
        '${details?.rc_eng_no}',
        '${details?.rc_chasi_no}',
        '${details?.bancs_Fuel_Type}',
        '${details?.rc_maker_desc}',
        '${details?.rc_maker_model}',
        '${details?.rc_cubic_cap}',
        '${details?.rc_seat_cap}',
        '${details?.rc_fit_upto}',
        '${details?.rc_pasia_model_code}',
        '${details?.rc_vehicle_type}',
        '${details?.bancs_model_code}',
        '${details?.bancs_make_code}',
        '${details?.bancs_Subtype_code}',
        '${details?.bancs_Body_Type}',
        '${details?.bancs_Vehicle_class}',
        '${details?.bancs_Vehicle_Segment}',
        '${details?.rc_rto_code}',
        '${details?.rc_status}',
        '${details?.rc_blacklist_status}',
        '${details?.rc_registered_at}',
        '${details?.rc_manu_month_yr}',
        '${details?.rc_permanent_address}',
        '${details?.bancs_Vehicle_class}',
        '${details?.rc_owner_name}',
        '${details?.rc_insurance_upto}',
        '${stringformat}',
        '${additionalInfo?.puccUpto}',
        '${additionalInfo?.puccNumber}',
        '${additionalInfo?.vehicleColour}',
        '${additionalInfo?.vehicleTaxUpto}',
        '${details?.rc_gvw}',
        '${details?.rc_vh_class_desc}',
        '${details?.state_cd}',
        '${details?.rc_insurance_comp}',
        '${stringformat2}',
        ${leadId}
    );
    `;

        const updateVehicleDetails = `
        UPDATE VehicleDetails
          SET
        RegisteredNumber = '${details?.rc_regn_no}',
        TypeOfBody = '${details?.bancs_Body_Type}',
        DateOfRegistration = '${details?.rc_regn_dt}',
        EngineNumber = '${details?.rc_eng_no}',
        ChassisNumber = '${details?.rc_chasi_no}',
        FuelType = '${details?.bancs_Fuel_Type}',
        MakerDesc = '${details?.rc_maker_desc}',
        MakerModel = '${details?.rc_maker_model}',
        CubicCapacity = '${details?.rc_cubic_cap}',
        SeatingCapacity = '${details?.rc_seat_cap}',
        FitUpto = '${details?.rc_fit_upto}',
        PasiaModelCode = '${details?.rc_pasia_model_code}',
        VehicleType = '${details?.rc_vehicle_type}',
        BancsModelCode = '${details?.bancs_model_code}',
        BancsMakeCode = '${details?.bancs_make_code}',
        BancsSubtypeCode = '${details?.bancs_Subtype_code}',
        BancsBodyType = '${details?.bancs_Body_Type}',
        BancsVehicleClass='${details?.bancs_Vehicle_class}',
        BancsVehicleSegment = '${details?.bancs_Vehicle_Segment}',
        RcRtoCode = '${details?.rc_rto_code}',
        VehicleRcStatus = '${details?.rc_status}',
        VehicleBlackListStatus = '${details?.rc_blacklist_status}',
        VehicleRegistedAt = '${details?.rc_registered_at}',
        VehicleInsuranceCompany = '${details?.rc_insurance_comp}',
        ManufactureMonthYear = '${details?.rc_manu_month_yr}',
        PermanentAddress = '${details?.rc_permanent_address}',
        ClassOfVehicle = '${details?.bancs_Vehicle_class}',
        RegisteredOwner = '${details?.rc_owner_name}',
        VehicleInsuranceUpto ='${details?.rc_insurance_upto}',
        PucValidUntil='${additionalInfo?.puccUpto}',
        PucNumber='${additionalInfo?.puccNumber}',
        MakeVariantModelColor='${additionalInfo?.vehicleColour}',
        TaxParticulars='${additionalInfo?.vehicleTaxUpto}',
        RegLadenWt='${details?.rc_gvw}',
        VehicleClassDescription='${details?.rc_vh_class_desc}',
        Remark='${'Verified from Online'}',
        StateCode='${details?.state_cd}'
        WHERE
            LeadId = ${leadId};

        `;



    
      console.log(insertVehicleDetails,updateVehicleDetails);
    
        db.query(insertVehicleDetails, (error, results) => {
          if (error) {
            console.error("Error updating data in driver Details:", error);
            return res
              .status(500)
              .json({ error: "Error updating data in driver Details." });
          }
          db.query(updateVehicleDetails, (error, results) => {
            if (error) {
              console.error("Error updating data in driver Details:", error);
              return res
                .status(500)
                .json({ error: "Error updating data in driver Details." });
            }
            db.query("UPDATE ClaimDetails SET SurveyType =? WHERE LeadID=?",[surveyType,leadId], (error, results) => {
              if (error) {
                console.error("Error updating data in driver Details:", error);
                return res
                  .status(500)
                  .json({ error: "Error updating data in driver Details." });
              }
                res.status(200).json({ message: "Data updated successfully." });
            });
              
          });
         
        });
        })
        .catch((Err)=>{
          console.log(Err);
          return res.status(500).send("Internal Server Error");
        })
  };

 



  module.exports={getOnlineVehicleData,getSpecificVehicleDetails}
  
