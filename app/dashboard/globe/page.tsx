import dynamic from 'next/dynamic';

export default async function Page() {
    // Dynamically import CesiumComponent to ensure it's only loaded on the client side
    const CesiumComponent = dynamic(() => import('@/app/ui/cesiumcomponent'), {
        ssr: false
    });
    
  const Home: React.FC = () => {
    return (
      <div>
        <h1>My Cesium App</h1>
        <CesiumComponent />
      </div>
    );
  };
}
