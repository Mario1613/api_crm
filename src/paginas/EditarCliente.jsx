import { useEffect, useState } from "react";
import Formulario from "../components/Formulario";

import { useParams } from "react-router-dom";

const EditarCliente = () => {
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

  return (
    <div>
      <h1 className="font-black text-4xl text-blue-900">Edit Client</h1>
      <p className="mt-3">Use this form to edit customer data</p>
      {client?.name ? (
        <Formulario client={client} charging={charging} />
      ) : (
        <h1>Cliente ID no Valido</h1>
      )}
    </div>
  );
};

export default EditarCliente;
