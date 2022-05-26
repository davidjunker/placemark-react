import React from "react";
import ReactFrappeChart from "react-frappe-charts";

const AdminCharts = ({ data }) => {
  // labels: ["Users", "Categories", "Pois", "Images"]
  const assetChartData = {
    labels: ["Users", "Categories", "Pois", "Images"],
    datasets: [
      {
        values: [
          data.users.length,
          data.categories.length,
          data.pois.length,
          data.images.length,
        ],
      },
    ],
  };

  const averagesChartData = {
    labels: ["Categories per user", "Pois per user", "Pois per category"],
    datasets: [
      {
        values: [
          data.stats.averageCategoriesPerUser,
          data.stats.averagePoisPerUser,
          data.stats.averagePoisPerCategory,
        ],
      },
    ],
  };
  return (
    <section className="section columns is-vcentered">
      <div className="column">
        <h3 className="title">Compared Assets</h3>
        <ReactFrappeChart type="pie" height={300} data={assetChartData} />
      </div>
      <div className="column">
        <h3 className="title">Average Data</h3>
        <ReactFrappeChart
          type="bar"
          axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
          height={300}
          data={averagesChartData}
        />
      </div>
    </section>
  );
};

export default AdminCharts;
