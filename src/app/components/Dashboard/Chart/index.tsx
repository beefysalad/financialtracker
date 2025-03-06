import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/helper";
import { Line, LineChart, XAxis, YAxis } from "recharts";

interface IData {
  name: string;
  income: number;
  expenses: number;
}

interface IOverviewChart {
  data: IData[]; // ✅ `data` should be an array of `IData`
}
const OverviewChart = ({ data }: IOverviewChart) => {
  return (
    <Card className='mt-5'>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
        <CardDescription>
          Your income and expenses over the past 6 months
        </CardDescription>
      </CardHeader>
      <CardContent className='h-[300px]'>
        <ChartContainer config={{}} className='w-full h-full'>
          <LineChart data={data}>
            <XAxis
              dataKey='name'
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke='#888888'
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) =>
                `${formatCurrency(value, "PHP", false)}`
              }
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type='monotone'
              dataKey='income'
              stroke='#4ade80'
              strokeWidth={2}
            />
            <Line
              type='monotone'
              dataKey='expenses'
              stroke='#f43f5e'
              strokeWidth={2}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
