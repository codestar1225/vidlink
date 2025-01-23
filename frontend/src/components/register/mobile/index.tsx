import Footer from "@/components/layout/mobile/footer";
import Link from "next/link";

const RegisterMobile = () => {
  return (
    <>
      <main className="pt-[331px] w-fll flex flex-col items-center h-svw gap-[40px]">
        <img src="/icon/home/title.svg" alt="" />
        <Link
          href={""}
          className="flex items-center justify-center gap-[12.81px] bg-[#0368fb] rounded-[12.81px] w-[309px] h-[48px]"
        >
          <h1 className="text-[16px] font-semibold text-white">
            LOG IN WITH GOOGLE
          </h1>
          <img src="/icon/register/google.svg" alt="" />
        </Link>
      </main>
      <Footer isFixed={true} />
    </>
  );
};
export default RegisterMobile;
