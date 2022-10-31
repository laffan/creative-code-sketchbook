import * as React from "react";
import * as THREE from "three";
import {
  VRButton,
  XR,
  Hands,
  useXR,
  Interactive,
  useHitTest,
  RayGrab,
  Controllers,
} from "@react-three/xr";
import { Box, Text, Backdrop } from "@react-three/drei";
import { useFrame, Canvas, useThree } from "@react-three/fiber";
import randomColor from "randomColor";
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { KernelSize } from 'postprocessing'

function Bell(props: JSX.IntrinsicElements["mesh"]) {
  const [hover, setHover] = React.useState(false);
  const [color, setColor] = React.useState(0x123456);

  return (
    <RayGrab
      onSelect={() => setColor((Math.random() * 0xffffff) | 0)}
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      <Box {...props} args={[0.05, 0.05, 0.05]} scale={hover ? 1.5 : 1}>
        <meshStandardMaterial color={randomColor()} />
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

function TouchGrid() {


  const calcBellCoords = () => {
    const coords = [];
    const xScale = 3;
    const yScale = 3;
    const zScale = 3;
    const density = 0.5;

    for (let x = 0; x < xScale; x += density) {
      for (let y = 0; y < yScale; y += density) {
        for (let z = 0; z < zScale; z += density) {
          coords.push([x, y, z]);
        }
      }
    }
    setBellCoords(coords);
  };

  const [bellCoords, setBellCoords] = React.useState([]);
  const calculation = React.useMemo(() => calcBellCoords(), [ ]);


  return (
    <>
      <VRButton />
      <Canvas>
        <color attach="background" args={["black"]} />
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Hands
          modelLeft="/hand-left.gltf"
          modelRight="/hand-right.gltf"
          />
          <group position={[0, 0, 0]}>
            {bellCoords.map((coord, i) => {
              console.log(coord);
              return <Bell key={i} position={coord} rotation={[0, 0, 0]} />;
            })}
          </group>

          {/* <Button position={[0, 0.3, -2]} />
          <Button position={[0, 0.8, -1]} /> */}
          <Controllers />
          {false && <PlayerExample />}
          {false && <HitTestExample />}
        </XR>
      </Canvas>
    </>
  );
}

export default TouchGrid;
