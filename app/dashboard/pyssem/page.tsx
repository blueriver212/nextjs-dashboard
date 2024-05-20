"use client";

import Head from 'next/head';
import PlotlyHeatmap from '@/app/ui/pyssem/heatmap';
import SummaryGraph from '@/app/ui/pyssem/plot';

const Home: React.FC = () => {
    return (
        <div>
            <Head>
                <title>Plotly with Next.js</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Species Orbital Shells Plot</h1>
                <SummaryGraph />
                <PlotlyHeatmap />
            </main>
        </div>
    );
}

export default Home;
