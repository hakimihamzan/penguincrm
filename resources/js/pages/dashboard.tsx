import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Layout from '@/layouts/app/app-layout';
import { Head, usePoll } from '@inertiajs/react';
import { Building2, DollarSign, TrendingUp, User as UserIcon, Users2 } from 'lucide-react';
import { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Label, Pie, PieChart, PolarRadiusAxis, RadialBar, RadialBarChart, XAxis, YAxis } from 'recharts';

const organizationCreatedConfig = {
    desktop: {
        label: 'Desktop',
        color: 'hsl(var(--chart-1))',
    },
} satisfies ChartConfig;

const organizationSizeConfig = {
    value: {
        label: 'Organizations',
    },
    micro: { label: '1-10 employees' },
    small: { label: '11-50 employees' },
    medium: { label: '51-250 employees' },
    large: { label: '251-1000 employees' },
    enterprise: { label: '1000+ employees' },
} satisfies ChartConfig;

const userActivityConfig = {
    active: {
        label: 'Active Users',
    },
    inactive: {
        label: 'Inactive Users',
    },
} satisfies ChartConfig;

const paymentStatusConfig = {
    count: {
        label: 'Payments',
    },
    success: {
        label: 'Successful',
        color: 'hsl(142, 76%, 36%)', // green-600
    },
    pending: {
        label: 'Pending',
        color: 'hsl(43, 96%, 50%)', // amber-500
    },
    failed: {
        label: 'Failed',
        color: 'hsl(0, 84%, 60%)', // red-500
    },
} satisfies ChartConfig;

type DashboardProps = {
    contact_count: string;
    organization_count: string;
    user_count: string;
    total_payment: string;
    organization_created_info: Array<{
        month: string;
        desktop: number;
    }>;
    organizations_by_size: Array<{
        category: string;
        value: number;
    }>;
    user_activity: Array<{
        active: number;
        inactive: number;
    }>;
    payment_status_data: Array<{
        status: string;
        count: number;
        fill: string;
    }>;
};

