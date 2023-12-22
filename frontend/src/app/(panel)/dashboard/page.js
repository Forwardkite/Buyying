import LinearProgress from "@mui/material/LinearProgress";

export default function Dashboard() {
  return (
    <>
      <section className="w-full mb-6">
        <h5 className="mb-4 font-bold">Stock Left</h5>
        <div className="flex justify-between w-full gap-6">
          <div className="card  w-[30%] px-4 py-8 shadow-0-0 rounded-md ">
            <h6>Pen</h6>
            <div className="meter w-full">
              <span className="text-xs float-right">
                <span>1800</span>/<span>2000</span>
              </span>

              <LinearProgress
                variant="determinate"
                value={30}
                className="w-full"
                sx={{
                  minHeight: 8,
                  borderRadius: 8,
                  backgroundColor: "#ddd6fe",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6d28d9",
                  },
                }}
              />
            </div>
          </div>
          <div className="card  w-[30%] px-4 py-8 shadow-0-0 rounded-md">
            <h6>Biryani</h6>
            <div className="meter w-full">
              <span className="text-xs float-right">
                <span>1800</span>/<span>2000</span>
              </span>
              <LinearProgress
                variant="determinate"
                value={30}
                className="w-full"
                sx={{
                  minHeight: 8,
                  borderRadius: 8,
                  backgroundColor: "#ddd6fe",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6d28d9",
                  },
                }}
              />
            </div>
          </div>
          <div className="card  w-[30%] px-4 py-8 shadow-0-0 rounded-md">
            <h6>Shirt</h6>
            <div className="meter w-full">
              <span className="text-xs float-right">
                <span>1800</span>/<span>2000</span>
              </span>
              <LinearProgress
                variant="determinate"
                value={30}
                className="w-full"
                sx={{
                  minHeight: 8,
                  borderRadius: 8,
                  backgroundColor: "#ddd6fe",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#6d28d9",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="flex gap-6">
        <div className="w-4/6">
          <div className="p-4 h-[40rem] shadow-0-0 rounded-md">
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-1/3"></div>
            <div className="w-full"></div>
          </div>
        </div>
        <div className="w-2/6">
          <div className="p-4 h-[40rem] shadow-0-0 rounded-md flex flex-col gap-6">
            <h6 className="font-bold">Banners</h6>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/banner.png" alt="" />
            </div>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/pen.png" alt="" />
            </div>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/biryani.png" alt="" />
            </div>
            <div className="h-1/4 gap-6 bg-gray-100 rounded-md overflow-hidden">
              <img src="../../../assets/img/tshirt.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
