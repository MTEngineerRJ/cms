import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph } from "docx";
import {
  //   PDFDownloadLink,
  //   BlobProvider,
  //   PDFViewer,
  Page,
  Text,
  View,
  Document as PDFDocument,
} from "@react-pdf/renderer";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const RCData = ({ DriverDetails }) => {
  console.log(DriverDetails);


  const rcDetails = {
    "Driver Name": "N.A.",
    "Father Name": "N.A",
    Age: "N.A.",
    Address: "N.A.",
    Mobile: "N.A.",
    "Date Of Birth": "N.A.",
    "Blood Group": "N.A.",
    Gender: "N.A.",
    "Issuing Authority": "N.A.",
    "License Number": "N.A.",
    "License Type": "N.A.",
    "Badge Number":"N.A.",
    "Rto Name":"N.A.",
    "Cov":"N.A.",
    "Issued Date": "N.A.",
    "Vaild Upto":"N.A."
  };

  const [rcDetailData,setRcDetailData]=useState({})

  useEffect(() => {
    const addDefaultValue = (value) => (value !== undefined ? value : "N.A.");

const rcDetailsUpdated = {
  "Driver Name": addDefaultValue(DriverDetails?.DriverName),
  "Father Name": addDefaultValue(DriverDetails?.FatherName),
  "Address": addDefaultValue(DriverDetails?.Address),
  "Mobile": addDefaultValue(DriverDetails?.Mobile),
  "Date Of Birth": addDefaultValue(DriverDetails?.DateOfBirth),
  "Blood Group": addDefaultValue(DriverDetails?.BloodGroup),
  "Gender": addDefaultValue(DriverDetails?.Gender),
  "Issuing Authority": addDefaultValue(DriverDetails?.RtoName),
  "License Number": addDefaultValue(DriverDetails?.LicenseNumber),
  "License Type": addDefaultValue(DriverDetails?.LicenseType),
  "Badge Number": addDefaultValue(DriverDetails?.BadgeNumber),
  "Issued Date": addDefaultValue(DriverDetails?.DateOfIssue),
  "Vaild Upto": addDefaultValue(DriverDetails?.ValidUpto)
    };

    setRcDetailData(rcDetailsUpdated);
  
  },[DriverDetails]);
  {/*const handleExtract = async (format) => {
    if (format === "Word") {
      // Generate Word document
      const doc = new Document();
      Object.entries(rcDetails).forEach(([key, value]) => {
        doc.addParagraph(new Paragraph(`${key}: ${value}`));
      });
      Packer.toBlob(doc).then((blob) => {
        // Download Word document
        saveAs(blob, "RC_Details.docx");
      });
    } else if (format === "PDF") {
      // Generate PDF document
      const pdfDoc = (
        <PDFDocument>
          <Page size="A4">
            <View style={{ padding: 20 }}>
              <Text style={{ fontSize: 16, marginBottom: 10 }}>RC Details</Text>
              {Object.entries(rcDetails).map(([key, value]) => (
                <View
                  key={key}
                  style={{ flexDirection: "row", marginBottom: 5 }}
                >
                  <Text style={{ flex: 1, fontWeight: "bold" }}>{key}:</Text>
                  <Text style={{ flex: 1 }}>{value}</Text>
                </View>
              ))}
            </View>
          </Page>
        </PDFDocument>
      );

      // Convert PDF to Blob and download
      const blob = await new Promise((resolve) => {
        BlobProvider(pdfDoc, resolve);
      });
      saveAs(blob, "RC_Details.pdf");
    }
  };*/}

  const pdfRef = useRef();

  const downloadPDF = () => {
    const input = pdfRef.current;

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <div style={{ paddingTop: "10px", textAlign: "center" }} ref={pdfRef}>
      <h2 style={{ color: "black", width: "95%", textAlign: "center" }}>
        DL Details
      </h2>
      <div style={{ position: "absolute", top: "10px", right: "10px" }}>
        {/* <div className="row text-center mt-5">
          <button className="btn btn-primary" onClick={downloadPDF}>
            Download PDF
          </button>
        </div> */}

       {/*} <Dropdown>
          <Dropdown.Toggle variant="primary" id="dropdown-extract">
            Extract
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleExtract("Word")}>
              Extract to Word
            </Dropdown.Item>
            <Dropdown.Item>
              <button className="btn" onClick={downloadPDF}>
                Extract PDF
              </button>
            </Dropdown.Item>
          </Dropdown.Menu>
       </Dropdown>*/}
      </div>
      <div style={{ width: "30%", margin: "0 auto" }}>
        <table
          className="table table-striped"
          style={{ borderCollapse: "collapse", width: "100%" }}
        >
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th
                style={{
                  color: "black",
                  textAlign: "left",
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Attribute
              </th>
              <th
                style={{
                  color: "black",
                  textAlign: "right",
                  padding: "10px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            { rcDetailData ? Object.entries(rcDetailData)?.map(([key, value]) => (
              <tr key={key} style={{ borderBottom: "1px solid #ddd" }}>
                <td
                  style={{ color: "black", textAlign: "left", padding: "10px" }}
                >
                  {key}
                </td>
                <td
                  style={{ color: "blue", textAlign: "right", padding: "10px" }}
                >
                  {value}
                </td>
              </tr>
            )):""}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RCData;
