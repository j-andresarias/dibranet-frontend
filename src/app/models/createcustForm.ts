export interface CreateCustomerForm {
  nombre: string;
  apellido: string;
  tipoDoc: string;
  documento: string;
  direccion: string;
  telefono: string;
  correo: string;
  megas: number;
  modalidad: string;
  fechaCorte: string;
  fechaInstalacion: string;
  estado: boolean;
  estrato: number;
}
