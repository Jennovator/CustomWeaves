import { proxy } from 'valtio';

// Initialized the state
const state = proxy ({
    intro: true, // a flag to determine if you are currently in the home page or not
    color: '#EFBD48', // default color
    isLogoTexture: true, // determine if the logo is displaying on the shirt
    isFullTexture: false, 
    logoDecal:'./threejs.png', // initial load of the shirt 
    fullDecal: './threejs.png'
});

export default state;