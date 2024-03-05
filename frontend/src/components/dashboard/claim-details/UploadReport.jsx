// // import axios from "axios";
// // import { useRef, useState } from "react";
// // import { useReducer } from "react";
// import { FaEye } from "react-icons/fa";
// // import { encryptionData } from "../../../utils/dataEncryption";
// import { useRouter } from "next/router";
// import Exemple from "./Exemple_01";
// import { use, useState } from "react";
// import axios from "axios";
// // import toast from "react-hot-toast";

// const UploadReort = (leadId) => {

//   const [garage,setGarage]=useState("");
//   const [reportType,setReportType]=useState("");
//   const [fileName,setFileName]=useState("");
//   const [fileUrl,setFileUrl]=useState("");
//   const router = useRouter();

//   const editHandler = () => {
//     setEdit(true);
//   };

//   const onUploadDoc = (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const fileContentBase64 = reader.result.split(",")[1];

//       // Now you can send fileContentBase64 to your server
//       const payload = {
//         file: fileContentBase64,
//         name: file.name,
//       };

//       console.log(payload);
//       return ;

//       // Assuming you are using axios for making the HTTP request
//       axios.post("/uploadMedia", payload)
//         .then((response) => {
//           console.log("File uploaded successfully:", response.data);
//         })
//         .catch((error) => {
//           console.error("Error uploading file:", error);
//         });
//     };

//     reader.readAsDataURL(file);
//   };

//   const onUploadHandler = ()=>{
//     const paylosd ={
//       garage:garage,
//       reportType:reportType,
//       fileName:fileName,
//       fileUrl:fileUrl,
//       LeadId:leadId
//     };
//     console.log(paylosd);
//   }

//   const onFileSelect=(e)=>{
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     const file = e.target.files[0];

//     if (!file) {
//       console.error("No file selected");
//       return;
//     }

//     const reader = new FileReader();

//     reader.onloadend = () => {
//       const fileContentBase64 = reader.result.split(",")[1];

//       // Now you can send fileContentBase64 to your server
//       const payload = {
//         file: fileContentBase64,
//         name: file.name,
//         token : userInfo[0].Token
//       };
//       // Assuming you are using axios for making the HTTP request
//       axios.post("/api/uploadFile", payload)
//         .then((response) => {

//           console.log("File uploaded successfully:", response.data);
//           alert("Successfully uploaded!!");
//         })
//         .catch((error) => {
//           console.error("Error uploading file:", error);
//         });
//     };

//     reader.readAsDataURL(file);
//   }

//   //   const togglePasswordVisibility = () => {
//   //     setPasswordVisible(!passwordVisible);
//   //   };

//   //   const togglePasswordVisibility_01 = () => {
//   //     setPasswordVisible_01(!passwordVisible_01);
//   //   };

