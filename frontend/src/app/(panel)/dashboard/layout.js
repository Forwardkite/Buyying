import Sidenav from "../components/sidenav";

export const metadata = {
  title: "Buyyinn dashboard",
  description: "Buyyinn Dashboard",
};

export default function Dashboard({ children }) {
  return (
    <div className="flex w-full h-screen">
      <aside className="w-1/6 p-10 bg-theme-black text-white">
        <img
          src="../../../assets/img/buyyinn-logo.png"
          alt=""
          className="mb-8"
        />
        <Sidenav />
      </aside>
      <main className="w-5/6 p-10">{children}</main>
    </div>
  );
}
