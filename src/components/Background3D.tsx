
import React, { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere } from '@react-three/drei'
import * as THREE from 'three'

function FloatingSphere({ position, size, color, speed = 1 }: { position: [number, number, number], size: number, color: string, speed?: number }) {
  const mesh = useRef<THREE.Mesh>(null!)
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    mesh.current.position.y = position[1] + Math.sin(time * speed) * 0.5
    mesh.current.rotation.x = time * 0.2 * speed
    mesh.current.rotation.y = time * 0.1 * speed
  })

  return (
    <Sphere ref={mesh} args={[size, 16, 16]} position={position}>
      <meshStandardMaterial color={color} transparent opacity={0.7} />
    </Sphere>
  )
}

function SceneObjects() {
  const spheres = [
    { position: [-4, 0, -5] as [number, number, number], size: 1.5, color: "#8B5CF6", speed: 0.5 },
    { position: [4, 1, -10] as [number, number, number], size: 2, color: "#D946EF", speed: 0.8 },
    { position: [-3, -1, -7] as [number, number, number], size: 1, color: "#0EA5E9", speed: 0.3 },
    { position: [5, 2, -5] as [number, number, number], size: 1.2, color: "#F97316", speed: 0.6 },
    { position: [0, -2, -8] as [number, number, number], size: 1.8, color: "#8B5CF6", speed: 0.4 },
    { position: [-6, 2, -12] as [number, number, number], size: 2.2, color: "#0EA5E9", speed: 0.7 },
  ]

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5] as [number, number, number]} intensity={1} />
      
      {spheres.map((sphere, i) => (
        <FloatingSphere
          key={i}
          position={sphere.position}
          size={sphere.size}
          color={sphere.color}
          speed={sphere.speed}
        />
      ))}
    </>
  )
}

const Background3D: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        style={{ 
          background: 'radial-gradient(circle at top left, rgba(131, 58, 180, 0.15) 0%, transparent 50%), radial-gradient(circle at bottom right, rgba(29, 205, 196, 0.1) 0%, transparent 50%), linear-gradient(to bottom right, rgba(101, 78, 163, 0.1) 0%, rgba(218, 226, 248, 0.1) 100%)' 
        }}
      >
        <Suspense fallback={null}>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
          <SceneObjects />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default Background3D