//   return (
//     <>
//       <div className=" faq_according row">
//         {/* <h4 className="mb-3">Vehicle Details</h4> */}
//         <div class="accordion" id="accordionExample">
//           <div class="accordion-item">
//             <h2 class="accordion-header" id="headingFour">
//               <button
//                 class="btn accordion-button collapsed"
//                 type="button"
//                 data-bs-toggle="collapse"
//                 data-bs-target="#collapseFour"
//                 aria-expanded="false"
//                 aria-controls="collapseFour"
//                 style={{ padding: "10px 10px 0 25px" }}
//               >
//                 <h4 className="">Upload Report</h4>
//                 <div className="col-lg-1 m-1">
//                  {/* <button
//                     className="btn-thm mb-1"
//                     style={{ marginTop: "-10px" }}
//                     onClick={editHandler}
//                   >
//                     {edit ? "Save" : <span className="flaticon-edit"></span>}
//   </button>*/}
//                 </div>
//               </button>
//             </h2>
//             <div
//               id="collapseFour"
//               class="accordion-collapse collapse"
//               aria-labelledby="headingFour"
//               data-bs-parent="#accordionExample"
//             >
//               <div class="accordion-body">
//                 <div className="row">
//                   <div className="col-lg-12">
//                     <div className="row mt-1 mb-1">
//                       <div className="col-lg-3 my_profile_setting_input form-group">
//                         <label
//                           htmlFor=""
//                           className="text-color"
//                           style={{
//                             color: "#1560bd",
//                             fontWeight: "",
//                           }}
//                         >
//                           Select Gaarge <span class="text-danger">*</span>
//                         </label>
//                       </div>
//                       <div className="col-lg-5">
//                         <select
//                           className="selectpicker form-select"
//                           data-live-search="true"
//                           data-width="100%"
//                           value={garage}
//                           onChange={(e)=>setGarage(e.target.value)}
//                         >
//                           <option data-tokens="Status1">Select</option>
//                           <option data-tokens="Status1">
//                             Megapower Car Services
//                           </option>
//                           {/* <option data-tokens="Status2">Delhi</option>
//                           <option data-tokens="Status3">Chandigarh</option> */}
//                         </select>
//                       </div>
//                       <div className="col-lg-4">
//                         <label
//                           htmlFor=""
//                           className="text-color"
//                           style={{
//                             color: "#1560bd",
//                             cursor: "pointer",
//                             fontWeight: "",
//                           }}
//                         >
//                           Simple Preliminary Report{" "}
//                           <span className="flaticon-pdf"></span>
//                         </label>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-12">
//                     <div className="row mt-1 mb-1">
//                       <div className="col-lg-3 my_profile_setting_input form-group">
//                         <label
//                           htmlFor=""
//                           className="text-color"
//                           style={{
//                             color: "#1560bd",
//                             fontWeight: "",
//                           }}
//                         >
//                           Report Type <span class="text-danger">*</span>
//                         </label>
//                       </div>
//                       <div className="col-lg-5">
//                         <select
//                           className="selectpicker form-select"
//                           data-live-search="true"
//                           data-width="100%"
//                           value={reportType}
//                           onChange={(e)=>setReportType(e.target.value)}
//                         >
//                           <option data-tokens="Status1">Select</option>
//                           <option data-tokens="Status1">
//                             Megapower Car Services
//                           </option>
//                           {/* <option data-tokens="Status2">Delhi</option>
//                           <option data-tokens="Status3">Chandigarh</option> */}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-12">
//                     <div className="row mt-1 mb-1">
//                       <div className="col-lg-3 my_profile_setting_input form-group">
//                         <label
//                           htmlFor=""
//                           className="text-color"
//                           style={{
//                             color: "#1560bd",
//                             fontWeight: "",
//                           }}
//                         >
//                           File Name <span class="text-danger">*</span>
//                         </label>
//                       </div>
//                       <div className="col-lg-5">
//                         <input
//                           type="text"
//                           className="form-control"
//                           id="propertyTitle"
//                           value={fileName}
//                           onChange={(e)=>setFileName(e.target.value)}
//                           // placeholder="Enter Registration No."
//                         />
//                       </div>
//                     </div>
//                   </div>

//                   <div className="col-lg-12">
//                     <div className="row mt-1 mb-1">
//                       <div className="col-lg-3 my_profile_setting_input form-group">
//                         <label
//                           htmlFor=""
//                           className="text-color"
//                           style={{
//                             color: "#1560bd",
//                             fontWeight: "",
//                           }}
//                         >
//                           Attach File <span class="text-danger">*</span>
//                         </label>
//                       </div>
//                       <div className="col-lg-5">
//                         <input
//                           type="file"
//                           className="form-control"
//                           id="propertyTitle"
//                           onChange={onFileSelect}
//                         />
//                       </div>
//                       <div className="col-lg-4 text-end">
//                         <button className="btn btn-color mt-0 " onClick={onUploadDoc}>Upload</button>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="col-lg-12">
//                     <div className="row">
//                       <Exemple />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* End .row */}
//     </>
//   );
// };

// export default UploadReort;

import { FaEye } from "react-icons/fa";
import { useRouter } from "next/router";
import Exemple from "./Exemple_01";
import { useState } from "react";
import axios from "axios";
import Pako from "pako";

