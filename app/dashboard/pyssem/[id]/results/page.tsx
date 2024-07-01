import Head from 'next/head';
import PlotlyHeatmap from '@/app/ui/pyssem/heatmap';
import SummaryGraph from '@/app/ui/pyssem/plot';
import { fetchResultsById } from '@/app/lib/data';
import { fetchSimulationById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Results({ params }: { params: { id: string } }) {

    const id = params.id;

    const [simulation] = await Promise.all([
        fetchResultsById(id)
      ]);

    if (!simulation) {
        notFound();
    }

    return (
        <div>
            <Head>
                <title>Plotly with Next.js</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Simulation Results</h1>
                {/* <div className="mt-4 flex justify-end md:mt-8">
                    <Link href="http://localhost:8080/" passHref>
                        <Button
                            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            <span className="hidden md:block">View Results in 3D</span>{' '}
                            <GlobeEuropeAfricaIcon className="h-5 md:ml-4" />
                        </Button>
                    </Link>                
                </div> */}
                <SummaryGraph simulation={simulation} />
                {/* <PlotlyHeatmap /> */}
            </main>
        </div>
    );
}
