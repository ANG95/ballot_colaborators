"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useState, useEffect, ChangeEvent } from "react";
import { useListInvoices } from "./hooks/useListInvoices";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import InputMultipleFiles from "@/components/common/inputMultipleFiles/inputMultipleFiles";
import InputSearch from "@/components/common/input/inputSearch";
import { useListCollaborators } from "./hooks/useSearchCollaborator";
import { currentDate, debounce } from "@/utils/functions";
import { CollaboratorType } from "@/types/collaborator";
import { useAddInvoices } from "./hooks/useAddInvoices";

const Invoices = () => {
  const { data } = useListInvoices();
  const { searchResult, handleCollaboratorSearch } = useListCollaborators();
  const { insertInvoiceLoading, handleInvoiceInsert } = useAddInvoices();

  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [collaboratorDetailModal, setCollaboratorDetailModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [collaboratorSelected, setCollaboratorSelected] = useState<CollaboratorType | undefined>(undefined);
  const [periodInput, setPeriodInput] = useState(currentDate("yyyy-MM-dd"))

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
    setSelectedFiles((prev) => [...prev, ...files]);
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
    await handleInvoiceInsert(selectedFiles, userId, periodInput);
    setCollaboratorDetailModal(false)
    setSelectedFiles([])
    setPeriodInput(currentDate("yyyy-MM-dd"))
    setCollaboratorSelected(undefined)
  };

  const handleRemoveFile = (fileName) => {
    const fileDeleted = selectedFiles.filter((file) => file.name !== fileName)
    setSelectedFiles(fileDeleted)
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          <h1 className="text-2xl">Lista general de boletas</h1>
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
                <div className="flex mt-2">
                  <b className="mr-2">Nombres: </b>
                  <span>
                    {collaboratorSelected?.name}
                    {collaboratorSelected?.family_name}
                  </span>
                </div>
                <div className="flex">
                  <b className="mr-2">Email: </b>
                  <span>
                    {collaboratorSelected?.email}
                  </span>
                </div>
              </div>
            )
          }
          <hr />
          <label className="mr-2" id="period"><b>Seleccione un periodo:</b></label>
          <Input
            bsSize="sm"
            type="date"
            name="period"
            id="period"
            onChange={({ target: { value } }) => setPeriodInput(value)}
            value={periodInput} />
          <hr />

          <InputMultipleFiles
            onFilesChange={handleFilesChange}
            pdfFiles={selectedFiles}
            handleRemoveFile={(name: string) => handleRemoveFile(name)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            size="sm"
            color="primary"
            onClick={() => handleSaveInvoice()}
            disabled={
              insertInvoiceLoading ||
              !collaboratorSelected?.email ||
              !(selectedFiles.length > 0)
            }
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
