import { getCsrfToken, signIn, useSession } from 'next-auth/react'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/router';
import { useState } from 'react';

interface Payload {
  csrfToken: string;
  username: string;
  password: string;
}

export default function SignIn({ csrfToken }: any) {
  const [error, setError] = useState(false)
  const router = useRouter()
  const { status } = useSession()

  if (status === "authenticated") router.push('/dashboard')

  const submit = async (payload: Payload) => {
    const login = await signIn("credentials", { ...payload, redirect: false })
    if (login?.error) {
      setError(true)
      return
    }
  }

  if (status !== 'unauthenticated') {
    return null
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4" >
      <Form onFinish={submit}>
        <p className="font-bold text-2xl">Dashboard Login</p>
        {error && <p className='text-red-500'>Sign in failed. Check the details you provided are correct.</p>}
        <Form.Item name="csrfToken" initialValue={csrfToken} className='hidden'>
          <Input />
        </Form.Item>
        <Form.Item name="username" label="Username">
          <Input placeholder='juandanao' />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input placeholder='password' type="password" />
        </Form.Item>
        <Button type="primary" title='Login using credentials' htmlType='submit' className='w-full'>
          Login using Credentials
        </Button>
      </Form>
    </div>
  )
}

export async function getServerSideProps(ctx: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(ctx)
    }
  }
}
