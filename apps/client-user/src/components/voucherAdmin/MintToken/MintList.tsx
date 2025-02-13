/* eslint-disable react/no-array-index-key */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import TokenLineChart from "./TokenLineChart";
import TokenSideBarChart from "./TokenSideBarChart";
import { userData } from "../../../dummy/data";

const MintList = ({ onClickMint }: { onClickMint: (user: { id: string; name: string; address: string }) => void }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 12;
  const pageCount = Math.ceil(userData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = userData.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: any }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="ml-4">
      <div className="mb-3 mt-16 w-full sm:w-full">
        <div className="input-group ">
          <input type="text" className="form-control ml-20 w-full" placeholder="Search by user name..." />
          <div className="input-group-append ml-0">
            <span className="input-group-text mr-20">
              <FaSearch size={20} />
            </span>
          </div>
        </div>
      </div>
      <div className="ml-20 mr-20 overflow-auto">
        <table className="table min-w-full">
          <thead>
            <tr>
              <th className="border p-2">User Id</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Age</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.age}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      onClickMint({
                        id: String(item.id),
                        name: item.name,
                        address: String(item.address),
                      })
                    }
                    type="button"
                    className="btn btn-primary bg-blue-100 text-black hover:text-white"
                  >
                    Issue Voucher
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="d-flex justify-content-center mt-4">
          <ReactPaginate
            previousLabel="<"
            nextLabel=">"
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
            previousClassName="page-item"
            nextClassName="page-item"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
            breakLinkClassName="page-link"
          />
        </div>
      </div>
    </div>
  );
};

export default MintList;
