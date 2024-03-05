import Header from "../../common/header/dashboard/Header";
import SidebarMenu from "../../common/header/dashboard/SidebarMenu";
import MobileMenu from "../../common/header/MobileMenu";
import CreateList from "./CreateList";
import { Toaster } from "react-hot-toast";
// import DetailedInfo from "./DetailedInfo";
// import FloorPlans from "./FloorPlans";
// import LocationField from "./LocationField";
// import PropertyMediaUploader from "./PropertyMediaUploader";

const index = ({ leadId, email, policyNo, Insured, vehicleNo }) => {
  return (
    <>
      <Toaster />
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
          <SidebarMenu leadId={leadId} />
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

                <div className="col-lg-12 mb-2">
                  <div className="style2">
                    {/* <h4 className="breadcrumb_title">Case Details</h4> */}
                    {/* <p>We are glad to see you again!</p> */}
                  </div>
                </div>
                {/* End .col */}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="my_dashboard_review bgc-f6">
                      <div className="row">
                        <div className="col-lg-12">
                          <h4 className="mb10">Send Mails</h4>
                        </div>
                        <div
                          className=" bg-dark"
                          style={{
                            width: "100%",
                            height: "3px",
                            color: "blue",
                            border: "1px solid",
                            marginBottom: "5px",
                          }}
                        ></div>
                        <CreateList
                          leadId={leadId}
                          email={email}
                          policyNo={policyNo}
                          vehicleNo={vehicleNo}
                          Insured={Insured}
                        />
                      </div>
                    </div>
                    {/* <div className="my_dashboard_review mt30">
                    <div className="row">
                      <div className="col-lg-12">
                        <h3 className="mb30">Location</h3>
                      </div>

                      <LocationField />
                    </div>
                  </div> */}
                    {/* <div className="my_dashboard_review mt30">
                      <div className="col-lg-12">
                        <h3 className="mb30">Detailed Information</h3>
                      </div>
                      <DetailedInfo />
                    </div> */}
                    {/* <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Property media</h3>
                    </div>
                    <PropertyMediaUploader />
                  </div>
                  <div className="my_dashboard_review mt30">
                    <div className="col-lg-12">
                      <h3 className="mb30">Floor Plans</h3>
                      <button className="btn admore_btn mb30">Add More</button>
                    </div>
                    <FloorPlans />
                  </div> */}
                  </div>
                  <div className="col-lg-3"></div>
                </div>
                {/* End .col */}
              </div>
              {/* End .row */}

              <div className="row mt200">
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

export default index;
