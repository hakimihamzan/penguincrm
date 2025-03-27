import Layout from "@/layouts/app/app-layout"

function Dashboard() {
  return (
    <div>
        Dashboard
    </div>
  )
}

Dashboard.layout = (page: React.ReactNode) => <Layout children={page} />

export default Dashboard
