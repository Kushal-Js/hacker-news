import React, { Component } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class Votes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // To avoid unnecessary update keep all options in the state.
      chartOptions: {
        xAxis: {
          categories: [],
          labels:{
            rotation:270,
         },
        },
        yAxis: [
          {
            title: {
              text: "Votes",
            },
          },
        ],
        series: [{ data: [], name: "ID" }],
        plotOptions: {},
        title: {
          text: "",
        },
      },
      hoverData: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.newsItems !== this.props.newsItems) {
      const newsArr = this.props.newsItems;
      const objectIDs = newsArr.flatMap((i) => i.objectID);
      const points = newsArr.flatMap((i) => i.points);

      this.setState({
        chartOptions: {
          xAxis: {
            categories: objectIDs,
          },
          series: [{ data: points }],
        },
      });
    }
  }

  render() {
    const { chartOptions } = this.state;
    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    );
  }
}

export default Votes;
