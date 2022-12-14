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
import { useFrame, Canvas } from "@react-three/fiber";

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
        {false && (
          <Text
            position={[0, 0, 0.06]}
            fontSize={0.05}
            color="#000"
            anchorX="center"
            anchorY="middle"
          >
            Hello react-xr!
          </Text>
        )}
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

function GrabTest() {
  return (
    <>
      <VRButton />
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <pointLight position={[5, 5, 5]} />
          <Hands
          // modelLeft="/hand-left.gltf"
          // modelRight="/hand-right.gltf"
          />
          <Button position={[0, 0.8, -1]} />
          <Controllers />
          {false && <PlayerExample />}
          {false && <HitTestExample />}

      <Backdrop castShadow floor={2} position={[0, -0.5, -3]} scale={[50, 10, 4]}>
        <meshStandardMaterial color="#353540" envMapIntensity={0.1} />
      </Backdrop>

        </XR>
      </Canvas>
    </>
  );
}

export default GrabTest;