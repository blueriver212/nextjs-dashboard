// components/CesiumComponent.tsx
import React, { useEffect, useRef } from 'react';
import * as Cesium from 'Cesium';
import 'cesium/Widgets/widgets.css';

const CesiumComponent: React.FC = () => {
  const cesiumContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Cesium Ion default access token
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkMWRkODI0Mi03MzIzLTQyNmUtYmI3OC0xNmMyMzgwZTNjMDMiLCJpZCI6NTcwMTcsImlhdCI6MTYyMTk2ODMyMn0.kq72xmk-d79pgx_P4e_mfYLzZ9DOC5pfVF5DrG7TMSg';

    // Initialize the Cesium Viewery
    
    const viewer = new Cesium.Viewer(cesiumContainerRef.current!, {
      terrainProvider: Cesium.createWorldTerrain()
    });

    // Example of adding an entity (a red box)
    viewer.entities.add({
      name: 'Red box',
      position: Cesium.Cartesian3.fromDegrees(-114.0, 40.0, 300000.0),
      box: {
        dimensions: new Cesium.Cartesian3(400000.0, 300000.0, 500000.0),
        material: Cesium.Color.RED
      }
    });

    // Clean up the Cesium Viewer on component unmount
    return () => {
      if (viewer) {
        viewer.destroy();
      }
    };
  }, []);

  return <div ref={cesiumContainerRef} style={{ width: '100%', height: '100vh' }} />;
};

export default CesiumComponent;
