"use client";
import YouTubeIcon from "@mui/icons-material/YouTube";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
export default function footer() {
  return (
    <footer className="shadow-inner max-w-[1536px] mx-auto px-4 md:px-6">
      <div className="footer-top relative mx-auto py-4 md:py-16   flex flex-wrap gap-y-6">
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
      <span className="w-full h-1 bg-theme-grad-cyan block mx-auto md:px-6"></span>
      <div className="footer-bottom w-full py-4 md:py-16 px-4 md:px-8 flex justify-center">
        <span className="text-center">
          © Buyyinn 2024. License No: CN- 2965688. All Rights Reserved.
        </span>
      </div>
    </footer>
  );
}
