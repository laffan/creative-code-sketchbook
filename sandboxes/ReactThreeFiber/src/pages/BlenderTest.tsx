import * as React from "react";
import * as THREE from "three";
import {
  VRButton,
  XR,
  Hands,
  useXR,
  useInteraction,
  useHitTest,
  RayGrab,
  Controllers,
} from "@react-three/xr";
import { Box, Text, SoftShadows, Environment } from "@react-three/drei";
import { useFrame, Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

function Button(props: JSX.IntrinsicElements["mesh"]) {
  const [hover, setHover] = React.useState(false);
  const [color, setColor] = React.useState(0x123456);

  return (
    <RayGrab
      onSelect={() => setColor((Math.random() * 0xffffff) | 0)}
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Box {...props} args={[0.4, 0.1, 0.1]} scale={hover ? 1.5 : 1}>
        <meshStandardMaterial color={color} />
      </Box>
    </RayGrab>
  );
}

function PlayerExample() {
  const player = useXR((state) => state.player);
  useFrame(() => void (player.rotation.x = player.rotation.y += 0.01));

  return null;
}

function HitTestExample() {
  const boxRef = React.useRef<THREE.Mesh>(null!);
  useHitTest((hitMatrix) => {
    hitMatrix.decompose(
      boxRef.current.position,
      boxRef.current.quaternion,
      boxRef.current.scale
    );
  });

  return <Box ref={boxRef} args={[0.1, 0.1, 0.1]} />;
}

function Model(props) {
  const group = React.useRef();
  const { nodes, materials, animations } = useGLTF(
    "./assets/blendertest/blender-test-world-transformed.glb"
  );
  const { actions } = useAnimations(animations, group);

  console.log(actions);

  React.useEffect(() => {
    // Reset and fade in animation after an index has been changed
    actions["openTheBox"].repetitions = 0;
    actions["openTheBox"].reset().fadeIn(0.5).play();
    // In the clean-up phase, fade it out
    return () => actions["openTheBox"].fadeOut(0.5);
  }, []);

  const lidRef = React.useRef();
  useInteraction(lidRef, "onSelect", (event) => {
    actions["closeTheBox"].repetitions = 0;
    actions["closeTheBox"].reset().fadeIn(0.5).play();
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <pointLight
          castShadow
            shadow-mapSize-height={512}
  shadow-mapSize-width={512}

          name="Point"
          intensity={0.1}
          decay={2}
          color="#daff05"
          position={[0.1, 2.97, 0.94]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
   
        <pointLight
          castShadow
            shadow-mapSize-height={512}
  shadow-mapSize-width={512}

          name="boxlight1"
          intensity={0.51}
          decay={2}
          color="#bc3aff"
          position={[0.32, 0.55, -0.61]}
          rotation={[-Math.PI / 2, 0, 0]}
        />
        <group name="scaleBox" position={[-1.23, 1.01, 1.15]}>
          <mesh
            name="Cube"
            geometry={nodes.Cube.geometry}
            material={materials.red}
          />
          <mesh
            name="Cube_1"
            geometry={nodes.Cube_1.geometry}
            material={materials.gray}
          />
        </group>
        <mesh
          receiveShadow
          name="backdrop"
          geometry={nodes.backdrop.geometry}
          material={materials.blush}
          position={[0.31, 3.31, 1.32]}
          scale={3.3}
        />
        <mesh
          receiveShadow
          name="floorGrid"
          geometry={nodes.floorGrid.geometry}
          material={materials.gridGray}
          position={[1.11, 0.01, 1.11]}
        />
        <mesh
          castShadow
          name="boxBase"
          geometry={nodes.boxBase.geometry}
          material={materials.gold}
          position={[0.31, 0.34, -0.8]}
          scale={0.33}
        />
        <mesh
          name="boxLid"
          castShadow
          ref={lidRef}
          geometry={nodes.boxLid.geometry}
          material={materials.gold}
          position={[0.74, 0.72, -1.13]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.33}
        />
        <group
          name="boxPrize"
          position={[0.74, 0.35, -0.8]}
          rotation={[0, 0, -Math.PI / 2]}
          scale={[0.17, 0.54, 0.17]}
        >
          <mesh
            name="Cylinder"
            geometry={nodes.Cylinder.geometry}
            material={materials.pink}
          />
          <mesh
            name="Cylinder_1"
            geometry={nodes.Cylinder_1.geometry}
            material={materials.lightPink}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/blender-test-world-transformed.glb");

function GrabTest() {
  return (
    <>
      <VRButton />
      <Canvas
        colorManagement
         shadows="basic" // highlight-line
         
      >
        <color attach="background" args={["black"]} />

        {/* <Environment
          background={false} // Whether to affect scene.background
          files={"./assets/blendertest/kloppenheim_06_puresky_1k.hdr"}
          path={"/"}
        /> */}

        <XR
        >
          <Hands />
          <Button position={[0, 0.8, -1]} />
          <Controllers />
          {false && <PlayerExample />}
          {false && <HitTestExample />}

          <Model />
        </XR>
      </Canvas>
    </>
  );
}

export default GrabTest;
