import Header from "../common/header/dashboard/HeaderAdmin";
import SidebarMenu from "../common/header/dashboard/SidebarMenu_01";
import MobileMenu from "../common/header/MobileMenu";
import Activities from "./Activities";
import AllStatistics from "./AllStatistics";
import StatisticsChart from "./StatisticsChart";
import Exemple from "./Exemple";
import CreateList from "./CreateList";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios, { all } from "axios";
import Pagination from "./Pagination";
import { useRouter } from "next/router";

const Index = () => {
  const [start, setStart] = useState(0);
  const [properties, setProperties] = useState([]);
  const [allClaims, setAllClaims] = useState([]);
  const [filterCardClaim, setFilterCardClaim] = useState([]);
  const [selectedCard, setSelectedCard] = useState(0);
  const [end, setEnd] = useState(10);
  const [type, setType] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();
  const [filterClaims, setFilterClaims] = useState([]);
  const [majorSearch, setMajorSearch] = useState("");

  const [status, setStatus] = useState([]);
  const [isRegionChange, setIsRegionChange] = useState(false);
  const [regionSearchValue, setRegionSearchValue] = useState();

  return (
    <>
      {/* <!-- Main Header Nav --> */}
      <Header />
      {/* <!--  Mobile Menu --> */}
      <MobileMenu />

      <div className="dashboard_sidebar_menu">
        <div
          className="offcanvas offcanvas-dashboard offcanvas-start"
          tabIndex="-1"
          id="DashboardOffcanvasMenu"
          data-bs-scroll="true"
        >
          <SidebarMenu />
          {/* <Sidebar /> */}
        </div>
      </div>
      {/* End sidebar_menu */}

      {/* <!-- Our Dashbord --> */}
      <section className="our-dashbord dashbord bgc-f7 pb50">
        <div className="container-fluid ovh">
          <div className="row">
            <div className="col-lg-12 maxw100flex-992">
              <div className="row">
                {/* Start Dashboard Navigation */}
                <div className="col-lg-12">
                  <div className="dashboard_navigationbar dn db-1024">
                    <div className="dropdown">
                      <button
                        className="dropbtn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#DashboardOffcanvasMenu"
                        aria-controls="DashboardOffcanvasMenu"
                      >
                        <i className="fa fa-bars pr10"></i> Dashboard Navigation
                      </button>
                    </div>
                  </div>
                </div>
                {/* End Dashboard Navigation */}

                {/* <div className="col-lg-12 mb10">
                  <div className="breadcrumb_content style2">
                    <h2 className="breadcrumb_title">Howdy, Hasan</h2>
                    <p>We are glad to see you again!</p>
                  </div>
                </div> */}
              </div>
              {/* End .row */}

              {/* <div
                className="row mt-2"
                style={{ justifyContent: "space-between" }}
              >
                <AllStatistics
                  allClaims={
                    searchInput || majorSearch || isRegionChange
                      ? filterClaims
                      : allClaims
                  }
                  setSelectedCard={setSelectedCard}
                />
              </div> */}
              {/* End .row Dashboard top statistics */}
              {/* <div
                className=" bg-dark"
                style={{
                  width: "101%",
                  height: "3px",
                  color: "blue",
                  border: "1px solid",
                  marginBottom: "5px",
                  marginLeft: "-12px",
                }}
              ></div> */}
              {/* <div className="row">
                <CreateList setSearchInput={setSearchInput} setType={setType} />
              </div> */}
              {/* <div
                className="bg-dark"
                style={{
                  width: "101%",
                  height: "3px",
                  color: "blue",
                  border: "1px solid blue",
                  marginLeft: "-12px",
                }}
              ></div> */}
              <div className="row">
                {/* <div className="col-xl-7">
                  <div className="application_statics">
                    <h4 className="mb-4">View Statistics</h4>
                    <StatisticsChart />
                  </div>
                </div> */}
                {/* End statistics chart */}
                {/* <Exemple
                  claims={
                    searchInput || majorSearch || isRegionChange
                      ? filterClaims
                      : selectedCard
                      ? filterCardClaim
                      : allClaims
                  }
                  start={start}
                  end={end}
                  setMajorSearch={setMajorSearch}
                  status={status}
                /> */}
                {/* <div className="col-xl-5">
                  <div className="recent_job_activity">
                    <h4 className="title mb-4">Recent Activities</h4>
                    <Activities />
                  </div>
                </div> */}
              </div>
              {/* End .row  */}

              <div className="row">
                <div className="col-lg-12 mt20">
                  {/* <div className="mbp_pagination">
                    <Pagination
                      setStart={setStart}
                      setEnd={setEnd}
                      properties={
                        searchInput || majorSearch || isRegionChange
                          ? filterClaims
                          : selectedCard > 0
                          ? filterCardClaim
                          : showRegionClaim
                          ? filterAccordingClaim
                          : allClaims
                      }
                    />
                  </div> */}
                </div>
              </div>

              <div className="row mt250">
                <div className="col-lg-12">
                  <div className="copyright-widget text-center">
                    <p>
                      {" "}
                      &copy; {new Date().getFullYear()} Infostics. Made with
                      love.
                    </p>
                  </div>
                </div>
              </div>
              {/* End .row */}
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
