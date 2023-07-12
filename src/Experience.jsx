import { Html, Loader, OrbitControls, ScrollControls } from '@react-three/drei'
import { Physics } from '@react-three/rapier'
import Earth from './world/Earth'
import Moon from './world/Moon'
import { MathUtils } from 'three'
import Sun from './world/Sun'
import UniverseEnvironment from './utils/UniverseEnvironment'
import { Perf } from 'r3f-perf'
import Asteroid from './world/Asteroid'
import { useState } from 'react'
import Particles from './utils/Particles'
import { Vector3 } from 'three'

export default function Experience() {
    const [collisionDetected, setCollisionDetected] = useState(false);
    const [asteroidPosition, setAsteroidPosition] = useState(new Vector3(0, 0, 25));

    const handleNewAsteroid = () => {
        setCollisionDetected(false);
        
        const randomZ = Math.random() * 10 + 15; 
        const randomY = Math.random() * 20 - 10;
        const random = Math.random() * 20 - 10;
        setAsteroidPosition(new Vector3(random, randomY, randomZ));
    };
    
    return (
        <>

            <Html position={[-3, -14, 0]}>
                <div className='Button-asteroid'>
                    <button id='buttonAsteroid' onClick={handleNewAsteroid}>
                        New Asteroid
                    </button>
                </div>
            </Html>
            <OrbitControls makeDefault />
            <UniverseEnvironment />
            <Sun position={[0, 0, 500]} scale={5} />
            <Moon scale={0.005} />
            <Physics debug={false} gravity={[0, 0, -9.8]}>
                <Earth rotation={[-Math.PI / 2, -MathUtils.degToRad(23.5), 0]} scale={0.1} />
                {!collisionDetected && <Asteroid setAsteroidPosition={setAsteroidPosition} setCollisionDetected={setCollisionDetected} position={asteroidPosition} />}
                {collisionDetected && <Particles asteroidPosition={asteroidPosition} count={1000} size={0.1} color={{ r: 1, g: 0, b: 0 }} />}
            </Physics>
        </>
    );
}