const UploadReort = ({ leadId }) => {
  const [garage, setGarage] = useState("");
  const [reportType, setReportType] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");
  const router = useRouter();

  const types = [
    { name: "Driving licence" },
    { name: "Certificate of registration" },
    { name: "Repair Estimate" },
    { name: "Claim form" },
    { name: "Insurance policy" },
    { name: "Damage vehicle photographs/video" },
    { name: "Aadhar card" },
    { name: "Pan card" },
    { name: "Cancel cheque" },
    { name: "Satisfaction voucher" },
    { name: "Discharge voucher" },
    { name: "Dismantle photographs" },
    { name: "Reinspection photographs" },
    { name: "Repair Invoice" },
    { name: "Payment/cash receipt" },
  ];

  const onUploadDoc = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const fileInput = document.getElementById("fileInput");
      const file = fileInput.files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const CHUNK_SIZE = 1024 * 1024; // 1 MB chunks
      const fileSize = file.size;
      let offset = 0;

      while (offset < fileSize) {
        const chunk = file.slice(offset, offset + CHUNK_SIZE);
        const chunkContentBase64 = await readFileAsync(chunk);
        const payload = {
          garage: garage,
          reportType: reportType,
          fileName: file.name,
          fileUrl: fileUrl,
          LeadId: leadId,
          file: chunkContentBase64,
          token: userInfo[0].Token,
          uploadedBy: userInfo[0].Username,
          isLastChunk: offset + CHUNK_SIZE >= fileSize,
        };

        console.log(payload);

        // Assuming you are using axios for making the HTTP request
        const response = await axios.post("/api/uploadClaimDocument", payload);

        console.log("Chunk uploaded successfully:", response.data);

        offset += CHUNK_SIZE;
      }

      alert("File uploaded successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const fileUploadHandler = async () => {
    try {
      const file = document.getElementById("fileInput").files[0];
      if (!file) {
        console.error("No file selected");
        return;
      }

      const fileContentBase64 = await readFileAsync(file);
      const compressedContent = Pako.gzip(fileContentBase64, { to: "string" });
      setUploadedFile(compressedContent);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  // Helper function to read file asynchronously
  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="faq_according row">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingFour">
              <button
                class="btn accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
                style={{ padding: "10px 10px 0 25px" }}
              >
                <h4 className="">Upload Report</h4>
                <div className="col-lg-1 m-1"></div>
              </button>
            </h2>
            <div
              id="collapseFour"
              class="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body bgc-f6">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          Select Gaarge <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <select
                          className="selectpicker form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={garage}
                          onChange={(e) => setGarage(e.target.value)}
                        >
                          <option data-tokens="Status1">Select</option>
                          <option data-tokens="Status1">
                            Megapower Car Services
                          </option>
                          {/* <option data-tokens="Status2">Delhi</option>
                                      <option data-tokens="Status3">Chandigarh</option> */}
                        </select>
                      </div>
                      <div className="col-lg-4">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            cursor: "pointer",
                            fontWeight: "",
                          }}
                        >
                          Simple Preliminary Report{" "}
                          <span className="flaticon-pdf"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          Report Type <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <select
                          className="selectpicker form-select"
                          data-live-search="true"
                          data-width="100%"
                          value={reportType}
                          onChange={(e) => setReportType(e.target.value)}
                        >
                          {types.map((type, index) => {
                            return (
                              <option
                                data-tokens="Status1"
                                value={type.name}
                                key={index}
                              >
                                {type.name}
                              </option>
                            );
                          })}

                          {/* <option data-tokens="Status2">Delhi</option>
                                      <option data-tokens="Status3">Chandigarh</option> */}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          File Name <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="text"
                          className="form-control"
                          id="propertyTitle"
                          value={fileName}
                          onChange={(e) => setFileName(e.target.value)}
                          // placeholder="Enter Registration No."
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="row mt-1 mb-1">
                      <div className="col-lg-3 my_profile_setting_input form-group">
                        <label
                          htmlFor=""
                          className="text-color"
                          style={{
                            color: "#1560bd",
                            fontWeight: "",
                          }}
                        >
                          Attach File <span class="text-danger">*</span>
                        </label>
                      </div>
                      <div className="col-lg-5">
                        <input
                          type="file"
                          className="form-control"
                          id="fileInput"
                          onChange={fileUploadHandler}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 text-end">
                    <button
                      className="btn btn-color mt-0 "
                      onClick={onUploadDoc}
                    >
                      Upload
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="row">
                  <Exemple leadId={leadId} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadReort;
