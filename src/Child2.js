import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        var data = this.props.data2;

        const margin = { top: 50, right: 10, bottom: 50, left: 50 },
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;

        const container = d3.select(".child2_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .select(".bar")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X Axis
        var x_data = data.map(item => item.day)
        const x_scale = d3.scaleBand().domain(x_data).range([0, w]).padding(0.2);
        container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
            .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

        // Add Y Axis
        var y_data = data.map(item => item.avgTip);
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
        container.selectAll(".y_axis_g").data([0]).join('g').attr("class", "y_axis_g")
            .attr("transform", `translate(0, 0)`).call(d3.axisLeft(y_scale));

        var div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0)  // Start with it hidden
            .style("position", "absolute")
            .style("background-color", "#f9f9f9")

        // Bars
        container.selectAll("rect")
            .data(data)
            .join("rect")
            .attr("x", d => x_scale(d.day))
            .attr("y", d => y_scale(d.avgTip)) // starting y-coordinate
            .attr("width", x_scale.bandwidth())
            .attr("height", d => h - y_scale(d.avgTip)) // actual length of y-coordinate
            .style("fill", "#cc0000")

            .on("mousemove", (event, d) => {
                div.transition().duration(200).style("opacity", .9);
                div.html(d.avgTip.toFixed(5)).style("left", (event.pageX - 5) + "px").style("top", (event.pageY - 20) + "px")
            })

            .on("mouseout", event => div.transition().duration(200).style("opacity", 0))

        container.selectAll(".mytext")
            .data(data)
            .join("text")
            .attr("class", "mytext")
            .attr("x", d => x_scale(d.day) + x_scale.bandwidth() / 2)
            .text(d => d.avgTip.toFixed(2))
            .attr("text-anchor", "middle").attr("dy", -5)
            .attr("y", d => y_scale(d.avgTip))

        // X Axis Label
        container.selectAll(".x_label").data([0]).join('text').attr("class", "x_label")
            .attr("text-anchor", "middle")
            .attr("x", w / 2)
            .attr("y", h + margin.bottom - 10)
            .text("Day")

        // Y Axis Label
        container.selectAll(".y_label").data([0]).join('text').attr("class", "y_label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -h / 2)
            .attr("y", -margin.left + 15)
            .text("Average Tip")

        // Title
        container.append("text")
            .attr("text-anchor", "middle")
            .attr("x", w / 2)
            .attr("y", -22)
            .text("Child2 Plot: Average Tip by Day")
            .style("font-size", "18px")
            .style("font-weight", "bold");
    }

    render() {
        return (
            <svg className="child2_svg">
                <g className="bar"></g>
            </svg>
        )
    }
}

export default Child2;
