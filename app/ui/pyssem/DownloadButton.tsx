"use client";

import { Button } from "@/components/ui/button";
import { RectangleStackIcon } from "@heroicons/react/20/solid";
import { PlotData } from "@/app/lib/definitions";

function convertPopulationToCSV(plotData: PlotData) {
    const { times, population_data } = plotData;

    // Validate input
    if (!Array.isArray(times) || times.length === 0) {
        console.error('Invalid times array provided:', times);
        throw new Error('Invalid times array.');
    }
    if (!Array.isArray(population_data) || population_data.length === 0) {
        console.error('Invalid population_data array provided:', population_data);
        throw new Error('Invalid population_data array.');
    }

    // Headers: Shell, Species, Time 0, Time 1, ...
    const headers = ['Shell', 'Species', ...times.map((time) => `Time ${Math.round(time)}`)];

    // Rows: One row per species per shell
    const rows = population_data.map((entry) => {
        const { shell, species, populations } = entry;
        if (!Array.isArray(populations)) {
            console.error('Invalid populations array:', populations);
            throw new Error('Invalid populations array.');
        }
        return [shell, species, ...populations.map((value) => value ?? '')]; // Use empty string for missing data
    });

    // Combine headers and rows into a CSV string
    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    return csvContent;
}

function downloadCSV(plotData: PlotData, filename: string) {
    try {
        const csvContent = convertPopulationToCSV(plotData);
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error('Error downloading CSV:', error);
    }
}

export default function DownloadButton({ plotData }: { plotData: PlotData }) {
    const handleDownload = () => {
        downloadCSV(plotData, 'population_data.csv');
    };

    return (
        <Button
            className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={handleDownload}
        >
            <span className="hidden md:block">Download Results</span>{' '}
            <RectangleStackIcon className="h-5 md:ml-4" />
        </Button>
    );
}