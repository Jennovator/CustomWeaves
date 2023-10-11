import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';

import state from '../store';

// In the canvas, in the CameraRig, you're passing some children components (Center and inside it is Shirt)
// use the children react prop and return it in a group that is going to render the children
const CameraRig = ({ children }) => {
  const group = useRef(); // this will be used to update the state
  const snap = useSnapshot(state);  // get the state and pass to variable snap

  // Calls the frame and accept callback function then passed in the parameters state and delta (difference from the last frame)
  useFrame((state, delta) => {

    // to be used for the shirt to be responsive
    const isBreakpoint = window.innerWidth <= 1260;
    const isMobile = window.innerWidth <= 600;

    // set the initial position of the model
    let targetPosition = [-0.4, 0, 2];
    if(snap.intro){
      if(isBreakpoint) targetPosition = [0, 0, 2];
      if(isMobile) targetPosition = [0, 0.2, 2.5];
    } else {
      if(isMobile) targetPosition = [0, 0, 2.5]
      else targetPosition = [ 0, 0, 2];
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, - state.pointer.x / 5, 0],
      0.25, // smooth time
      delta // difference (from the parameters)
    )
  })


  return <group ref={group}> {children} </group>
}

export default CameraRig;