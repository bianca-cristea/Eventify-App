import { FaBoxOpen, FaHome, FaStore, FaThList } from "react-icons/fa";
import { bannerImageOne, bannerImageThree, bannerImageTwo } from "./constants";
import { CiShoppingBasket } from "react-icons/ci";

export const bannerList = [
  {
    id: 1,
    image: bannerImageThree,
    title: "Live Concerts",
    subtitle: "Feel the Energy",
    description:
      "Discover unforgettable live shows and experience your favorite artists like never before.",
  },
  {
    id: 2,
    image: bannerImageTwo,
    title: "Music Festivals",
    subtitle: "Join the Crowd",
    description:
      "From massive festivals to intimate stages find events that match your vibe and energy.",
  },
  {
    id: 3,
    image: bannerImageOne,
    title: "Exclusive Events",
    subtitle: "Be There First",
    description:
      "Get access to limited tickets, special performances, and exclusive nightlife experiences.",
  },
];

export const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: FaHome, current: true },
  { name: "Bookings", href: "/admin/bookings", icon: CiShoppingBasket },
  { name: "Events", href: "/admin/events", icon: FaBoxOpen },
  { name: "Categories", href: "/admin/categories", icon: FaThList },
  { name: "Organizers", href: "/admin/organizers", icon: FaStore },
];

export const organizerNavigation = [
  { name: "Bookings", href: "/admin/bookings", icon: CiShoppingBasket },
  { name: "Events", href: "/admin/events", icon: FaBoxOpen },
];
