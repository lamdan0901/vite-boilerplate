import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary
} from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { ErrorBoundary } from 'react-error-boundary'
import { RoutesManager } from './config'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
})

const App = () => {
  return (
    <ConfigProvider>
      <QueryClientProvider client={queryClient}>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary }) => (
                <div>
                  There was an error!
                  <button onClick={() => resetErrorBoundary()}>
                    Try again
                  </button>
                </div>
              )}
            >
              <RoutesManager />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </QueryClientProvider>
    </ConfigProvider>
  )
}

export default App
