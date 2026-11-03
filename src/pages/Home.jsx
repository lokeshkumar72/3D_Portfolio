import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";

import sakura from "../assets/sakura.mp3";
import { HomeInfo, Loader } from "../components";
import { soundoff, soundon } from "../assets/icons";
import { Bird, Island, Plane, Sky } from "../models";

const Home = ({ isDarkTheme }) => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [currentStage, setCurrentStage] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  const adjustBiplaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [0.9, 0.9, 0.9];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const [biplaneScale, biplanePosition] = adjustBiplaneForScreenSize();
  const [islandScale, islandPosition] = adjustIslandForScreenSize();

  const daySky = isDarkTheme ? "#0f172a" : "#b1e1ff";
  const nightGround = isDarkTheme ? "#020617" : "#000000";

  return (
    <section className='w-full h-screen relative home-scene'>
      <div className='absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && <HomeInfo currentStage={currentStage} isDarkTheme={isDarkTheme} />}
      </div>

      <Canvas
        className={`w-full h-screen bg-transparent ${
          isRotating ? "cursor-grabbing" : "cursor-grab"
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight
            position={[1, 1, 1]}
            intensity={isDarkTheme ? 1.8 : 2.4}
            color={isDarkTheme ? "#93c5fd" : "#fff7d6"}
          />
          <ambientLight intensity={isDarkTheme ? 0.7 : 0.5} color={isDarkTheme ? '#dbeafe' : '#ffffff'} />
          <pointLight position={[10, 5, 10]} intensity={isDarkTheme ? 1.2 : 2} color={isDarkTheme ? '#7dd3fc' : '#fef3c7'} />
          <spotLight
            position={[0, 50, 10]}
            angle={0.15}
            penumbra={1}
            intensity={isDarkTheme ? 1.2 : 2}
            color={isDarkTheme ? '#c4b5fd' : '#fef3c7'}
          />
          <hemisphereLight
            skyColor={daySky}
            groundColor={nightGround}
            intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} isDarkTheme={isDarkTheme} />
          <Island
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />
          <Plane
            isRotating={isRotating}
            position={biplanePosition}
            rotation={[0, 20.1, 0]}
            scale={biplaneScale}
          />
        </Suspense>
      </Canvas>

      <div className='home-night-sky' aria-hidden='true'>
        <span className='shooting-star shooting-star-one' />
        <span className='shooting-star shooting-star-two' />
        <span className='shooting-star shooting-star-three' />
      </div>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className='w-10 h-10 cursor-pointer object-contain drop-shadow-lg'
        />
      </div>
    </section>
  );
};

export default Home;
