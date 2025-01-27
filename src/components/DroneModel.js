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
                geometry.computeBoundingBox();
                const box = geometry.boundingBox;
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z);
                const scale = 3 / maxDim;
                meshRef.current.scale.setScalar(scale);
                
                // Rotate to upright position
                meshRef.current.rotation.x = -Math.PI / 2;
                
                // Manual position adjustment to center the ship
                meshRef.current.position.set(
                    0,      // X offset
                    1,   // Y offset (up/down)
                    0    // Z offset (forward/back)
                );
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
                color="#FF6B00"
                metalness={0.6}
                roughness={0.3}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                envMapIntensity={1.2}
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

// Add this helper component to show rotation axes and center
function RotationHelper({ size = 2 }) {
    return (
        <group>
            {/* Center point */}
            <mesh>
                <sphereGeometry args={[0.1]} />
                <meshBasicMaterial color="white" />
            </mesh>
            
            {/* X axis - Red (Pitch) */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, 0, size, 0, 0])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="red" linewidth={2} />
            </line>
            
            {/* Y axis - Green (Yaw) */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, 0, 0, size, 0])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="green" linewidth={2} />
            </line>
            
            {/* Z axis - Blue (Roll) */}
            <line>
                <bufferGeometry>
                    <bufferAttribute
                        attach="attributes-position"
                        count={2}
                        array={new Float32Array([0, 0, 0, 0, 0, size])}
                        itemSize={3}
                    />
                </bufferGeometry>
                <lineBasicMaterial color="blue" linewidth={2} />
            </line>
            
            {/* Labels */}
            <group position={[size + 0.2, 0, 0]}>
                <sprite scale={[0.5, 0.5, 0.5]}>
                    <spriteMaterial attach="material">
                        <canvasTexture attach="map" image={createTextCanvas("Pitch (X)")} />
                    </spriteMaterial>
                </sprite>
            </group>
            <group position={[0, size + 0.2, 0]}>
                <sprite scale={[0.5, 0.5, 0.5]}>
                    <spriteMaterial attach="material">
                        <canvasTexture attach="map" image={createTextCanvas("Yaw (Y)")} />
                    </spriteMaterial>
                </sprite>
            </group>
            <group position={[0, 0, size + 0.2]}>
                <sprite scale={[0.5, 0.5, 0.5]}>
                    <spriteMaterial attach="material">
                        <canvasTexture attach="map" image={createTextCanvas("Roll (Z)")} />
                    </spriteMaterial>
                </sprite>
            </group>
        </group>
    );
}

// Helper function to create text labels
function createTextCanvas(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 256;
    canvas.height = 64;
    context.fillStyle = 'white';
    context.font = '48px Arial';
    context.textAlign = 'center';
    context.fillText(text, 128, 48);
    return canvas;
}

function DroneModel() {
    const { data } = useWebSocket();
    const containerRef = useRef(null);
    const modelGroupRef = useRef();
    const cameraRef = useRef();
    const [dimensions, setDimensions] = useState({ width: '100%', height: '100%' });

    // Convert degrees to radians
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    // Function to adjust camera to fit model
    useEffect(() => {
        if (modelGroupRef.current && cameraRef.current) {
            // Create a bounding box for the entire group
            const box = new THREE.Box3().setFromObject(modelGroupRef.current);
            const size = box.getSize(new THREE.Vector3());
            const center = box.getCenter(new THREE.Vector3());

            // Calculate the distance needed for the camera
            const maxDim = Math.max(size.x, size.y, size.z);
            const fov = cameraRef.current.fov * (Math.PI / 180);
            const distance = (maxDim * 2.5) / Math.tan(fov / 2);

            // Update camera position
            cameraRef.current.position.set(
                distance * 0.7,  // X
                distance * 0.7,  // Y
                distance * 0.7   // Z
            );
            cameraRef.current.lookAt(center);
            cameraRef.current.updateProjectionMatrix();
        }
    }, []);

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
                height: '100%',
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
                            ref={cameraRef}
                            makeDefault 
                            position={[5, 5, 5]}  // Initial position, will be adjusted
                            fov={45}
                            near={0.1}
                            far={1000}
                        />
                        <OrbitControls
                            enableZoom={false}
                            enablePan={false}
                            enableRotate={false}
                            target={[0, -1.5, 0]}  // Updated to match model center
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
                                <RotationHelper />
                                <STLModel />
                            </group>
                        </Suspense>
                    </Canvas>
                </div>
            </div>
        </ErrorBoundary>
    );
}

export default DroneModel; 