import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContectCard from "./components/ContectCard";
import AddAndUpdateContect from "./components/AddAndUpdateContect";
import useDisclouse from "./hooks/useDisclouse";
import NotFoundContects from "./components/NotFoundContects";

const App = () => {
  const [contects, setContects] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclouse();

  useEffect(() => {
    const getContects = async () => {
      try {
        const contectsRef = collection(db, "contects");

        onSnapshot(contectsRef, (snapshot) => {
          const contectList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContects(contectList);
          return contectList;
        });
      } catch (error) {}
    };

    getContects();
  }, []);

  const filterContects = (e) => {
    const value = e.target.value;
    const contectsRef = collection(db, "contects");

    onSnapshot(contectsRef, (snapshot) => {
      const contectList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterdContects = contectList.filter((contect) =>
        contect.name.toLowerCase().includes(value.toLowerCase())
      );
      setContects(filterdContects);

      return filterdContects;
    });
  };
  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />
        <div className="flex gap-2 ">
          <div className="flex relative flex-grow items-center">
            <FiSearch className="text-white text-3xl absolute ml-1" />
            <input
              onChange={filterContects}
              type="text"
              className="h-10 flex-grow rounded-md border border-white bg-transparent pl-9 text-white"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="text-5xl text-white cursor-pointer"
          />
        </div>
        <div className="mt-4 gap-3 flex flex-col">
          {contects.length <= 0 ? (
            <NotFoundContects />
          ) : (
            contects.map((contect) => (
              <ContectCard key={contect.id} contect={contect} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdateContect onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
