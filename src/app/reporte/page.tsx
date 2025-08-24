import { getGanadores } from './actions';

export default async function ReportePage() {
  const ganadores = await getGanadores();

  return (
    <main className="fondo min-h-screen p-4 md:p-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center bg-pink-800 text-white p-4 rounded-lg shadow-md">LISTA DE GANADORES</h1>
        <div className="overflow-x-auto shadow-md rounded-lg border-2 border-red-800">
          <table className="min-w-full bg-white">
            <thead className="bg-red-900 text-white">
              <tr>
                <th className="py-3 px-4 text-center text-xs font-medium uppercase tracking-wider md:px-6 md:text-left md:text-sm">ID</th>
                {/* Encabezado para móvil */}
                <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider md:hidden">Cliente</th>
                {/* Encabezados para escritorio */}
                <th className="hidden py-3 px-6 text-left text-sm font-medium uppercase tracking-wider md:table-cell">Nombre</th>
                <th className="hidden py-3 px-6 text-left text-sm font-medium uppercase tracking-wider md:table-cell">Correo</th>
                <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider md:px-6 md:text-sm">Teléfono</th>
                <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider md:px-6 md:text-sm">Premio</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-800 bg-white text-sm text-gray-700">
              {ganadores.length > 0 ? (
                ganadores.map((ganador) => (
                  <tr key={ganador.idCliente} className="hover:bg-pink-50">
                    <td className="py-4 px-4 text-center font-medium text-gray-900 md:px-6">{ganador.idCliente}</td>
                    {/* Celda combinada para móvil */}
                    <td className="py-4 px-4 md:hidden">
                      <div className="font-medium text-gray-900">{ganador.nombre || 'N/A'}</div>
                      <div className="text-gray-500">{ganador.correo || 'N/A'}</div>
                    </td>
                    {/* Celdas separadas para escritorio */}
                    <td className="hidden py-4 px-6 md:table-cell">{ganador.nombre || 'N/A'}</td>
                    <td className="hidden py-4 px-6 md:table-cell">{ganador.correo || 'N/A'}</td>
                    <td className="py-4 px-4 md:px-6">{ganador.telefono || 'N/A'}</td>
                    <td className="py-4 px-4 md:px-6">{ganador.premio}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-4 px-6 text-center text-gray-500">
                    No hay ganadores registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
