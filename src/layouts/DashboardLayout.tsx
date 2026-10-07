import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, Users, Car, ShieldAlert, LogOut, Bell } from 'lucide-react';

export default function DashboardLayout() {
  const [menuAbierto, setMenuAbierto] = useState(true);
  const location = useLocation();
  const rolUsuario = 'ADMINISTRADOR'; 

  const isActive = (path: string) => location.pathname.includes(path);

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      <aside className={`${menuAbierto ? 'w-64' : 'w-20'} bg-slate-900 text-slate-300 transition-all duration-300 flex flex-col shadow-2xl z-20`}>
        <div className="h-16 flex items-center justify-center border-b border-slate-800 bg-slate-950">
          <span className="text-xl font-bold tracking-wider text-white">
            {menuAbierto ? <>SISME <span className="text-green-500">BOLIVIA</span></> : 'SB'}
          </span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
          {menuAbierto && <div className="text-xs uppercase text-slate-500 font-bold px-3 mb-3 mt-4 tracking-wider">Consultas WSDL</div>}
          
          <Link to="/personas" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${isActive('personas') ? 'bg-green-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Users className="w-5 h-5 flex-shrink-0" />
            {menuAbierto && <span className="ml-3 font-medium">Personas</span>}
          </Link>

          <Link to="/vehiculos" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${isActive('vehiculos') ? 'bg-green-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'}`}>
            <Car className="w-5 h-5 flex-shrink-0" />
            {menuAbierto && <span className="ml-3 font-medium">Vehículos</span>}
          </Link>

          {rolUsuario === 'ADMINISTRADOR' && (
            <>
              {menuAbierto && <div className="text-xs uppercase text-slate-500 font-bold px-3 mb-3 mt-8 tracking-wider">Seguridad</div>}
              <Link to="/auditoria" className={`flex items-center px-3 py-3 rounded-lg transition-colors ${isActive('auditoria') ? 'bg-red-900/50 text-red-400 border border-red-900/50' : 'hover:bg-slate-800 text-red-400 hover:text-red-300'}`}>
                <ShieldAlert className="w-5 h-5 flex-shrink-0" />
                {menuAbierto && <span className="ml-3 font-medium">Auditoría / Trazas</span>}
              </Link>
            </>
          )}
        </nav>
        
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
               AR
             </div>
             {menuAbierto && (
               <div className="flex flex-col">
                 <span className="text-sm font-bold text-white">Angel Rafael</span>
                 <span className="text-xs text-slate-400">DNTT - {rolUsuario}</span>
               </div>
             )}
           </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 z-10">
          <button onClick={() => setMenuAbierto(!menuAbierto)} className="text-slate-500 hover:text-slate-700 focus:outline-none p-2 rounded-md hover:bg-slate-100 transition-colors">
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-5">
            <button className="text-slate-400 hover:text-green-600 transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="h-6 w-px bg-slate-200"></div>
            <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-4 py-1.5 rounded-md border border-slate-200">
              CI: 4567891 LP
            </span>
            <button className="bg-red-50 text-red-600 px-4 py-1.5 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 text-sm font-bold flex items-center shadow-sm">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}