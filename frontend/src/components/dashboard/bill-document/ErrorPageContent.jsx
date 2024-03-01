import Link from "next/link";
import Form from "./Form";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

const ErrorPageContent = ({feeReport}) => {
  const pdfRef = useRef();

  console.log(feeReport)

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric"
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  const roundOff = (value)=>{
    const roundedValue = parseFloat(value).toFixed(2);
    return roundedValue
  }
  function numberToWords(number) {
    const units = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    const teens = ["", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    const tens = ["", "ten", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  
    const convertLessThanThousand = (num) => {
      if (num === 0) {
        return "";
      }
  
      let result = "";
  
      if (num >= 100) {
        result += units[Math.floor(num / 100)] + " hundred ";
        num %= 100;
      }
  
      if (num >= 11 && num <= 19) {
        result += teens[num - 11];
      } else {
        result += tens[Math.floor(num / 10)];
        num %= 10;
  
        if (num > 0) {
          result += " " + units[num];
        }
      }
  
      return result;
    };
  
    const convert = (num) => {
      if (num === 0) {
        return "zero";
      }
  
      let result = "";
  
      if (num >= 1e9) {
        result += convertLessThanThousand(Math.floor(num / 1e9)) + " billion ";
        num %= 1e9;
      }
  
      if (num >= 1e6) {
        result += convertLessThanThousand(Math.floor(num / 1e6)) + " million ";
        num %= 1e6;
      }
  
      if (num >= 1e3) {
        result += convertLessThanThousand(Math.floor(num / 1e3)) + " thousand ";
        num %= 1e3;
      }
  
      result += convertLessThanThousand(num);
  
      return result.trim();
    };
  
    const roundOff = (num) => Math.round(num * 100) / 100;
  
    const roundedNumber = roundOff(number);
  
    const wholePart = Math.floor(roundedNumber);
    const decimalPart = Math.round((roundedNumber - wholePart) * 100);
  
    const wordsWholePart = convert(wholePart);
    const wordsDecimalPart = convert(decimalPart);
  
    return wordsWholePart + " Rupees and " + wordsDecimalPart + " paisa";
  }
  



  const calculateTheTotalBillWithoutGST=()=>{

    const propfessionalCharges = Number(feeReport?.feeDetails?.ProfessionalFees);
    const photoCharges = Number(feeReport?.feeDetails?.Photos)*Number(feeReport?.feeDetails?.PhotsRate);
    const conveyanceCharges = Number(feeReport?.feeDetails?.Conveyance);

    return propfessionalCharges+photoCharges+conveyanceCharges;
  }

 const  calculateCGST=()=>{
    const total = calculateTheTotalBillWithoutGST();

    const CGST = (Number(feeReport?.feeDetails?.Cgst)*Number(total))/100;

    return CGST;
  } 

  const  calculateSGST=()=>{
    const total = calculateTheTotalBillWithoutGST();

    const SGST = (Number(feeReport?.feeDetails?.Sgst)*Number(total))/100;

    return SGST;
  }

  const grandTotalWithGST = ()=>{
    const total = calculateTheTotalBillWithoutGST();
    const cgstValue = calculateCGST();
    const sgstValue = calculateSGST();
    return total+cgstValue+sgstValue;
  }


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
    <div className="" ref={pdfRef}>
      {/* Header Content */}
      <div>
        <h3>MT Engineer</h3>{" "}
        <span>
          {" "}
          <div style={{ position: "absolute", top: "10px", right: "10px" }}>
            {/* <Dropdown>
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
            </Dropdown> */}
          </div>
        </span>
        <p>Legal Investigator Pvt. Ltd.</p>
        <p>
          69-Modal Town (1st), Behind U.I.T., Office, Sri Ganganagar -
          335001(Rajasthan )
        </p>
        <p>Tel. No. : +91 94688-81222</p>
        {/* <p>Email: {allInfo?.otherInfo[0]?.BrokerMailAddress}</p> */}
        <p>Email: legalmt04@gmail.com</p>
        {/* <p>Lic No. IRDA/CORP/SLA-200018 DOE 07.02.2025</p> */}
        <p>GSTIN : 08AAPCM1051K1Z9</p>
      </div>
      <hr style={{ border: "2px solid black" }} />
      {/* Header Content */}

      <div>
        <h4 className="text-center text-decoration-underline">Tax Invoice</h4>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-8">
              <h5>To,</h5>
              <span>{feeReport.feeDetails?.InsuranceCompanyName}</span>
              <br />
              
              <span style={{ marginRight: "100px" }}>
                GSTIN: 08AAACT0627R3ZX
              </span>
              <span>State Code : {feeReport?.vehicleOnlineDetails?.StateCode}</span>
            </div>
            <div className="col-lg-4">
              <span>Bill No. : {feeReport?.feeDetails?.BillID}</span>
              <br />
              <span>Date : {formatDate(new Date(feeReport?.feeDetails?.BillDate))}</span>
              <br />
              <span>Code : GH000057355</span>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-7">
              <span>Report Ref No : MSL/GNR/2024/01/10263</span>
              <br />
              <span>Vehicle No : {feeReport?.vehicleOnlineDetails?.RegisteredNumber}</span>
              <br />
              <span>Insured Name : {feeReport?.driverDetails?.InsuredName} {String(feeReport?.driverDetails?.Gender) === "Male" ? "S/o":"D/o"}  {feeReport?.driverDetails?.fatherName}</span>
              <br />
              <span>Date Of Accident : {formatDate(feeReport?.accidentDetails?.DateOfAccident)}</span>
              <br />
              <span>Policy/cover note no : {feeReport?.claimDetails?.PolicyNumber}</span>
              <br />
              <span>Claim No : {feeReport?.claimDetails?.ClaimNumber}</span>
            </div>
            <div className="col-lg-5">
              <span className="mt-5">Assessed : Rs {roundOff(Number(feeReport?.feeDetails?.AssessedAmt))}</span>
              <br />
              <span>Estimate : Rs  {roundOff(Number(feeReport?.feeDetails?.EstimateAmt))}</span>
              <br />
              <span>IDV : Rs {roundOff(Number(feeReport?.claimDetails?.IDV))}</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <table style={{ width: "100%" }}>
          <tr style={{ border: "1px solid black" }}>
            <th
              style={{
                border: "1px solid black",
                textAlign: "center",
                // paddingRight: "10px",
                // paddingLeft: "20px",
              }}
            >
              S No.
            </th>
            <th
              style={{
                // border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              Particulars
            </th>
            <th
              style={{
                textAlign: "center",
                // border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              HSN/SAC
            </th>
            <th
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              Amount
            </th>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                paddingRight: "30px",
                paddingLeft: "20px",
              }}
            >
              1
            </td>
            <td>
              <div>
                <h4 className="text-decoration-underline mt-2">Final</h4>
                <span>Professional Fee : Estimate Amount F Rs {roundOff(Number(feeReport?.feeDetails?.EstimateAmt))}</span>
                <br />
                <span>
                  Photos/CD Expenses : <br /> {feeReport?.feeDetails?.Photos} Photographs , Charged for {feeReport?.feeDetails?.Photos_cd} @
                  Rs. {roundOff(Number(feeReport?.feeDetails?.PhotsRate))}
                </span>
                <br />
                <span>Conveyance Expenses : </span>
              </div>
            </td>
            <td
              style={
                {
                  // border: "1px solid black",
                  // paddingRight: "30px",
                  // paddingLeft: "20px",
                }
              }
            >
              <span>
                <h5 className="mt-3">47773</h5>
              </span>
              <br />
              <br />
              <span>Rs {roundOff(Number(feeReport?.feeDetails?.ProfessionalFees))}</span>
              <br />
              <span>Rs {roundOff(Number(feeReport?.feeDetails?.Photos)*Number(feeReport?.feeDetails?.PhotsRate))}</span>
              <br />
              <span>Rs {roundOff(Number(feeReport?.feeDetails?.Conveyance))}</span>
            </td>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
            Rs  {roundOff(calculateTheTotalBillWithoutGST())}
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "end",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              {" "}
              <span>Sub Total : F</span>
              <br />
              <span>C GST @ {roundOff(Number(feeReport?.feeDetails?.Cgst))} %</span>
              <br />
              <span>S GST @ {roundOff(Number(feeReport?.feeDetails?.Sgst))} % </span>
            </td>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span> Rs  {roundOff(calculateTheTotalBillWithoutGST())}</span> <br /> <hr />
              <span>Rs {roundOff(calculateCGST())}</span>
              <br />
              <span>Rs {roundOff(calculateSGST())}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <div className="d-flex justify-content-between">
                <span>ADVANCE RECEIPT</span>
                <span>Grand Total : </span>
              </div>
            </td>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span>Rs {grandTotalWithGST()}</span>
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            ></td>
            <td
              colSpan={2}
              style={{
                border: "1px solid black",
                textAlign: "end",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span>Round off : F</span>
            </td>
            <td
              style={{
                border: "1px solid black",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span>Rs {roundOff(grandTotalWithGST())}</span>
            </td>
          </tr>
          <tr>
            <td
              colSpan={4}
              style={{
                border: "1px solid black",
                textAlign: "center",
                // paddingRight: "30px",
                // paddingLeft: "20px",
              }}
            >
              <span>In words : Rs. {numberToWords(grandTotalWithGST())}</span>
            </td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <td></td>
            <td>
              <span>GSTIN: 08AAJCM8228Q1ZM State : (08)</span>
              <br />
              <span>PAN. : AAJCM8228Q</span>
              <br />
              <span>Bank Name : INDIAN BANK</span>
              <br />
              <span>A/c No. : CA 6360774855</span>
              <br />
              <span>MICR No : 335019002</span>
              <br />
              <span>IFS Code : IDIB000G067</span>
            </td>
          </tr>
          <tr style={{ border: "1px solid black" }}>
            <td></td>
            <td colSpan={2} style={{ textAlign: "end" }}>
              <span style={{ textAlign: "center" }}>For Mutneja Tech </span>{" "}
              <br /> Insurance Surveyors & Loss assessors Pvt. Ltd.
            </td>
          </tr>
        </table>
      </div>

      {/* footer content */}
      <hr style={{ border: "2px solid black" }} />
      <div>
        <h5 className="text-center">
          H.O. Address : 58-Gandhi Nagar,Near Bal Niketan School ,Sri
          Ganganagar(Raj.)-335001
        </h5>
        <h5 className="text-center">
          Ofce: B-43,NFL Society,Sector-PI,Gr Noida-201310./E-201,MAPSKO
          Mountville,Sector-79,Gurugram(Hr)
        </h5>
      </div>
      {/* footer content */}
    </div>
  );
};

export default ErrorPageContent;
