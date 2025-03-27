import Layout from "@/layouts/app/app-layout"

function User() {
  return (
    <div>
        User
    </div>
  )
}

User.layout = (page: React.ReactNode) => <Layout children={page} />

export default User
