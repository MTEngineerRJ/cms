// import axios from "axios";
// import { useRef, useState } from "react";
// import { useReducer } from "react";
import { FaEye } from "react-icons/fa";
// import { encryptionData } from "../../../utils/dataEncryption";
import { useRouter } from "next/router";
import Form_garage from "./Form_garage";
import { useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
// import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Loader from "../../common/Loader";

const Form = ({
  claim,
  edit,
  setReload,
  reload,
  GarageNameAndAddress,
  setGarageNameAndAddress,
  GarageContactNo1,
  setGarageContactNo1,
  GarageContactNo2,
  setGarageContactNo2,
  GarageAddedBy,
  setGarageAddedBy,
  onSaveHandler,
}) => {
  const router = useRouter();
  const [editCase_03, setEditCase_03] = useState(false);
  const [isUpdateVehicleLoading,setisUpdateVehicleLoading]=useState(false);
  
  const closeFunction = ()=>{
    setEditCase_03(false)
    setisUpdateVehicleLoading(false)
  }

  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };
  return (
    <>
      <div className="row mt-2">
        {/* <h4 className="mb-3">Vehicle Details</h4> */}
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingSeven">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSeven"
                aria-expanded="false"
                aria-controls="collapseSeven"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Garage Details</h4>
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseSeven"
              class="accordion-collapse collapse"
              aria-labelledby="headingSeven"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body">
                <div className="row">
                  <div className="col-lg-2">
                    {editCase_03 ? (
                      <>
                        <button
                          className="btn-thm m-1"
                          style={{}}
                          onClick={() =>{ 
                            setisUpdateVehicleLoading(true);
                            onSaveHandler(4,closeFunction,closeFunction)}}
                        >
                          Save
                        </button>{" "}
                        <button
                          onClick={()=>setEditCase_03(false)}
                          className="btn-thm flaticon-close"
                          style={{ fontSize: "14px" }}
                        ></button>
                      </>
                    ) : (
                      claim?.claimDetails?.PolicyNumber && <button
                        className="btn-thm"
                        style={{}}
                        onClick={() => setEditCase_03(true)}
                      >
                        <span
                          className="flaticon-edit"
                          style={{ fontSize: "14px" }}
                        ></span>
                      </button>
                    )}
                  </div>
                  <div className="col-lg-2 text-start">
                    {/* <button className="btn-thm" style={{}}>
                      Fetch Details
                    </button> */}
                  </div>
                </div>
                {  isUpdateVehicleLoading ?
                  <Loader/>
                  :
                  editCase_03 ? (
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
                            Name & Address<span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            onChange={(e) =>
                              setGarageNameAndAddress(e.target.value)
                            }
                            value={GarageNameAndAddress}
                            // disabled={!edit}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                      {/* <div className="my_profile_setting_input form-group">
          <label htmlFor="propertyTitle">Property Title</label>
          <input type="text" className="form-control" id="propertyTitle" />
        </div> */}
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
                            Contact Number <span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageContactNo1}
                            onChange={(e) =>
                              setGarageContactNo1(e.target.value)
                            }
                            // disabled={!edit}
                            // placeholder="Enter Registration No."
                          />

                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageContactNo2}
                            onChange={(e) =>
                              setGarageContactNo2(e.target.value)
                            }
                            // disabled={!edit}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                    </div>

                   {/*} <div className="col-lg-6">
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
                            Added Date <span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <MyDatePicker
                            disable={true}
                            className="form-control"
                            id="propertyTitle"
                            selectedDate={
                              claim.garageDetails?.AddedDate
                                ? new Date(claim.garageDetails?.AddedDate)
                                : ""
                            }

                            // placeholder="Enter Registration No."
                          />
                          {/* <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            selected={
                              DateRegistration !== null && !isNaN(new Date(DateRegistration))
                                ? new Date(DateRegistration)
                                : ""
                            }
                            onChange={(date) => setDateRegistration(date)}
                          /> 
                           <DatePicker
                            className="form-control"
                            id="propertyTitle"
                            selected={
                              DateRegistration !== null && !isNaN(new Date(DateRegistration))
                                ? new Date(DateRegistration)
                                : ""
                            }
                            onChange={(date) => setDateRegistration(date)}
                          /> 
                        </div>
                      </div>
                        </div>*/}

                   {/* <div className="col-lg-6">
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
                            Added By <span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <input
                            type="text"
                            className="form-control"
                            id="propertyTitle"
                            value={GarageAddedBy}
                            onChange={(e) => setGarageAddedBy(e.target.value)}
                            // disabled={!edit}
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                          </div>*/}

                   {/* <div className="col-lg-6">
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
                            Modified Date <span class="req-btn">*</span>
                          </label>
                        </div>
                        <div className="col-lg-7">
                          <MyDatePicker
                            disable={true}
                            className="form-control"
                            id="propertyTitle"
                            selectedDate={
                              claim.garageDetails?.ModifiedDate
                                ? new Date(claim.garageDetails?.ModifiedDate)
                                : ""
                            }
                            // placeholder="Enter Registration No."
                          />
                        </div>
                      </div>
                          </div>*/}
                  </div>
                ) : (
                  <div className="row">
                    <Form_garage claim={claim}
                    GarageNameAndAddress={GarageNameAndAddress}
                    GarageContactNo1={GarageContactNo1}
                    GarageAddedBy={GarageAddedBy}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default Form;
