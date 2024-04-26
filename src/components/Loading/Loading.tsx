import { Spin } from 'antd'

export function Loading() {
  return (
    <div className="fixed left-0 top-0 z-10 h-full w-full bg-gray-200 opacity-40">
      <div className="absolute z-50 flex h-full w-full items-center justify-center">
        <Spin size="large" />
      </div>
    </div>
  )
}
