import {
  useMutation,
  useQueryClient,
  useSuspenseQuery
} from '@tanstack/react-query'
import { useCountStore } from '../../store/useCountStore'
import { QueryKey } from '../../constants'
import { useDocumentTitle } from '../../hooks'
import { getTodos } from './Home.api'

const Home = () => {
  useDocumentTitle('Home')
  const queryClient = useQueryClient()

  const { data, isError, error } = useSuspenseQuery({
    queryKey: [QueryKey.TODOS],
    queryFn: getTodos
  })

  const { mutate, isPending: mutationPending } = useMutation({
    mutationFn: async (text: string) => {
      console.log('called')
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return text
    },
    onSuccess: () => {
      console.log('onSuccess')
      queryClient.invalidateQueries({ queryKey: [QueryKey.TODOS] })
    },
    onError: (error) => {
      console.log('Error in mutation', error.message)
    }
  })

  if (isError)
    return (
      <div>
        Error: <p>{error?.message}</p>
      </div>
    )

  return (
    <div>
      <FormTest />
      <button
        onClick={() => {
          mutate('test')
        }}
        disabled={mutationPending}
      >
        {mutationPending ? 'Adding Todo' : 'Add Todo'}
      </button>
      <ul>data.length: {data?.length}</ul>
    </div>
  )
}

const FormTest = () => {
  const { count, setCount } = useCountStore()

  // We can also access state from store like this:
  // const count = useCountStore((state) => state.count);
  // const count = useCountStore.getState().count;

  // For the performance purpose, only select needed states from store; don't get everything then only used some of them

  // Because filter() returns an array, we add a 'shallow' from 'zustand/shallow' here to check if the content of the array changes,
  //  then update the counts, not when the array changes
  // Or we can create our own custom equality function
  // const counts = useCountStore(
  //   (state) => state.counts.filter((c) => c > 2),
  //   shallow
  // )
  // console.log('counts: ', counts)
  // If we don't want to use this, just get the state then filter later on in useMemo hook
  // ! [DEPRECATED] Use `createWithEqualityFn` instead of `create` or use `useStoreWithEqualityFn` instead of `useStore`. They can be imported from 'zustand/traditional'.

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Update count</button>
    </>
  )
}

export default Home
