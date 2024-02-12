"use client";

export default function footer() {
  return (
    <footer>
      <div className="footer-top relative w-full">
        <div className="text-4xl font-bold text-theme justify-center absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 ">
          <div className="flex w-full gap-x-12 ">
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
            <span>Product</span>
          </div>
        </div>
        <img
          src="@/../assets/img/banner-footer2.svg"
          alt=""
          className="w-full bg-black"
        />
      </div>
      <img
        src="@/../assets/img/banner-footer.svg"
        alt=""
        className="w-full bg-black"
      />
    </footer>
  );
}
