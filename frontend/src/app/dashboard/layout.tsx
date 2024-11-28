import Sidebar from "@/components/Sidebar"

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
      <Sidebar />
      <div className="ml-[90px] p-2 lg:ml-[315px] duration-300">
        {children}
      </div>
    </>
  )

}