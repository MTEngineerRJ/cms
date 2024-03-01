// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Form_vehicle from "./Form_vehicle";
import { useEffect, useState } from "react";
import axios from "axios";
import MyDatePicker from "../../common/MyDatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader";
import toast from "react-hot-toast";
// import toast from "react-hot-toast";

const Form = ({
  claim,
  edit,
  editHandler,

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
  onSaveHandler,
  //New Fields
  setVehicleClassDescription,
  setMakerDesc,
  setMakerModel,
  setManufactureMonthYear,
  setVehicleGvw,
  setCubicCapacity,
  setVehicleSeatingCapacity,
  setVehiclePermanentAddress,
  setFitUpto,
  setPasiaModelCode,
  setRcInsuranceComp,
  setRcInsuranceUpto,
  setRcVehicleType,
  setBancsModelCode,
  setBancsMakeCode,
  setBancsSubtypeCode,
  setBancsBodyType,
  setBancsVehicleClass,
  setBancsVehicleSegment,
  setRcRtoCode,
  setVehicleBlackListStatus,
  setVehicleRegistedAt,
  setVehicleRcStatus,

  VehicleClassDescription,
  MakerDesc,
  MakerModel,
  ManufactureMonthYear,
  VehicleGvw,
  CubicCapacity,
  VehicleSeatingCapacity,
  VehiclePermanentAddress,
  FitUpto,
  PasiaModelCode,
  RcInsuranceComp,
  RcInsuranceUpto,
  RcRegisteredAt,
  RcVehicleType,

  //--
  BancsModelCode,
  BancsMakeCode,
  BancsSubtypeCode,
  BancsBodyType,
  BancsVehicleClass,
  BancsVehicleSegment,
  RcRtoCode,
  BancsFuelType,
  VehicleType,
  VehicleBlackListStatus,
  VehicleRegistedAt,
  VehicleInsuranceUpto,
  VehicleInsuranceCompany,
  VehicleRcStatus,

  setBancsFuelType,
  setVehicleInsuranceCompany,
  PermanentAddress,
  setPermanentAddress,
  ClassOfVehicle,
  setClassOfVehicle,
  setVehicleInsuranceUpto,
}) => {
  const router = useRouter();
  const [editCase_01, setEditCase_01] = useState(false);
  const [editVechile, setEditVechile] = useState(false);
  const [details, setDetails] = useState();
  const [vehicleFetchDetails, setvehicleFetchDetails] = useState({});
  //   const togglePasswordVisibility = () => {
  //     setPasswordVisible(!passwordVisible);
  //   };

  //   const togglePasswordVisibility_01 = () => {
  //     setPasswordVisible_01(!passwordVisible_01);
  //   };
  console.log("MakerModel", MakerModel);

  const closeFunction = () => {
    setEditCase_01(false);
    setisUpdateVehicleLoading(false);
  };

  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  function isISO8601Date(dateString) {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
    return iso8601Regex.test(dateString);
  }

  const [saveDetails, setSaveDetails] = useState(false);

  const handleFetchData = async (req, res) => {
    if (!claim?.vehicleDetails?.RegisteredNumber) {
      alert("Please fill Registered Number first!");
    }
    if (claim?.vehicleOnlineDetails) {
      const details = claim?.vehicleOnlineDetails;

      setVehicleModel(details?.MakerModel),
        setVehicleRegisteredOwner(details?.RegisteredOwner),
        // setDateRegistration(details?.rc_regn_dt),
        setVehicleChassisNumber(details?.ChassisNumber),
        //New Fields
        setVehicleChassisNumber(details?.ChassisNumber);
      setDateRegistration(details?.DateOfRegistration);
      setVehicleRegisteredNumber(details?.RegisteredNumber);
      setEngineNumber(details?.EngineNumber); //is it same as ClassOfVehicle ?
      setMakerDesc(details?.MakerDesc), setMakerModel(details?.MakerModel);
      setManufactureMonthYear(details?.ManufactureMonthYear);
      setVehicleGvw(details?.rc_gvw);
      setVehicleRegisteredOwner(details?.rc_owner_name);
      setCubicCapacity(details?.CubicCapacity);
      setVehicleSeatingCapacity(details?.SeatingCapacity);
      setVehiclePermanentAddress(details?.PermanentAddress);
      setFitUpto(details?.FitUpto);
      setPasiaModelCode(details?.PasiaModelCode);
      setRcInsuranceUpto(details?.VehicleInsuranceUpto);
      setRcVehicleType(details?.VehicleType);
      setBancsModelCode(details?.BancsModelCode);
      setBancsMakeCode(details?.BancsMakeCode);
      setBancsSubtypeCode(details?.BancsSubtypeCode);
      setBancsBodyType(details?.BancsBodyType);
      setBancsVehicleClass(details?.ClassOfVehicle);
      setBancsVehicleSegment(details?.BancsVehicleSegment);
      setRcRtoCode(details?.RcRtoCode);
      setClassOfVehicle(details?.ClassOfVehicle);
      // setBancsFuelType(details?.bancs_Fuel_Type);
      setEngineNumber(details?.EngineNumber),
        setVehicleRegisteredOwner(details?.RegisteredOwner);
      // setLicenseNumber(details?.rc_regn_no),
      setVehicleFuelType(details?.FuelType),
        setVehicleRcStatus(details?.VehicleRcStatus);
      setVehicleBlackListStatus(details?.VehicleBlackListStatus);
      setVehicleRegistedAt(details?.VehicleRegistedAt);
      setVehicleInsuranceCompany(details?.VehicleInsuranceCompany);
      setVehicleModel(details?.MakerModel),
        setVehicleRegisteredOwner(details?.RegisteredOwner),
        // setDateRegistration(details?.rc_regn_dt),
        setVehicleChassisNumber(details?.ChassisNumber),
        //New Fields
        setVehicleChassisNumber(details?.ChassisNumber);
      setDateRegistration(details?.DateOfRegistration);
      setVehicleRegisteredNumber(details?.RegisteredNumber);
      setEngineNumber(details?.EngineNumber); //is it same as ClassOfVehicle ?
      setMakerDesc(details?.MakerDesc), setMakerModel(details?.MakerModel);
      setManufactureMonthYear(details?.ManufactureMonthYear);
      setVehicleGvw(details?.rc_gvw);
      setVehicleRegisteredOwner(details?.rc_owner_name);
      setCubicCapacity(details?.CubicCapacity);
      setVehicleSeatingCapacity(details?.SeatingCapacity);
      setVehiclePermanentAddress(details?.PermanentAddress);
      setFitUpto(details?.FitUpto);
      setPasiaModelCode(details?.PasiaModelCode);
      setRcInsuranceUpto(details?.VehicleInsuranceUpto);
      setRcVehicleType(details?.VehicleType);
      setBancsModelCode(details?.BancsModelCode);
      setBancsMakeCode(details?.BancsMakeCode);
      setBancsSubtypeCode(details?.BancsSubtypeCode);
      setBancsBodyType(details?.BancsBodyType);
      setBancsVehicleClass(details?.ClassOfVehicle);
      setBancsVehicleSegment(details?.BancsVehicleSegment);
      setRcRtoCode(details?.RcRtoCode);
      setClassOfVehicle(details?.ClassOfVehicle);
      // setBancsFuelType(details?.bancs_Fuel_Type);
      setEngineNumber(details?.EngineNumber),
        setVehicleRegisteredOwner(details?.RegisteredOwner);
      // setLicenseNumber(details?.rc_regn_no),
      setVehicleFuelType(details?.FuelType),
        setVehicleRcStatus(details?.VehicleRcStatus);
      setVehicleBlackListStatus(details?.VehicleBlackListStatus);
      setVehicleRegistedAt(details?.VehicleRegistedAt);
      setVehicleInsuranceCompany(details?.VehicleInsuranceCompany);

      alert("Successfully fetched!!");
    } else {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const vehicleNo = claim?.vehicleDetails?.RegisteredNumber;
      if (!userInfo) {
        router.push("/login");
      } else {
        try {
          toast.loading("Fetching Vehicle Details!!");
          const response = axios
            .get("/api/getOnlineVehicleData", {
              headers: {
                Authorization: `Bearer ${userInfo[0].Token}`,
                "Content-Type": "application/json",
              },
              params: {
                vehicleNo: vehicleNo,
                leadId: claim?.claimDetails?.LeadID,
              },
            })
            .then((res) => {
              toast.success("Successfully fetched!");
              toast.dismiss();
              window.location.reload();
            })
            .catch((err) => {
              toast.error("Record Not found or Server Error");
              toast.dismiss();
            });
        } catch (error) {
          toast.error("Record Not found or Server Error");
        }
      }
    }
  };

  const [isUpdateVehicleLoading, setisUpdateVehicleLoading] = useState(false);
  //permanenet Address
  return (
    <>
      <div className=" faq_according row">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingThree">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Vehicle Details</h4>
              </button>
            </h2>
            {/* <div
              className=" bg-dark"
              style={{
                width: "100%",
                height: "3px",
                color: "blue",
                border: "1px solid",
                marginBottom: "5px",
              }}
            ></div> */}
            <div
              id="collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="">
                    {editCase_01 ? (
                      <>
                        <div className="row">
                          <div className="col-lg-2">
                            <button
                              className="btn-thm m-1"
                              style={{}}
                              onClick={() => {
                                setisUpdateVehicleLoading(true);
                                onSaveHandler(2, closeFunction, closeFunction);
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditCase_01(false)}
                              className="btn-thm flaticon-close"
                              style={{ fontSize: "14px" }}
                            ></button>
                          </div>{" "}
                          <div
                            className="col-lg-1"
                            style={{ marginLeft: "-70px" }}
                          >
                            <button
                              className="btn-thm m-1 flaticon-transfer"
                              onClick={handleFetchData}
                            ></button>
                          </div>
                        </div>
                      </>
                    ) : (
                      claim?.claimDetails?.PolicyNumber && (
                        <button
                          className="btn-thm"
                          style={{}}
                          onClick={() => setEditCase_01(true)}
                        >
                          <span
                            className="flaticon-edit"
                            style={{ fontSize: "14px" }}
                          ></span>
                        </button>
                      )
                    )}
                  </div>
                </div>

                {isUpdateVehicleLoading ? (
                  <Loader />
                ) : editCase_01 ? (
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Model 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          {console.log("MakerModel", MakerModel)}
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={MakerModel}
                            onChange={(e) => setMakerModel(e.target.value)}
                            disabled={false}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    {/*<div className="col-lg-6">
                    <div className="row mt-1">
                      <div className="col-lg-5 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            // paddingTop: "15px",
                            color: "#1560bd",
                            fontWeight: "",
                            // marginTop: "-13px",
                          }}
                        >
                          Registered Number 
                        </label>
                      </div>
                      <div className="col-lg-7">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={VehicleRegisteredNumber }
                          
                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                        </div>*/}

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Registered Owner 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRegisteredOwner&&VehicleRegisteredOwner!=="null"?
                            VehicleRegisteredOwner:""}
                            onChange={(e) =>
                              setVehicleRegisteredOwner(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Date of Registration 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            dateFormat="dd/MM/yyyy"
                            selected={
                              DateRegistration !== null &&
                              !isNaN(new Date(DateRegistration))
                                ? new Date(DateRegistration)
                                : ""
                            }
                            onChange={(date) => setDateRegistration(date)}
                          />

                          {/* <MyDatePicker
                            className="form-control"
                            id="propertyTitle"
                            selectedDate={
                              DateRegistration !== null && !DateRegistration
                                ? new Date(DateRegistration)
                                : ""
                            }
                            setSelectedDate={setDateRegistration}

                            // placeholder="Enter Registration No."
                          /> */}
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            PUC Number 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={PUCNumber}
                            onChange={(e) => setPUCNumber(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>

                    {/*<div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // margin Top: "-13px",
                            }}
                          >
                            Transfer Date 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            selected={
                              TransferDate !== null &&
                              !isNaN(new Date(TransferDate))
                                ? new Date(TransferDate)
                                : ""
                            }
                            onChange={(date) => setTransferDate(date)}
                          />
                        </div>
                      </div>
                          </div>*/}

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Engine Number 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={EngineNumber&&EngineNumber!=="null"?EngineNumber:""}
                            onChange={(e) => setEngineNumber(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    {/*<div className="col-lg-6">
                          <div className="row mt-1">
                            <div className="col-lg-5 my_profile_setting_input form-group">
                              <label
                                htmlFor=""
                                className="text-color"
                                style={{
                                  // paddingTop: "15px",
                                  color: "#1560bd",
                                  fontWeight: "",
                                  // marginTop: "-13px",
                                }}
                              >
                                Added By 
                              </label>
                            </div>
                            <div className="col-lg-7">
                              <input
                                type="text"
                                className="form-control"
                                id="propertyTitle"
                                value={AddedBy}
                                onChange={(e) => setAddedBy(e.target.value)}

                                // placeholder="Enter Registration No."
                              />
                            </div>
                          </div>
                              </div>*/}

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Chassis Number
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleChassisNumber&&VehicleChassisNumber!=="null"?
                            VehicleChassisNumber:""}
                            onChange={(e) =>
                              setVehicleChassisNumber(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Fuel Type 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleFuelType&&VehicleFuelType!=="null"?VehicleFuelType:""}
                            onChange={(e) => setVehicleFuelType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Registerd Number 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRegisteredNumber}
                            onChange={(e) =>
                              setVehicleRegisteredNumber(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    {/*<div className="col-lg-6">
                          <div className="row mt-1">
                            <div className="col-lg-5 my_profile_setting_input form-group">
                              <label
                                htmlFor=""
                                className="text-color"
                                style={{
                                  // paddingTop: "15px",
                                  color: "#1560bd",
                                  fontWeight: "",
                                  // marginTop: "-13px",
                                }}
                              >
                                Rc Rto Code 
                              </label>
                            </div>
                            <div className="col-lg-7">
                              <input
                                type="text"
                                className="form-control"
                                id="propertyTitle"
                                value={RcRtoCode}
                                onChange={(e) => setRcRtoCode(e.target.value)}

                                // placeholder="Enter Registration No."
                              />
                            </div>
                          </div>
                              </div>*/}

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Vehicle Segment 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsVehicleSegment}
                            onChange={(e) =>
                              setBancsVehicleSegment(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Vehicle Class 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsVehicleClass}
                            onChange={(e) =>
                              setBancsVehicleClass(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Body Type 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsBodyType}
                            onChange={(e) => setBancsBodyType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Fuel Type 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleFuelType&&VehicleFuelType!=="null"?VehicleFuelType:""}
                            onChange={(e) => setVehicleFuelType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Subtype Code 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsSubtypeCode}
                            onChange={(e) =>
                              setBancsSubtypeCode(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Make Code 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsMakeCode}
                            onChange={(e) => setBancsMakeCode(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Bancs Model Code 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={BancsModelCode}
                            onChange={(e) => setBancsModelCode(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Type 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={RcVehicleType&&RcVehicleType!=="null"?RcVehicleType:""}
                            onChange={(e) => setRcVehicleType(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Rc Status 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRcStatus}
                            onChange={(e) => setVehicleRcStatus(e.target.value)}

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Black ListStatus{" "}
                            
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleBlackListStatus}
                            onChange={(e) =>
                              setVehicleBlackListStatus(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Registed At 
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleRegistedAt ? VehicleRegistedAt : ""}
                            onChange={(date) => setVehicleRegistedAt(date)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Insurance Upto{" "}
                            
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            selected={
                              RcInsuranceUpto !== null &&
                              !isNaN(new Date(RcInsuranceUpto))
                                ? new Date(RcInsuranceUpto)
                                : ""
                            }
                            onChange={(date) => setRcInsuranceUpto(date)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Seating Capacity 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          {console.log("MakerModel", MakerModel)}
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleSeatingCapacity}
                            onChange={(e) =>
                              setVehicleSeatingCapacity(e.target.value)
                            }
                            disabled={false}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Cubic Capacity 
                          </label>
                        </div>
                        <div className="col-lg-7">
                          {console.log("MakerModel", MakerModel)}
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={CubicCapacity}
                            onChange={(e) => setCubicCapacity(e.target.value)}
                            disabled={false}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="row mt-1">
                        <div className="col-lg-5 my_profile_setting_input form-group">
                          <label
                            htmlFor=""
                            className="text-color"
                            style={{
                              // paddingTop: "15px",
                              color: "#1560bd",
                              fontWeight: "",
                              // marginTop: "-13px",
                            }}
                          >
                            Vehicle Insurance Company{" "}
                            
                          </label>
                        </div>

                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={VehicleInsuranceCompany}
                            onChange={(e) =>
                              setVehicleInsuranceCompany(e.target.value)
                            }

                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <Form_vehicle
                      claim={claim}
                      VehicleModel={VehicleModel}
                      setVehicleModel={setVehicleModel}
                      VehicleRegisteredNumber={VehicleRegisteredNumber}
                      setVehicleRegisteredNumber={setVehicleRegisteredNumber}
                      setEngineType={setEngineType}
                      EngineType={EngineType}
                      VehicleRegisteredOwner={VehicleRegisteredOwner}
                      setVehicleRegisteredOwner={setVehicleRegisteredOwner}
                      DateRegistration={DateRegistration}
                      setDateRegistration={setDateRegistration}
                      PUCNumber={PUCNumber}
                      setPUCNumber={setPUCNumber}
                      TransferDate={TransferDate}
                      setTransferDate={setTransferDate}
                      EngineNumber={EngineNumber}
                      setEngineNumber={setEngineNumber}
                      AddedBy={AddedBy}
                      setAddedBy={setAddedBy}
                      IssuingAuthority={IssuingAuthority}
                      setIssuingAuthority={setIssuingAuthority}
                      LicenseNumber={LicenseNumber}
                      setLicenseNumber={setLicenseNumber}
                      LicenseType={LicenseType}
                      setLicenseType={setLicenseType}
                      VehicleChassisNumber={VehicleChassisNumber}
                      setVehicleChassisNumber={setVehicleChassisNumber}
                      VehicleFuelType={VehicleFuelType}
                      setVehicleFuelType={setVehicleFuelType}
                      // New Fields
                      setVehicleClassDescription={setVehicleClassDescription}
                      setMakerDesc={setMakerDesc}
                      setMakerModel={setMakerModel}
                      setManufactureMonthYear={setManufactureMonthYear}
                      setVehicleGvw={setVehicleGvw}
                      setCubicCapacity={setCubicCapacity}
                      setVehicleSeatingCapacity={setVehicleSeatingCapacity}
                      setVehiclePermanentAddress={setVehiclePermanentAddress}
                      setFitUpto={setFitUpto}
                      setPasiaModelCode={setPasiaModelCode}
                      setRcInsuranceComp={setRcInsuranceComp}
                      setRcInsuranceUpto={setRcInsuranceUpto}
                      setRcVehicleType={setRcVehicleType}
                      setBancsModelCode={setBancsModelCode}
                      setBancsMakeCode={setBancsMakeCode}
                      setBancsSubtypeCode={setBancsSubtypeCode}
                      setBancsBodyType={setBancsBodyType}
                      setBancsVehicleClass={setBancsVehicleClass}
                      setBancsVehicleSegment={setBancsVehicleSegment}
                      setRcRtoCode={setRcRtoCode}
                      VehicleClassDescription={VehicleClassDescription}
                      MakerDesc={MakerDesc}
                      MakerModel={MakerModel}
                      ManufactureMonthYear={ManufactureMonthYear}
                      VehicleGvw={VehicleGvw}
                      CubicCapacity={CubicCapacity}
                      VehicleSeatingCapacity={VehicleSeatingCapacity}
                      VehiclePermanentAddress={VehiclePermanentAddress}
                      FitUpto={FitUpto}
                      PasiaModelCode={PasiaModelCode}
                      RcInsuranceComp={RcInsuranceComp}
                      RcInsuranceUpto={RcInsuranceUpto}
                      RcRegisteredAt={RcRegisteredAt}
                      RcVehicleType={RcVehicleType}
                      BancsModelCode={BancsModelCode}
                      BancsMakeCode={BancsMakeCode}
                      BancsSubtypeCode={BancsSubtypeCode}
                      BancsBodyType={BancsBodyType}
                      BancsVehicleClass={BancsVehicleClass}
                      BancsVehicleSegment={BancsVehicleSegment}
                      RcRtoCode={RcRtoCode}
                      PermanentAddress={PermanentAddress}
                      setPermanentAddress={setPermanentAddress}
                      setVehicleRegistedAt={setVehicleRegistedAt}
                      VehicleRegistedAt={VehicleRegistedAt}
                      ClassOfVehicle={ClassOfVehicle}
                      setClassOfVehicle={setClassOfVehicle}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
