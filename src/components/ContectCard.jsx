import { HiOutlineUserCircle } from "react-icons/hi2";
import { RiEditCircleLine } from "react-icons/ri";
import { IoMdTrash } from "react-icons/io";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdateContect from "./AddAndUpdateContect";
import useDisclouse from "../hooks/useDisclouse";

const ContectCard = ({ contect }) => {
  const { isOpen, onClose, onOpen } = useDisclouse();
  const deleteContect = async (id) => {
    try {
      await deleteDoc(doc(db, "contects", id));
      toast.success("Contect Deleted Successfully");
    } catch (error) {}
  };
  return (
    <>
      <div
        key={contect.id}
        className="bg-yellow flex justify-between items-center rounded-lg p-2"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-orange text-4xl" />
          <div className="">
            <h2 className="text-medium">{contect.name}</h2>
            <p className="text-sm">{contect.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <RiEditCircleLine onClick={onOpen} className="cursor-pointer" />
          <IoMdTrash
            onClick={() => deleteContect(contect.id)}
            className="text-orange cursor-pointer"
          />
        </div>
      </div>
      <AddAndUpdateContect
        contect={contect}
        isUpdate
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContectCard;
