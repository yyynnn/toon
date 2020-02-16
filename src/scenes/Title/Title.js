import * as CANNON from 'cannon'
import React, { useEffect, useState, Suspense, Fragment } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'

import { Controls } from 'src/helpers/Controls'
import { Heart } from 'src/objects/Heart'
import { Cutout } from 'src/objects/Cutout'

import { useCannon, CannonProvider } from 'src/hooks/useCannon'
import { collatzConj } from 'src/utils/index'

import texture from './assets/test_tiles.png'

const procedureArrayX = collatzConj(10)
const procedureArrayY = collatzConj(17)

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

export const Title = () => {
  return (
    <Fragment>
      <input type="range" />
      <Canvas className="main" shadowMap camera={{ position: [0, 0, 15] }}>
        <Controls />
        <ambientLight intensity={0.5} />
        <spotLight intensity={0.6} position={[30, 30, 50]} angle={0.2} penumbra={1} castShadow />
        <CannonProvider>
          <Plane position={[0, 0, -100]} />
          <Heart />
          {procedureArrayX.map((itemX, idx) => {
            console.log('TCL: Title -> item', itemX)
            return (
              <Cutout
                key={idx}
                position={[itemX, -procedureArrayY[idx] / 3, 1]}
                texturePath={texture}
                size={[3, 3]}
                animationSettings={[4, 6, 24, 24]}
                animated
              />
            )
          })}
        </CannonProvider>
      </Canvas>
    </Fragment>
  )
}
