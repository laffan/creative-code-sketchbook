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
import IceWorldModel from "./../models/IceWorldModel";
import { useFrame, Canvas } from "@react-three/fiber";
import TeleportTravel from "../components/TeleportTravel";
import { Environment } from '@react-three/drei'

function PlayerExample() {
  const player = useXR((state) => state.player);
  useFrame(() => void (player.rotation.x = player.rotation.y += 0.01));

  return null;
}
/*

THIS THING NEEDS A PROGRESS BAR

https://stackoverflow.com/questions/72234193/how-to-create-website-loader-that-shows-the-progress-of-initial-request-in-nextj

*/

function IceWorld() {
  return (
    <>
      <VRButton />
      <Canvas>
        <color attach="background" args={["black"]} />
        <XR>

        <Environment
          files={"./assets/blendertest/starry4kv2.hdr"}
          path={"/"}
          background
        />

          <Hands />
          <Controllers />
          {false && <PlayerExample />}
            <IceWorldModel />
          {/* <TeleportTravel useNormal={true}>
          </TeleportTravel> */}
        </XR>
      </Canvas>
    </>
  );
}

export default IceWorld;





