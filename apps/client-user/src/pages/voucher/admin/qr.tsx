/* eslint-disable @nx/enforce-module-boundaries */
import { activeSectionAtom } from "apps/client-user/src/atom";
import MintTokenForm from "apps/client-user/src/components/voucherAdmin/MintToken/MintTokenForm";
import AdminNavbar from "apps/client-user/src/components/voucherAdmin/adminNavBar";
import { useAtom } from "jotai";
import Head from "next/head";
import { useRouter } from "next/router";
import Script from "next/script";
import React from "react";

const QRPage = () => {
  const router = useRouter();
  const { id, name, address } = router.query;

  if (!id || !name || !address) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sb-nav-fixed">
      <Head>
        <title>Issue Voucher and Generate QR</title>
        <link href="/css/styles.css" rel="stylesheet" />
      </Head>
      <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
        <a className="navbar-brand ps-3" href="#">
          Issue Voucher
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
                <a className="dropdown-item" href="#!">
                  Logout
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
          <main className="container-fluid">
            <MintTokenForm user={{ id: String(id), name: String(name), address: String(address) }} />
          </main>
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

      <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/js/all.min.js" crossOrigin="anonymous" />
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
        crossOrigin="anonymous"
      />
      <Script src="/js/scripts.js" />
    </div>
  );
};

export default QRPage;
