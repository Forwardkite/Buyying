import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata = {
  title: "Buyyinn",
  description: "Buyyinn - Buy n Win",
};

export default function Client({ children }) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-[1600px] mx-auto">{children}</main>
      <Footer />
    </>
  );
}
