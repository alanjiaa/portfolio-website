declare module '@react-three/fiber' {
  import { PropsWithChildren } from 'react'
  import * as THREE from 'three'

  export interface Props extends PropsWithChildren {
    gl?: THREE.WebGLRenderer
    camera?: THREE.Camera
    scene?: THREE.Scene
    [key: string]: any
  }

  export const Canvas: React.FC<Props>
  export function useFrame(callback: (state: any) => void): void
} 