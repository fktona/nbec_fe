import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { AdminProvider } from "@/context/admin-ctx";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    //
    <AdminProvider>
      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        {children}
      </main>
    </AdminProvider>
  );
}
