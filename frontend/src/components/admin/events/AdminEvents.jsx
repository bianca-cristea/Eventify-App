import React, { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../shared/Loader";
import { FaBoxOpen, FaImage, FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { DataGrid } from "@mui/x-data-grid";
import { useDashboardEventFilter } from "../../../hooks/useEventFilter";
import Modal from "../../shared/Modal";
import AddEventForm from "./AddEventForm";
import DeleteModal from "../../shared/DeleteModal";
import ImageUploadForm from "./ImageUploadForm";
import EventViewModal from "../../shared/EventViewModal";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  dashboardEventsAction,
  deleteEvent,
} from "../../../store/actions/actions";
import toast from "react-hot-toast";

const AdminEvents = () => {
  const dispatch = useDispatch();
  const { events, pagination } = useSelector((state) => state.events);

  const { isLoading, errorMessage } = useSelector((state) => state.errors);
  const emptyEvents = !events || events.length === 0;

  const [currentPage, setCurrentPage] = useState(
    pagination?.pageNumber + 1 || 1,
  );
  const [loader, setLoader] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState("");
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEventViewModal, setOpenEventViewModal] = useState(false);
  const [openImageUploadModal, setOpenImageUploadModal] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = useLocation().pathname;

  useDashboardEventFilter();
  useEffect(() => {
    if (!openUpdateModal) {
      dispatch(
        dashboardEventsAction(
          "pageNumber=0&pageSize=5&sortBy=eventId&sortOrder=asc",
        ),
      );
    }
  }, [openUpdateModal]);
  const tableRecords = events?.map((item) => ({
    ...item,
    id: item.eventId,
    date: item.eventDate,
  }));

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOpenUpdateModal(true);
  };

  const handleDelete = (event) => {
    setSelectedEvent(event);
    setOpenDeleteModal(true);
  };

  const handleView = (event) => {
    setSelectedEvent(event);
    setOpenEventViewModal(true);
  };

  const handleImage = (event) => {
    setSelectedEvent(event);
    setOpenImageUploadModal(true);
  };

  const onDeleteHandler = () => {
    dispatch(
      deleteEvent(setLoader, selectedEvent?.id, toast, setOpenDeleteModal),
    );
  };

  const handlePaginationChange = (paginationModel) => {
    const page = paginationModel.page + 1;
    setCurrentPage(page);
    params.set("page", page.toString());
    navigate(`${pathname}?${params}`);
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
        <button
          onClick={() => setOpenAddModal(true)}
          className="bg-blue-700 cursor-pointer hover:bg-blue-900 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdAddShoppingCart className="text-xl" />
          Add event
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
            onPaginationModelChange={handlePaginationChange}
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
        open={openUpdateModal || openAddModal}
        setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
        title={openUpdateModal ? "Update event" : "Add event"}
      >
        <AddEventForm
          setOpen={openUpdateModal ? setOpenUpdateModal : setOpenAddModal}
          event={selectedEvent}
          update={openUpdateModal}
        />
      </Modal>

      <Modal
        open={openImageUploadModal}
        setOpen={setOpenImageUploadModal}
        title="Add event image"
      >
        <ImageUploadForm
          setOpen={setOpenImageUploadModal}
          event={selectedEvent}
        />
      </Modal>

      <DeleteModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        loader={loader}
        title="Are you sure you want to delete?"
        onDeleteHandler={onDeleteHandler}
      />
      <EventViewModal
        open={openEventViewModal}
        setOpen={setOpenEventViewModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default AdminEvents;
