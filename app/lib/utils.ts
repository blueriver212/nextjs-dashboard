import Papa from 'papaparse';
import { PlotData } from './definitions';

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};


export const convertPlotDataToCSV = (plotData: PlotData) => {
  const flattenedData = plotData.population_data.map(pd => ({
      ...pd,
      times: plotData.times,
      max_altitude: plotData.max_altitude,
      min_altitude: plotData.min_altitude,
      Hmid: plotData.Hmid,
      species: plotData.species,
      simulation_id: plotData.simulation_id
  }));

  const csv = Papa.unparse(flattenedData);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', 'results.csv');
  link.click();
};

// export const DownloadButton = ({ results }: { results: PlotData }) => {
//   const convertPlotDataToCSV = (plotData: PlotData) => {
//       const flattenedData = plotData.population_data.map(pd => ({
//           ...pd,
//           times: plotData.times,
//           max_altitude: plotData.max_altitude,
//           min_altitude: plotData.min_altitude,
//           Hmid: plotData.Hmid,
//           species: plotData.species,
//           simulation_id: plotData.simulation_id
//       }));

//       const csv = Papa.unparse(flattenedData);
//       const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
//       const url = URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.setAttribute('href', url);
//       link.setAttribute('download', 'results.csv');
//       link.click();
//   };

//   return (
//       <div></div>
//   );
// };
