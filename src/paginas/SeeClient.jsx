import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
const SeeClient = () => {
  const [client, setClient] = useState({});
  const [charging, setCharging] = useState(true);

  const { id } = useParams();
  useEffect(() => {
    const getClientApi = async () => {
      try {
        const url = `https://my-json-server.typicode.com/Mario1613/api_crm/clientes/${id}`;
        const response = await fetch(url);
        const result = await response.json();
        setClient(result);
      } catch (e) {
        console.log(e);
      }
      setCharging(!charging);
    };
    getClientApi();
  }, []);

  return charging ? (
    <Spinner />
  ) : Object.keys(client).length === 0 ? (
    <p>No hay resultados</p>
  ) : (
    <>
      <h1 className="font-black text-4xl text-blue-900">
        See Client: {client.name}
      </h1>
      <p className="mt-3">Informacion del Cliente</p>

      <p className="text-4xl text-gray-600 mt-10">
        <span className="uppercase font-bold">Client: </span>
        {client.name}
      </p>
      <p className="text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Email: </span>
        {client.email}
      </p>
      <p className="text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Tel: </span>
        {client.cellPhone}
      </p>
      <p className="text-xl text-gray-600 mt-4">
        <span className="text-gray-800 uppercase font-bold">Business: </span>
        {client.business}
      </p>
      {client.notes ? (
        <p className="text-xl text-gray-600 mt-4">
          <span className="text-gray-800 uppercase font-bold">Note: </span>
          {client.notes}
        </p>
      ) : (
        ""
      )}
    </>
  );
};

export default SeeClient;
