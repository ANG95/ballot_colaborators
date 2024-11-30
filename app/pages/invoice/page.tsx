"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useState, useEffect, ChangeEvent } from "react";
import { useListInvoices } from "./hooks/useListInvoices";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import InputMultipleFiles from "@/components/common/inputMultipleFiles/inputMultipleFiles";
import InputSearch from "@/components/common/input/inputSearch";
import { useListCollaborators } from "./hooks/useSearchCollaborator";
import { debounce } from "@/utils/functions";
import { CollaboratorType } from "@/types/collaborator";
import { useAddInvoices } from "./hooks/useAddInvoices";

const Invoices = () => {
  const { data } = useListInvoices();
  const { searchResult, handleCollaboratorSearch } = useListCollaborators();
  const { insertInvoiceResult, insertInvoiceLoading, insertInvoiceError, handleInvoiceInsert } = useAddInvoices();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [collaboratorDetailModal, setCollaboratorDetailModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [collaboratorSelected, setCollaboratorSelected] = useState<CollaboratorType | undefined>(undefined);

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

  const handleUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const dataCollaboratorParsed = JSON.parse(e.target.value);
      console.log('ejecutando el click', dataCollaboratorParsed);
      setCollaboratorDetailModal(true);
    } catch (error) {
      console.error('Error al parsear JSON', error);
    }
  };

  const handleSearchInTable = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleFilesChange = (files: File[]) => {
    setSelectedFiles(files);
  };

  const handleSearchCollaborator = debounce(async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    try {
      if (value !== "") {
        await handleCollaboratorSearch(value, false);
      }
    } catch (error) {
      console.log('error ', error);
    }
  }, 500);

  const handleSaveInvoice = async () => {
    const userId = String(collaboratorSelected?.id);
    const period = "2024-11";
    console.log('selectedFiles ', selectedFiles);
    await handleInvoiceInsert(selectedFiles, userId, period);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          <h1 className="text-2xl mb-4">Lista general de boletas</h1>
        </div>
        <DataTable
          handleSearch={({ target: { value } }: any) => handleSearchInTable(value)}
          addNewPress={() => setCollaboratorDetailModal(true)}
          columns={[
            { name: 'Foto', value: 'picture', type: 'img' },
            { name: 'NOMBRES', value: 'name' },
            { name: 'APELLIDOS', value: 'family_name' },
            { name: '', value: 'isChildren' },
          ]}
          rows={filteredData && filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
          rightComponents={
            <div>
              <Button
                className="edit-button"
                onClick={(e: any) => handleUserDetails(e)}
                color="success"
                size="sm"
              >
                Detalles
              </Button>
              <div className="ml-1" />
            </div>
          }
          totalPages={numPages}
          currentPage={currentPage}
          onChangePage={(page) => ReqDataAPI(page)}
        />
      </div>
      <Modal isOpen={collaboratorDetailModal} toggle={() => setCollaboratorDetailModal(false)}>
        <ModalHeader toggle={() => setCollaboratorDetailModal(false)}>
          Agregar una boleta
        </ModalHeader>
        <ModalBody>
          <InputSearch
            onChangeInput={handleSearchCollaborator}
            userSelected={(e) => {
              setCollaboratorSelected(e);
              handleCollaboratorSearch('', true);
            }}
            results={searchResult}
            placeholder="Buscar colaboradores"
          />
          <hr />
          {
            collaboratorSelected && (
              <div className="flex flex-col">
                <b>Colaborador seleccionado:</b>
                <div className="flex">
                  <b>nombre:</b>
                  <span>
                    {collaboratorSelected?.name}
                  </span>
                </div>
                <div className="flex">
                  <b>Email:</b>
                  <span>
                    {collaboratorSelected?.email}
                  </span>
                </div>
              </div>
            )
          }

          <InputMultipleFiles onFilesChange={handleFilesChange} />
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            color="primary"
            onClick={() => handleSaveInvoice()}
            disabled={!insertInvoiceLoading}
          >
            {insertInvoiceLoading ? 'Cargando' : 'Guardar Boleta'}
          </Button>
          <Button
            size="sm"
            color="danger"
            onClick={() => setCollaboratorDetailModal(false)}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default Invoices;
