"use client";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function footer() {
  return (
    <footer className="shadow-inner">
      <div className="footer-top relative max-w-[1600px] mx-auto py-16 px-8 flex flex-wrap gap-8">
        <img
          src="/assets/img/Buyyinn-logo.png"
          alt=""
          className="w-full lg:w-1/6"
        />
        <div className="text-sm md:text-2xl font-bold flex justify-center  w-full md:w-4/6">
          <div className="flex justify-center items-center w-full gap-x-8 ">
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
            <span>Product</span>
          </div>
        </div>
        <div className="w-full md:w-1/6 flex justify-evenly items-center social-links">
          <YouTubeIcon />
          <WhatsAppIcon />
          <FacebookIcon />
        </div>
      </div>
      <span className="w-full max-w-[1600px] h-1 bg-theme-grad-cyan block mx-auto"></span>
      <div className="footer-bottom w-full max-w-[1600px] py-16 px-8 flex justify-center">
        <span className="text-center">
          © Buyyinn 2024. License No: CN- 2965688. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
