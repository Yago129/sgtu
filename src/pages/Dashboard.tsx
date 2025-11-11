import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckSquare, BookOpen, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Dashboard = () => {
  const stats = [
    { title: "Tarefas Pendentes", value: "12", icon: CheckSquare, color: "text-primary" },
    { title: "Disciplinas Ativas", value: "6", icon: BookOpen, color: "text-secondary" },
    { title: "Prazo Mais Próximo", value: "2 dias", icon: Clock, color: "text-warning" },
  ];

  const productivityData = [
    { day: "Seg", tasks: 4 },
    { day: "Ter", tasks: 6 },
    { day: "Qua", tasks: 3 },
    { day: "Qui", tasks: 8 },
    { day: "Sex", tasks: 5 },
    { day: "Sáb", tasks: 2 },
    { day: "Dom", tasks: 1 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral das suas atividades acadêmicas</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Produtividade Semanal</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={productivityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
