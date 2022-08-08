import { useEffect, useState } from "react";
import Client from "../components/Client";

const Inicio = () => {
  const [clientes, setClientes] = useState([]);

  const handleDelete = async (id) => {
    const confirms = confirm("Deseas eliminar este cliente?");

    if (confirms) {
      try {
        const url = `https://my-json-server.typicode.com/Mario1613/api_crm/clientes/${id}`;
        const response = await fetch(url, {
          method: "DELETE",
        });
        await response.json();
        // location.reload();

        const arrayClient = clientes.filter((cliente) => cliente.id !== id);
        setClientes(arrayClient);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const obtenerClientesApi = async () => {
      try {
        const url =
          "https://my-json-server.typicode.com/Mario1613/api_crm/clientes";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        // console.log("resultado Api", resultado);
        setClientes(resultado);
      } catch (error) {
        console.log(" error en obtenerClientesApi", error);
      }
    };
    obtenerClientesApi();
  }, []);

  // console.log("hello");

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900"> Client</h1>

      <p className="mt-3">Manage your Customers</p>

      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead className="bg-blue-800 text-white">
          <tr>
            <th className="p-2">Name: </th>
            <th className="p-2">Contact: </th>
            <th className="p-2">Company: </th>
            <th className="p-2">Action: </th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Client
              key={cliente.id}
              cliente={cliente}
              handleDelete={handleDelete}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};
export default Inicio;
