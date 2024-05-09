"use client";
import * as React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay, Navigation } from "swiper/modules";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/admin/view`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setProducts(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <>
      <section className=" md:px-0 ">
        <div className="home-banner">
          <img
            src="@/../assets/img/home-banner.png"
            alt=""
            className="w-full"
          />
        </div>
      </section>

      <section className="home-prizes mt-4 md:mt-12 flex flex-wrap md:flex-nowrap gap-4 md:gap-8 w-full md:px-0 mb-4 md:mb-16">
        <div className="w-full md:w-1/2 bg-orange-500 bg-pattern-orange bg-cover rounded-lg md:rounded-3xl text-white flex flex-col justify-center items-center ">
          <div className="w-full md:w-4/6 p-8">
            <h6 className="text-4xl md:text-5xl font-bold">
              Buy Now <br />
              <span className="text-xl md:text-4xl font-bold">
                And Get Your Thar Now
              </span>
            </h6>
            <p className="text-base w-full">
              Lorem ipsum dolor sit amet consectetur. Cursus quisque turpis
              etiam nisl sagittis est aliquet suscipit. Adipiscing integer odio
              tellus orci pellentesque quis malesuada id.
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="">
            <Swiper
              slidesPerView={1}
              speed={200}
              loop={true}
              css-mode={true}
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={false}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
              }}
              modules={[Autoplay, Navigation]}
            >
              {products.map((e) => (
                <SwiperSlide key={e.id}>
                  <div className="card w-full rounded-[10px] border border-theme p-6 flex">
                    <div className="card-content w-full flex flex-col justify-center items-center">
                      <div className="detail-box w-full flex justify-center items-center flex-col">
                        {/* Assuming your image names are based on the product name */}

                        {e.imageProduct && (
                          <img
                            src={`${apiUrl}/uploads/${e.imageProduct}`}
                            alt=""
                            className="mb-4 aspect-square md:aspect-video rounded-[10px] object-cover w-[100%]"
                          />
                        )}
                        <div className="flex justify-between w-full gap-x-4 mb-2">
                          <h6 className="font-bold text-lg">{e.productName}</h6>
                          <p className="font-bold text-lg">
                            Rs {e.productPrice}
                          </p>
                        </div>
                        <p className="text-sm justify-start">
                          {e.shortDescription}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">Stock: {e.stockNumber}</p>
                      </div>
                      <Link
                        href={`/products/${e._id}`}
                        className="w-full  mt-4 relative"
                      >
                        <Button
                          className="btn-theme-dual font-bold text-white w-full rounded-full py-3 disabled:bg-gray-300"
                          disabled={loading}
                          onClick={handleButtonClick}
                        >
                          Buy Now
                        </Button>
                        {loading && (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: "#12b4b9",
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              marginTop: "-12px",
                              marginLeft: "-12px",
                            }}
                          />
                        )}
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="bg-theme-grad-cyan py-4 md:py-16 px-4 md:px-8 mb-4 md:mb-16">
        <h4 className="font-bold text-white text-4xl md:text-6xl mx-auto mb-3 md:mb-8 text-center">
          Jackpot
        </h4>
        <p className="text-lg text-white text-center mb-4 md:mb-12 mx-auto w-4/6">
          Dive into our Prize Pool!
        </p>
        <Swiper
          slidesPerView={1}
          speed={200}
          loop={true}
          css-mode={true}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Navigation]}
        >
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-8 flex flex-col gap-4">
              <div className="details">
                <h6 className="font-bold text-xl">Mega Prize</h6>
                <p className="font-bold text-3xl">Mahindra Thar 4x4</p>
              </div>
              <img
                src="@/../assets/img/thar.png"
                alt=""
                className="rounded-xl aspect-[4/3] object-contain"
              />
              <div className="flex justify-between">
                <h6 className="text-sm">
                  Product: <span className="font-bold">T-shirt</span>
                </h6>
                <p className="text-sm">
                  How to get this? <span className="font-bold">Read More</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-8 flex flex-col gap-4">
              <div className="details">
                <h6 className="font-bold text-xl">Mega Prize</h6>
                <p className="font-bold text-3xl">Mahindra Thar 4x4</p>
              </div>
              <img
                src="@/../assets/img/thar.png"
                alt=""
                className="rounded-xl aspect-[4/3] object-contain"
              />
              <div className="flex justify-between">
                <h6 className="text-sm">
                  Product: <span className="font-bold">T-shirt</span>
                </h6>
                <p className="text-sm">
                  How to get this? <span className="font-bold">Read More</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-8 flex flex-col gap-4">
              <div className="details">
                <h6 className="font-bold text-xl">Mega Prize</h6>
                <p className="font-bold text-3xl">Mahindra Thar 4x4</p>
              </div>
              <img
                src="@/../assets/img/thar.png"
                alt=""
                className="rounded-xl aspect-[4/3] object-contain"
              />
              <div className="flex justify-between">
                <h6 className="text-sm">
                  Product: <span className="font-bold">T-shirt</span>
                </h6>
                <p className="text-sm">
                  How to get this? <span className="font-bold">Read More</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-8 flex flex-col gap-4">
              <div className="details">
                <h6 className="font-bold text-xl">Mega Prize</h6>
                <p className="font-bold text-3xl">Mahindra Thar 4x4</p>
              </div>
              <img
                src="@/../assets/img/thar.png"
                alt=""
                className="rounded-xl aspect-[4/3] object-contain"
              />
              <div className="flex justify-between">
                <h6 className="text-sm">
                  Product: <span className="font-bold">T-shirt</span>
                </h6>
                <p className="text-sm">
                  How to get this? <span className="font-bold">Read More</span>
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="bg-theme-grad-orange py-4 md:py-16 px-4 md:px-8 mb-4 md:mb-16">
        <h4 className="font-bold text-white text-4xl md:text-6xl mx-auto mb-3 md:mb-8 text-center">
          Winners
        </h4>
        <p className="text-lg text-white text-center mb-4 md:mb-12 mx-auto w-4/6">
          See Who's Striking It Rich!
        </p>
        <Swiper
          slidesPerView={1}
          speed={200}
          loop={true}
          css-mode={true}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Navigation]}
        >
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
        </Swiper>
      </section>
      <section className="bg-theme-grad-cyan py-4 md:py-16 px-4 md:px-8 mb-8 md:mb-16">
        <h4 className="font-bold text-white text-4xl md:text-6xl mx-auto mb-3 md:mb-8 text-center">
          News
        </h4>
        <p className="text-base text-white text-center  mb-4 md:mb-12 mx-auto w-4/6">
          As per the existing procedure, when Telecom Service Providers.
        </p>
        <Swiper
          slidesPerView={1}
          speed={200}
          loop={true}
          css-mode={true}
          spaceBetween={30}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={false}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
          modules={[Autoplay, Navigation]}
        >
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
          <SwiperSlide>
            <div className="w-full bg-white rounded-xl p-6 flex flex-col gap-8">
              <img
                src="@/../assets/img/winner.png"
                alt=""
                className="rounded-xl"
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
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}
