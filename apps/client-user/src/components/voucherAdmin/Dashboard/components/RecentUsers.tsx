/* eslint-disable react/no-array-index-key */

/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from "react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { userData } from "../../../../dummy/data";

const RecentUsers = ({ title }: { title: string }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const pageCount = Math.ceil(userData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentItems = userData.slice(offset, offset + itemsPerPage);

  const handlePageClick = (event: { selected: any }) => {
    const selectedPage = event.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <h5 className="mb-4 text-xl font-bold">{title}</h5>
      <div className="overflow-auto">
        <table className="table min-w-full">
          <thead>
            <tr>
              <th className="border p-2">User Id</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{item.id}</td>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.address}</td>
                <td className="border px-4 py-2">{item.age}</td>
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

export default RecentUsers;
