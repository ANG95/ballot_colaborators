"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useState, useEffect, useRef } from "react";
import { useGetUsersRol, useProfileUpdate } from "./hooks/useGetUsersRol";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
// import { CollaboratorType } from "@/types/collaborator";
import { formatDate } from "@/utils/functions";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import dayjs from "dayjs";

const Administrator = () => {
  const { data } = useGetUsersRol();

  const [collaboratorDetailModal, setCollaboratorDetailModal] = useState(false);
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const collaboratorSelector = useRef({})

  const [collaboratorModalUpdate, setCollaboratorModalUpdate] = useState(false);
  const [updatedData, setUpdatedData] = useState(null);
  const { profileUpdate } = useProfileUpdate();
  const [collaboratorSelected, setCollaboratorSelected] = useState(null);
  const [inputCollaboratorType, setInputCollaboratorType] = useState(0);


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

  const handleUserDetailsUpdate = (e) => {
    const dataCollaboratorParsed = JSON.parse(e.target.value)
    console.log('ejecutando el click', dataCollaboratorParsed)
    if(dataCollaboratorParsed.rol_nombre === "administrador"){
      setInputCollaboratorType(1)
    } else {
      setInputCollaboratorType(2)
    }

    collaboratorSelector.current = dataCollaboratorParsed;
    // Lógica para crear o actualizar paciente
    setCollaboratorModalUpdate(true)
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await profileUpdate({
        given_name: updatedData?.given_name || "",
        family_name: updatedData?.family_name || "",
        birthdate: new Date() || updatedData?.birthdate || "",
        rol: inputCollaboratorType,
        email: collaboratorSelected.email

      });

      console.log("Datos enviados:", {
        given_name: updatedData?.given_name || "",
        family_name: updatedData?.family_name || "",
        birthdate: updatedData?.birthdate || "",
      });

      if (response?.success) {
        setCollaboratorSelected(updatedData);
        setCollaboratorModalUpdate(false);
      } else {
        console.error("Error en la actualización");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  useEffect(() => {
    if (data && data[0]) {
      setCollaboratorSelected(data[0]);
      setUpdatedData(data[0]);
    }
  }, [data]);

  if (!collaboratorSelected) return <div>Cargando...</div>;

  const handleInputChange = (e: { target: { name: string; value: any } }) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchInTable = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };
  // const collaboratorSelected: CollaboratorType | any = collaboratorSelector.current;

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
            { name: 'Rol', value: 'rol_nombre' },
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
              <div className="ml-1" />
              <button onClick={(e) => handleUserDetailsUpdate(e)} className="edit-role px-2">Actualizar</button>
              <div className="ml-1" />

              {/* <Button
                className="edit-button"
                onClick={(e) => updateCreatePatient(e)}
                color="danger"
                size="sm"
              >
                Eliminar
              </Button> */}
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
              <strong>Cumpleaños:</strong> {formatDate(collaboratorSelected.birthdate)}
            </div>
            <div>
              <strong>Correo: </strong> {collaboratorSelected.email}
            </div>
            <div>
              <strong>Rol de usuario: </strong> {collaboratorSelected.rol_nombre}
            </div>
            <div>
              <strong>Fecha de creacion: </strong> {formatDate(collaboratorSelected.updated_at)}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={() => setCollaboratorDetailModal(false)}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={collaboratorModalUpdate} toggle={() => setCollaboratorModalUpdate(false)}>
        <ModalHeader toggle={() => setCollaboratorDetailModal(false)}>Actualizar Perfil</ModalHeader>
        <ModalBody>
          <div className="mt-4 space-y-2">
            <div>
              <strong>Nombres: </strong>
              <Input
                type="text"
                name="given_name"
                value={updatedData?.given_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <strong>Apellidos: </strong>
              <Input
                type="text"
                name="family_name"
                value={updatedData?.family_name || ""}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <strong>Rol de usuario: </strong>
            </div>
            <div>
              <FormGroup check>
                <Input
                  checked={inputCollaboratorType===1}
                  name="1"
                  type="radio"
                  onChange={()=>setInputCollaboratorType(1)}
                />
                {' '}
                <Label check>
                  Administrador
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                checked={inputCollaboratorType===2}
                  name="2"
                  type="radio"
                  onChange={()=>setInputCollaboratorType(1)}
                />
                {' '}
                <Label check>
                  Colaborador
                </Label>
              </FormGroup>
            </div>
            
            <div>
              <strong>Correo: </strong>
              <div className="form-control">
                {collaboratorSelected.email}
              </div>
            </div>
            <div>
              <strong>Fecha de creación: </strong> {formatDate(updatedData.updated_at)}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleUpdateProfile}>
            Guardar cambios
          </Button>
          <Button color="danger" onClick={() => setCollaboratorModalUpdate(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

    </>
  );
};

export default Administrator;
