import React, { useRef, useState, useMemo } from 'react'
import { useFrame, useLoader } from 'react-three-fiber'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { MeshPhongMaterial, MeshLambertMaterial } from 'three'

import heart from 'src/models/heart.fbx'
console.log('TCL: heart', heart)

const scale = 0.01

export const Heart = ({ position = [0, 0, 0], size = [10, 10], ...rest }) => {
  const [rotationY, setRotationY] = useState(0)
  const [object, set] = useState()
  const heartRef = useRef()
  const mesh = useRef()

  useMemo(() => new FBXLoader().load(heart, x => set(x)), [heart])
  useFrame(() => {
    mesh.current && (mesh.current.rotation.y = mesh.current.rotation.y += 0.1)
    mesh.current &&
      mesh.current.children[0] &&
      (mesh.current.children[0].material = new MeshPhongMaterial({
        color: 'red'
      }))
  })

  return object ? (
    <mesh ref={mesh} scale={[1, 1, 1]} rotation={[0, 0, 0]}>
      <primitive object={object.children[0]} position={[0, 0, 0.13]} scale={[scale, scale, scale]} />
      {/* <axesHelper /> */}
    </mesh>
  ) : null
}
