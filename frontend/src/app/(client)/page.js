import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section>
        <div className="home-banner">
          <img
            src="@/../assets/img/home-banner.png"
            alt=""
            className="w-full rounded-b-[50px]"
          />
        </div>
      </section>
      <section className="home-prizes mt-12">
        <div className="flex gap-x-8 justify-between items-center">
          <div className="card w-4/12 rounded-[30px]  border border-theme p-8 flex">
            <div className="card-content w-full flex flex-col justify-center items-center">
              <div className="detail-box w-full flex justify-center items-center flex-col">
                <img
                  src="@/../assets/img/phone.png"
                  alt="i-phone"
                  className="mb-8 max-w-[160px] w-[80%]"
                />
                <div className="flex justify-between w-full gap-x-4 mb-2">
                  <h6 className="font-bold text-lg">i Phone</h6>
                  <p className="font-bold text-lg">Rs 30,000</p>
                </div>
                <p className="text-sm justify-start">Set of 30</p>
              </div>
              <button className="bg-theme-grad-dual font-bold text-white w-full rounded-full py-4 mt-8">
                <Link href="/tickets">Buy Now</Link>
              </button>
            </div>
          </div>
          <div className="card w-4/12 rounded-[30px]  border border-theme p-8 flex">
            <div className="card-content w-full flex flex-col justify-center items-center">
              <div className="detail-box w-full flex justify-center items-center flex-col">
                <img
                  src="@/../assets/img/phone.png"
                  alt="i-phone"
                  className="mb-8 max-w-[160px] w-[80%]"
                />
                <div className="flex justify-between w-full gap-x-4 mb-2">
                  <h6 className="font-bold text-lg">i Phone</h6>
                  <p className="font-bold text-lg">Rs 30,000</p>
                </div>
                <p className="text-sm justify-start">Set of 30</p>
              </div>
              <button className="bg-theme-grad-dual font-bold text-white w-full rounded-full py-4 mt-8">
                <Link href="/tickets">Buy Now</Link>
              </button>
            </div>
          </div>
          <div className="card w-4/12 rounded-[30px]  border border-theme p-8 flex">
            <div className="card-content w-full flex flex-col justify-center items-center">
              <div className="detail-box w-full flex justify-center items-center flex-col">
                <img
                  src="@/../assets/img/phone.png"
                  alt="i-phone"
                  className="mb-8 max-w-[160px] w-[80%]"
                />
                <div className="flex justify-between w-full gap-x-4 mb-2">
                  <h6 className="font-bold text-lg">i Phone</h6>
                  <p className="font-bold text-lg">Rs 30,000</p>
                </div>
                <p className="text-sm justify-start">Set of 30</p>
              </div>
              <button className="bg-theme-grad-dual font-bold text-white w-full rounded-full py-4 mt-8">
                <Link href="/tickets">Buy Now</Link>
              </button>
            </div>
          </div>
          <div className="card w-4/12 rounded-[30px]  border border-theme p-8 flex">
            <div className="card-content w-full flex flex-col justify-center items-center">
              <div className="detail-box w-full flex justify-center items-center flex-col">
                <img
                  src="@/../assets/img/phone.png"
                  alt="i-phone"
                  className="mb-8 max-w-[160px] w-[80%]"
                />
                <div className="flex justify-between w-full gap-x-4 mb-2">
                  <h6 className="font-bold text-lg">i Phone</h6>
                  <p className="font-bold text-lg">Rs 30,000</p>
                </div>
                <p className="text-sm justify-start">Set of 30</p>
              </div>
              <button className="bg-theme-grad-dual font-bold text-white w-full rounded-full py-4 mt-8">
                <Link href="/tickets">Buy Now</Link>
              </button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <h4 className="font-bold text-theme text-6xl mx-auto mt-16 mb-8 text-center">
          Explore Future campaigns
        </h4>
        <p className="text-base  text-center">
          As per the existing procedure, when Telecom Service Providers (TSPs)
          plan to procure directly from a Non-India Registered (NIR) OEM, the
          detailed information with regard to the OEM (company) and the product
          is to be provided in the Trusted Telecom Portal (TIP) by the TSPs.
        </p>
        <div className="w-full flex justify-between gap-x-12 mt-12 mb-20">
          <div className="w-4/12 max-w-[25%] flex flex-col justify-end items-center aspect-square border border-theme rounded-t-full p-8">
            <img
              src="@/../assets/img/campaign-2.png"
              alt=""
              className="max-w-[80%] w-[70%] mb-[-70px]"
            />

            <span className="text-sm text-white text-center p-4 bg-theme-grad rounded-md">
              As per the existing procedure, when Telecom Service Providers.
            </span>
          </div>
          <div className="w-4/12 max-w-[25%] flex flex-col justify-end items-center aspect-square border border-theme rounded-t-full p-8">
            <img
              src="@/../assets/img/campaign-3.png"
              alt=""
              className=" w-[90%] mb-[-70px]"
            />

            <span className="text-sm text-white text-center p-4 bg-theme-grad rounded-md">
              As per the existing procedure, when Telecom Service Providers.
            </span>
          </div>
          <div className="w-4/12 max-w-[25%] flex flex-col justify-end items-center aspect-square border border-theme rounded-t-full p-8">
            <img
              src="@/../assets/img/campaign-1.png"
              alt=""
              className="w-[70%] mb-[0px]"
            />

            <span className="text-sm text-white text-center p-4 bg-theme-grad rounded-md">
              As per the existing procedure, when Telecom Service Providers.
            </span>
          </div>
        </div>
      </section>
      <section>
        <div className="w-full home-image mb-20">
          <img
            src="@/../assets/img/home-banner-2.png"
            alt=""
            className="w-full rounded-[60px]"
          />
        </div>
      </section>
      <section>
        <h4 className="font-bold text-theme text-6xl mx-auto mt-16 mb-8 text-center">
          News
        </h4>
        <p className="text-base  text-center mb-12">
          As per the existing procedure, when Telecom Service Providers (TSPs)
          plan to procure directly from a Non-India Registered (NIR) OEM, the
          detailed information with regard to the OEM (company) and the product
          is to be provided in the Trusted Telecom Portal (TIP) by the TSPs.
        </p>
        <div className="w-full flex gap-x-8 mb-16">
          <div className="w-4/12 border border-theme rounded-3xl p-6 flex flex-col gap-8">
            <img
              src="@/../assets/img/winner.png"
              alt=""
              className="rounded-3xl"
            />
            <div className="details">
              <h6 className="font-bold text-xl">Title</h6>
              <p className="text-sm">11/01/2024</p>
              <p className="text-base mt-4">
                As per the existing procedure, when Telecom Service Providers
                (TSPs) plan to procure directly from a Non-India
              </p>
            </div>
          </div>
          <div className="w-8/12 border border-theme rounded-3xl p-6 flex gap-8">
            <img
              src="@/../assets/img/winner.png"
              alt=""
              className="rounded-3xl aspect-square h-full w-auto"
            />
            <div className="details flex flex-col">
              <h6 className="font-bold text-xl">Title</h6>
              <p className="text-sm">11/01/2024</p>
              <p className="text-base mt-4">
                As per the existing procedure, when Telecom Service Providers
                (TSPs) plan to procure directly from a Non-India As per the
                existing procedure, when Telecom Service Providers (TSPs) plan
                to procure directly from a Non-India Registered (NIR) OEM, the
                detailed information with regard to the OEM (company) and the
                product is to be provided in the Trusted Telecom Portal (TIP) by
                the TSPs.As per the existing procedure, when Telecom Service
                Providers (TSPs) plan to procure directly from a Non-India
                Registered (NIR) OEM, the detailed information with regard to
                the OEM (company) the existing procedure, when Telecom Service
                Providers (TSPs) plan to procure directly from a Non-India
                Registered (NIR) OEM, the detailed information with regard to
                the OEM (company)
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
