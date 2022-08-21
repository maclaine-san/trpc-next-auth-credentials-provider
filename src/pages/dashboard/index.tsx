import { Button } from "antd";
import { NextPage } from "next";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";


const Dashboard: NextPage = () => {
  const session = useSession()
  const router = useRouter()

  return (
    <div>
      <p>This is a dashboard</p>
      <Button onClick={() => signOut()}>Signout</Button>
    </div>

  )
}

export default Dashboard
