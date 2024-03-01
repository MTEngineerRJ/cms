import Link from "next/link";
import SmartTable from "./SmartTable";
import { useEffect, useState } from "react";

const headCells = [
  {
    id: "sno",
    numeric: false,
    label: "S.No.",
    width: 10,
  },
  {
    id: "ref_no",
    numeric: false,
    label: "Ref No.",
    width: 150,
  },
  {
    id: "policy_no",
    numeric: false,
    label: "Policy No.",
    width: 150,
  },
  {
    id: "claim_no",
    numeric: false,
    label: "Row No.",
    width: 150,
  },
  {
    id: "veh_no",
    numeric: false,
    label: "Veh. No.",
    width: 150,
  },
  {
    id: "insured",
    numeric: false,
    label: "Insured",
    width: 100,
  },
  {
    id: "insured_gst_no",
    numeric: false,
    label: "Insured GST No.",
    width: 180,
  },
  {
    id: "survey_type",
    numeric: false,
    label: "Survey Type",
    width: 150,
  },
  {
    id: "doi",
    numeric: false,
    label: "Date Of Information",
    width: 240,
  },
  {
    id: "date_of_survey",
    numeric: false,
    label: "Date of Survey",
    width: 170,
  },
  {
    id: "estimate_amt",
    numeric: false,
    label: "Estimate Amt.",
    width: 170,
  },
  {
    id: "assessed_amt",
    numeric: false,
    label: "Assessed Amt.",
    width: 160,
  },
  {
    id: "tat",
    numeric: false,
    label: "TAT",
    width: 100,
  },
  {
    id: "remarks",
    numeric: false,
    label: "Remarks",
    width: 100,
  },
  {
    id: "bill_no",
    numeric: false,
    label: "Bill No.",
    width: 100,
  },
  {
    id: "bill_total",
    numeric: false,
    label: "Bill Total",
    width: 140,
  },
  {
    id: "bill_date",
    numeric: false,
    label: "Bill Date",
    width: 150,
  },
];

const data = [
  {
    _id: "6144145976c7fe",
    sno: "1",
    ref_no: "65465",
    policy_no: <Link href="/row-details">9617099995114</Link>,
    row_no: "7675756",
    veh_no: "65756",
    insured: "ahlannn",
    insured_gst_no: "2765675",
    survey_type: "123",
    doi: "12/11/1111",
    date_of_survey: "11/22/1111",
    estimate_amt: "76567",
    assessed_amt: "765",
    tat: "ahlannn",
    remarks: "trtee",
    bill_no: "123",
    bill_total: "123",
    bill_date: "12/09/2023",
    s_feed: "Mina",
  },
  {
    _id: "6144145976c7fe",
    sno: "1",
    ref_no: "65465",
    policy_no: <Link href="/row-details">9617099995114</Link>,
    row_no: "7675756",
    veh_no: "65756",
    insured: "ahlannn",
    insured_gst_no: "2765675",
    survey_type: "123",
    doi: "12/11/1111",
    date_of_survey: "11/22/1111",
    estimate_amt: "76567",
    assessed_amt: "765",
    tat: "ahlannn",
    remarks: "trtee",
    bill_no: "123",
    bill_total: "123",
    bill_date: "12/09/2023",
    s_feed: "Mina",
  },
  {
    _id: "6144145976c7fe",
    sno: "1",
    ref_no: "65465",
    policy_no: <Link href="/row-details">9617099995114</Link>,
    row_no: "7675756",
    veh_no: "65756",
    insured: "ahlannn",
    insured_gst_no: "2765675",
    survey_type: "123",
    doi: "12/11/1111",
    date_of_survey: "11/22/1111",
    estimate_amt: "76567",
    assessed_amt: "765",
    tat: "ahlannn",
    remarks: "trtee",
    bill_no: "123",
    bill_total: "123",
    bill_date: "12/09/2023",
    s_feed: "Mina",
  },
  {
    _id: "6144145976c7fe",
    sno: "1",
    ref_no: "65465",
    policy_no: <Link href="/row-details">9617099995114</Link>,
    veh_no: "65756",
    row_no: "7675756",
    insured: "ahlannn",
    insured_gst_no: "2765675",
    survey_type: "123",
    doi: "12/11/1111",
    date_of_survey: "11/22/1111",
    estimate_amt: "76567",
    assessed_amt: "765",
    tat: "ahlannn",
    remarks: "trtee",
    bill_no: "123",
    bill_total: "123",
    bill_date: "12/09/2023",
    s_feed: "Mina",
  },
  {
    _id: "6144145976c7fe",
    sno: "1",
    ref_no: "65465",
    policy_no: <Link href="/row-details">9617099995114</Link>,
    row_no: "7675756",
    veh_no: "65756",
    insured: "ahlannn",
    insured_gst_no: "2765675",
    survey_type: "123",
    doi: "12/11/1111",
    date_of_survey: "11/22/1111",
    estimate_amt: "76567",
    assessed_amt: "765",
    tat: "ahlannn",
    remarks: "trtee",
    bill_no: "123",
    bill_total: "123",
    bill_date: "12/09/2023",
    s_feed: "Mina",
  },
];

export default function Exemple({
  allRows,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}) {
  const [updatedData, setUpdatedData] = useState([]);
  let tempData = [];
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const sortObjectsByOrderIdDescending = (data) => {
    return data.sort((a, b) => b.doi - a.doi);
  };

  const changeHandler = () => {
    setStartDate(start);
    setEndDate(end);
  };

  const reloadHandler = () => {
    setStartDate("");
    setEndDate("");
  };

  function convertToIST(utcTimestamp) {
    const utcDate = new Date(utcTimestamp);

    // Convert to Indian Standard Time (IST)
    const istDate = new Date(
      utcDate.toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
    );

    // Format IST date and time with hours, minutes, AM/PM
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    const formattedISTDateTime = istDate.toLocaleString("en-US", options);

    // Return the formatted IST date and time as a string
    return formattedISTDateTime;
  }

  useEffect(() => {
    allRows?.map((row, index) => {
      const updatedRow = {
        sno: index + 1,
        ref_no: row.ReferenceNo,
        policy_no: row.PolicyNumber,
        claim_no: row.ClaimNumber,
        veh_no: row.RegisteredNumber,
        insured: row.InsuredName,
        insured_gst_no: row.InsuredGSTNumber,
        doi: convertToIST(row.DateOfIntimation),
        date_of_survey: convertToIST(row.DateOfSurvey),
        estimate_amt: row.EstimateAmt,
        assessed_amt: row.AssessedAmt,
        tat: 0,
        remarks: row.Remarks,
        bill_no: row.BillNo,
        bill_total: row.BillTotal,
        bill_date: convertToIST(row.BillDate),
      };
      tempData.push(updatedRow);
    });
    setUpdatedData(tempData);
  }, [allRows]);
  console.log(updatedData);
  return (
    <SmartTable
      title="MIS Sheet"
      data={sortObjectsByOrderIdDescending(updatedData)}
      changeHandler={changeHandler}
      setStart={setStart}
      setEnd={setEnd}
      start={start}
      reloadHandler={reloadHandler}
      end={end}
      headCells={headCells}
    />
  );
}
