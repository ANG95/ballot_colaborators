/* eslint-disable @next/next/no-img-element */
"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useState, useEffect, useRef } from "react";
import { useGetUsersRol } from "./hooks/useGetUsersRol";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { CollaboratorType } from "@/types/collaborator";
import { currentDate } from "@/utils/function";

const Administrator = () => {
  const { data } = useGetUsersRol();

  const [collaboratorDetailModal, setCollaboratorDetailModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const collaboratorSelector = useRef({})

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
    const valuesParsed = JSON.parse(e.target.value)
    console.log('ejecutando el click', valuesParsed)
  };

  const handleUserDetails = (e) => {
    const dataCollaboratorParsed = JSON.parse(e.target.value)
    console.log('ejecutando el click', dataCollaboratorParsed)

    collaboratorSelector.current = dataCollaboratorParsed;
    // Lógica para crear o actualizar paciente
    setCollaboratorDetailModal(true)
  };

  const handleSearchInTable = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  const collaboratorSelected: CollaboratorType | any = collaboratorSelector.current;

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          <h1 className="text-2xl mb-4">Colaboradores</h1>
        </div>
        <DataTable
          handleSearch={({ target: { value } }: any) => handleSearchInTable(value)}
          addNewPress={() => { }}
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
                onClick={(e) => handleUserDetails(e)}
                color="success"
                size="sm"
              >
                Detalles
              </Button>
              <div className="ml-1" />
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
      <Modal isOpen={collaboratorDetailModal} toggle={() => setCollaboratorDetailModal(false)}>
        <ModalHeader className="background-modal-header" toggle={() => setCollaboratorDetailModal(false)}>Detalles del colaborador</ModalHeader>
        <ModalBody>
          <div className="text-center mb-4">
            <img
              className="detail-image mx-auto rounded-full"
              src={collaboratorSelected.picture}
              alt={collaboratorSelected.name}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <h5 className="mt-2 font-semibold">{collaboratorSelected.name}</h5>
          </div>
          <hr />
          <div className="mt-4 space-y-2">
            <div>
              <strong>Nombres: </strong> {collaboratorSelected.given_name}
            </div>
            <div>
              <strong>Apellidos:</strong> {collaboratorSelected.family_name}
            </div>
            <div>
              <strong>Correo: </strong> {collaboratorSelected.email}
            </div>
            <div>
              <strong>Rol de usuario: </strong> {collaboratorSelected.rol_nombre}
            </div>
            <div>
              <strong>Fecha de creacion: </strong> {currentDate(collaboratorSelected.updated_at)}
            </div>
          </div>

        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setCollaboratorDetailModal(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Administrator;
