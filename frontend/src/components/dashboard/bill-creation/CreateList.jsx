import axios, { all } from "axios";
import { use, useEffect, useReducer } from "react";
import { useState } from "react";
import MyDatePicker from "../../common/MyDatePicker";
import { useRouter } from "next/router";

const CreateList = ({ allInfo, leadID }) => {
  // console.log(allInfo)

  const router = useRouter();
  const [inspectionType, setInspectionType] = useState("");

  const [Bill, setBill] = useState("");
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB");
  console.log(formattedDate);
  const [date, setDate] = useState(new Date());
  const [Insurer, setInsurer] = useState("");
  const [Branch, setBranch] = useState("");
  const [Others, setOthers] = useState("");
  const [Estimate, setEstimate] = useState("");
  const [DetailsKM, setDetailsKM] = useState("");
  const [Assessed, setAssessed] = useState("");
  const [DetailsPhotoRate, setDetailsPhotoRate] = useState("");
  const [DetailsFee, setDetailsFee] = useState("");
  const [DetailsRemark, setDetailsRemark] = useState("");

  const [BillTo, setBillTo] = useState("");

  const [currentSelectedInsprectiontype, setcurrentSelectedInsprectiontype] =
    useState(1);

  const [FinalProfFees, setFinalProfFees] = useState(0);
  const [FinalTotalKM, setFinalTotalKM] = useState("");
  const [FinalVisit, setFinalVisit] = useState("");
  const [FinalConveyance, setFinalConveyance] = useState("");
  const [FinalPhotos, setFinalPhotos] = useState("");
  const [FinalCharges, setFinalCharges] = useState("");
  const [FinalPhotosCD, setFinalPhotoCD] = useState("");
  const [FinalRemark, setFinalRemark] = useState("");

  const [ReInsprectionProfFees, setReInsprectionProfFees] = useState("");
  const [ReInsprectionTotalKM, setReInsprectionTotalKM] = useState("");
  const [ReInsprectionVisit, setReInsprectionVisit] = useState("");
  const [ReInsprectionConveyance, setReInsprectionConveyance] = useState("");
  const [ReInsprectionPhotos, setReInsprectionPhotos] = useState("");
  const [ReInsprectionCharges, setReInsprectionCharges] = useState("");
  const [ReInsprectionPhotosCD, setReInsprectionPhotoCD] = useState("");
  const [ReInsprectionRemark, setReInsprectionRemark] = useState("");

  const [SpotProfFees, setSpotProfFees] = useState("");
  const [SpotTotalKM, setSpotTotalKM] = useState("");
  const [SpotVisit, setSpotVisit] = useState("");
  const [SpotConveyance, setSpotConveyance] = useState("");
  const [SpotPhotos, setSpotPhotos] = useState("");
  const [SpotCharges, setSpotCharges] = useState("");
  const [SpotPhotosCD, setSpotPhotoCD] = useState("");
  const [SpotRemark, setSpotRemark] = useState("");

  const [OtherTotal, setOtherTotal] = useState("");

  const [CGST, setCGST] = useState(0);
  const [SGST, setSGST] = useState(0);
  const [IGST, setIGST] = useState(18);

  const [CGSTValue, setCGSTValue] = useState("");
  const [SGSTValue, setSGSTValue] = useState("");
  const [IGSTValue, setIGSTValue] = useState("");

  const [Cash, setCash] = useState("");
  const [NetPay, setNetPay] = useState(0);

  const calculateTotalAssessed = () => {
    let total_assessed = 0,
      total_estimate = 0;
    const allNewParts = allInfo?.newPartsDetails;
    const allLabourer = allInfo?.labourDetails;

    allNewParts?.map((part, index) => {
      //assessed
      const assessed = part.NewPartsIsActive
        ? Number(part.NewPartsAssessed) * Number(part.QA)
        : 0;
      const depreciation =
        String(part.NewPartsPolicyType) === "1"
          ? (Number(assessed) * Number(part.NewPartsDepreciationPct)) / 100
          : 0;
      const assessed_gst =
        (Number(assessed) * Number(part.NewPartsGSTPct)) / 100;
      const current_Assessed = assessed - depreciation + assessed_gst;
      total_assessed = total_assessed + current_Assessed;

      //estimate
      const current_Estimate = part.NewPartsIsActive
        ? Number(part.NewPartsEstimate) * Number(part.QE)
        : 0;
      total_estimate = total_estimate + current_Estimate;
    });

    allLabourer?.map((part, index) => {
      //assessed
      const assessed = part.LabourIsActive ? Number(part.Assessed) : 0;
      const depreciation_of_paint =
        String(part.JobType) === "1" ? (Number(assessed) * 12.5) / 100 : 0;
      const assessed_gst =
        (Number(assessed) * Number(part.GSTPercentage)) / 100;
      const current_Assessed = assessed - depreciation_of_paint + assessed_gst;
      total_assessed = total_assessed + current_Assessed;

      //estimate
      const current_Estimate = part.LabourIsActive ? Number(part.Estimate) : 0;
      total_estimate = total_estimate + current_Estimate;
    });

    setAssessed(total_assessed);
    setEstimate(total_estimate);
  };

  const calculateProfessionalFees = () => {
    let prof = 0;
    if (!allInfo?.VehicleOnlineDetails) {
      return 0;
    }
    if (String(allInfo?.VehicleOnlineDetails[0]?.VehicleType) === "2W")
      setFinalProfFees(500);
    if (String(allInfo?.VehicleOnlineDetails[0]?.VehicleType) === "4W")
      setFinalProfFees(700);

    console.log(allInfo?.VehicleOnlineDetails?.VehicleType, FinalProfFees);
  };

  useEffect(() => {
    const fees =
      String(allInfo?.VehicleOnlineDetails?.VehicleType) === "4W" ? 700 : 500;
    setFinalProfFees(fees);
  }, [allInfo]);

  const generateRegion = (region) => {
    const firstThreeLetters = Branch?.slice(0, 3);

    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-indexed
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const result = `${firstThreeLetters}/${mm}/${dd}${hh}${min}${ss}`;

    console.log(result);
    return result;
  };

  const getTotalValue = () => {
    const professionalFees =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalProfFees
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionProfFees
        : SpotProfFees;

    const totalKM =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalTotalKM
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionTotalKM
        : SpotTotalKM;

    const Visits =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalVisit
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionVisit
        : SpotVisit;

    const Conveyance =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalConveyance
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionConveyance
        : SpotConveyance;

    const Photos =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotos
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotos
        : SpotPhotos;

    const charges =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalCharges
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionCharges
        : SpotCharges;

    const PhotoCD =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotosCD
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotosCD
        : SpotPhotosCD;

    const total =
      Number(professionalFees) + Number(Conveyance) + Number(PhotoCD);

    const calculate_cgst = (Number(total) * Number(CGST)) / 100;
    const calculate_igst = (Number(total) * Number(IGST)) / 100;

    const calculate_sgst = (Number(total) * Number(SGST)) / 100;

    setIGSTValue(calculate_igst);
    setCGSTValue(calculate_cgst);
    setSGSTValue(calculate_sgst);

    setNetPay(total + calculate_cgst + calculate_igst + calculate_sgst);
    return total + calculate_cgst + calculate_igst + calculate_sgst;
  };

  useEffect(() => {
    getTotalValue();
  }, [CGST, IGST, SGST]);

  const onSubmitHnadler = () => {
    const payload = {
      LeadId: leadID,
      Type:
        String(currentSelectedInsprectiontype) === "1"
          ? "Final"
          : String(currentSelectedInsprectiontype) === "2"
          ? "ReInspection"
          : "Spot",
      ProfessionalFees:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalProfFees
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionProfFees
          : SpotProfFees,
      TotalKM:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalTotalKM
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionTotalKM
          : SpotTotalKM,
      Visits:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalVisit
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionVisit
          : SpotVisit,
      Conveyance:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalConveyance
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionConveyance
          : SpotConveyance,
      Photos:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalPhotos
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionPhotos
          : SpotPhotos,
      Charge:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalCharges
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionCharges
          : SpotCharges,
      Photos_cd:
        String(currentSelectedInsprectiontype) === "1"
          ? FinalPhotosCD
          : String(currentSelectedInsprectiontype) === "2"
          ? ReInsprectionPhotosCD
          : SpotPhotosCD,
      Cgst: CGST,
      Igst: IGST,
      Sgst: SGST,
      Total: NetPay,
      ModeOfPayement: "",
      BillID: allInfo?.feesDetails?.BillID,
      FeebasedOn: DetailsFee,
      Remrk: DetailsRemark,
      KmRate: DetailsKM,
      PhotsRate: DetailsPhotoRate,
      EstimateAmt: Estimate,
      AssessedAmt: Assessed,
      InsuranceCompanyName: allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress,
      Branch: Branch,
      BillTo: BillTo,
      Others: Others,
      BillDate: date,
    };

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    axios
      .post("/api/uploadFeeReport", payload, {
        headers: {
          Authorization: `Bearer ${userInfo[0].Token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        alert("Successfully uploaded the receipt!");
        router.push(`/claim-details/${leadID}`);
      })
      .catch((Err) => {
        console.log(Err);
      });
  };

  useEffect(() => {
    setInsurer(allInfo?.otherInfo[0]?.InsuranceCompanyNameAddress);
    setBranch(allInfo?.otherInfo[0]?.Region);
    calculateTotalAssessed();

    const professionalFees =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalProfFees
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionProfFees
        : SpotProfFees;

    const totalKM =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalTotalKM
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionTotalKM
        : SpotTotalKM;

    const Visits =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalVisit
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionVisit
        : SpotVisit;

    const Conveyance =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalConveyance
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionConveyance
        : SpotConveyance;

    const Photos =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotos
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotos
        : SpotPhotos;

    const charges =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalCharges
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionCharges
        : SpotCharges;

    const PhotoCD =
      String(currentSelectedInsprectiontype) === "1"
        ? FinalPhotosCD
        : String(currentSelectedInsprectiontype) === "2"
        ? ReInsprectionPhotosCD
        : SpotPhotosCD;

    const total =
      Number(professionalFees) + Number(Conveyance) + Number(PhotoCD);

    const calculate_cgst = (Number(total) * Number(CGST)) / 100;
    const calculate_igst = (Number(total) * Number(IGST)) / 100;

    const calculate_sgst = (Number(total) * Number(SGST)) / 100;

    setIGSTValue(calculate_igst);
    setCGSTValue(calculate_cgst);
    setSGSTValue(calculate_sgst);

    setNetPay(total + calculate_cgst + calculate_igst + calculate_sgst);
  }, [
    allInfo,
    FinalConveyance,
    FinalPhotosCD,
    FinalProfFees,
    SpotConveyance,
    SpotPhotosCD,
    SpotProfFees,
    ReInsprectionConveyance,
    ReInsprectionPhotosCD,
    ReInsprectionProfFees,
    currentSelectedInsprectiontype,
  ]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };

    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-6" style={{ borderRight: "1px solid grey" }}>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-1 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Bill#
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={allInfo?.feesDetails?.BillID}
                />
              </div>
              <div className="col-lg-1 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Date
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="date"
                  disable={false}
                  className="form-control"
                  id="broker_mail_id"
                  value={new Date(date)}
                  onChange={(e) => setDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontWeight: "",
                    // marginTop: "-13px",
                  }}
                >
                  Insurer
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={Insurer}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontWeight: "",
                    // marginTop: "-13px",
                  }}
                >
                  Branch
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={Branch}
                  onChange={(e) => setBranch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontWeight: "",
                    marginTop: "5px",
                  }}
                >
                  Bill To
                </label>
              </div>
              <div className="col-lg-7">
                <select
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  value={inspectionType}
                  onChange={(e) => setInspectionType(e.target.value)}
                >
                  <option data-tokens="Status1" value={""}>
                    Select Type
                  </option>
                  <option data-tokens="Status1" value={"spot"}>
                    Insured
                  </option>
                  <option data-tokens="Status2" value={"final"}>
                    Appointing office
                  </option>
                  <option data-tokens="Status3" value={"re-inspection"}>
                    Insurer
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontWeight: "",
                    // marginTop: "-13px",
                  }}
                >
                  Others
                </label>
              </div>
              <div className="col-lg-7">
                <input
                  type="text"
                  className="form-control"
                  id="propertyTitle"
                  value={Others}
                  onChange={(e) => setOthers(e.target.value)}
                />

                {/* <MyDatePicker /> */}
              </div>
            </div>
          </div>
          <h4>Details</h4>
          <hr />
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Estimate Amt.
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={Estimate}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  KM Rate
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={DetailsKM}
                  onChange={(e) => setDetailsKM(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Assessed Amt.
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={Assessed}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontSize: "14px",
                  }}
                >
                  Photos Rate
                </label>
              </div>
              <div className="col-lg-3">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={DetailsPhotoRate}
                  onChange={(e) => setDetailsPhotoRate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontSize: "14px",
                    // marginTop: "-13px",
                  }}
                >
                  Fee Based on
                </label>
              </div>
              <div className="col-lg-9">
                {/* <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={DetailsFee}
                  onChange={(e) => setDetailsFee(e.target.value)}
                /> */}
                <select
                  type="text"
                  className="form-select"
                  id="broker_mail_id"
                  value={DetailsFee}
                  onChange={(e) => setDetailsFee(e.target.value)}
                >
                  <option>Choose..</option>
                  <option>Estimate</option>
                  <option>Assessed</option>
                  <option>IDV</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1">
              <div className="col-lg-3 text-end my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    // paddingTop: "15px",
                    color: "#2e008b",
                    fontSize: "14px",
                    // marginTop: "-13px",
                  }}
                >
                  Remark
                </label>
              </div>
              <div className="col-lg-7">
                <textarea
                  name=""
                  id=""
                  cols="50"
                  rows="3"
                  value={DetailsRemark}
                  onChange={(e) => setDetailsRemark(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <table style={{ border: "1px solid black" }}>
              <tr>
                <th style={{ border: "1px solid black" }}></th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">Report</div>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">Name</div>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">Reg.No.</div>
                </th>
                <th style={{ border: "1px solid black" }}>
                  <div className="col-lg-12 text-center">S.No.</div>
                </th>
              </tr>
              <tr>
                <td>
                  <div className="col-lg-12 text-center">
                    <input type="checkbox" className="" id="broker_mail_id" />
                  </div>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="row">
            <h5>[Final]</h5>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input
                  type="checkbox"
                  className=""
                  id="broker_mail_id"
                  checked={
                    String(currentSelectedInsprectiontype) === "1"
                      ? true
                      : false
                  }
                  onChange={() => setcurrentSelectedInsprectiontype(1)}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Professional Fees
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalProfFees}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total KM
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalTotalKM}
                  onChange={(e) => setFinalTotalKM(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Visits
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalVisit}
                  onChange={(e) => setFinalVisit(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Conveyance
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalConveyance}
                  onChange={(e) => setFinalConveyance(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalPhotos}
                  onChange={(e) => setFinalPhotos(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Chrg.
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalCharges}
                  onChange={(e) => setFinalCharges(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos/CD
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalPhotosCD}
                  onChange={(e) => setFinalPhotoCD(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Remark
                  </label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    name=""
                    id=""
                    cols="60"
                    rows="2"
                    value={FinalRemark}
                    onChange={(e) => setFinalRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h5>[ReInspection]</h5>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input
                  type="checkbox"
                  className=""
                  id="broker_mail_id"
                  checked={
                    String(currentSelectedInsprectiontype) === "2"
                      ? true
                      : false
                  }
                  onChange={() => setcurrentSelectedInsprectiontype(2)}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Professional Fees
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalProfFees}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total KM
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionTotalKM}
                  onChange={(e) => setReInsprectionTotalKM(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Visits
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionVisit}
                  onChange={(e) => setReInsprectionVisit(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Conveyance
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionConveyance}
                  onChange={(e) => setReInsprectionConveyance(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionPhotos}
                  onChange={(e) => setReInsprectionPhotos(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Chrg.
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionCharges}
                  onChange={(e) => setReInsprectionCharges(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos/CD
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={ReInsprectionPhotosCD}
                  onChange={(e) => setReInsprectionPhotoCD(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Remark
                  </label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    name=""
                    id=""
                    cols="60"
                    rows="2"
                    value={ReInsprectionRemark}
                    onChange={(e) => setReInsprectionRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <h5>[Spot]</h5>
            <hr />
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input
                  type="checkbox"
                  className=""
                  id="broker_mail_id"
                  checked={
                    String(currentSelectedInsprectiontype) === "3"
                      ? true
                      : false
                  }
                  onChange={() => setcurrentSelectedInsprectiontype(3)}
                />
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Professional Fees
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={FinalProfFees}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Total KM
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotTotalKM}
                  onChange={(e) => setSpotTotalKM(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Visits
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotVisit}
                  onChange={(e) => setSpotVisit(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Conveyance
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotConveyance}
                  onChange={(e) => setSpotConveyance(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotPhotos}
                  onChange={(e) => setSpotPhotos(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Chrg.
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotCharges}
                  onChange={(e) => setSpotCharges(e.target.value)}
                />
              </div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Photos/CD
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SpotPhotosCD}
                  onChange={(e) => setSpotPhotoCD(e.target.value)}
                />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="row mt-1">
                <div className="col-lg-2 text-end my_profile_setting_input form-group">
                  <label
                    htmlFor=""
                    className="text-color"
                    style={{
                      // paddingTop: "15px",
                      color: "#2e008b",
                      fontSize: "14px",
                      // marginTop: "-13px",
                    }}
                  >
                    Remark
                  </label>
                </div>
                <div className="col-lg-9">
                  <textarea
                    name=""
                    id=""
                    cols="60"
                    rows="2"
                    value={SpotRemark}
                    onChange={(e) => setSpotRemark(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="row mt-1 mb-1">
              <div className="col-lg-5">
                {/* <input type="checkbox" className="" id="broker_mail_id" /> */}
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Other Total
                </label>
                <input type="checkbox" className="m-2" id="broker_mail_id" />
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={OtherTotal}
                  onChange={(e) => setOtherTotal(e.target.value)}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-3"></div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  C GST @ :
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={CGST}
                  onChange={(e) => setCGST(e.target.value)}
                />
              </div>
              <div className="col-lg-1">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  %
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={CGSTValue}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-3"></div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  S GST @ :
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SGST}
                  onChange={(e) => setSGST(e.target.value)}
                />
              </div>
              <div className="col-lg-1">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  %
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={SGSTValue}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-3"></div>
              <div className="col-lg-2 my_profile_setting_input form-group">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  I GST @ :
                </label>
              </div>
              <div className="col-lg-2">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={IGST}
                  onChange={(e) => setIGST(e.target.value)}
                />
              </div>
              <div className="col-lg-1">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  %
                </label>
              </div>
              <div className="col-lg-4">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={IGSTValue}
                />
              </div>
            </div>
            <div className="row mt-1 mb-1">
              <div className="col-lg-4">
                <input type="checkbox" className="" id="broker_mail_id" />
                <label
                  htmlFor=""
                  className="text-color m-2"
                  style={{
                    color: "#2e008b",
                    fontWeight: "bold",
                  }}
                >
                  Cash Recieved
                </label>
              </div>
              <div className="col-lg-3 my_profile_setting_input form-group text-end">
                <label
                  htmlFor=""
                  className="text-color"
                  style={{
                    color: "#2e008b",
                    fontWeight: "",
                  }}
                >
                  Net Payable :
                </label>
              </div>
              <div className="col-lg-5">
                <input
                  type="text"
                  className="form-control"
                  id="broker_mail_id"
                  value={NetPay}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="my_profile_setting_input">
            <button
              className="btn float-end btn-color"
              onClick={onSubmitHnadler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateList;
