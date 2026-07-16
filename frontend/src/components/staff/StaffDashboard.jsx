import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyStaffEvent, validateTicket } from "../../store/actions/actions";
import { Scanner } from "@yudiel/react-qr-scanner";
const StaffDashboard = () => {
  const dispatch = useDispatch();

  const { staffEvent } = useSelector((state) => state.events);

  const [qrCode, setQrCode] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    dispatch(getMyStaffEvent());
  }, [dispatch]);

  const handleValidate = () => {
    if (!qrCode.trim()) return;

    dispatch(validateTicket(qrCode, setResult));
  };

  return (
    <div className="border rounded-lg p-5 shadow">
      <h2 className="text-xl font-semibold mb-6">Validate Ticket</h2>

      {/* QR Scanner */}
      <div className="mb-8">
        <h3 className="font-semibold mb-3">Scan QR Code</h3>

        <div className="max-w-sm mx-auto border rounded-lg overflow-hidden">
          <Scanner
            onScan={(result) => {
              if (result.length) {
                const code = result[0].rawValue;
                setQrCode(code);
                dispatch(validateTicket(code, setResult));
              }
            }}
            onError={(error) => console.log(error)}
          />
        </div>

        <p className="text-sm text-gray-500 text-center mt-2">
          Point the camera at the participant's QR code.
        </p>
      </div>

      <div className="flex items-center gap-3 my-6">
        <div className="flex-1 border-t"></div>
        <span className="text-gray-500 text-sm">OR</span>
        <div className="flex-1 border-t"></div>
      </div>

      {/* Manual validation */}
      <div>
        <h3 className="font-semibold mb-3">Enter QR Code Manually</h3>

        <input
          type="text"
          placeholder="Paste or type the QR code"
          value={qrCode}
          onChange={(e) => setQrCode(e.target.value)}
          className="w-full border rounded-md p-3 mb-4"
        />

        <button
          onClick={handleValidate}
          className="bg-blue-700 text-white px-6 py-2 rounded-md hover:bg-blue-900 transition"
        >
          Validate
        </button>
      </div>

      {result && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            result.valid
              ? "bg-green-100 text-green-800 border border-green-300"
              : "bg-red-100 text-red-800 border border-red-300"
          }`}
        >
          <p className="font-semibold">{result.message}</p>

          {result.valid && (
            <div className="mt-3 space-y-1">
              <p>
                <strong>Booking ID:</strong> {result.bookingId}
              </p>

              <p>
                <strong>Participant:</strong> {result.username}
              </p>

              <p>
                <strong>Event:</strong> {result.eventTitle}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffDashboard;
