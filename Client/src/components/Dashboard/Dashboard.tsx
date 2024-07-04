import DashboardHead from "../DashoardHead/DashboardHead"
import DashboardSidebar from "../DashboardSidebar/DashboardSidebar"
import DashboardContent from "../DashboardContent/DashboardContent"
function Dashboard() {
  return (
    <>
    <div className='h-screen w-full overflow-hidden'>
      <DashboardHead/>
      <div className="flex">
      <DashboardSidebar/>
      <DashboardContent/>
    </div>
    </div>
    </>
  )
}

export default Dashboard