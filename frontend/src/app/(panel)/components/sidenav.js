"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import PersonIcon from "@mui/icons-material/Person";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function Sidenav() {
  const pathname = usePathname();
  return (
    <nav className="">
      <ul className="list-none">
        <li>
          <Link
            href="/dashboard"
            className={`flex link ${pathname === "/dashboard" ? "active" : ""}`}
          >
            <DashboardIcon />
            <span className="ms-2">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/products"
            className={`flex link ${
              pathname === "/dashboard/products" ? "active" : ""
            }`}
          >
            <ShoppingBagIcon />
            <span className="ms-2">Products</span>
          </Link>
        </li>

        <li>
          <Link
            href="/dashboard/purchase"
            className={`flex link ${
              pathname === "/dashboard/purchase" ? "active" : ""
            }`}
          >
            <PlaylistAddCheckIcon />
            <span className="ms-2">Purchase</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/winners"
            className={`flex link ${
              pathname === "/dashboard/winners" ? "active" : ""
            }`}
          >
            <EmojiEventsIcon />
            <span className="ms-2">Winners</span>
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/products"
            className={`flex link ${
              pathname === "/dashboard/products" ? "active" : ""
            }`}
          >
          </Link>
        </li>
      </ul>
    </nav>
  );
}
