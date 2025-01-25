import AuthProvider from "@/provider/authProvider";

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};
export default PrivateLayout;
