import Link from "next/link";
import Image from "next/image";
import SmartTable from "./SmartTable";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { forEach } from "jszip";
import { FaCross, FaDropbox, FaRedo, FaUpload } from "react-icons/fa";
import Modal from "react-modal";
import Webcam from "react-webcam";

const headCells = [
  // {
  //   id: "serial_num",
  //   numeric: false,
  //   label: "S.No.",
  //   width: 10,
  // },
  {
    id: "doc_name",
    numeric: false,
    label: "Document Name",
    width: 120,
  },
  // {
  //   id: "date",
  //   numeric: false,
  //   label: "Date",
  //   width: 150,
  // },
  // {
  //   id: "file_name",
  //   numeric: false,
  //   label: "File Name",
  //   width: 150,
  // },
  {
    id: "files",
    numeric: false,
    label: "Files",
    width: 150,
  },
  {
    id: "action",
    numeric: false,
    label: "Action",
    width: 50,
  },

  // {
  //   id: "files",
  //   numeric: false,
  //   label: "File Name",
  //   width: 150,
  // },
  // {
  //   id: "date",
  //   numeric: false,
  //   label: "Date",
  //   width: 150,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "City",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "State",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Assigned Garage",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Case Age (Days)",
  //   width: 150,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Case Age (Insurer)",
  //   width: 150,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Officer",
  //   width: 100,
  // },
  // {
  //   id: "message",
  //   numeric: false,
  //   label: "Request Type",
  //   width: 100,
  // },
  // {
  //   id: "serial",
  //   numeric: false,
  //   label: "Insurer Claim ID.",
  //   width: 100,
  // },
];

const data = [
  {
    _id: "6144145976c7fe",
    serial_num: "1",
    doc_name: "Driving licence",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "2",
    doc_name: "Certificate of registration",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "3",
    doc_name: "Repair Estimate",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "4",
    doc_name: "Claim form",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "5",
    doc_name: "Insurance policy",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "6",
    doc_name: "Damage vehicle photographs/video",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "7",
    doc_name: "Aadhar card",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "8",
    doc_name: "Pan card",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "9",
    doc_name: " Cancel cheque",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "10",
    doc_name: " Satisfaction voucher",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "11",
    doc_name: "Discharge voucher",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "12",
    doc_name: "Dismantle photographs",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "13",
    doc_name: "Reinspection photographs",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "14",
    doc_name: "Repair Invoice",
    action: "2021-09-17 19:10:50",
  },
  {
    _id: "6144145976c7fe",
    serial_num: "15",
    doc_name: "Payment/cash receipt",
    action: "2021-09-17 19:10:50",
  },
];

