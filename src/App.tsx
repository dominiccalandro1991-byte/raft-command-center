import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Info, Hammer, Layers, Compass } from 'lucide-react'

type AppState = 'MATERIALS' | 'ASSEMBLY' | 'RENDER' | 'SIMULATION'

const RaftModel = () => {
  return (
    <group>
      <mesh position={[-1.5, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 6, 16]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>
      <mesh position={[1.5, -0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 6, 16]} />
        <meshStandardMaterial color="#5C4033" />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={i} position={[0, 0.1, -2.5 + i * 0.45]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.1, 0.1, 3.8, 8]} />
          <meshStandardMaterial color="#8B5A2B" />
        </mesh>
      ))}

      <mesh position={[0, 1.5, 2]} rotation={[-Math.PI / 6, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 4, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}

const materials: Record<string, string> = {
  Pontoons:
    'Standing Dead Pine / Cottonwood. Qty: 2-4. L: 2.5m, D: 15cm. Function: Primary buoyancy.',
  Decking:
    'Hardwood Saplings. Qty: 10-15. L: 1.5m, D: 5cm. Function: Load distribution.',
  Bindings: 'Wild Grapevine. Qty: 50ft. Function: High-tension structural lashing.',
  Tools: 'Folding Saw, Claw Hammer, 16d Nails. Function: Extraction and fastening.',
}

export default function RaftDeploymentCommandCenter() {
  const [activeState, setActiveState] = useState<AppState>('MATERIALS')
  const [activeMaterial, setActiveMaterial] = useState<string | null>(null)

  return (
    <div className="flex h-screen w-full bg-slate-900 text-white font-mono">
      <div className="w-64 bg-slate-800 p-4 flex flex-col gap-4 border-r border-slate-700">
        <h1 className="text-xl font-bold mb-6 border-b border-slate-600 pb-2">Raft Command</h1>
        <button onClick={() => setActiveState('MATERIALS')} className="flex items-center gap-2 hover:bg-slate-700 p-2 rounded">
          <Info size={18} /> 1. Materials
        </button>
        <button onClick={() => setActiveState('ASSEMBLY')} className="flex items-center gap-2 hover:bg-slate-700 p-2 rounded">
          <Hammer size={18} /> 2. Assembly
        </button>
        <button onClick={() => setActiveState('RENDER')} className="flex items-center gap-2 hover:bg-slate-700 p-2 rounded">
          <Layers size={18} /> 3. 3D Render
        </button>
        <button onClick={() => setActiveState('SIMULATION')} className="flex items-center gap-2 hover:bg-slate-700 p-2 rounded">
          <Compass size={18} /> 4. Simulation
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto">
        {activeState === 'MATERIALS' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-400">1.0 Material Logistics</h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.keys(materials).map((mat) => (
                <button
                  key={mat}
                  onClick={() => setActiveMaterial(mat)}
                  className="bg-slate-800 p-4 border border-slate-600 rounded text-left hover:border-blue-400 transition-colors"
                >
                  {mat}
                </button>
              ))}
            </div>
            {activeMaterial && (
              <div className="mt-8 p-4 bg-blue-900/30 border border-blue-500 rounded">
                <h3 className="text-lg font-bold text-blue-300">{activeMaterial} Specification</h3>
                <p className="mt-2 text-slate-300">{materials[activeMaterial]}</p>
              </div>
            )}
          </div>
        )}

        {activeState === 'ASSEMBLY' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-orange-400">2.0 Construction Protocol</h2>
            <div className="space-y-4">
              <details className="bg-slate-800 p-4 border border-slate-600 rounded cursor-pointer">
                <summary className="font-bold text-lg">Phase 1: Pontoon Harvesting</summary>
                <p className="mt-2 text-slate-400 text-sm">
                  Fell logs using folding saw. Ensure uniform lengths of 2.4 meters. Transport to waterline.
                </p>
              </details>
              <details className="bg-slate-800 p-4 border border-slate-600 rounded cursor-pointer">
                <summary className="font-bold text-lg">Phase 2: Frame Integration</summary>
                <p className="mt-2 text-slate-400 text-sm">
                  Space primary logs 90cm apart. Apply transverse decking saplings perpendicularly at 10cm
                  intervals. Fasten with 16d nails or grapevine square lashings.
                </p>
              </details>
              <details className="bg-slate-800 p-4 border border-slate-600 rounded cursor-pointer">
                <summary className="font-bold text-lg">Phase 3: Propulsion Mounting</summary>
                <p className="mt-2 text-slate-400 text-sm">
                  Construct A-Frame telescopic pole. Taper distal ends. Fasten proximal ends with overlapping
                  grapevine bindings.
                </p>
              </details>
            </div>
          </div>
        )}

        {activeState === 'RENDER' && (
          <div className="h-full w-full flex flex-col">
            <h2 className="text-2xl font-bold text-green-400 mb-4">3.0 3D Topographical Verification</h2>
            <div className="flex-1 bg-black rounded border border-slate-600 relative min-h-[420px]">
              <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <RaftModel />
                <OrbitControls enableZoom={true} enablePan={true} />
              </Canvas>
              <div className="absolute bottom-4 left-4 text-xs text-slate-400 bg-black/50 p-2 rounded">
                [Left-Click] Rotate | [Scroll] Zoom | [Right-Click] Pan
              </div>
            </div>
          </div>
        )}

        {activeState === 'SIMULATION' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-red-400">4.0 Hydrodynamic Deployment Variables</h2>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-slate-800 p-6 border border-slate-600 rounded">
                <h3 className="text-xl font-bold text-white mb-2">Mississippi River Logic</h3>
                <ul className="list-disc pl-5 text-slate-400 space-y-2 text-sm">
                  <li>Current Velocity: ≥ 1.5 m/s</li>
                  <li>Vector: Downstream drift primary.</li>
                  <li>Steering: Box-paddle for lateral shear correction.</li>
                  <li>Hazard: Wing dams, commercial barge wakes.</li>
                </ul>
              </div>
              <div className="bg-slate-800 p-6 border border-slate-600 rounded">
                <h3 className="text-xl font-bold text-white mb-2">Southern Illinois Lakes</h3>
                <ul className="list-disc pl-5 text-slate-400 space-y-2 text-sm">
                  <li>Current Velocity: Negligible.</li>
                  <li>Vector: Wind-dependent (fetch).</li>
                  <li>Propulsion: A-Frame punt pole or Eolian kite sail.</li>
                  <li>Hazard: Submerged timber (Rend Lake / Lake of Egypt).</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
