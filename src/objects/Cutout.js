import React, { Suspense } from 'react'
import { useFrame } from 'react-three-fiber'
import { TextureLoader } from 'three'
import { PlainAnimator } from 'three-plain-animator/lib/plain-animator'

export const Cutout = ({
  texturePath,
  animationSettings = [4, 4, 10, 24],
  position = [0, 0, 0],
  size = [10, 10],
  animated = false,
  ...rest
}) => {
  const animator = new PlainAnimator(new TextureLoader().load(texturePath), ...animationSettings)
  const texture = animator.init()

  useFrame(() => animator.animate())

  return (
    <Suspense fallback="ass">
      <mesh position={position} {...rest}>
        <planeBufferGeometry attach="geometry" args={size} />
        <meshBasicMaterial attach="material" map={animated ? texture : texturePath} transparent />
        <axesHelper />
      </mesh>
    </Suspense>
  )
}
