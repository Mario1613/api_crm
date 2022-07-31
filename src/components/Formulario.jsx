import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Alert from "./Alert";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

const Formulario = ({ client, charging }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Name is very short")
      .max(20, "Name is very long")
      .required("Customer name is required"),
    business: Yup.string().required("company name is required"),
    email: Yup.string()
      .email("Email is not validate")
      .required("Email is Required"),
    cellPhone: Yup.number()
      .positive("Number is not Validate")
      .integer("Number is not Validate")
      .typeError("Cell phone is not validate"),
    notes: "",
  });

  const handleSubmit = async (valores) => {
    try {
      let response;
      if (client.id) {
        //Edit register
        const url = `http://localhost:4000/clientes/${client.id}`;
        response = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //New Register
        const url = "http://localhost:4000/clientes";
        response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await response.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return charging ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {client?.name ? "Edit Client" : "Add Client"}
      </h1>
      <Formik
        initialValues={{
          name: client.name ? client.name : "",
          business: client.business ? client.business : "",
          email: client.email ? client.email : "",
          cellPhone: client.cellPhone ? client.cellPhone : "",
          notes: client.notes ? client.notes : "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, resetForm) => {
          await handleSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          // console.log(data);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="name">
                  Name
                </label>
                <Field
                  id="name"
                  type="text"
                  className="mt-2 block w-full bg-gray-50 p-3"
                  placeholder="Name of Client"
                  name="name"
                />
              </div>
              {errors.name && touched.name ? (
                <Alert>{errors.name}</Alert>
              ) : null}

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="business">
                  Business
                </label>
                <Field
                  id="business"
                  type="text"
                  className="mt-2 block w-full bg-gray-50 p-3"
                  placeholder="Business of Client"
                  name="business"
                />
                {errors.business && touched.business ? (
                  <Alert>{errors.business}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="email">
                  E-mail:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full bg-gray-50 p-3"
                  placeholder="Email of Client"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="email">
                  Cell Phone:
                </label>
                <Field
                  id="CellPhone"
                  type="tel"
                  className="mt-2 block w-full bg-gray-50 p-3"
                  placeholder="Cell Phone of Client"
                  name="cellPhone"
                />
                {errors.cellPhone && touched.cellPhone ? (
                  <Alert>{errors.cellPhone}</Alert>
                ) : null}
              </div>

              <div className="mb-4">
                <label className="text-gray-800 " htmlFor="notes">
                  Note:
                </label>
                <Field
                  as="textarea"
                  id="notes"
                  type="tex"
                  className="mt-2 block w-full bg-gray-50 p-3 h-40"
                  placeholder="Notes of Client"
                  name="notes"
                />
              </div>
              <input
                type="submit"
                value={client?.name ? "Edit Client" : "Add Client"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = {
  client: {},
  charging: false,
};

export default Formulario;
