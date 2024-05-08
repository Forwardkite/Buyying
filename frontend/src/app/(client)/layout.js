import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import Script from "next/script";

export const metadata = {
  title: "Buyyinn",
  description: "Buyyinn - Buy n Win",
};

export default function Client({ children }) {
  return (
    <>
      <Navbar />
      <main className="w-full max-w-[1536px] px-4 md:px-6 mx-auto">
        {children}
      </main>
      <Footer />
    </>
  );
}
