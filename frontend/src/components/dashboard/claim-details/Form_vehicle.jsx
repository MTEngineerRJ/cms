import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Form_vehicle = ({
  claim,
  VehicleModel,
  setVehicleModel,
  VehicleRegisteredNumber,
  setVehicleRegisteredNumber,
  setEngineType,
  EngineType,
  VehicleRegisteredOwner,
  setVehicleRegisteredOwner,
  DateRegistration,
  setDateRegistration,
  PUCNumber,
  setPUCNumber,
  TransferDate,
  setTransferDate,
  EngineNumber,
  setEngineNumber,
  AddedBy,
  setAddedBy,
  IssuingAuthority,
  setIssuingAuthority,
  LicenseNumber,
  setLicenseNumber,
  LicenseType,
  setLicenseType,
  VehicleChassisNumber,
  setVehicleChassisNumber,
  VehicleFuelType,
  setVehicleFuelType,

  VehicleClassDescription,
  MakerModel,
  // ManufactureMonth,
  VehicleGvw,
  VehicleSeatingCapacity,
  VehiclePermanentAddress,
  fitUpto,
  RcInsuranceComp,
  RcInsuranceUpto,
  RcRegisteredAt,
  RcVehicleType,
  BancsModelCode,
  BancsMakeCode,
  BancsSubtypeCode,
  BancsBodyType,
  BancsVehicleClass,
  BancsVehicleSegment,
  RcRtoCode,
  //--
  ClassOfVehicle,
  MakerDesc,
  FitUpto,
  ManufactureMonthYear,
  setManufactureMonthYear,

  CubicCapacity,
  PermanentAddress,
  PasiaModelCode,
  VehicleInsuranceCompany,
  VehicleInsuranceUpto,
  VehicleRegistedAt,
  setVehicleRegistedAt,
  VehicleBlackListStatus,
  VehicleRcStatus,
  VehicleType,
  BancsFuelType,
}) => {
  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  console.log("LLL", CubicCapacity);

  return (
    <>
      <div className="col-lg-12 m-2">
        <div className="row">
          <div className="row">
            <table className="m-1" style={{ border: "1px solid grey" }}>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Vehicle Model
                      </label>
                    </div>
                    <div className="col-lg-6 text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {MakerModel && MakerModel!=="null" ? MakerModel : ""}
                      </label>
                    </div>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Registerd No.
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleRegisteredNumber&&VehicleRegisteredNumber!=="null"?VehicleRegisteredNumber:""}
                    </label>
                  </div>
                </td>
                {/*} <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Engine Type
                      </label>
                    </div>
                    <div className="col-lg-6  text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {EngineType}
                      </label>
                    </div>
                  </div>
                      </td>*/}
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <div className="col-lg-6">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "black",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        Registered Owner{" "}
                      </label>
                    </div>
                    <div className="col-lg-6  text-end">
                      <label
                        htmlFor=""
                        className="text-color"
                        style={{
                          color: "#1560bd",
                          fontSize: "13px",
                          fontWeight: "bold",
                        }}
                      >
                        {VehicleRegisteredOwner && VehicleRegisteredOwner!=="null"?VehicleRegisteredOwner:""}
                      </label>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Date of Registration
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {DateRegistration && DateRegistration!=="null" ? formatDate(DateRegistration) : ""}
                    </label>
                  </div>
                </td>

                {/*} <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Transfer Date
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {TransferDate ? formatDate(
                        TransferDate
                      ) : ""}
                    </label>
                  </div>
                      </td>*/}

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Engine Number
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {EngineNumber&&EngineNumber!=="null"?EngineNumber:""}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Chassis Number
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleChassisNumber&&VehicleChassisNumber!=="null"?VehicleChassisNumber:""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Maker Desc.
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {MakerDesc&&MakerDesc!=="null"?MakerDesc:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Maker Model
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {MakerModel&&MakerModel!=="null"?MakerModel:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Manufacture Month Year
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {ManufactureMonthYear&&ManufactureMonthYear!=="Null"?ManufactureMonthYear:""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Cubic Capacity
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {CubicCapacity&&CubicCapacity!=="null"?CubicCapacity:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Seating Capacity
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleSeatingCapacity&&VehicleSeatingCapacity!=="null"?VehicleSeatingCapacity:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Permanent Address
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleOnlineDetails?.PermanentAddress&&claim?.vehicleOnlineDetails?.PermanentAddress!=="null"?
                      claim?.vehicleOnlineDetails?.PermanentAddress:""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                {/*<td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Fit Up to
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {FitUpto ? formatDate(FitUpto) : ""}
                    </label>
                  </div>
                    </td>*/}
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Class Of Vehicle
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleOnlineDetails?.VehicleClassDescription && claim?.vehicleOnlineDetails?.VehicleClassDescription!=="null"?
                      claim?.vehicleOnlineDetails?.VehicleClassDescription:""}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Pasia Model Code
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {PasiaModelCode&&PasiaModelCode!=="null"?PasiaModelCode:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Insurance Company
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleInsuranceCompany&&claim?.vehicleDetails?.VehicleInsuranceCompany!=="null"?
                      claim?.vehicleDetails?.VehicleInsuranceCompany:""}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Insurance Upto
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {RcInsuranceUpto ? formatDate(RcInsuranceUpto) : ""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle RegistedAt
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleRegistedAt}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Black ListStatus
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleBlackListStatus}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      VehicleRcStatus
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleRcStatus}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Vehicle Type
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim?.vehicleDetails?.VehicleType&&claim?.vehicleDetails?.VehicleType!=="null"?
                      claim?.vehicleDetails?.VehicleType:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Bancs Model Code
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {BancsModelCode}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Bancs Make Code
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {BancsMakeCode}
                    </label>
                  </div>
                </td>

                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Bancs Fuel Type
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {VehicleFuelType&&VehicleFuelType!=="null"?
                      VehicleFuelType:""}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Bancs Body Type
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {BancsBodyType}
                    </label>
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Bancs Vehicle Segment
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {BancsVehicleSegment}
                    </label>
                  </div>
                </td>
                {/* <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color"
                      style={{
                        color: "black",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      Rc Rto Code
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "13px",
                        fontWeight: "bold",
                      }}
                    >
                      {RcRtoCode}
                    </label>
                  </div>
                    </td>*/}
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form_vehicle;
