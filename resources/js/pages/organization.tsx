import Layout from "@/layouts/app/app-layout"

function Organization() {
  return (
    <div>
        Organization
    </div>
  )
}

Organization.layout = (page: React.ReactNode) => <Layout children={page} />

export default Organization
