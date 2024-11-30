"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useRef, useState, useEffect } from "react";
import { useGetUsers } from "./hooks/useGetUser";

const InvoceSee = () => {
  const { data } = useGetUsers();

  const [createUpdatePatientModal, setCreateUpdatePatientModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [filteredData, setFilteredData] = useState(data); 

  const patientSelected = useRef({});
  console.log(createUpdatePatientModal , patientSelected)
  useEffect(() => {
    if (data && filteredData) {
      setNumPages(Math.ceil(filteredData.length / rowsPerPage));
    }
  }, [data, rowsPerPage, filteredData]);

  useEffect(() => {
    // Filtramos los datos cada vez que cambia el término de búsqueda
    if (data) {
      const filtered = data.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.family_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const ReqDataAPI = (page: number) => {
    setCurrentPage(page);
    // Aquí puedes agregar lógica para cargar los datos de la página actual
    console.log('Page requested:', page);
  };

  const updateCreatePatient = (e) => {
    console.log('Page requested:', e);

    // Lógica para crear o actualizar paciente
  };

  const handleSearchInTable = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); 
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl">Ver mis boletas</h1>
      </div>
      <DataTable
        handleSearch={({ target: { value } }) => handleSearchInTable(value)}
        addNewPress={() => setCreateUpdatePatientModal(true)}
        columns={[
          { name: 'NOMBRES', value: 'name' },
          { name: 'APELLIDOS', value: 'family_name' },
          { name: '', value: 'isChildren' },
        ]}
        rows={filteredData && filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
        rightComponents={
          <button
            className="edit-button"
            onClick={(e) => updateCreatePatient(e)}
          >
            ℹ️
          </button>
        }
        totalPages={numPages}
        currentPage={currentPage}
        onChangePage={(page) => ReqDataAPI(page)}
      />
    </div>
  );
};

export default InvoceSee;
