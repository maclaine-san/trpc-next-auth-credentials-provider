import { NextPage } from "next";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const Users: NextPage = () => {
  const { data } = trpc.useQuery([
    'user-list.getUsers',
  ])

  useEffect(() => {
    console.log('data', data)
  }, [data])
  return (
    <p>USERS PAGES</p>
  )
}

export default Users
