import Navbar from "@/components/navbar";

export const metadata = {
  title: "Buyyinn",
  description: "Buyyinn - Buy n Win",
};

export default function Client({ children }) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-[1600px] mx-auto py-10">{children}</main>
    </>
  );
}
