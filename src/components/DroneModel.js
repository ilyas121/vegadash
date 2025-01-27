import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Grid, Environment, PerspectiveCamera } from '@react-three/drei';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import * as THREE from 'three';
import { useWebSocket } from '../context/WebSocketContext';

// Separate component for error boundary
function ErrorBoundary({ children }) {
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const handleError = (error) => {
            console.error('3D Rendering Error:', error);
            setHasError(true);
        };

        window.addEventListener('error', handleError);
        return () => window.removeEventListener('error', handleError);
    }, []);

    if (hasError) {
        return (
            <div className="block-content text-center text-danger">
                <h3>3D Model failed to load</h3>
                <p>Please check your browser compatibility or try refreshing.</p>
            </div>
        );
    }

    return children;
}

// Coordinate axes with prop validation
function CoordinateAxes({ size = 1, lineWidth = 0.01 }) {
    if (typeof size !== 'number' || size <= 0) {
        console.error('Invalid size prop for CoordinateAxes');
        return null;
    }

    return (
        <group>
            {/* X-axis (red) */}
            <mesh position={[size/2, 0, 0]}>
                <boxGeometry args={[size, lineWidth, lineWidth]} />
                <meshBasicMaterial color="red" />
            </mesh>
            {/* Y-axis (green) */}
            <mesh position={[0, size/2, 0]}>
                <boxGeometry args={[lineWidth, size, lineWidth]} />
                <meshBasicMaterial color="green" />
            </mesh>
            {/* Z-axis (blue) */}
            <mesh position={[0, 0, size/2]}>
                <boxGeometry args={[lineWidth, lineWidth, size]} />
                <meshBasicMaterial color="blue" />
            </mesh>
        </group>
    );
}

// STL Model loader with error handling
function STLModel() {
    const [error, setError] = useState(null);
    const meshRef = useRef();

    const geometry = useLoader(
        STLLoader, 
        'http://localhost:8080/models/drone.stl',
        undefined,
        (error) => {
            console.error('Error loading STL:', error);
            setError(error);
        }
    );

    useEffect(() => {
        if (meshRef.current && geometry) {
            try {
                geometry.center();
                geometry.computeBoundingBox();
                const box = geometry.boundingBox;
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 2 / maxDim; // Increased scale
                meshRef.current.scale.setScalar(scale);
                
                // Rotate to upright position
                meshRef.current.rotation.x = -Math.PI / 2; // Rotate 90 degrees around X axis
            } catch (err) {
                console.error('Error processing geometry:', err);
                setError(err);
            }
        }
    }, [geometry]);

    if (error) {
        return null;
    }

    return (
        <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
            <meshPhysicalMaterial 
                color="#4080ff"
                metalness={0.8}
                roughness={0.2}
                clearcoat={0.8}
                clearcoatRoughness={0.2}
                envMapIntensity={1}
            />
        </mesh>
    );
}

// Loading fallback component
function LoadingFallback() {
    return (
        <mesh>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial color="gray" wireframe />
        </mesh>
    );
}

function DroneModel() {
    const { data } = useWebSocket();
    const containerRef = useRef(null);
    const modelGroupRef = useRef();
    const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });

    // Convert degrees to radians
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                setDimensions({
                    width: '100%',
                    height: '100%'
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    // Update model rotation based on IMU data
    useEffect(() => {
        if (modelGroupRef.current && data?.IMU) {
            const [roll, pitch, yaw] = data.IMU.slice(0, 3);
            
            // Create a new quaternion for smooth rotation
            const quaternion = new THREE.Quaternion();
            const euler = new THREE.Euler(
                toRadians(pitch),  // X-axis (pitch)
                toRadians(yaw),    // Y-axis (yaw)
                toRadians(-roll),  // Z-axis (roll) - negative for correct direction
                'XYZ'             // Rotation order
            );
            
            quaternion.setFromEuler(euler);
            modelGroupRef.current.setRotationFromQuaternion(quaternion);
        }
    }, [data?.IMU]);

    return (
        <ErrorBoundary>
            <div style={{ 
                position: 'relative',
                height: 'calc(100vh - 200px)',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div 
                    ref={containerRef} 
                    style={{ 
                        flex: 1,
                        minHeight: 0
                    }}
                >
                    <Canvas shadows>
                        <PerspectiveCamera 
                            makeDefault 
                            position={[4, 4, 4]} 
                            fov={50}
                            near={0.1}
                            far={1000}
                        />
                        <Suspense fallback={<LoadingFallback />}>
                            <ambientLight intensity={0.5} />
                            <directionalLight
                                position={[5, 5, 5]}
                                intensity={1}
                                castShadow
                            />
                            <spotLight
                                position={[-5, 5, -5]}
                                angle={0.3}
                                penumbra={1}
                                intensity={0.5}
                                castShadow
                            />
                            <Environment preset="city" />
                            <Grid
                                cellSize={1}
                                cellThickness={0.5}
                                cellColor="#ff5555"
                                sectionSize={5}
                                sectionThickness={1}
                                sectionColor="#ff8888"
                                fadeDistance={30}
                                fadeStrength={1}
                                followCamera={false}
                                infiniteGrid={true}
                            />
                            <group ref={modelGroupRef}>
                                <STLModel />
                            </group>
                            <OrbitControls 
                                enablePan={false}
                                enableZoom={true}
                                enableRotate={false}
                                minDistance={2}
                                maxDistance={20}
                                minPolarAngle={0}
                                maxPolarAngle={Math.PI / 2}
                                target={[0, 0, 0]}
                            />
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default DroneModel; 