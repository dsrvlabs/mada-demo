/* eslint-disable @nx/enforce-module-boundaries */

/* eslint-disable @next/next/no-css-tags */

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable react/no-array-index-key */
import { activeSectionAtom } from "apps/client-user/src/atom";
import NationalLevel from "apps/client-user/src/components/voucherAdmin/ByRegion/NationalLevel";
import RecentTxs from "apps/client-user/src/components/voucherAdmin/RecentTransactions/RecentTxs";
import VendorManagement from "apps/client-user/src/components/voucherAdmin/VendorManagement/VendorManagement";
import AdminNavbar from "apps/client-user/src/components/voucherAdmin/adminNavBar";
import { useAuth } from "apps/client-user/src/hooks/useAuth";
import useFetchRecentTxs from "apps/client-user/src/hooks/useFetchRecentTxs";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React, { useEffect, useState } from "react";
import Dashboard from "../../../components/voucherAdmin/Dashboard/Dashboard";
import MintList from "../../../components/voucherAdmin/MintToken/MintList";
import TokenManagement from "../../../components/voucherAdmin/TokenManagement/TokenManagement";
import UserManagement from "../../../components/voucherAdmin/UserManagement/UserManagement";

const tokenAddresses = [
  { address: process.env.NEXT_PUBLIC_FERTILIZER_TOKEN_ADDRESS, name: "Fertilizer" },
  { address: process.env.NEXT_PUBLIC_SHOVEL_TOKEN_ADDRESS, name: "Shovel" },
  { address: process.env.NEXT_PUBLIC_SEEDS_TOKEN_ADDRESS, name: "Seeds" },
  { address: process.env.NEXT_PUBLIC_PESTICIDE_TOKEN_ADDRESS, name: "Pesticide" },
].filter((token) => token.address) as { address: string; name: string }[];

const AdminPage = () => {
  const { login, logout, loggedIn } = useAuth();
  const [buttonText, setButtonText] = useState("LogIn");
  const router = useRouter();
  const [activeSection] = useAtom(activeSectionAtom);
  const { logs, isLoading } = useFetchRecentTxs(tokenAddresses);

  const onClickMint = (user: any) => {
    router.push({
      pathname: "/voucher/admin/qr",
      query: { id: user.id, name: user.name, address: user.address },
    });
  };

  useEffect(() => {
    if (loggedIn) {
      setButtonText("LogOut");
    } else {
      setButtonText("LogIn");
    }
  }, [loggedIn]);

  const handleClick = async () => {
    if (loggedIn) {
      await logout();
    } else {
      await login();
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "mintToken":
        return <MintList onClickMint={onClickMint} />;
      case "transactions":
        return <RecentTxs logs={logs} isLoading={isLoading} />;
      case "inventory":
        return <VendorManagement />;
      case "user":
        return <UserManagement />;
      case "tokenMng":
        return <TokenManagement />;
      case "nationalLevel":
        return <NationalLevel />;
      case "settings":
        return (
          <div>
            <h2>Settings</h2>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">System Settings</h5>
                <p className="card-text">Manage system settings.</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Head>
        <title>Admin</title>
        <link href="/css/styles.css" rel="stylesheet" />
      </Head>

      <div className="sb-nav-fixed">
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
          <a className="navbar-brand ps-3 text-gray-300" href="#">
            Voucher Admin
          </a>
          <form className="d-none d-md-inline-block form-inline me-md-3 my-md-0 my-2 me-0 ms-auto">
            <div className="input-group">
              <input className="form-control" type="text" placeholder="Search for..." aria-label="Search for..." />
            </div>
          </form>
          <ul className="navbar-nav ms-md-0 me-lg-4 me-3 ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
              >
                <i className="fas fa-user fa-fw" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#!">
                    Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#!">
                    Activity Log
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#!" onClick={handleClick}>
                    {buttonText}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <div id="layoutSidenav">
          <div id="layoutSidenav_nav">
            <AdminNavbar />
          </div>
          <div id="layoutSidenav_content">
            <main>{renderSection()}</main>
            <footer className="bg-light mt-auto py-4">
              <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                  <div className="text-muted">Copyright &copy; DSRV 2024</div>
                  <div>
                    <a href="#">Privacy Policy</a>
                    &middot;
                    <a href="#">Terms & Conditions</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossOrigin="anonymous" />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      />
      <Script src="/js/scripts.js" />
    </div>
  );
};

export default AdminPage;
