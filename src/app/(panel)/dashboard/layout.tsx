import { SidebarDashboard } from "./components/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode}){
    return(
        <>
            <SidebarDashboard>
                {children}
            </SidebarDashboard>
        </>
    )
}