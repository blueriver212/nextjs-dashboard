import Head from 'next/head';
import PlotlyHeatmap from '@/app/ui/pyssem/heatmap';
import SummaryGraph from '@/app/ui/pyssem/plot';
import SimulationSummary from '@/app/ui/pyssem/simulationsummary';
import LaunchSummary from '@/app/ui/pyssem/launchsummary';
import { fetchResultsById } from '@/app/lib/data';
import { fetchSimulationById } from '@/app/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { RectangleStackIcon } from '@heroicons/react/20/solid';


export default async function Results({ params }: { params: { id: string } }) {

    const id = params.id;

    const simulation = await fetchSimulationById(id);

    const [results] = await Promise.all([
        fetchResultsById(id),
    ]);


    if (!results) {
        notFound();
    }

    return (
        <div>
            <Head>
                <title>Plotly with Next.js</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Simulation Results</h1>
                
                {/* <div className="flex justify-left">
                    <Link href="http://localhost:8080/" passHref>
                        <Button
                            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            <span className="hidden md:block">Download Results</span>{' '}
                            <RectangleStackIcon className="h-5 md:ml-4" />
                        </Button>
                    </Link>                
                </div> */}

                
                <SummaryGraph results={results}/>

                <h1 className="text-2xl font-bold mt-8 mb-4">Model Parameters</h1>
                <SimulationSummary simulation={simulation} />

                <h1 className="text-2xl font-bold mt-8 mb-4">Launch</h1>
                <LaunchSummary results={results} />
                
                <h1 className="text-2xl font-bold mt-8 mb-4">Per Species Results</h1>
                <PlotlyHeatmap results={results} simulation={simulation} />
            </main>
        </div>
    );
}
