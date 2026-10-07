import { useState, useEffect } from 'react';
import { Search, AlertTriangle, ShieldCheck, Trash2, RefreshCw } from 'lucide-react';

export default function BuscadorPersonas() {
  const [documento, setDocumento] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [nombres, setNombres] = useState('');
  const [fechaNac, setFechaNac] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (resultado) {
      timeout = setTimeout(() => {
        limpiarPantalla();
        setError('Por protocolos de seguridad (Retención Cero), el resultado fue eliminado de la memoria.');
      }, 120000);
    }
    return () => clearTimeout(timeout);
  }, [resultado]);

  const consultarSisme = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!documento && (!apellidos || !nombres || !fechaNac)) {
      setError('Debe ingresar el Documento, o en su defecto: Apellidos, Nombres y Fecha de Nacimiento.');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setResultado({
        r_codigo_retorno: 's',
        r_pais: 'UY',
        r_nombres: nombres || 'RAFAEL EDUARDO',
        r_apellidos: apellidos || 'DI PIZZO RUIZ',
        r_tipo_doc_res: 'CI',
        r_nro_doc_res: documento || '25214559',
        r_motivo_req: 'Delito o Falta',
        r_autoridad_solicita: 'JEF POLICIA MONTEVIDEO',
        r_obs: 'Boletin=31842, Articulo=1, Inciso=13'
      });
    } catch (err) {
      setError('Falla de conexión con el Nodo Nacional SISME.');
    } finally {
      setLoading(false);
    }
  };

  const limpiarPantalla = () => {
    setResultado(null);
    setDocumento('');
    setApellidos('');
    setNombres('');
    setFechaNac('');
    setError('');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <Search className="w-5 h-5 text-green-700" />
          </div>
          <h2 className="text-lg font-bold text-slate-800">Consulta Internacional de Personas</h2>
        </div>

        <form onSubmit={consultarSisme} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Nro. de Documento</label>
              <input 
                type="text" 
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Ej. 12345678"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Fecha de Nacimiento</label>
              <input 
                type="date" 
                value={fechaNac}
                onChange={(e) => setFechaNac(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Nombres</label>
              <input 
                type="text" 
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Nombres completos"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1.5">Apellidos</label>
              <input 
                type="text" 
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 text-slate-900 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                placeholder="Apellidos completos"
              />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
            <button 
              type="button" 
              onClick={limpiarPantalla}
              className="px-5 py-2.5 rounded-lg font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Limpiar
            </button>
            <button 
              type="submit" 
              disabled={loading}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold shadow-sm shadow-green-600/30 disabled:opacity-70 transition-all flex items-center gap-2"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
              {loading ? 'Consultando...' : 'Ejecutar Consulta'}
            </button>
          </div>
        </form>
      </div>

      {error && (
        <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 rounded-r-lg shadow-sm flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 text-orange-600" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {resultado && (
        <div className="bg-white border-l-4 border-red-600 rounded-r-xl shadow-md overflow-hidden animate-in fade-in slide-in-from-bottom-4">
          <div className="bg-red-50 border-b border-red-100 px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3 text-red-700">
              <div className="bg-red-200 p-1.5 rounded-full">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg tracking-tight">ALERTA MERCOSUR - PAÍS: {resultado.r_pais}</h3>
            </div>
            <button onClick={limpiarPantalla} className="text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-md flex items-center gap-2 text-sm font-bold transition-colors">
              <Trash2 className="w-4 h-4" />
              Destruir Datos
            </button>
          </div>

          <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Identidad</p>
              <p className="font-bold text-slate-900 text-lg">{resultado.r_apellidos}, {resultado.r_nombres}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Documento</p>
              <p className="font-bold text-slate-900 text-lg">{resultado.r_tipo_doc_res} {resultado.r_nro_doc_res}</p>
            </div>
            <div className="bg-red-50 p-4 rounded-lg border border-red-100">
              <p className="text-red-800 text-xs font-bold uppercase tracking-wider mb-1">Motivo / Requisitoria</p>
              <p className="font-black text-red-700 text-lg">{resultado.r_motivo_req}</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Autoridad Solicitante</p>
              <p className="font-bold text-slate-900">{resultado.r_autoridad_solicita}</p>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-4 bg-slate-800 p-4 rounded-lg">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Observaciones Legales</p>
              <p className="font-mono text-sm text-green-400">{resultado.r_obs}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}