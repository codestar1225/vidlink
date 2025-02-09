import { Loader } from "lucide-react";

interface Type {
  setEdit(value: string): void;
  handlePublish(): void;
  loading: boolean;
}
const ButtonItem: React.FC<Type> = ({ setEdit, handlePublish, loading }) => {
  return (
    <>
      <button
        onClick={() => setEdit("add")}
        className="w-[282.8px] h-[50px] border-[3px] text-[21.5px] font-semibold rounded-[20px] mx-auto flex justify-center items-center mt-[63.4px] mb-[23px] tracking-wider"
      >
        EDIT
      </button>
      <button
        onClick={handlePublish}
        className="w-[282.8px] h-[50px] text-[21.5px] font-semibold rounded-[20px] bg-blue mx-auto flex justify-center items-center mb-[56px] tracking-wider"
      >
        {loading ? (
          <>
            <span className="text-white">PUBLISHING...</span>
            <Loader className=" text-white animate-spin" />
          </>
        ) : (
          <>PUBLISH</>
        )}
      </button>
    </>
  );
};
export default ButtonItem;
