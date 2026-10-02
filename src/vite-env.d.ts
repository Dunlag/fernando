/// <reference types="vite/client" />
import 'react'

// React 18 only forwards these as lowercase attributes and its types do not know them yet.
// Both can go once the project moves to React 19 (inert becomes a boolean, fetchPriority is supported).
declare module 'react' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- must repeat React's type parameter to merge
  interface HTMLAttributes<T> {
    inert?: ''
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- must repeat React's type parameter to merge
  interface ImgHTMLAttributes<T> {
    fetchpriority?: 'high' | 'low' | 'auto'
  }
}
