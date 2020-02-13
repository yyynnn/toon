import React, { Suspense } from 'react'
import { useFrame } from 'react-three-fiber'
import { TextureLoader } from 'three'
import { PlainAnimator } from 'three-plain-animator/lib/plain-animator'

export const Cutout = ({ position = [0, 0, 0], texturePath, size = [10, 10], animated = false }) => {
  const animator = new PlainAnimator(new TextureLoader().load(texturePath), 4, 4, 10, 10)
  const texture = animator.init()

  useFrame(() => animator.animate())

  return (
    <Suspense fallback="ass">
      <mesh position={position}>
        <planeBufferGeometry attach="geometry" args={size} />
        <meshBasicMaterial attach="material" map={animated ? texture : texturePath} transparent />
      </mesh>
    </Suspense>
  )
}
