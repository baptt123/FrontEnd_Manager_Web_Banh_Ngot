//
// import { ResponsivePie } from "@nivo/pie";
// import { tokens } from "../theme";
// import { useTheme } from "@mui/material";
// import { useState, useEffect } from "react";
// import axios from "axios"; // Nếu bạn chưa có service riêng
//
// const PieChart = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [pieData, setPieData] = useState([]);
//
//   useEffect(() => {
//     const fetchRevenueByCategory = async () => {
//       try {
//         const now = new Date();
//         const year = now.getFullYear();
//         const month = now.getMonth() + 1; // JavaScript month is 0-based
//
//         const response = await axios.get(
//             `http://localhost:8080/api/statistic/revenue-by-category?year=${year}&month=${month}`,
//             { withCredentials: true } // để gửi cookie JWT
//         );
//
//         const transformedData = response.data.map((item, index) => ({
//           id: item.categoryName,
//           label: item.categoryName,
//           value: item.revenue,
//           color: `hsl(${index * 40 % 360}, 70%, 50%)`, // tạo màu ngẫu nhiên
//         }));
//
//         setPieData(transformedData);
//       } catch (error) {
//         console.error("Error fetching pie chart data:", error);
//       }
//     };
//
//     fetchRevenueByCategory();
//   }, []);
//
//   return (
//       <ResponsivePie
//           data={pieData}
//           theme={{
//             axis: {
//               domain: { line: { stroke: colors.grey[100] } },
//               legend: { text: { fill: colors.grey[100] } },
//               ticks: {
//                 line: { stroke: colors.grey[100], strokeWidth: 1 },
//                 text: { fill: colors.grey[100] },
//               },
//             },
//             legends: { text: { fill: colors.grey[100] } },
//           }}
//           margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
//           innerRadius={0.5}
//           padAngle={0.7}
//           cornerRadius={3}
//           activeOuterRadiusOffset={8}
//           borderColor={{
//             from: "color",
//             modifiers: [["darker", 0.2]],
//           }}
//           arcLinkLabelsSkipAngle={10}
//           arcLinkLabelsTextColor={colors.grey[100]}
//           arcLinkLabelsThickness={2}
//           arcLinkLabelsColor={{ from: "color" }}
//           enableArcLabels={false}
//           arcLabelsRadiusOffset={0.4}
//           arcLabelsSkipAngle={7}
//           arcLabelsTextColor={{
//             from: "color",
//             modifiers: [["darker", 2]],
//           }}
//           legends={[
//             {
//               anchor: "bottom",
//               direction: "row",
//               translateY: 56,
//               itemWidth: 100,
//               itemHeight: 18,
//               itemTextColor: "#999",
//               symbolSize: 18,
//               symbolShape: "circle",
//               effects: [
//                 {
//                   on: "hover",
//                   style: {
//                     itemTextColor: "#000",
//                   },
//                 },
//               ],
//             },
//           ]}
//       />
//   );
// };
//
// export default PieChart;



