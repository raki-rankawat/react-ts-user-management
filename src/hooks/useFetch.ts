import { useState, useEffect } from 'react'

export type FetchState<T> =
  | {
      status: 'loading'
    }
  | {
      status: 'success'
      data: T
    }
  | {
      status: 'error'
      message: string
    }

const useFetch = <T>(url: string): FetchState<T> => {
  const [state, setState] = useState<FetchState<T>>({ status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()

    const fetchData = async (): Promise<void> => {
      setState({ status: 'loading' })

      try {
        const res = await fetch(url, {
          signal: controller.signal,
        })

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`)
        }

        const json: T = await res.json()
        setState({ status: 'success', data: json })
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === 'AbortError') {
          return
        }

        if (err instanceof Error) {
          setState({ status: 'error', message: err.message })
        } else {
          setState({ status: 'error', message: 'Unknown error occured!' })
        }
      }
    }

    fetchData()

    return () => {
      controller.abort()
    }
  }, [url])

  return state
}

export default useFetch
