import * as CANNON from 'cannon'
import React, { useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import { TextureLoader } from 'three'
import { PlainAnimator } from 'three-plain-animator/lib/plain-animator'

import { useCannon, CannonProvider } from 'src/hooks/useCannon'
import { Cutout } from 'src/objects/Cutout'

const Plane = ({ position }) => {
  // Register plane as a physics body with zero mass

  const ref = useCannon({ mass: 0 }, body => {
    body.addShape(new CANNON.Plane())
    body.position.set(...position)
  })
  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
      <meshPhongMaterial attach="material" />
    </mesh>
  )
}

const Box = ({ position }) => {
  const texturePath = 'https://i.imgur.com/Oj6RJV9.png'
  const animator = new PlainAnimator(new TextureLoader().load(texturePath), 4, 4, 10, 10)
  const texture = animator.init()

  useFrame(() => animator.animate())

  const ref = useCannon({ mass: 100 }, body => {
    body.addShape(new CANNON.Box(new CANNON.Vec3(1, 1, 1)))
    body.position.set(...position)
  })

  return (
    <Suspense fallback="ass">
      <mesh ref={ref} castShadow receiveShadow>
        <boxGeometry attach="geometry" args={[2, 2, 2]} />
        <meshBasicMaterial attach="material" map={texture} transparent />
      </mesh>
    </Suspense>
  )
}

export const Title = () => {
  const [showPlane, set] = useState(true)
  // When React removes (unmounts) the upper plane after 5 sec, objects should drop ...
  // This may seem like magic, but as the plane unmounts it removes itself from cannon and that's that
  useEffect(() => void setTimeout(() => set(false), 50000), [])

  return (
    <Canvas className="main" shadowMap camera={{ position: [0, 0, 15] }}>
      <ambientLight intensity={0.5} />
      <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
      <CannonProvider>
        <Plane position={[0, 0, -10]} />
        {showPlane && <Plane position={[0, 0, 0]} />}
        <Box position={[1, 0, 1]} />
        <Box position={[1, 1, 1]} />
        <Cutout position={[1, 1, 1]} texturePath="https://i.imgur.com/Oj6RJV9.png" animated />
      </CannonProvider>
    </Canvas>
  )
}
