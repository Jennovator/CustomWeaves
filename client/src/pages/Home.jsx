import { motion, AnimatePresence } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { 
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation
} from '../config/motion';
import state from '../store';
import { CustomButton } from '../components';

const Home = () => {
  const snap = useSnapshot(state); // one current snapshot of the state and passed in the default state using useSnapshot
  return (
    <AnimatePresence> 
      {/* Determine if you are currently in the home page, if yes, render the home page*/}
      {snap.intro && (
        <motion.section className="home" {...slideAnimation('left')}>
          <motion.header {...slideAnimation('down')}>
            <img src="./threejs.png" alt="Logo" className="w-8 h-8 object-contain" />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}> 

            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET'S <br className="xl:block hidden" /> DO IT.
              </h1>
            </motion.div>

            <motion.div {...headContentAnimation} className="flex flex-col gap-5">
              <p className="max-w-md font-normal text-gray-600 text-base">
                Create your unique and exclusive shirt with our brand-new 3D customization tool.
                <strong> Unleash your imagination</strong> {" "}
                and define your own style.
              </p>
            </motion.div>

            {/* Button to re-direct you to the customization page */}
            <CustomButton 
              type="filled"
              title="Customize It"
              handleClick={() => state.intro = false}
              customeStyles="w-fit px-4 py-2.5 font-bold tex-sm"
            />

          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}

export default Home;