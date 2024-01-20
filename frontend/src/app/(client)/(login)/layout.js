export const metadata = {
  title: "Buyyinn",
  description: "Buyyinn - Buy n Win",
};

export default function Login({ children }) {
  return (
    <>
      <div className="w-full  mx-auto flex h-screen">
        <div className="w-6/12 flex justify-center items-center">
          <img
            src="@/../assets/img/login.png"
            alt=""
            className="max-w-[400px]"
          />
        </div>
        <div className="w-6/12">{children}</div>
      </div>
    </>
  );
}
