"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  X,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardView = ({ insights }) => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [cache, setCache] = useState({});
  const [loadingSkills, setLoadingSkills] = useState(new Set());

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const fetchSkillInfo = async (skill) => {
    if (cache[skill]) return;

    setLoadingSkills(prev => new Set(prev).add(skill));
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const prompt = `Generate a 200-character expert analysis about ${skill} for tech professionals. Include:
      - Key applications in industry
      - Current demand trends
      - Salary impact
      - Learning curve
      - Related technologies`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setCache(prev => ({
        ...prev,
        [skill]: {
          summary: text,
          details: `Detailed technical overview of ${skill}:\n\n${text}\n\nAverage salary boost: ~15-25%\nLearning resources: Official docs, Udemy courses, GitHub projects`
        }
      }));
    } catch (error) {
      setCache(prev => ({
        ...prev,
        [skill]: {
          summary: "Info currently unavailable",
          details: "Could not fetch details. Please try again later."
        }
      }));
    }
    setLoadingSkills(prev => {
      const newSet = new Set(prev);
      newSet.delete(skill);
      return newSet;
    });
  };

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX + 20, y: e.clientY + 20 });
  };

  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high": return "bg-green-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive": return { icon: TrendingUp, color: "text-green-500" };
      case "neutral": return { icon: LineChart, color: "text-yellow-500" };
      case "negative": return { icon: TrendingDown, color: "text-red-500" };
      default: return { icon: LineChart, color: "text-gray-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;
  const outlookColor = getMarketOutlookInfo(insights.marketOutlook).color;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    { addSuffix: true }
  );

  return (
    <div className="space-y-6" onMouseMove={handleMouseMove}>
      {/* Hover Tooltip */}
      {hoveredSkill && (
        <div
          className="fixed bg-white border border-gray-200 rounded-lg p-3 shadow-xl max-w-[300px] text-sm z-50 transition-opacity duration-200"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
            pointerEvents: 'none'
          }}
        >
          <h4 className="font-semibold text-blue-600 mb-1">{hoveredSkill}</h4>
          {cache[hoveredSkill]?.summary ? (
            <p className="text-gray-600 line-clamp-3">
              {cache[hoveredSkill].summary}
            </p>
          ) : (
            <div className="space-y-2">
              <Skeleton className="h-3 w-[200px]" />
              <Skeleton className="h-3 w-[180px]" />
            </div>
          )}
        </div>
      )}

      {/* Skill Detail Modal */}
      {selectedSkill && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 relative">
            <button 
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            
            <h3 className="text-2xl font-bold text-blue-600 mb-4">
              {selectedSkill} Details
            </h3>
            
            {loadingSkills.has(selectedSkill) ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-[90%]" />
                <Skeleton className="h-4 w-[85%]" />
                <Skeleton className="h-4 w-[80%]" />
              </div>
            ) : (
              <div className="text-gray-700 space-y-4">
                <div className="prose max-w-none">
                  {cache[selectedSkill]?.details.split('\n').map((line, i) => (
                    <p key={i} className="mb-2">{line}</p>
                  ))}
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Highlights</h4>
                  <ul className="list-disc pl-5">
                    <li>Average salary impact: +18-25%</li>
                    <li>Industry demand: High</li>
                    <li>Learning resources: Official docs, Coursera</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <Badge variant="outline">Last updated: {lastUpdatedDate}</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Outlook</CardTitle>
            <OutlookIcon className={`h-4 w-4 ${outlookColor}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{insights.marketOutlook}</div>
            <p className="text-xs text-muted-foreground">
              Next update {nextUpdateDistance}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Industry Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{insights.growthRate.toFixed(1)}%</div>
            <Progress value={insights.growthRate} className="mt-2 bg-blue-50" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Demand Level</CardTitle>
            <BriefcaseIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{insights.demandLevel}</div>
            <div className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(insights.demandLevel)}`} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Skills</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors cursor-pointer px-3 py-1"
                  onMouseEnter={() => {
                    setHoveredSkill(skill);
                    if (!cache[skill]) fetchSkillInfo(skill);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-4">
        <CardHeader>
          <CardTitle>Salary Ranges by Role</CardTitle>
          <CardDescription>Salary data in thousands (USD)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#64748b"
                  tick={{ fill: "#64748b" }}
                />
                <YAxis
                  stroke="#64748b"
                  tick={{ fill: "#64748b" }}
                  tickFormatter={(value) => `$${value}k`}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload?.length) {
                      return (
                        <div className="bg-white border border-blue-100 rounded-lg p-3 shadow-lg">
                          <p className="font-semibold text-slate-700 mb-1">{label}</p>
                          {payload.map((item) => (
                            <p
                              key={item.name}
                              className="text-sm flex items-center gap-2"
                              style={{ color: item.color }}
                            >
                              <span
                                className="inline-block w-2 h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                              />
                              {item.name}: ${item.value}k
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="min"
                  fill="#93c5fd"
                  name="Min Salary"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="median"
                  fill="#3b82f6"
                  name="Median Salary"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="max"
                  fill="#1d4ed8"
                  name="Max Salary"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Industry Trends</CardTitle>
            <CardDescription>Emerging technologies and practices</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-2 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="h-2 w-2 mt-2 rounded-full bg-blue-500 transition-all group-hover:bg-blue-600" />
                  <span className="text-white group-hover:text-gray-900">
                    {trend}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Skills</CardTitle>
            <CardDescription>High-growth competencies to acquire</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 cursor-pointer px-3 py-1"
                  onMouseEnter={() => {
                    setHoveredSkill(skill);
                    if (!cache[skill]) fetchSkillInfo(skill);
                  }}
                  onMouseLeave={() => setHoveredSkill(null)}
                  onClick={() => setSelectedSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;