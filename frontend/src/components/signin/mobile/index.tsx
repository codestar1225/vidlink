import Footer from "@/components/layout/mobile/footer";
import Link from "next/link";

const SigninMobile = () => {
  return (
    <>
      <main className="pt-[331px] w-fll flex flex-col items-center h-svw gap-[40px]">
        <img src="/icon/home/title.png" alt="" />
        <button className="flex items-center justify-center gap-[12.81px] bg-[#0368fb] rounded-[12.81px] w-[309px] h-[48px]">
          <h1 className="text-[16px] font-semibold text-white">
            LOG IN WITH GOOGLE
          </h1>
          <img src="/icon/register/google.svg" alt="" />
        </button>
      </main>
      <Footer isFixed={true} />
    </>
  );
};
export default SigninMobile;
