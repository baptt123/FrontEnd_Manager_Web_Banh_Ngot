import { useTheme, Box, Typography, TextField } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { useState, useEffect } from "react";
import axios from "axios";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const today = new Date();
  const [startDate, setStartDate] = useState(() =>
      new Date(today.getFullYear(), today.getMonth(), 1).toISOString().slice(0, 10)
  );
  const [endDate, setEndDate] = useState(() =>
      new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().slice(0, 10)
  );
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await axios.get(
            `http://localhost:8080/api/statistics/revenue-by-time?startDate=${startDate}&endDate=${endDate}`,
            { withCredentials: true }
        );

        const data = response.data.map((item) => ({
          date: item.date, // string dạng yyyy-MM-dd
          revenue: parseFloat(item.revenue),
        }));

        console.log("Dữ liệu biểu đồ:", data);
        setBarData(data);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu biểu đồ:", error);
      }
    };

    fetchRevenueData();
  }, [startDate, endDate]);

  return (
      <Box>
        {!isDashboard && (
            <Box display="flex" gap={2} alignItems="center" mb={2}>
              <TextField
                  type="date"
                  label="Từ ngày"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
              />
              <TextField
                  type="date"
                  label="Đến ngày"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
              />
            </Box>
        )}

        {barData.length === 0 ? (
            <Typography color={colors.grey[300]}>Không có dữ liệu biểu đồ</Typography>
        ) : (
            <Box height="400px">
              <ResponsiveBar
                  data={barData}
                  keys={["revenue"]}
                  indexBy="date"
                  margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                  padding={0.3}
                  valueScale={{ type: "linear" }}
                  indexScale={{ type: "band", round: true }}
                  colors={{ scheme: "nivo" }}
                  borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: -45,
                    legend: isDashboard ? undefined : "Ngày",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: isDashboard ? undefined : "Doanh thu (VNĐ)",
                    legendPosition: "middle",
                    legendOffset: -40,
                  }}
                  enableLabel={true}
                  labelSkipWidth={12}
                  labelSkipHeight={12}
                  labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
                  legends={[
                    {
                      dataFrom: "keys",
                      anchor: "bottom-right",
                      direction: "column",
                      translateX: 120,
                      itemsSpacing: 2,
                      itemWidth: 100,
                      itemHeight: 20,
                      itemDirection: "left-to-right",
                      itemOpacity: 0.85,
                      symbolSize: 20,
                      effects: [{ on: "hover", style: { itemOpacity: 1 } }],
                    },
                  ]}
                  role="application"
                  ariaLabel="Biểu đồ doanh thu theo thời gian"
                  barAriaLabel={(e) =>
                      `${e.id}: ${e.formattedValue} vào ngày ${e.indexValue}`
                  }
              />
            </Box>
        )}
      </Box>
  );
};

export default BarChart;