export default function DocumentUpload({
  setUpdatedData,
  uploadedData,
  leadId,
  status,
  document,
  content,
}) {
  const [updatedCode, setUpdatedCode] = useState([]);
  const [filesUrl, setFilesUrl] = useState("");
  const [attachment, setAttachment] = useState("");
  const [loc, setLoc] = useState("");

  // const [uploadedData, setUploadedData] = useState([]);

  const [change, setChange] = useState(false);

  const getIndex = (label, datas) => {
    let index = -1;
    datas.map((data, idx) => {
      if (String(data[idx].docName) === String(label)) index = idx;
    });
    return index;
  };
  const location = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLoc(latitude + "," + longitude);
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          // You can use the latitude and longitude here as needed
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser");
    }
  };

  location();

  // Webcam logic here
  const [modalIsOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState(null);
  const webcamRef = React.useRef(null);
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log("imgg", imageSrc);
    setImg(imageSrc);
  }, [webcamRef]);

  //Model Hanadle
  function openModal() {
    setCapturedImage(null);
    setCapturedVideo(null);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      width: "70%",
      height: "60%",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };
  const [capturedImage, setCapturedImage] = useState([]);
  const [capturedVideo, setCapturedVideo] = useState([]);
  const [isCapturingVideo, setIsCapturingVideo] = useState(false);
  const [modalDocName, setModalDocName] = useState("");
  const [capturedMedia, setCapturedMedia] = useState({});

  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // setCapturedMedia((prev) => ({ ...prev, [field]: { image: imageSrc } }));
    setCapturedImage(imageSrc);
  };

  const toggleCaptureVideo = () => {
    if (!isCapturingVideo) {
      // Start capturing video
      setIsCapturingVideo(true);
      setCapturedVideo(null);
      chunksRef.current = []; // Reset chunks
      const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user", // or 'environment' for rear camera
      };

      const mediaRecorder = new MediaRecorder(webcamRef.current.stream);
      console.log("MEdia", mediaRecorder);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "video/webm" });
        console.log("Blob", blob);
        const videoUrl = URL.createObjectURL(blob);
        setCapturedVideo(videoUrl);
        setIsCapturingVideo(false);
      };

      mediaRecorder.start();
    } else {
      // Stop capturing video
      mediaRecorderRef.current.stop();
    }
  };

  const handleUpload = (result, label, idx) => {
    location();
    try {
      const fileUrl = result.info.secure_url;
      console.log(uploadedData, label, result);

      const newUploadData = {
        docName: label,
        index: idx,
        leadId: leadId,
        data: [
          {
            name: result.info.original_filename + "." + result.info.format,
            thumbnail_url: result.info.thumbnail_url,
            url: result.info.url,
            location: loc,
            time: result.info.created_at,
          },
        ],
      };

      let oldData = uploadedData;
      oldData.push(newUploadData);
      setUpdatedData(oldData);
      setChange(true);
    } catch (error) {
      console.error("Error handling upload:", error);
    }
  };

  const checkWithinTheContent = (row) => {
    const present = content.includes(row.doc_name);

    return present;
  };

  const checkAlreadyDone = (label) => {
    let isPresent = false;
    // console.log(label,document)
    document.map((temp, index) => {
      if (String(temp.DocumentName) === String(label)) {
        isPresent = true;
      }
    });
    return isPresent;
  };

  const checkId = (status, row) => {
    if (status?.Status === 1 && Number(row.serial_num) <= 10) return true;
    return false;
  };
  const checkIsUploaded = (label) => {
    // console.log(uploadedData);
    let selectedField = {};
    uploadedData.map((data, idx) => {
      if (String(label) === String(data.docName)) {
        selectedField = data;
      }
    });

    return selectedField;
  };

  useEffect(() => {
    console.log(uploadedData);
    const getData = () => {
      const tempData = [];
      data.map((row, index) => {
        const isUploaded = checkIsUploaded(row.doc_name);
        const isDone = checkAlreadyDone(row.doc_name);
        const isAccordingToStatus = content
          ? checkWithinTheContent(row)
          : checkId(status, row);
        console.log(isAccordingToStatus);
        if (!isDone && isAccordingToStatus) {
          const updatedRow = {
            _id: index + 1,
            serial_num: row.serial_num,
            doc_name: row.doc_name,
            files: uploadedData.map((file, idx) => {
              if (file.docName === row.doc_name) {
                return (
                  <div
                    style={{ display: "flex", flexDirection: "column" }}
                    key={idx}
                  >
                    <Image
                      src={file.data[0].thumbnail_url}
                      width={90}
                      height={90}
                    />
                    <a>{file.data[0].name}</a>
                    <div className="row">
                      <div className="col-lg-12">
                        <a
                          className="btn btn-color w-25"
                          href={file.data[0].url}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="View"
                        >
                          <span className="flaticon-view"></span>
                        </a>
                        <button
                          className="btn btn-color w-25"
                          title="Remove"
                          style={{ marginLeft: "5px" }}
                        >
                          <span className="flaticon-garbage fs-6"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }),

            action: (
              <div>
                <div className="">
                  <button
                    className="btn btn-color w-100"
                    style={{}}
                    onClick={openModal}
                    title="Upload File"
                  >
                    <span className="">
                      {" "}
                      <FaUpload />
                    </span>
                  </button>
                </div>
              </div>
            ),
          };

          tempData.push(updatedRow);
        }
      });
      return tempData;
    };
    // getData();
    setChange(false);
    setUpdatedCode(getData());
  }, [uploadedData, change, document]);

  useEffect(() => {
    if (uploadedData) {
      console.log(uploadedData);
    }
  }, [uploadedData]);
  console.log(uploadedData);

  return (
    <>
      <SmartTable
        title="Documents Upload"
        data={updatedCode}
        headCells={headCells}
      />

      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal}>close</button>
        <Webcam
          audio={false}
          height={720}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1280}
          videoConstraints={videoConstraints}
        />
        <button onClick={captureImage}>Capture Image</button>
        <button onClick={toggleCaptureVideo}>
          {isCapturingVideo ? "Stop Capture Video" : "Start Capture Video"}
        </button>

        {capturedImage && (
          <div>
            <h2>Captured Image:</h2>
            <Image
              src={capturedImage}
              alt="Captured Image"
              width={300}
              height={200}
            />
          </div>
        )}

        {capturedVideo && (
          <div>
            <h2>Captured Video:</h2>
            <video width="300" height="200" controls>
              <source src={capturedVideo} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </Modal>
    </>
  );
}