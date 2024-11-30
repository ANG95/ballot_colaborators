"use client";

import { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { useGetProfile, useUpdateProfile } from "./hooks/useGetProfile";
import { formatDate } from "@/utils/functions";

const ProfilePage = () => {
  const { data } = useGetProfile();
  const { updateProfile } = useUpdateProfile();
  const [collaboratorDetailModal, setCollaboratorDetailModal] = useState(false);
  const [collaboratorSelected, setCollaboratorSelected] = useState(null);
  const [updatedData, setUpdatedData] = useState(null);

  useEffect(() => {
    if (data && data[0]) {
      setCollaboratorSelected(data[0]);
      setUpdatedData(data[0]);
    }
  }, [data]);

  if (!collaboratorSelected) return <div>Cargando...</div>;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await updateProfile({
        given_name: updatedData?.given_name || "",
        family_name: updatedData?.family_name || "",
      });

      if (response?.success) {
        setCollaboratorSelected(updatedData);
        setCollaboratorDetailModal(false);
      } else {
        console.error("Error en la actualización");
      }
    } catch (error) {
      console.error("Error al enviar datos:", error);
    }
  };

  return (
    <div className="flex justify-center  h-full">
      <div className="mt-4 space-y-2">
        <div className="text-center mb-4">
          {collaboratorSelected?.picture ? (
            <img
              className="detail-image mx-auto rounded-full"
              src={collaboratorSelected.picture}
              alt={collaboratorSelected.name}
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300" />
          )}
        </div>
        <div className="mt-4 space-y-2">
          <div>
            <strong>Nombres: </strong> {collaboratorSelected.given_name}
          </div>
          <div>
            <strong>Apellidos: </strong> {collaboratorSelected.family_name}
          </div>
          <div>
            <strong>Correo: </strong> {collaboratorSelected.email}
          </div>
          <div>
            <strong>Fecha de creación: </strong> {formatDate(updatedData.updated_at)}
          </div>
          <div>
            <strong>Correo: </strong> {collaboratorSelected.email}
          </div>
          <div>
            <strong>Rol de usuario: </strong> {collaboratorSelected.rol_nombre}
          </div>
        </div>

        <div className="flex justify-center">
        <Button color="primary" onClick={() => setCollaboratorDetailModal(true)}>
          Actualizar
        </Button>
        </div>
      </div>

      <Modal isOpen={collaboratorDetailModal} toggle={() => setCollaboratorDetailModal(false)}>
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
              <strong>Correo: </strong> {collaboratorSelected.email}
            </div>
            <div>
              <strong>Rol de usuario: </strong> {collaboratorSelected.rol_nombre}
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
          <Button color="danger" onClick={() => setCollaboratorDetailModal(false)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ProfilePage;
