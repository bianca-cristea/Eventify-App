import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit } from "react-icons/fa";
import Modal from "../../shared/Modal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const BookingTable = ({ adminBooking, pagination }) => {
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const columns = [
    {
      sortable: false,
      disableColumnMenu: true,
      field: "id",
      headerName: "bookingId",
      minWidth: 40,
      headerAlign: "center",
      editable: false,
      headerClassName: "text-black font-semibold border",
      cellClassName: "text-slate-700 font-normal border",
      renderHeader: (params) => <span className="text-center">Booking id</span>,
    },
    {
      disableColumnMenu: true,
      field: "email",
      headerName: "Email",
      align: "center",
      width: 200,
      editable: false,
      sortable: false,
      headerAlign: "center",
      headerClassName: "text-black font-semibold text-center border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span>Email</span>,
    },
    {
      disableColumnMenu: true,
      field: "totalAmount",
      headerName: "Total Amount",
      align: "center",
      width: 110,
      editable: false,
      sortable: true,
      headerAlign: "center",
      headerClassName: "text-black font-semibold text-center border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span>Total Amount</span>,
    },
    {
      disableColumnMenu: true,
      field: "status",
      headerName: "Status",
      align: "center",
      width: 110,
      editable: false,
      sortable: false,
      headerAlign: "center",
      headerClassName: "text-black font-semibold text-center border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span>Status</span>,
    },
    {
      disableColumnMenu: true,
      field: "date",
      headerName: "Booking date",
      align: "center",
      width: 110,
      editable: false,
      sortable: false,
      headerAlign: "center",
      headerClassName: "text-black font-semibold text-center border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span>Booking date</span>,
    },
    {
      disableColumnMenu: true,
      field: "action",
      headerName: "Action",
      align: "center",
      width: 200,
      editable: false,
      sortable: false,
      headerAlign: "center",
      headerClassName: "text-black font-semibold text-center border",
      cellClassName: "text-slate-700 font-normal border text-center",
      renderHeader: (params) => <span>Action</span>,
      renderCell: (params) => {
        return (
          <div className="flex justify-center items-center space-x-2 h-full pt-2">
            <button
              onClick={() => {
                setSelectedBooking(params.row);
                setOpenModal(true);
              }}
              className="flex items-center bg-blue-500 text-white px-4 h-9 rounded-md"
            >
              <FaEdit className="mr-2" />
              Edit
            </button>
          </div>
        );
      },
    },
  ];

  const tableRecords = adminBooking?.map((item) => {
    return {
      id: item.bookingId,
      email: item.email,
      totalAmount: item.totalAmount,
      status: item.status,
      date: item.bookingDate,
    };
  });

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
  };

  return (
    <div>
      <h1 className="text-slate-50 text-center text-3xl font-semibold pb-6 uppercase">
        All bookings
      </h1>
      <div>
        <DataGrid
          className="w-full"
          rows={tableRecords}
          columns={columns}
          paginationMode="server"
          rowCount={pagination?.totalElements || 0}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pagination?.totalElements || 10,
                page: currentPage - 1,
              },
            },
          }}
          onPaginationModelChange={handlePaginationChange}
          disableRowSelectionOnCLick
          disableColumnResize
          pageSizeOptions={[pagination.pageSize || 10]}
          pagination
          paginationOptions={{
            showFirstButton: true,
            showLastButton: true,
            hideNextButton: currentPage === pagination?.totalPages,
          }}
        />
        <Modal open={openModal} setOpen={setOpenModal} title="Edit Booking">
          {selectedBooking && (
            <>
              <p>ID: {selectedBooking.id}</p>
              <p>Email: {selectedBooking.email}</p>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default BookingTable;
