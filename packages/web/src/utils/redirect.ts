import { useRouter } from 'next/router'

export const redirect = (path: string): any => {
  const router = useRouter()
  return router.push(path)
}
