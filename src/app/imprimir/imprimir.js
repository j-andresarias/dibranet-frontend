function imprimir() {

  const contenido = `
  <!DOCTYPE html>
  <html>
    <head>
      <link rel="stylesheet" href="estilos.css">
      <style>
        /* Estilos adicionales personalizados aquí */
      </style>
    </head>
    <body>
      ${document.querySelector('.ticket')?.outerHTML}
    </body>
  </html>
`;

  // Obtener el contenido HTML del recibo
  // Abrir una nueva ventana para la impresión
  const ventana = window.open('', '_blank');
  if (!ventana) {
    console.error('No se pudo abrir la ventana de impresión');
    return;
  }
  ventana.document.write('<html><head><title>Recibo</title></head><body>');
  ventana.document.close();

  // Esperar a que el contenido se cargue antes de imprimir
  ventana.onload = function () {
    ventana?.print();
    ventana?.close();
  };
}
