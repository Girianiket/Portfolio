import { useState, useMemo } from 'react';
import { Database, Play, BarChart2, Filter, Users, DollarSign, Activity, ShoppingCart, TrendingUp, HelpCircle, Layers, RefreshCw } from 'lucide-react';

// ==========================================
// 1. WALMART DATASET & PLAYGROUND
// ==========================================
interface SQLData {
  category: string;
  sales: number;
  orders: number;
  avgMargin: string;
}

const walmartRawData: SQLData[] = [
  { category: 'Electronics', sales: 482000, orders: 1240, avgMargin: '18.4%' },
  { category: 'Groceries', sales: 654000, orders: 3410, avgMargin: '12.1%' },
  { category: 'Home & Kitchen', sales: 320000, orders: 850, avgMargin: '22.5%' },
  { category: 'Apparel', sales: 245000, orders: 980, avgMargin: '35.0%' },
  { category: 'Automotive', sales: 112000, orders: 420, avgMargin: '14.8%' },
];

const sqlPresets = [
  {
    id: 'q1',
    label: 'Category Revenue Summary',
    query: `SELECT \n  Category, \n  SUM(Sales) AS Total_Sales, \n  COUNT(Order_ID) AS Total_Orders\nFROM walmart_sales\nGROUP BY Category\nORDER BY Total_Sales DESC;`,
    explanation: 'Ranks product categories by total sales volume to identify high-revenue lines.'
  },
  {
    id: 'q2',
    label: 'High-Margin Categories Only',
    query: `SELECT \n  Category, \n  Avg_Profit_Margin\nFROM walmart_sales\nWHERE Avg_Profit_Margin >= '20.0%'\nORDER BY Avg_Profit_Margin DESC;`,
    explanation: 'Filters categories with at least 20% margin to guide inventory prioritization.'
  },
  {
    id: 'q3',
    label: 'Efficiency Ratio (Sales Per Order)',
    query: `SELECT \n  Category, \n  ROUND(SUM(Sales) / COUNT(Order_ID), 2) AS Sales_Per_Order\nFROM walmart_sales\nGROUP BY Category\nORDER BY Sales_Per_Order DESC;`,
    explanation: 'Calculates average spend per order across categories to understand transaction density.'
  }
];

