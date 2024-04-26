import axiosTenant from '../../config/axios'

export const getTodos = async () => {
  const res = await axiosTenant.get<number[]>(
    'https://jsonplaceholder.typicode.com/todos'
  )
  return res.data
}
