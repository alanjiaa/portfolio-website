import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Model path
const MODEL_PATH = '/models/alan-room.glb';

// Room model component
export function RoomModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);

  useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      // Scale the model
      scene.scale.set(5, 5, 5);

      // Optimize materials and geometries
      scene.traverse((child: THREE.Object3D) => {
        if (child instanceof THREE.Mesh) {
          const material = child.material;
          if (material instanceof THREE.Material) {
            material.transparent = true;
            material.depthWrite = true;
            material.side = THREE.DoubleSide;
            material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return <primitive object={scene} ref={group} />;
} 