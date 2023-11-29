import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';




const Chart = ({ commentCount, usersCount, postsCount }) => {

    
    const data = [
        { name: 'Comments', value: commentCount },
        { name: 'Users', value: usersCount },
        { name: 'Posts', value: postsCount },
      ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };



    return (
   
<div>
    
    
    
        <PieChart width={400} height={400}>
        <Legend></Legend>
            <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
            >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            
        </PieChart>
</div>
    );
};

export default Chart;