"use client";
import DataTable from "@/components/common/dataTable/dataTable";
import { useState, useEffect } from "react";
import { useListMyInvoices } from "./hooks/useListMyInvoices";
import { Button } from 'reactstrap';
import { ImPrinter } from "react-icons/im";
import { FaDownload } from "react-icons/fa";
import PdfViewerModal from "@/invoice/components/pdfViewerModal/pdfViewerModal";
import useZipDownload from "@/invoice/hooks/useZipDownload";

const InvoceSee = () => {
  const { data, loading } = useListMyInvoices();
  const { downloadAsZip } = useZipDownload();

  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data || []);
  const [pdfViewModal, setPdfViewModal] = useState(false)
  const [invoiceSelected, setInvoiceSelected] = useState<any>()

  useEffect(() => {
    if (data && filteredData) {
      setNumPages(Math.ceil(filteredData.length / rowsPerPage));
    }
  }, [data, rowsPerPage, filteredData]);

  useEffect(() => {
    if (data) {
      const filtered = data.filter((user) =>
        user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user?.family_name?.toLowerCase().includes(searchTerm.toLowerCase())
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
      setPdfViewModal(true);
      setInvoiceSelected(dataCollaboratorParsed)
    } catch (error) {
      console.error('Error al parsear JSON', error);
    }
  };

  const handleSearchInTable = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          <h1 className="text-2xl">Lista general de boletas</h1>
        </div>
        <DataTable
          handleSearch={({ target: { value } }: any) => handleSearchInTable(value)}
          columns={[

            { name: 'N°', value: '' },
            { name: 'Archivo', value: 'fileNameSplit' },
            { name: 'NOMBRES', value: 'name' },
            { name: 'APELLIDOS', value: 'family_name' },
            { name: 'ROL', value: 'rol_nombre' },
            { name: '', value: 'isChildren' },
          ]}
          rows={filteredData && filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)}
          rightComponents={
            <div>
              <Button
                className="edit-button"
                onClick={(e: any) => handleUserDetails(e)}
                color="danger"
                size="sm"
              >
                <div className="pointer-events-none">
                  <ImPrinter />
                </div>
              </Button>
              <div className="ml-1" />
              <Button
                className="edit-button"
                onClick={({ target: { value } }: any) => {
                  const invoiceValues: any = JSON.parse(value)
                  downloadAsZip(`/boletas/${invoiceValues?.archivo_boleta}`, `boleta_del_periodo_${invoiceValues.periodo}-${invoiceValues.given_name}`)
                }}
                color="secondary"
                size="sm"
              >
                <div className="pointer-events-none">
                  <FaDownload />
                </div>
              </Button>
            </div>
          }
          totalPages={numPages}
          currentPage={currentPage}
          onChangePage={(page) => ReqDataAPI(page)}
          loading={loading}
        />
      </div>

      <PdfViewerModal
        pdfUrl={invoiceSelected && `/boletas/${invoiceSelected?.archivo_boleta}` || ''}
        modalTitle={'Nombre del la boleta: ' + invoiceSelected?.fileNameSplit || ''}
        isOpen={pdfViewModal}
        onClose={() => setPdfViewModal(false)}
      />
    </>
  );
};

export default InvoceSee;
