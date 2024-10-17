import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.componentDidUpdate();
    }

    componentDidUpdate() {
        var data = this.props.data1;

        // set dimensions and margins of graph
        var margin = { top: 50, right: 20, bottom: 50, left: 20 },
            w = 500 - margin.left - margin.right,
            h = 300 - margin.top - margin.bottom;
        
        var container = d3.select(".child1_svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom) 
            .select(".g_1")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // Add X axis
        var x_data = data.map(item => item.total_bill)
        const x_scale = d3.scaleLinear().domain([0, d3.max(x_data)]).range([margin.left, w]);
        container.selectAll(".x_axis_g").data([0]).join('g').attr("class", "x_axis_g")
            .attr("transform", `translate(0, ${h})`).call(d3.axisBottom(x_scale));

        // Add Y axis
        var y_data = data.map(item => item.tip)
        const y_scale = d3.scaleLinear().domain([0, d3.max(y_data)]).range([h, 0]);
        container.selectAll(".y_axis_g").data([0]).join('g').attr("class", "x_axis_g")
            .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(y_scale));

        container.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("cx", function (d) {
                return x_scale(d.total_bill);
            })
            .attr("cy", function (d) {
                return y_scale(d.tip);
            })
            .attr("r", 3)
            .style("fill", "#cc0000");

        // Add X axis label
        container.selectAll(".x_label").data([0]).join('text').attr("class", "x_label")
            .attr("text-anchor", "middle")
            .attr("x", w / 2) // x-coordinate
            .attr("y", h + margin.bottom)  // y-coordinate
            .text("Total Bill ($)");

        // Add Y axis label
        container.selectAll(".y_label").data([0]).join('text').attr("class", "y_label")
            .attr("text-anchor", "middle")
            .attr("transform", `rotate(-90)`)
            .attr("x", -h / 2)
            .attr("y", -margin.left + 15)
            .text("Tips ($)");

        // Add chart title
        container.selectAll(".chart_title").data([0]).join('text').attr("class", "chart_title")
            .attr("text-anchor", "middle")
            .attr("x", w / 2)
            .attr("y", -10)
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .text("Child1 Plot: Total Bill vs Tips");
    }

    render() {
        return (
            <svg className="child1_svg">
                <g className="g_1"></g>
            </svg>
        )
    }

}

export default Child1;