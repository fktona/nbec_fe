import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AdminProvider } from "@/context/admin-ctx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <AdminProvider>
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
            {children}
          </main>
        </AdminProvider>
      </div>
    </div>
  );
}
