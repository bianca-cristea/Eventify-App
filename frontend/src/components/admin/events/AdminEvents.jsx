import React, { useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { FaBoxOpen, FaImage, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useDashboardEventFilter } from "../../../hooks/useEventFilter";
import Modal from "../../shared/Modal";
import AddEventForm from "./AddEventForm";

const AdminEvents = () => {
  const { events, pagination } = useSelector((state) => state.events);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const emptyEvents = !events || events.length === 0;

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );

  const [selectedEvent, setSelectedEvent] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  useDashboardEventFilter();

  const tableRecords = events?.map((item) => ({
    id: item.eventId,
    title: item.title,
    price: item.price,
    status: item.status,
    date: item.eventDate,
  }));

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOpenUpdateModal(true);
  };

  const handleDelete = (event) => {
    console.log("DELETE", event);
  };

  const handleView = (event) => {
    console.log("VIEW", event);
  };

  const handleImage = (event) => {
    console.log("IMAGE", event);
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 200,
      renderCell: (params) =>
        params.row.date
          ? new Date(params.row.date).toLocaleString("ro-RO")
          : "-",
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 220,
      sortable: false,
      renderCell: (params) => {
        const event = params.row;

        return (
          <div
            className="flex items-center gap-2"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => handleImage(event)}
              className="p-2 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition"
            >
              <FaImage size={14} />
            </button>

            <button
              onClick={() => handleView(event)}
              className="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
            >
              <FaEye size={14} />
            </button>

            <button
              onClick={() => handleEdit(event)}
              className="p-2 rounded-md bg-amber-50 text-amber-600 hover:bg-amber-100 transition"
            >
              <FaEdit size={14} />
            </button>

            <button
              onClick={() => handleDelete(event)}
              className="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition"
            >
              <FaTrash size={14} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="pt-6 pb-10 flex justify-end">
        <button className="bg-blue-700 cursor-pointer hover:bg-blue-900 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300">
          <MdAddShoppingCart className="text-xl" />
          Add product
        </button>
      </div>

      {!emptyEvents && (
        <h1 className="text-slate-700 text-3xl text-center font-bold pb-6 uppercase">
          All events
        </h1>
      )}

      {isLoading ? (
        <Loader />
      ) : emptyEvents ? (
        <div className="flex flex-col items-center text-gray-500 py-10">
          <FaBoxOpen size={50} className="mb-3" />
          No events
        </div>
      ) : (
        <div className="max-w-full">
          <DataGrid
            rows={tableRecords}
            columns={columns}
            paginationMode="server"
            rowCount={pagination?.totalElements || 0}
            pageSizeOptions={[pagination?.pageSize || 5]}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: pagination?.pageSize || 5,
                  page: currentPage - 1,
                },
              },
            }}
            disableRowSelectionOnClick
          />
        </div>
      )}

      <Modal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        title="Update event"
      >
        <AddEventForm
          setOpen={setOpenUpdateModal}
          event={selectedEvent}
          update={openUpdateModal}
        />
      </Modal>
    </div>
  );
};

export default AdminEvents;
