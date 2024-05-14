import "../styles/Budget.css";
import Sidebar from "./Sidebar";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

const ProgressPie = () => {
    const data = [
        { name: 'Spent', value: 500},
        {name: 'Total', value:3000}
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return(
    <PieChart width={1000} height={180}>
    <Pie
        data={data}
        cx= "50%"
        cy={160}
        startAngle={180}
        endAngle={0}
        innerRadius={130}
        outerRadius={150}
        fill="#8884d8"
        paddingAngle={1}
        dataKey="value"
    >
        {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
    </Pie>
    </PieChart>
    )
};


function progressBar (width){
    const firstBar = document.createElement("div");
    firstBar.className = "progress-bar";
    firstBar.style.width = width;
    const totalBar = document.getElementsByClassName("total-bar");
    totalBar.appendChild(firstBar);
}

const BudgetCategories = () => {
    return(
        <div className="budget-summary">
            <h1> Budget by Category</h1>
            <div className="categories">
                <div className="budget-category">
                    <p>groceries</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            hi
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>groceries</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            hi
                        </div>
                    </div><p>groceries</p>
                </div>
                <div className="budget-category">
                    <p>groceries</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            hi
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>groceries</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            hi
                        </div>
                    </div>
                </div>
                <div className="budget-category">
                    <p>groceries</p>
                    <div className = "total-bar">
                        <div className = "progress-bar">
                            hi
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

const Budget = () =>{
    return (
        <div className = "budget-page">
            <Sidebar />
            <div className = "budget-body">
                <div className="progress-tracker">
                <h1 className = "goals"> Goal: Spend Less than 1k </h1>
                    <ResponsiveContainer>
                        <ProgressPie />
                    </ResponsiveContainer>
                </div>
                <BudgetCategories />
            </div>
        </div>
    );
};

export {ProgressPie, BudgetCategories};
export default Budget;
