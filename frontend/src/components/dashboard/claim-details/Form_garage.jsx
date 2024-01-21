import axios from "axios";
import toast from "react-hot-toast";
import Link from "next/link";

const Form_garage = ({
  claim,
  InsuredName,
  RegisteredNumber,
  subType,
  InsuredMobileNo1,
  ClaimNumber,
  InsuredMailAddress,
  requestType,
}) => {
  const formatDate = (val) => {
    const date = new Date(val);
    const formattedDate = date.toLocaleDateString("en-GB");
    return formattedDate;
  };

  return (
    <>
      <div className="col-lg-12 m-2">
        <div className="row">
          <div className="row">
            <table className="m-1" style={{ border: "1px solid grey" }}>
              <tr>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-4 text-color"
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",
                        marginRight: "50px",
                      }}
                    >
                      Name & Address
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      {claim.garageDetails?.GarageNameAndAddress}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-4 text-color"
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",

                        marginRight: "50px",
                      }}
                    >
                      Contact Number
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      { claim.garageDetails?.GarageContactNo1}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-2 text-color"
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",

                        marginRight: "50px",
                      }}
                    >
                      Added Date
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                    {formatDate(claim.garageDetails?.GarageAddedDate)}
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
                        fontSize: "15px",
                        fontWeight: "bold",

                        marginRight: "50px",
                      }}
                    >
                      Added By
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-4 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                      { claim.garageDetails?.GarageAddedBy}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-5 text-color"
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",

                        marginRight: "50px",
                      }}
                    >
                      Modified Date
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-5 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                    {formatDate(claim.garageDetails?.GarageModifiedDate)}
                    </label>
                  </div>
                </td>
                <td style={{ border: "1px solid grey", padding: "3px" }}>
                  <div className="row">
                    <label
                      htmlFor=""
                      className="col-lg-4 text-color"
                      style={{
                        color: "black",
                        fontSize: "15px",
                        fontWeight: "bold",

                        marginRight: "50px",
                      }}
                    >
                      Status
                    </label>
                    <label
                      htmlFor=""
                      className="col-lg-6 text-color text-end"
                      style={{
                        color: "#1560bd",
                        fontSize: "15px",
                        fontWeight: "bold",
                      }}
                    >
                    {formatDate(claim.claimStatus?.ClaimStatus)}
                    </label>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form_garage;