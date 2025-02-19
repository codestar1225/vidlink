import Modal from "./modal";

interface Type {
  setEdit(value: string): void;
  picture?: string | null;
  edit: string;
}
const Index: React.FC<Type> = ({ setEdit, picture ,edit}) => {
  return (
    <>
      <div className="flex gap-[17.67px] ml-[19.75px] h-[74px]">
        <img
          className="size-[74px] rounded-full"
          src={picture || "/image/profile/avatar.png"}
          alt=""
        />
        <div className=" relative mt-[28px] ">
          <button
            onClick={() => setEdit("modal")}
            className="flex justify-center items-center border-[1.07px] border-white  rounded-[3.2px] text-[13px] w-[110.3px] h-[17.4px]"
          >
            EDIT PICTURE
          </button>
          {edit==="modal" && <Modal setEdit={setEdit} />}
        </div>
      </div>
    </>
  );
};
export default Index;
