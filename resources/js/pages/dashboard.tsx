import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Layout from '@/layouts/app/app-layout';
import { Head } from '@inertiajs/react';
import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis, YAxis } from 'recharts';

const chartDataBrowser = [
    { browser: 'chrome', visitors: 275, fill: 'blue' },
    { browser: 'safari', visitors: 200, fill: 'green' },
    { browser: 'firefox', visitors: 287, fill: 'grey' },
    { browser: 'edge', visitors: 173, fill: 'red' },
    { browser: 'other', visitors: 191, fill: 'yellow' },
];

const chartConfigBrowser = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
    },
    safari: {
        label: 'Safari',
    },
    firefox: {
        label: 'Firefox',
    },
    edge: {
        label: 'Edge',
    },
    other: {
        label: 'Other',
    },
} satisfies ChartConfig;

const chartData2 = [
    { browser: 'chrome', visitors: 275, fill: 'blue' },
    { browser: 'safari', visitors: 200, fill: 'green' },
    { browser: 'firefox', visitors: 287, fill: 'grey' },
    { browser: 'edge', visitors: 173, fill: 'red' },
    { browser: 'other', visitors: 191, fill: 'yellow' },
];
const chartConfig2 = {
    visitors: {
        label: 'Visitors',
    },
    chrome: {
        label: 'Chrome',
        color: 'hsl(var(--chart-1))',
    },
    safari: {
        label: 'Safari',
        color: 'hsl(var(--chart-2))',
    },
    firefox: {
        label: 'Firefox',
        color: 'hsl(var(--chart-3))',
    },
    edge: {
        label: 'Edge',
        color: 'hsl(var(--chart-4))',
    },
    other: {
        label: 'Other',
        color: 'hsl(var(--chart-5))',
    },
} satisfies ChartConfig;

const chartData3 = [{ month: 'january', desktop: 1260, mobile: 570 }];
const chartConfig3 = {
    desktop: {
        label: 'Desktop',
        color: 'blue',
    },
    mobile: {
        label: 'Mobile',
        color: 'red',
    },
} satisfies ChartConfig;

const chartData4 = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
];

const chartConfig4 = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

function Dashboard() {
    const totalVisitors1 = useMemo(() => {
        return chartDataBrowser.reduce((acc, curr) => acc + curr.visitors, 0);
    }, []);

    const totalVisitors = chartData3[0].desktop + chartData3[0].mobile;

    return (
        <>
            <Head title="Dashboard" />
            <div className="w-full overflow-x-auto px-4 py-10 md:px-8 lg:px-16">
                <div className="mb-12">
                    <h1 className="text-lg font-bold">Dashboard</h1>
                    <p>You can see all your data analytics here.</p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bar Chart</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig4}>
                                <BarChart accessibilityLayer data={chartData4}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Bar Chart - Mixed</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig2}>
                                <BarChart
                                    accessibilityLayer
                                    data={chartData2}
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                    }}
                                >
                                    <YAxis
                                        dataKey="browser"
                                        type="category"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => chartConfig2[value as keyof typeof chartConfig2]?.label}
                                    />
                                    <XAxis dataKey="visitors" type="number" hide />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="visitors" layout="vertical" radius={5} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Radial Chart - Stacked</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 items-center pb-0">
                            <ChartContainer config={chartConfig3} className="mx-auto aspect-square w-full max-w-[250px]">
                                <RadialBarChart data={chartData3} endAngle={180} innerRadius={80} outerRadius={130}>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                                    return (
                                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) - 16}
                                                                className="fill-foreground text-2xl font-bold"
                                                            >
                                                                {totalVisitors.toLocaleString()}
                                                            </tspan>
                                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                    <RadialBar
                                        dataKey="desktop"
                                        stackId="a"
                                        cornerRadius={5}
                                        fill="var(--color-desktop)"
                                        className="stroke-transparent stroke-2"
                                    />
                                    <RadialBar
                                        dataKey="mobile"
                                        fill="var(--color-mobile)"
                                        stackId="a"
                                        cornerRadius={5}
                                        className="stroke-transparent stroke-2"
                                    />
                                </RadialBarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Pie Chart - Donut with Text</CardTitle>
                            <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer config={chartConfigBrowser} className="mx-auto aspect-square max-h-[250px]">
                                <PieChart>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                    <Pie data={chartDataBrowser} dataKey="visitors" nameKey="browser" innerRadius={60} strokeWidth={5}>
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                                    return (
                                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                            <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                                                {totalVisitors1.toLocaleString()}
                                                            </tspan>
                                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                                                Visitors
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </Pie>
                                </PieChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center gap-2 leading-none font-medium">
                                Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="text-muted-foreground leading-none">Showing total visitors for the last 6 months</div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Dashboard;
