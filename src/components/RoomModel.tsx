import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RoomModel() {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/models/alan-room.glb');

  React.useEffect(() => {
    if (scene) {
      // Center the model
      const box = new THREE.Box3().setFromObject(scene);
      const center = box.getCenter(new THREE.Vector3());
      scene.position.sub(center);

      // Scale the model
      scene.scale.set(5, 5, 5);

      // Ensure scene has no background or environment
      if (scene instanceof THREE.Scene) {
        scene.background = null;
        scene.environment = null;
        scene.fog = null;
      }

      // Make sure all materials are properly transparent where needed
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          const material = child.material;
          if (material instanceof THREE.Material) {
            material.transparent = true;
            material.depthWrite = true;
            material.side = THREE.DoubleSide;
          }
        }
      });
    }
  }, [scene]);

  useFrame((state) => {
    if (group.current) {
      // Gentle rotation animation
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return <primitive object={scene} ref={group} />;
}

useGLTF.preload('/models/alan-room.glb'); 