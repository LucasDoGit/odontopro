import { SidebarDashboard } from "./components/sidebard";

export default function DashboardLayout({ children }: { children: React.ReactNode}){
    return(
        <>
            <SidebarDashboard>
                {children}
            </SidebarDashboard>
        </>
    )
}