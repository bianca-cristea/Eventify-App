import React, { useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import BookingTable from "./BookingTable";

const Bookings = () => {
  const pagination = {
    pageNumber: 0,
    pageSize: null,
    totalElements: 9,
    totalPages: 1,
    isLast: true,
  };
  const adminBookings = [
    {
      bookingId: 7,
      bookingDate: "2026-06-17T19:44:24.700677",
      status: "PENDING",
      totalAmount: 99.99,
      email: "participant@example.com",
      qrCode: "c7e6fac3-ba52-4f24-a0a3-e6c017deff96",
      bookingItems: [
        {
          ticketId: 1,
          quantity: 1,
          priceAtBooking: 99.99,
          ticketType: "REGULAR",
          eventTitle: "Coldplay",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "BT Arena, Cluj-Napoca",
          eventImage: "b75ce584-2df2-4728-ab17-49cb69c282a5.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 8,
      bookingDate: "2026-06-17T19:48:27.318945",
      status: "CONFIRMED",
      totalAmount: 99.99,
      email: "participant@example.com",
      qrCode: "d2e79a5d-3c43-4fc0-9f26-bb58a1115a47",
      bookingItems: [
        {
          ticketId: 1,
          quantity: 1,
          priceAtBooking: 99.99,
          ticketType: "REGULAR",
          eventTitle: "Coldplay",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "BT Arena, Cluj-Napoca",
          eventImage: "b75ce584-2df2-4728-ab17-49cb69c282a5.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 9,
      bookingDate: "2026-06-17T20:16:31.947137",
      status: "PENDING",
      totalAmount: 99.99,
      email: "participant@example.com",
      qrCode: "1f1fe1ef-f6f7-40b8-92fa-cc687422b51e",
      bookingItems: [
        {
          ticketId: 1,
          quantity: 1,
          priceAtBooking: 99.99,
          ticketType: "REGULAR",
          eventTitle: "Coldplay",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "BT Arena, Cluj-Napoca",
          eventImage: "b75ce584-2df2-4728-ab17-49cb69c282a5.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 6,
      bookingDate: "2026-06-17T13:43:04.283807",
      status: "CONFIRMED",
      totalAmount: 120.99,
      email: "participant@example.com",
      qrCode: "4c605b9e-5b0a-4465-9692-d553f4c950bd",
      bookingItems: [
        {
          ticketId: 14,
          quantity: 1,
          priceAtBooking: 120.99,
          ticketType: "REGULAR",
          eventTitle: "Sabrina Carpenter",
          eventDate: "2026-06-18T19:30:00",
          eventLocation: "BT Arena, Cluj-Napoca",
          eventImage: "bdfecc59-a87e-413f-becb-4c7e2f01c21e.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 2,
      bookingDate: "2026-06-16T18:16:17.422398",
      status: "CONFIRMED",
      totalAmount: 179.99,
      email: "participant@example.com",
      qrCode: "843805d0-d144-4b80-a27a-4e0a0470862f",
      bookingItems: [
        {
          ticketId: 4,
          quantity: 1,
          priceAtBooking: 179.99,
          ticketType: "REGULAR",
          eventTitle: "Zara Larsson",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "Piața Constituției, București",
          eventImage: "aa367b26-b01b-4b87-add3-c8ff8aa1e841.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 3,
      bookingDate: "2026-06-16T18:22:22.056991",
      status: "CONFIRMED",
      totalAmount: 179.99,
      email: "participant@example.com",
      qrCode: "e893ef43-3313-4b54-8cc4-347b98cd37b4",
      bookingItems: [
        {
          ticketId: 4,
          quantity: 1,
          priceAtBooking: 179.99,
          ticketType: "REGULAR",
          eventTitle: "Zara Larsson",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "Piața Constituției, București",
          eventImage: "aa367b26-b01b-4b87-add3-c8ff8aa1e841.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 4,
      bookingDate: "2026-06-17T12:49:20.873911",
      status: "CONFIRMED",
      totalAmount: 179.99,
      email: "participant@example.com",
      qrCode: "bf51e221-63ee-475d-8675-0007523ecd11",
      bookingItems: [
        {
          ticketId: 4,
          quantity: 1,
          priceAtBooking: 179.99,
          ticketType: "REGULAR",
          eventTitle: "Zara Larsson",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "Piața Constituției, București",
          eventImage: "aa367b26-b01b-4b87-add3-c8ff8aa1e841.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 5,
      bookingDate: "2026-06-17T13:27:35.473914",
      status: "CONFIRMED",
      totalAmount: 179.99,
      email: "participant@example.com",
      qrCode: "cd922cf0-2c32-46f0-8b15-3b86148b770b",
      bookingItems: [
        {
          ticketId: 4,
          quantity: 1,
          priceAtBooking: 179.99,
          ticketType: "REGULAR",
          eventTitle: "Zara Larsson",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "Piața Constituției, București",
          eventImage: "aa367b26-b01b-4b87-add3-c8ff8aa1e841.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
    {
      bookingId: 1,
      bookingDate: "2026-06-13T13:07:04.133708",
      status: "PENDING",
      totalAmount: 449.99,
      email: "participant@example.com",
      qrCode: "8bbce0c3-dc8d-4deb-99b9-c28bff9a4163",
      bookingItems: [
        {
          ticketId: 5,
          quantity: 1,
          priceAtBooking: 449.99,
          ticketType: "VIP",
          eventTitle: "Zara Larsson",
          eventDate: "2026-08-15T20:00:00",
          eventLocation: "Piața Constituției, București",
          eventImage: "aa367b26-b01b-4b87-add3-c8ff8aa1e841.jpg",
        },
      ],
      userId: 1,
      refundStatus: null,
    },
  ];
  const emptyBooking = !adminBookings || adminBookings?.length === 0;
  const [] = useState(0);

  return (
    <div className="pb-6 pt-20">
      {emptyBooking ? (
        <div className="flex flex-col items-center justoify-center text-gray-600 py-10">
          <CiShoppingBasket size={50} className="mb-3" />
          <h2 className="text-2xl font-semibold">No bookings yet.</h2>
        </div>
      ) : (
        <div>
          <BookingTable adminBooking={adminBookings} pagination={pagination} />
        </div>
      )}
    </div>
  );
};

export default Bookings;
