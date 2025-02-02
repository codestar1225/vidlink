interface Type {
  setGender(value: string): void;
  name: string;
  setIsOpen(value: boolean): void;
}
const GenderBtn: React.FC<Type> = ({ name, setGender, setIsOpen }) => {
  return (
    <>
      <button
        onClick={() => {
          setGender(name);
          setIsOpen(false);
        }}
        className="text-left"
      >
        {name}
      </button>
    </>
  );
};
export default GenderBtn;