export function WalmartPlayground({ isDark = false }: { isDark?: boolean }) {
  const [selectedPreset, setSelectedPreset] = useState('q1');
  const [customSQL, setCustomSQL] = useState(sqlPresets[0].query);
  const [isRunning, setIsRunning] = useState(false);
  const [queryOutput, setQueryOutput] = useState<SQLData[]>(walmartRawData);
  const [columns, setColumns] = useState<string[]>(['Category', 'Total_Sales', 'Total_Orders', 'Avg_Margin']);

  const handleSelectPreset = (id: string) => {
    const preset = sqlPresets.find(q => q.id === id);
    if (preset) {
      setSelectedPreset(id);
      setCustomSQL(preset.query);
      runQuery(id);
    }
  };

  const runQuery = (queryId: string) => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      if (queryId === 'q1') {
        setQueryOutput(walmartRawData);
        setColumns(['Category', 'Total_Sales', 'Total_Orders', 'Avg_Margin']);
      } else if (queryId === 'q2') {
        const filtered = walmartRawData.filter(d => parseFloat(d.avgMargin) >= 20);
        setQueryOutput(filtered);
        setColumns(['Category', 'Avg_Margin']);
      } else {
        // q3: sales per order
        setQueryOutput(walmartRawData);
        setColumns(['Category', 'Sales_Per_Order (avg)']);
      }
    }, 450);
  };

  const maxVal = useMemo(() => {
    return Math.max(...walmartRawData.map(d => d.sales));
  }, []);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
      {/* SQL Query Editor Column */}
      <div className="lg:col-span-5 flex flex-col space-y-4">
        <div className={`rounded-xl border p-4 flex flex-col space-y-3 ${
          isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
        }`}>
          <div className={`flex items-center space-x-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
            <Database className="w-4 h-4 text-[#06B6D4]" />
            <span className="font-mono text-sm font-semibold">Active: SSMS_Walmart_DB</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {sqlPresets.map(preset => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset.id)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs text-left transition-all duration-200 border ${
                  selectedPreset === preset.id
                    ? 'bg-[#06B6D4]/10 text-[#06B6D4] border-[#06B6D4]/40 shadow-md'
                    : isDark
                      ? 'bg-slate-900/60 text-slate-400 border-slate-800/80 hover:bg-slate-800 hover:text-slate-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div className={`relative font-mono text-xs p-4 rounded-lg border min-h-[140px] text-[#06B6D4] leading-relaxed overflow-x-auto whitespace-pre ${
            isDark ? 'bg-[#030712] border-slate-900' : 'bg-white border-slate-200 shadow-inner'
          }`}>
            {customSQL}
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-slate-500 italic max-w-[70%]">
              {sqlPresets.find(q => q.id === selectedPreset)?.explanation}
            </p>
            <button
              onClick={() => runQuery(selectedPreset)}
              disabled={isRunning}
              className="flex items-center space-x-1.5 px-4 py-2 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] hover:brightness-110 text-white rounded-lg text-xs font-semibold shadow-lg shadow-[#06B6D4]/20 active:scale-95 transition-all disabled:opacity-50 cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{isRunning ? 'Executing...' : 'Run Query'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Output Dashboard Results Column */}
      <div className="lg:col-span-7 flex flex-col space-y-4">
        {isRunning ? (
          <div className={`rounded-xl border p-8 flex flex-col items-center justify-center min-h-[300px] font-mono text-sm ${
            isDark ? 'bg-[#0b0f19]/80 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
          }`}>
            <RefreshCw className="w-8 h-8 text-[#06B6D4] animate-spin mb-3" />
            <span>Scanning indexes & materializing view...</span>
          </div>
        ) : (
          <div className={`rounded-xl border p-4 flex flex-col space-y-4 min-h-[300px] ${
            isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${
              isDark ? 'border-slate-800/60' : 'border-slate-200'
            }`}>
              <span className={`font-mono text-xs uppercase tracking-wider font-semibold flex items-center space-x-1.5 ${
                isDark ? 'text-slate-400' : 'text-slate-700'
              }`}>
                <BarChart2 className="w-4 h-4 text-[#06B6D4]" />
                <span>Result Grid (Limit 5 Rows)</span>
              </span>
              <span className="text-[10px] font-mono bg-[#06B6D4]/10 text-[#06B6D4] px-2 py-0.5 rounded-full border border-[#06B6D4]/20">
                0.004s execution
              </span>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className={`border-b ${isDark ? 'text-slate-500 border-slate-900' : 'text-slate-500 border-slate-200'}`}>
                    <th className="py-2 px-1">Category</th>
                    {columns.includes('Total_Sales') && <th className="py-2 text-right">Total Sales</th>}
                    {columns.includes('Total_Orders') && <th className="py-2 text-right">Total Orders</th>}
                    {columns.includes('Avg_Margin') && <th className="py-2 text-right">Avg Profit Margin</th>}
                    {columns.includes('Sales_Per_Order (avg)') && <th className="py-2 text-right">Sales / Order</th>}
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDark ? 'divide-slate-900' : 'divide-slate-200'}`}>
                  {queryOutput.map((row, idx) => (
                    <tr key={idx} className={`transition ${
                      isDark ? 'text-slate-300 hover:bg-slate-800/20' : 'text-slate-700 hover:bg-slate-200/40'
                    }`}>
                      <td className={`py-2 px-1 font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{row.category}</td>
                      {columns.includes('Total_Sales') && (
                        <td className="py-2 text-right text-[#06B6D4] font-bold">${row.sales.toLocaleString()}</td>
                      )}
                      {columns.includes('Total_Orders') && (
                        <td className="py-2 text-right text-slate-400">{row.orders}</td>
                      )}
                      {columns.includes('Avg_Margin') && (
                        <td className="py-2 text-right text-[#06B6D4]">{row.avgMargin}</td>
                      )}
                      {columns.includes('Sales_Per_Order (avg)') && (
                        <td className="py-2 text-right text-[#8B5CF6]">
                          ${(row.sales / row.orders).toFixed(2)}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Micro visualizer bar chart */}
            {columns.includes('Total_Sales') && (
              <div className={`flex flex-col space-y-2 mt-2 p-3 rounded-lg border ${
                isDark ? 'bg-[#050811] border-slate-900' : 'bg-white border-slate-200 shadow-sm'
              }`}>
                <span className="text-[10px] font-mono text-slate-500 font-semibold uppercase tracking-wide">
                  Visual Distribution (Total Sales)
                </span>
                <div className="space-y-2.5">
                  {queryOutput.map((row, idx) => {
                    const widthPct = (row.sales / maxVal) * 100;
                    return (
                      <div key={idx} className="flex items-center text-[10px] font-mono">
                        <span className="w-24 text-slate-400 truncate">{row.category}</span>
                        <div className={`flex-1 h-2 rounded-full mx-2 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-200'}`}>
                          <div 
                            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full"
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                        <span className={`w-16 text-right font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          ${(row.sales / 1000).toFixed(0)}k
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// ==========================================
// 2. HR ANALYTICS DASHBOARD
// ==========================================
interface Employee {
  dept: string;
  gender: string;
  mode: string;
  attrition: boolean;
  salary: number;
  satisfaction: number;
}

const hrEmployees: Employee[] = [
  { dept: 'Engineering', gender: 'Male', mode: 'Remote', attrition: false, salary: 115000, satisfaction: 4.2 },
  { dept: 'Engineering', gender: 'Female', mode: 'Remote', attrition: false, salary: 120000, satisfaction: 4.5 },
  { dept: 'Engineering', gender: 'Male', mode: 'Hybrid', attrition: true, salary: 98000, satisfaction: 2.8 },
  { dept: 'Engineering', gender: 'Female', mode: 'Onsite', attrition: false, salary: 105000, satisfaction: 3.9 },
  { dept: 'Sales', gender: 'Male', mode: 'Onsite', attrition: true, salary: 72000, satisfaction: 2.1 },
  { dept: 'Sales', gender: 'Female', mode: 'Hybrid', attrition: false, salary: 85000, satisfaction: 4.0 },
  { dept: 'Sales', gender: 'Female', mode: 'Onsite', attrition: true, salary: 68000, satisfaction: 3.0 },
  { dept: 'Sales', gender: 'Male', mode: 'Remote', attrition: false, salary: 90000, satisfaction: 4.1 },
  { dept: 'HR', gender: 'Female', mode: 'Hybrid', attrition: false, salary: 65000, satisfaction: 4.4 },
  { dept: 'HR', gender: 'Male', mode: 'Onsite', attrition: false, salary: 60000, satisfaction: 3.8 },
  { dept: 'Product', gender: 'Male', mode: 'Remote', attrition: false, salary: 125000, satisfaction: 4.7 },
  { dept: 'Product', gender: 'Female', mode: 'Hybrid', attrition: false, salary: 110000, satisfaction: 4.1 },
  { dept: 'Product', gender: 'Female', mode: 'Remote', attrition: true, salary: 100000, satisfaction: 2.5 },
];

export function HRDashboard({ isDark = false }: { isDark?: boolean }) {
  const [deptFilter, setDeptFilter] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');

  const filteredData = useMemo(() => {
    return hrEmployees.filter(emp => {
      const matchDept = deptFilter === 'All' || emp.dept === deptFilter;
      const matchMode = modeFilter === 'All' || emp.mode === modeFilter;
      return matchDept && matchMode;
    });
  }, [deptFilter, modeFilter]);

  // KPIs
  const stats = useMemo(() => {
    const total = filteredData.length;
    if (total === 0) return { total: 0, attrition: '0%', avgSalary: '$0', satisfaction: '0.0' };
    
    const attritionCount = filteredData.filter(e => e.attrition).length;
    const attritionPct = ((attritionCount / total) * 100).toFixed(1) + '%';
    
    const sumSalary = filteredData.reduce((sum, e) => sum + e.salary, 0);
    const avgSal = '$' + Math.round(sumSalary / total).toLocaleString();

    const sumSat = filteredData.reduce((sum, e) => sum + e.satisfaction, 0);
    const avgSat = (sumSat / total).toFixed(1);

    return { total, attrition: attritionPct, avgSalary: avgSal, satisfaction: avgSat };
  }, [filteredData]);

  return (
    <div className="w-full flex flex-col space-y-4 text-left">
      {/* Filters Toolbar */}
      <div className={`flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border ${
        isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5 text-[#06B6D4]" />
            <span>Department:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['All', 'Engineering', 'Sales', 'HR', 'Product'].map(dept => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  deptFilter === dept
                    ? 'bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/30 shadow-sm'
                    : isDark
                      ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-1.5 text-xs text-slate-400">
            <Layers className="w-3.5 h-3.5 text-[#3B82F6]" />
            <span>Work Mode:</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {['All', 'Remote', 'Hybrid', 'Onsite'].map(mode => (
              <button
                key={mode}
                onClick={() => setModeFilter(mode)}
                className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                  modeFilter === mode
                    ? 'bg-[#3B82F6]/10 text-[#3B82F6] border border-[#3B82F6]/30 shadow-sm'
                    : isDark
                      ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className={`p-3.5 rounded-xl flex items-center space-x-3.5 border ${
          isDark ? 'bg-[#050811] border-slate-900/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-2 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4]">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Headcount</p>
            <p className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.total}</p>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl flex items-center space-x-3.5 border ${
          isDark ? 'bg-[#050811] border-slate-900/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-2 rounded-lg bg-rose-500/10 text-rose-400">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Attrition Rate</p>
            <p className="text-xl font-bold text-rose-400 font-display">{stats.attrition}</p>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl flex items-center space-x-3.5 border ${
          isDark ? 'bg-[#050811] border-slate-900/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-2 rounded-lg bg-[#3B82F6]/10 text-[#3B82F6]">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Avg Salary</p>
            <p className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>{stats.avgSalary}</p>
          </div>
        </div>

        <div className={`p-3.5 rounded-xl flex items-center space-x-3.5 border ${
          isDark ? 'bg-[#050811] border-slate-900/80' : 'bg-white border-slate-200 shadow-sm'
        }`}>
          <div className="p-2 rounded-lg bg-[#06B6D4]/10 text-[#06B6D4]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase font-mono text-slate-500 tracking-wider">Satisfaction</p>
            <p className={`text-xl font-bold font-display ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {stats.satisfaction} <span className="text-xs text-slate-500">/5</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid of details & visualizations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Attrition Risk List */}
        <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
          <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-3">
            Personnel Overview ({filteredData.length} records)
          </span>
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
            {filteredData.map((emp, i) => (
              <div key={i} className={`flex items-center justify-between p-2 rounded border text-xs font-mono ${
                isDark ? 'bg-[#050811] border-slate-900 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${emp.attrition ? 'bg-rose-500 animate-pulse' : 'bg-[#06B6D4]'}`} />
                  <span className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{emp.dept}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-slate-400">{emp.mode}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-[#06B6D4] font-bold">${emp.salary.toLocaleString()}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                    emp.attrition 
                      ? 'bg-rose-500/10 text-rose-400' 
                      : isDark ? 'bg-slate-900 text-slate-500' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {emp.attrition ? 'Attrition' : 'Active'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Salary & Satisfaction Gauge */}
        <div className={`p-4 rounded-xl border flex flex-col justify-between ${
          isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
        }`}>
          <div>
            <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-3">
              Satisfaction Analytics By Department
            </span>
            <div className="space-y-3 font-mono text-[11px]">
              {['Engineering', 'Sales', 'HR', 'Product'].map(dept => {
                const deptEmps = hrEmployees.filter(e => e.dept === dept);
                const avgSat = deptEmps.reduce((sum, e) => sum + e.satisfaction, 0) / deptEmps.length;
                const widthPct = (avgSat / 5) * 100;
                return (
                  <div key={dept} className="flex items-center">
                    <span className="w-20 text-slate-400">{dept}</span>
                    <div className={`flex-1 h-2 rounded mx-2 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-200'}`}>
                      <div 
                        className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded"
                        style={{ width: `${widthPct}%` }}
                      />
                    </div>
                    <span className={`w-8 text-right font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>{avgSat.toFixed(1)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// ==========================================
// 3. BLINKIT SALES DASHBOARD
// ==========================================
interface GrocerySales {
  itemType: string;
  outletSize: string;
  sales: number;
  orders: number;
}

const blinkitData: GrocerySales[] = [
  { itemType: 'Fruits & Veg', outletSize: 'High', sales: 242000, orders: 1540 },
  { itemType: 'Fruits & Veg', outletSize: 'Medium', sales: 198000, orders: 1200 },
  { itemType: 'Fruits & Veg', outletSize: 'Small', sales: 112000, orders: 840 },
  { itemType: 'Dairy', outletSize: 'High', sales: 185000, orders: 980 },
  { itemType: 'Dairy', outletSize: 'Medium', sales: 164000, orders: 910 },
  { itemType: 'Dairy', outletSize: 'Small', sales: 95000, orders: 620 },
  { itemType: 'Frozen', outletSize: 'High', sales: 125000, orders: 890 },
  { itemType: 'Frozen', outletSize: 'Medium', sales: 118000, orders: 740 },
  { itemType: 'Beverages', outletSize: 'High', sales: 210000, orders: 1420 },
  { itemType: 'Beverages', outletSize: 'Small', sales: 145000, orders: 1050 },
  { itemType: 'Snack Foods', outletSize: 'Medium', sales: 232000, orders: 1650 },
  { itemType: 'Snack Foods', outletSize: 'Small', sales: 154000, orders: 1110 }
];

export function BlinkitDashboard({ isDark = false }: { isDark?: boolean }) {
  const [sizeFilter, setSizeFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredData = useMemo(() => {
    return blinkitData.filter(item => {
      const matchSize = sizeFilter === 'All' || item.outletSize === sizeFilter;
      const matchType = typeFilter === 'All' || item.itemType === typeFilter;
      return matchSize && matchType;
    });
  }, [sizeFilter, typeFilter]);

  const kpis = useMemo(() => {
    const revenue = filteredData.reduce((sum, item) => sum + item.sales, 0);
    const orders = filteredData.reduce((sum, item) => sum + item.orders, 0);
    const avgOrderValue = orders > 0 ? (revenue / orders).toFixed(2) : '0.00';
    return { revenue, orders, avgOrderValue };
  }, [filteredData]);

  const topItems = useMemo(() => {
    // Group by itemType
    const groups: { [key: string]: number } = {};
    filteredData.forEach(d => {
      groups[d.itemType] = (groups[d.itemType] || 0) + d.sales;
    });
    return Object.keys(groups).map(key => ({
      name: key,
      val: groups[key]
    })).sort((a, b) => b.val - a.val);
  }, [filteredData]);

  return (
    <div className="w-full flex flex-col space-y-4 text-left">
      {/* Slicers Dashboard panel */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left filter rail */}
        <div className={`p-3.5 rounded-xl border flex flex-col space-y-3.5 ${
          isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
        }`}>
          <div className={`flex items-center space-x-1.5 border-b pb-2 ${
            isDark ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            <Filter className="w-4 h-4 text-[#06B6D4]" />
            <span className={`font-display font-semibold text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Slicers Panel</span>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">Outlet Capacity</span>
            <div className="grid grid-cols-2 gap-1 font-mono text-[10px]">
              {['All', 'High', 'Medium', 'Small'].map(size => (
                <button
                  key={size}
                  onClick={() => setSizeFilter(size)}
                  className={`py-1 rounded text-center font-medium transition cursor-pointer ${
                    sizeFilter === size
                      ? 'bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20'
                      : isDark
                        ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[10px] font-mono text-slate-500 uppercase block font-semibold">Item Group</span>
            <div className="grid grid-cols-1 gap-1 font-mono text-[10px]">
              {['All', 'Fruits & Veg', 'Dairy', 'Frozen', 'Beverages', 'Snack Foods'].map(type => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`py-1 px-2.5 rounded text-left font-medium transition cursor-pointer ${
                    typeFilter === type
                      ? 'bg-[#06B6D4]/10 text-[#06B6D4] border border-[#06B6D4]/20'
                      : isDark
                        ? 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200'
                        : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right dashboard content */}
        <div className="md:col-span-8 flex flex-col space-y-4">
          {/* Top Key Metrics */}
          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-[#050811] border-slate-900' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Total Revenue</span>
              <span className="text-base font-bold text-[#06B6D4] font-display">${kpis.revenue.toLocaleString()}</span>
            </div>
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-[#050811] border-slate-900' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">Gross Orders</span>
              <span className={`text-base font-bold font-display ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>
                {kpis.orders.toLocaleString()}
              </span>
            </div>
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-[#050811] border-slate-900' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider block">AOV (Ticket)</span>
              <span className="text-base font-bold text-[#3B82F6] font-display">${kpis.avgOrderValue}</span>
            </div>
          </div>

          {/* SVG Sparkline and Sales breakdown */}
          <div className={`p-4 rounded-xl border flex-1 flex flex-col justify-between min-h-[160px] ${
            isDark ? 'bg-[#0b0f19] border-slate-800' : 'bg-slate-50 border-slate-200 shadow-sm'
          }`}>
            <div>
              <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase tracking-wider block mb-2.5 flex items-center space-x-1.5">
                <TrendingUp className="w-4 h-4 text-[#06B6D4]" />
                <span>Product Group Revenue Distribution</span>
              </span>

              {topItems.length === 0 ? (
                <div className="text-xs text-slate-500 font-mono text-center py-4">No data matches your criteria.</div>
              ) : (
                <div className="space-y-2.5 mt-2 font-mono text-[11px]">
                  {topItems.map((item, idx) => {
                    const totalVal = topItems.reduce((acc, current) => acc + current.val, 0);
                    const widthPct = (item.val / totalVal) * 100;
                    return (
                      <div key={idx} className="flex items-center">
                        <span className="w-24 text-slate-400 truncate">{item.name}</span>
                        <div className={`flex-1 h-1.5 rounded mx-2 relative overflow-hidden ${isDark ? 'bg-slate-900' : 'bg-slate-200'}`}>
                          <div 
                            className="h-full bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded"
                            style={{ width: `${widthPct}%` }}
                          />
                        </div>
                        <span className={`w-16 text-right font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                          ${item.val.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
