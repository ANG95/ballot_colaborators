"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useState, useEffect } from "react";
import { useGetUsersRol } from "./hooks/useGetUsersRol";
import { Button } from "reactstrap";

const Administrator = () => {
  const { data } = useGetUsersRol();

  const [createUpdatePatientModal, setCreateUpdatePatientModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  console.log(createUpdatePatientModal )
  useEffect(() => {
    if (data && filteredData) {
      setNumPages(Math.ceil(filteredData.length / rowsPerPage));
    }
  }, [data, rowsPerPage, filteredData]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((user: any) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.family_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

  const ReqDataAPI = (page: number) => {
    setCurrentPage(page);
  };

  const updateCreatePatient = (e) => {
    const valuesParsed =  JSON.parse(e.target.value)
    console.log('ejecutando el click', valuesParsed)
  };

  const handleViewTickets = (e) => {
    console.log('ejecutando el click', e.target.value)
    // Lógica para crear o actualizar paciente
  };

  const handleSearchInTable = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col h-full">
      <div>
        <h1 className="text-2xl mb-4">Colaboradores</h1>
      </div>
      <DataTable
        handleSearch={({ target: { value } }: any) => handleSearchInTable(value)}
        addNewPress={() => setCreateUpdatePatientModal(true)}
        columns={[
          { name: 'Foto', value: 'picture', type: 'img' },
          { name: 'NOMBRES', value: 'name', },
          { name: 'APELLIDOS', value: 'family_name' },
          { name: '', value: 'isChildren' },
        ]}
        rows={filteredData && filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
        rightComponents={
          <div className="flex">
            <Button
              className="edit-button"
              onClick={(e) => handleViewTickets(e)}
              color="success"
              size="sm"
            >
              Detalles
            </Button> 
            <div className="ml-1"/>
            <Button
              className="edit-button"
              onClick={(e) => updateCreatePatient(e)}
              color="primary"
              size="sm"
            >
              Cargar Boletas
            </Button>
          </div>
        }
        totalPages={numPages}
        currentPage={currentPage}
        onChangePage={(page) => ReqDataAPI(page)}
      />
    </div>
  );
};

export default Administrator;
