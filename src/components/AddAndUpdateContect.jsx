import { ErrorMessage, Field, Form, Formik } from "formik";
import Modal from "./Modal";
import { collection, doc, updateDoc, addDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contectSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Reqired"),
  email: Yup.string().email("Inavalid Email").required("Email is required"),
});

const AddAndUpdateContect = ({ isOpen, onClose, isUpdate, contect }) => {
  const addContect = async (contect) => {
    try {
      const contectRef = collection(db, "contects");
      await addDoc(contectRef, contect);
      onClose();
      toast.success("Contect Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const updateContect = async (contect, id) => {
    try {
      const contectRef = doc(db, "contects", id);
      await updateDoc(contectRef, contect);
      onClose();
      toast.success("Contect Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contectSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contect.name,
                  email: contect.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate ? updateContect(values, id) : addContect(values);
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="border h-10" />
              <div className="tetx-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="border h-10" />
              <div className="tetx-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>
            <button className="bg-orange px-3 py-1.5 border self-end">
              {isUpdate ? "update" : "add"} contect
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdateContect;
