import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import {
  FaBell,
  FaBoxes,
  FaCalendar,
  FaCalendarAlt,
  FaCalendarCheck,
  FaChartBar,
  FaChartLine,
  FaChartPie,
  FaCity,
  FaCogs,
  FaCoins,
  FaExchangeAlt,
  FaFileExport,
  FaGlobe,
  FaHistory,
  FaLeaf,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaRecycle,
  FaSeedling,
  FaShippingFast,
  FaTachometerAlt,
  FaTruck,
  FaUserCog,
  FaWater,
} from "react-icons/fa";
import { activeSectionAtom } from "../../atom";

const AdminNavbar = () => {
  const [activeSection, setActiveSection] = useAtom(activeSectionAtom);
  const router = useRouter();
  const prevActiveSection = useRef(activeSection);

  useEffect(() => {
    if (prevActiveSection.current !== activeSection) {
      router.push("/voucher/admin");
      prevActiveSection.current = activeSection;
    }
  }, [activeSection]);

  return (
    <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div className="sb-sidenav-menu">
        <div className="nav">
          <div className="sb-sidenav-menu-heading">Core</div>
          <a className="nav-link" onClick={() => setActiveSection("dashboard")} href="#">
            <div className="sb-nav-link-icon">
              <FaTachometerAlt />
            </div>
            Dashboard
          </a>
          <a className="nav-link" onClick={() => setActiveSection("mintToken")} href="#">
            <div className="sb-nav-link-icon">
              <FaUserCog />
            </div>
            Issue Voucher
          </a>
          <div className="sb-sidenav-menu-heading">Product Transactions</div>
          <a className="nav-link" onClick={() => setActiveSection("transactions")} href="#">
            <div className="sb-nav-link-icon">
              <FaExchangeAlt />
            </div>
            Recent Transactions
          </a>
          <div className="sb-sidenav-menu-heading">By Region</div>
          <a className="nav-link" onClick={() => setActiveSection("nationalLevel")} href="#">
            <div className="sb-nav-link-icon">
              <FaGlobe />
            </div>
            State Level
          </a>
          <a className="nav-link" onClick={() => setActiveSection("stateLevel")} href="#">
            <div className="sb-nav-link-icon">
              <FaMapMarkerAlt />
            </div>
            City Level
          </a>
          <div className="sb-sidenav-menu-heading">Management</div>
          <a className="nav-link" onClick={() => setActiveSection("tokenMng")} href="#">
            <div className="sb-nav-link-icon">
              <FaCoins />
            </div>
            Product Management
          </a>
          <a className="nav-link" onClick={() => setActiveSection("user")} href="#">
            <div className="sb-nav-link-icon">
              <FaUserCog />
            </div>
            User Management
          </a>
          <a className="nav-link" onClick={() => setActiveSection("inventory")} href="#">
            <div className="sb-nav-link-icon">
              <FaUserCog />
            </div>
            Merchant Management
          </a>

          <div className="sb-sidenav-menu-heading">Inventory Management</div>
          <a className="nav-link" onClick={() => setActiveSection("currentStockLevels")} href="#">
            <div className="sb-nav-link-icon">
              <FaBoxes />
            </div>
            Current Stock Levels
          </a>
          <a className="nav-link" onClick={() => setActiveSection("incomingShipments")} href="#">
            <div className="sb-nav-link-icon">
              <FaTruck />
            </div>
            Incoming Shipments
          </a>
          <a className="nav-link" onClick={() => setActiveSection("outgoingShipments")} href="#">
            <div className="sb-nav-link-icon">
              <FaShippingFast />
            </div>
            Outgoing Shipments
          </a>

          <div className="sb-sidenav-menu-heading">Crop Production</div>
          <a className="nav-link" onClick={() => setActiveSection("currentSeason")} href="#">
            <div className="sb-nav-link-icon">
              <FaSeedling />
            </div>
            Current Season
          </a>
          <a className="nav-link" onClick={() => setActiveSection("historicalData")} href="#">
            <div className="sb-nav-link-icon">
              <FaHistory />
            </div>
            Historical Data
          </a>

          <div className="sb-sidenav-menu-heading">Market Analysis</div>
          <a className="nav-link" onClick={() => setActiveSection("priceTrends")} href="#">
            <div className="sb-nav-link-icon">
              <FaChartLine />
            </div>
            Price Trends
          </a>
          <a className="nav-link" onClick={() => setActiveSection("demandForecasting")} href="#">
            <div className="sb-nav-link-icon">
              <FaChartBar />
            </div>
            Demand Forecasting
          </a>
          <a className="nav-link" onClick={() => setActiveSection("exportImportData")} href="#">
            <div className="sb-nav-link-icon">
              <FaFileExport />
            </div>
            Export/Import Data
          </a>
          <a className="nav-link" onClick={() => setActiveSection("regionalMarketAnalysis")} href="#">
            <div className="sb-nav-link-icon">
              <FaChartPie />
            </div>
            Regional Market Analysis
          </a>
          <div className="sb-sidenav-menu-heading">Reports and Analytics</div>
          <a className="nav-link" onClick={() => setActiveSection("monthlyReports")} href="#">
            <div className="sb-nav-link-icon">
              <FaCalendarAlt />
            </div>
            Monthly Reports
          </a>
          <a className="nav-link" onClick={() => setActiveSection("quarterlyReports")} href="#">
            <div className="sb-nav-link-icon">
              <FaCalendar />
            </div>
            Quarterly Reports
          </a>
          <a className="nav-link" onClick={() => setActiveSection("annualReports")} href="#">
            <div className="sb-nav-link-icon">
              <FaCalendarCheck />
            </div>
            Annual Reports
          </a>
          <a className="nav-link" onClick={() => setActiveSection("customReportGenerator")} href="#">
            <div className="sb-nav-link-icon">
              <FaCogs />
            </div>
            Custom Report Generator
          </a>
          <div className="sb-sidenav-menu-heading">Sustainability</div>
          <a className="nav-link" onClick={() => setActiveSection("environmentalImpact")} href="#">
            <div className="sb-nav-link-icon">
              <FaLeaf />
            </div>
            Environmental Impact
          </a>
          <a className="nav-link" onClick={() => setActiveSection("sustainabilityInitiatives")} href="#">
            <div className="sb-nav-link-icon">
              <FaRecycle />
            </div>
            Sustainability Initiatives
          </a>
          <a className="nav-link" onClick={() => setActiveSection("resourceManagement")} href="#">
            <div className="sb-nav-link-icon">
              <FaWater />
            </div>
            Resource Management
          </a>
          <div className="sb-sidenav-menu-heading">Settings</div>
          <a className="nav-link" onClick={() => setActiveSection("settings")} href="#">
            <div className="sb-nav-link-icon">
              <FaCogs />
            </div>
            System Settings
          </a>
          <a className="nav-link" onClick={() => setActiveSection("notificationPreferences")} href="#">
            <div className="sb-nav-link-icon">
              <FaBell />
            </div>
            Notification Preferences
          </a>
          <a className="nav-link" onClick={() => setActiveSection("helpSupport")} href="#">
            <div className="sb-nav-link-icon">
              <FaQuestionCircle />
            </div>
            Help & Support
          </a>
        </div>
      </div>
      <div className="sb-sidenav-footer">
        <div className="small">Logged in as:</div>
        Admin
      </div>
    </nav>
  );
};

export default AdminNavbar;
