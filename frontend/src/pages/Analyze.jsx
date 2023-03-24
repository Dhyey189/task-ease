import React, { useEffect, useState } from "react";
import {
  ChartComponent,
  SeriesCollectionDirective,
  SeriesDirective,
  Inject,
  Legend,
  Category,
  Tooltip,
  ColumnSeries,
  DataLabel,
} from "@syncfusion/ej2-react-charts";

import {
  barCustomSeries,
  barPrimaryXAxis,
  barPrimaryYAxis,
} from "../data/dummy";
import { ChartsHeader } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import getWithExpiry from "../utils/GetWithExpiry";
import axios from "axios";

const Analyze = () => {
  const { currentMode } = useStateContext();
  const user = getWithExpiry("user");
  const [analysisData, setAnalysisData] = useState(null);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/task/get-analysis-data/${user.id}/`)
      .then((response) => {
        console.log(response.data);
        setAnalysisData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
      <ChartsHeader
        category="Productivity"
        title="Task counts according to its status for last 6 months"
      />
      <div className=" w-full">
        {analysisData && (
          <ChartComponent
            id="charts"
            primaryXAxis={barPrimaryXAxis}
            primaryYAxis={barPrimaryYAxis}
            chartArea={{ border: { width: 0 } }}
            tooltip={{ enable: true }}
            background={currentMode === "Dark" ? "#33373E" : "#fff"}
            legendSettings={{ background: "white" }}
          >
            <Inject
              services={[ColumnSeries, Legend, Tooltip, Category, DataLabel]}
            />
            <SeriesCollectionDirective>
              {/* eslint-disable-next-line react/jsx-props-no-spreading */}
              {analysisData.map((item, index) => (
                <SeriesDirective key={index} {...item} />
              ))}
            </SeriesCollectionDirective>
          </ChartComponent>
        )}
      </div>
    </div>
  );
};

export default Analyze;
