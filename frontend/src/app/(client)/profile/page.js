import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
export default function Profile() {
  return (
    <>
      <section>
        <div className="w-full bg-[url('/assets/img/page-title.png')] p-12 bg-no-repeat bg-cover rounded-b-[50px]">
          <h4 className="font-bold text-white text-6xl mx-auto mb-4 text-center">
            My Account
          </h4>
          <p className="text-base text-white text-center "></p>
        </div>
      </section>
      <section className="mt-12">
        <div className="w-11/12 flex flex-wrap  justify-between mx-auto">
          <div className="w-8/12">
            <h6>Tickets</h6>
            <div className="w-full">
              <div className="w-4/12 flex flex-col items-center justify-center">
                <p className="text-sm">Ticket No</p>
                <h5 className="text-lg font-bold">SHT123456</h5>
                <p className="text-sm">Active</p>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="flex flex-col items-center rounded-[30px] bg-[#f0f0f0]  p-16">
              <img
                src="@/../assets/img/biryani.png"
                alt=""
                className="rounded-full aspect-square w-[120px] h-auto mb-8"
              />
              <h4 className="text-xl font-bold">John Doe</h4>
              <p className="text-base">johndoe@gmail.com</p>
              <div className="w-full mt-8">
                <p className="text-base">Pin: 688522</p>
                <p className="text-base">Line 21, Panampilli nagar,</p>
                <p className="text-base">Panambilli, Ernakulam dist,</p>
                <p className="text-base">Kerala - 682036</p>
              </div>
              <div className="w-full flex mt-12 ">
                <button className="rounded-[4px] text-theme-purple bg-transparent py-2 border border-theme-purple px-4 mr-4">
                  Other
                </button>
                <button className="rounded-[4px] text-white bg-theme-purple py-2 px-4 flex  ">
                  <span className="mr-2">Edit Profile</span>{" "}
                  <EditOutlinedIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
