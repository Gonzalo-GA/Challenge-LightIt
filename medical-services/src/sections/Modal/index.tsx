import React from "react";
import "./index.css";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  addPatient,
  closeModals,
  editPatient,
  FormValues,
  URL_VALIDATION_REGEX,
} from "../../features/patientsList/patientsListSlice";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

function Modal() {
  const dispatch: AppDispatch = useDispatch();
  const { showModalAdd, showModalEdit, patientsList, patientToEdit } =
    useSelector((state: RootState) => state.patientsList);
  const showModal = showModalAdd || showModalEdit;

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    avatar: Yup.mixed()
      .test("avatar-required", "Avatar is required", function (value) {
        if (showModalAdd) {
          return value && value instanceof File;
        }
        return true;
      })
      .test("file-type", "Unsupported File Format", function (value) {
        if (value && value instanceof File) {
          return ["image/jpg", "image/jpeg", "image/png"].includes(value.type);
        }
        return true;
      })
      .nullable(),
    description: Yup.string().required("Description is required"),
    website: Yup.string()
      .required("Website is required")
      .matches(URL_VALIDATION_REGEX, "Invalid URL"),
  });

  if (!showModal) return <React.Fragment />;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h2 className="title">{`${
            showModalAdd ? "Add" : "Edit"
          } a Patient`}</h2>
          <button className="closeBtn" onClick={onClose}>
            &times;
          </button>
        </div>
        <hr />
        <Formik
          initialValues={{
            name: showModalEdit ? patientToEdit?.name || "" : "",
            avatar: null,
            description: showModalEdit ? patientToEdit?.description || "" : "",
            website: showModalEdit ? patientToEdit?.website || "" : "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="modalBody">
                {/* Name Field */}
                <div className="modalField">
                  <label className="label" htmlFor="name">
                    Name:
                  </label>
                  <Field type="text" id="name" name="name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>

                {/* Avatar Field */}
                <div className="modalField">
                  <label className="label" htmlFor="avatar">
                    Avatar:
                  </label>
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={(event) => {
                      if (event.currentTarget.files)
                        setFieldValue("avatar", event.currentTarget.files[0]);
                    }}
                  />
                  <ErrorMessage
                    name="avatar"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Description Field */}
                <div className="modalField">
                  <label className="label" htmlFor="description">
                    Description:
                  </label>
                  <Field as="textarea" id="description" name="description" />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Website Field */}
                <div className="modalField">
                  <label className="label" htmlFor="website">
                    Website:
                  </label>
                  <Field type="text" id="website" name="website" />
                  <ErrorMessage
                    name="website"
                    component="div"
                    className="error"
                  />
                </div>

                {/* Modal Buttons */}
                <div className="modalBtns">
                  <button className="buttons cancelBtn" onClick={onClose}>
                    Cancel
                  </button>
                  <button className="buttons acceptBtn" type="submit">
                    Accept
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );

  function onClose() {
    dispatch(closeModals());
  }

  function handleSubmit(values: FormValues) {
    if (values.avatar && showModalAdd) {
      dispatch(
        addPatient({
          ...values,
          avatar: URL.createObjectURL(values.avatar),
          createdAt: new Date().toISOString(),
          id: patientsList.length + 1,
          showDetails: false,
        })
      );
    }

    if (showModalEdit && patientToEdit) {
      dispatch(
        editPatient({
          ...values,
          avatar: values.avatar
            ? URL.createObjectURL(values.avatar)
            : patientToEdit.avatar,
          createdAt: patientToEdit.createdAt,
          id: patientToEdit.id,
          showDetails: patientToEdit.showDetails,
        })
      );
    }

    onClose();
    toast.success(
      showModalEdit
        ? "Patient edited successfully!"
        : "Patient added successfully!",
      { autoClose: 1500 }
    );
  }
}

export default Modal;
