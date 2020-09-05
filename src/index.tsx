import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import * as THREE from 'three'

function Box(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<THREE.Mesh>()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    if (mesh && mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[0.3, 0.3, 0.3]}
      onClick={(_) => setActive(!active)}
      onPointerOver={(_) => setHover(true)}
      onPointerOut={(_) => setHover(false)}>
      <torusBufferGeometry attach="geometry" args={[10, 3, 16, 100, 5]} />
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}



export const ExampleComponent = () => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[0, 0, 0]} />
    </Canvas>
  )
}
