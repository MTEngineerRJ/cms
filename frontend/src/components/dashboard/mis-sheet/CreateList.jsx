import { useState } from "react";

const CreateList = ({ setSearchInput, setType, 
  changeHandler,
  setStart,
  setEnd,
  reloadHandler,
start,
end }) => {
  const [currentType, setCurrentType] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const handleInputChange = (value, type) => {
    setCurrentType(type);
    setSearchValue(value);
  };


  const searchHandler = ({
   
  }) => {
    setType(currentType);
    setSearchInput(searchValue);
  };
  return (
    <>
      <div className="col-lg-12">
        <div
          className="row my_profile_setting_input form-group"
          // style={{ marginLeft: "-25px" }}
        >
          {/* <div className="col-lg-3">
            <input
              type="text"
              className="form-control"
              id="propertyTitle"
              placeholder="Enter Policy No."
              onChange={(e) => handleInputChange(e.target.value, 1)}
            />
          </div>
          <div className="col-lg-3">
            <input
              type="text"
              className="form-control"
              id="propertyTitle"
              placeholder="Enter Registration No."
              onChange={(e) => handleInputChange(e.target.value, 1)}
            />
          </div> */}
          <div className="col-lg-4">
            <div className="row">
              <div className="col-lg-4 text-end">
                <label htmlFor="" className="mt-2">
                  Insurer Name
                </label>
              </div>
              <div className="col-lg-8">
                <select
                  // style={{ marginTop: "5px" }}
                  style={{ padding: "2px", marginTop: "3px" }}
                  className="selectpicker form-select"
                  data-live-search="true"
                  data-width="100%"
                  // value={VehicleType}
                  // onChange={(e) => setVehicleType(e.target.value)}
                  // disabled={!isEditMode}
                >
                  <option data-tokens="Status1">Select</option>
                  <option data-tokens="Status2">Swift</option>
                  <option data-tokens="Status3">Honda</option>
                  <option data-tokens="Status4">Maruti Sukuzi</option>
                </select>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-3 text-end">
                <label htmlFor="" className="mt-2">
                  From
                </label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  id="propertyTitle"
                  value={start}
                  onChange={(e)=>setStart(e.target.value)}
                  placeholder="Enter Reference No."
                />
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="row">
              <div className="col-lg-3 text-end">
                <label htmlFor="" className="mt-2">
                  To
                </label>
              </div>
              <div className="col-lg-8">
                <input
                  type="date"
                  className="form-control"
                  id="propertyTitle"
                  value={end}
                  onChange={(e)=>setEnd(e.target.value)}
                  placeholder="Enter Reference No."
                />
              </div>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="my_profile_setting_input">
              <button
                className="btn float-end btn-color mt-0"
                onClick={reloadHandler}
              >
                Reload
              </button>
            </div>
          </div>
          <div className="col-lg-1">
            <div className="my_profile_setting_input">
              <button
                className="btn float-end btn-color mt-0"
                onClick={changeHandler}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End .col */}
    </>
  );
};

export default CreateList;
