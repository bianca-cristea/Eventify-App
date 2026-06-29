import React, { useState } from "react";
import { useSelector } from "react-redux";
import { MdPersonAdd } from "react-icons/md";

import OrganizerTable from "./OrganizerTable";
import ErrorPage from "../../shared/ErrorPage";
import Loader from "../../shared/Loader";
import Modal from "../../shared/Modal";
import AddOrganizerForm from "../organizers/AddOrganizersForm";
import useOrganizerFilter from "./useOrganizerFilter";

const Organizers = () => {
  const [openModal, setOpenModal] = useState(false);
  const { organizers, pagination } = useSelector((state) => state.organizers);
  const { isLoading, errorMessage } = useSelector((state) => state.errors);

  useOrganizerFilter();

  const emptyOrganizers = !organizers || organizers?.length === 0;

  if (errorMessage) {
    return <ErrorPage message={errorMessage} />;
  }

  return (
    <React.Fragment>
      <div className="pt-6 pb-10 flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="bg-custom-blue hover:bg-blue-800 text-white font-semibold py-2 px-4 flex items-center gap-2 rounded-md shadow-md transition-colors hover:text-slate-300 duration-300"
        >
          <MdPersonAdd className="text-xl" />
          Add Organizer
        </button>
      </div>

      {!emptyOrganizers && (
        <h1 className="text-slate-800 text-3xl text-center font-bold pb-6 uppercase">
          All Organizers
        </h1>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {emptyOrganizers ? (
            <>
              <div className="flex flex-col items-center justify-center text-gray-600 py-10">
                <h2 className="text-2xl font-semibold">
                  No Organizer Created Yet
                </h2>
              </div>
            </>
          ) : (
            <OrganizerTable organizers={organizers} pagination={pagination} />
          )}
        </>
      )}

      <Modal open={openModal} setOpen={setOpenModal} title="Add New Organizer">
        <AddOrganizerForm setOpen={setOpenModal} />
      </Modal>
    </React.Fragment>
  );
};
export default Organizers;
