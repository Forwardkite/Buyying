"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <header
      className={`w-full  py-4 bg-black navbar ${
        pathname === "/login" ? "hidden" : ""
      }`}
    >
      <nav className="max-w-[1600px] mx-auto">
        <img
          src="../assets/img/Buyyinn-logo.png"
          className="h-[40px] w-auto"
          alt=""
        />
        <ul className="list-none flex">
          <li className="mr-4">
            <Link
              href="/dashboard/profile"
              className={`flex link text-theme ${
                pathname === "/dashboard/profile" ? "active" : ""
              }`}
            >
              <PersonIcon />
            </Link>
          </li>
          <li className="mr-4">
            <Link
              href="/dashboard/cart"
              className={`flex link text-theme ${
                pathname === "/dashboard/cart" ? "active" : ""
              }`}
            >
              <ShoppingBagIcon />
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/donations"
              className={`flex link text-theme ${
                pathname === "/dashboard/donations" ? "active" : ""
              }`}
            >
              <span className="ms-2">Donations</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