function Dashboard({
    contact_count,
    organization_count,
    user_count,
    total_payment,
    organization_created_info,
    organizations_by_size,
    user_activity,
    payment_status_data,
}: DashboardProps) {
    const totalPayments = useMemo(() => {
        return payment_status_data.reduce((acc, curr) => acc + curr.count, 0);
    }, [payment_status_data]);

    const totalUsers = user_activity[0].active + user_activity[0].inactive;

    usePoll(10000);

    return (
        <>
            <Head title="Dashboard" />
            <div className="w-full overflow-x-auto px-4 py-10 md:px-8 lg:px-16">
                <div className="mb-12">
                    <h1 className="text-lg font-bold">Dashboard</h1>
                    <p>You can see all your data analytics here.</p>
                    <p className="text-muted-foreground mt-2">Implementing usePolling() every 10s with InertiaJs</p>
                </div>
                <div className="mb-5 grid grid-cols-2 gap-4 md:grid-cols-4">
                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-muted-foreground text-sm font-medium">Contacts</CardTitle>
                                <div className="bg-primary/10 rounded-full p-1">
                                    <Users2 className="text-primary h-4 w-4" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold">{contact_count}</div>
                                <div className="mt-1 flex items-center text-xs">
                                    <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                                        <TrendingUp className="h-3 w-3" />
                                        <span>12% this month</span>
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-muted-foreground text-sm font-medium">Organizations</CardTitle>
                                <div className="rounded-full bg-indigo-100 p-1">
                                    <Building2 className="h-4 w-4 text-indigo-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold">{organization_count}</div>
                                <div className="mt-1 flex items-center text-xs">
                                    <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                                        <TrendingUp className="h-3 w-3" />
                                        <span>5% this month</span>
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-muted-foreground text-sm font-medium">Users</CardTitle>
                                <div className="rounded-full bg-amber-100 p-1">
                                    <UserIcon className="h-4 w-4 text-amber-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold">{user_count}</div>
                                <div className="mt-1 flex items-center text-xs">
                                    <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                                        <TrendingUp className="h-3 w-3" />
                                        <span>8% this month</span>
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-muted-foreground text-sm font-medium">Payments</CardTitle>
                                <div className="rounded-full bg-emerald-100 p-1">
                                    <DollarSign className="h-4 w-4 text-emerald-600" />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col">
                                <div className="text-2xl font-bold">${total_payment}</div>
                                <div className="mt-1 flex items-center text-xs">
                                    <Badge variant="outline" className="gap-1 border-emerald-200 bg-emerald-50 text-emerald-700">
                                        <TrendingUp className="h-3 w-3" />
                                        <span>15% this month</span>
                                    </Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <Card className="">
                        <CardHeader>
                            <CardTitle>Organization</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={organizationCreatedConfig}>
                                <BarChart accessibilityLayer data={organization_created_info}>
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
                            <div className="text-muted-foreground leading-none">Showing organization created for the last 6 months</div>
                        </CardFooter>
                    </Card>

                    <Card className="">
                        <CardHeader>
                            <CardTitle>Organizations by Size</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={organizationSizeConfig}>
                                <BarChart
                                    accessibilityLayer
                                    data={organizations_by_size}
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                        right: 16,
                                        top: 16,
                                        bottom: 0,
                                    }}
                                    barCategoryGap={8}
                                >
                                    <YAxis
                                        dataKey="category"
                                        type="category"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        width={120}
                                        tickFormatter={(value) => organizationSizeConfig[value as keyof typeof organizationSizeConfig]?.label}
                                    />
                                    <XAxis dataKey="value" type="number" hide />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent
                                                formatter={(value) => `${value} organizations`}
                                                labelFormatter={(value) =>
                                                    organizationSizeConfig[value as keyof typeof organizationSizeConfig]?.label
                                                }
                                            />
                                        }
                                    />
                                    <Bar dataKey="value" layout="vertical" radius={5} fill="#3366FF" animationDuration={750} />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 leading-none font-medium">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <span>Small businesses growing 7.2% this quarter</span>
                            </div>
                            <div className="text-muted-foreground leading-none">Based on {organization_count} total organizations</div>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>User Activity Status</CardTitle>
                            <CardDescription>Active vs. Inactive Users</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 items-center pb-0">
                            <ChartContainer config={userActivityConfig} className="mx-auto aspect-square w-full max-w-[250px]">
                                <RadialBarChart data={user_activity} endAngle={180} innerRadius={80} outerRadius={130}>
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
                                                                {totalUsers.toLocaleString()}
                                                            </tspan>
                                                            <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 4} className="fill-muted-foreground">
                                                                Total Users
                                                            </tspan>
                                                        </text>
                                                    );
                                                }
                                            }}
                                        />
                                    </PolarRadiusAxis>
                                    <RadialBar dataKey="active" stackId="a" cornerRadius={5} fill="green" className="stroke-transparent stroke-2" />
                                    <RadialBar
                                        dataKey="inactive"
                                        stackId="a"
                                        cornerRadius={5}
                                        fill="red"
                                        className="stroke-transparent stroke-2 opacity-50"
                                    />
                                </RadialBarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 text-sm">
                            <div className="flex items-center justify-center gap-2 leading-none font-medium">
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <span className="text-emerald-600">
                                    {Math.round((user_activity[0].active / totalUsers) * 100)}% of users active in the last 30 days
                                </span>
                            </div>
                            <div className="mt-2 flex w-full justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-green-700" />
                                    <span className="text-muted-foreground text-xs">Active: {user_activity[0].active.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="h-3 w-3 rounded-full bg-red-700 opacity-50" />
                                    <span className="text-muted-foreground text-xs">Inactive: {user_activity[0].inactive.toLocaleString()}</span>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>

                    <Card className="flex flex-col">
                        <CardHeader className="items-center pb-0">
                            <CardTitle>Payment Status Distribution</CardTitle>
                            <CardDescription>Overview of payment processing status</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 pb-0">
                            <ChartContainer config={paymentStatusConfig} className="mx-auto aspect-square max-h-[250px]">
                                <PieChart>
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent
                                                formatter={(value) => `${value} payments`}
                                                labelFormatter={(value) => paymentStatusConfig[value as keyof typeof paymentStatusConfig]?.label}
                                            />
                                        }
                                    />
                                    <Pie
                                        data={payment_status_data}
                                        dataKey="count"
                                        nameKey="status"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={2}
                                        strokeWidth={3}
                                        stroke="#ffffff"
                                    >
                                        <Label
                                            content={({ viewBox }) => {
                                                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                                    return (
                                                        <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) - 12}
                                                                className="fill-foreground text-3xl font-bold"
                                                            >
                                                                {totalPayments.toLocaleString()}
                                                            </tspan>
                                                            <tspan
                                                                x={viewBox.cx}
                                                                y={(viewBox.cy || 0) + 14}
                                                                className="fill-muted-foreground text-sm"
                                                            >
                                                                Total Payments
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
                                <TrendingUp className="h-4 w-4 text-emerald-500" />
                                <span>Success rate improved by 3.2% this month</span>
                            </div>
                            <div className="mt-2 flex w-full justify-between">
                                {payment_status_data.map((item) => (
                                    <div key={item.status} className="flex items-center gap-2">
                                        <div className="h-3 w-3 rounded-full" style={{ backgroundColor: item.fill }} />
                                        <span className="text-muted-foreground text-xs capitalize">
                                            {item.status}: {Math.round((item.count / totalPayments) * 100)}% ({item.count})
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = (page: React.ReactNode) => <Layout children={page} />;

export default Dashboard;
