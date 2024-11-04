"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ThemeSwitch } from "@/components/theme_switch"

export default function CalcSpend() {
  const [salario, setSalario] = useState(0)
  const [gastosFixos, setGastosFixos] = useState(0)
  const [gastosExtras, setGastosExtras] = useState(0)
  const [gastosSazonais, setGastosSazonais] = useState(0)

  const totalGastos = gastosFixos + gastosExtras + gastosSazonais
  const sobras = Math.max(0, salario - totalGastos)
  const porcentagemGastos = salario > 0 ? (totalGastos / salario) * 100 : 0
  const porcentagemSobras = salario > 0 ? (sobras / salario) * 100 : 0

  const dadosGrafico = [
    { name: "Fixos", value: gastosFixos },
    { name: "Extras", value: gastosExtras },
    { name: "Sazonais", value: gastosSazonais },
  ]

  const dadosComparacao = [
    { name: "Salário", value: salario },
    { name: "Total de Gastos", value: totalGastos },
    { name: "Sobras", value: sobras },
  ]

  const CORES = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <Card className="w-full max-w-7xl mx-auto pt-8">
      <CardHeader className="flex items-center">
        <CardTitle className="text-3xl">Calculadora de Gastos Mensais</CardTitle>
        <CardDescription>Insira seus dados financeiros para calcular seus gastos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="salario" className="font-bold text-lg">Salário</Label>
              <div className="flex flex-row gap-2">
                <span className="flex items-center">R$</span>
                <Input
                  id="salario"
                  type="number"
                  placeholder="Insira seu salário"
                  onChange={(e) => setSalario(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gastosFixos" className="font-bold text-lg">Gastos Fixos</Label>
              <div className="flex flex-row gap-2">
                <span className="flex items-center">R$</span>
                <Input
                  id="gastosFixos"
                  type="number"
                  placeholder="Insira seus gastos fixos"
                  onChange={(e) => setGastosFixos(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gastosExtras" className="font-bold text-lg">Gastos Extras</Label>
              <div className="flex flex-row gap-2">
                <span className="flex items-center">R$</span>
                <Input
                  id="gastosExtras"
                  type="number"
                  placeholder="Insira seus gastos extras"
                  onChange={(e) => setGastosExtras(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="gastosSazonais" className="font-bold text-lg">Gastos Sazonais</Label>
              <div className="flex flex-row gap-2">
                <span className="flex items-center">R$</span>
                <Input
                  id="gastosSazonais"
                  type="number"
                  placeholder="Insira seus gastos sazonais"
                  onChange={(e) => setGastosSazonais(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-2 mt-8 md:mt-0">Resumo</h3>
              <div className="grid gap-2">
                <div className="flex justify-between border-b-2">
                  <span>Total de Gastos:</span>
                  <span>R$ {totalGastos.toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-b-2">
                  <span>Sobras:</span>
                  <span>R$ {sobras.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div>
              <Label>Porcentagem de Gastos</Label>
              <Progress value={porcentagemGastos} className="mt-2 [&>div]:bg-blue-500" />
              <div className="text-sm text-right mt-1">{porcentagemGastos.toFixed(2)}%</div>
            </div>
            <div>
              <Label>Porcentagem de Sobras</Label>
              <Progress value={porcentagemSobras} className="mt-2 [&>div]:bg-green-500" />
              <div className="text-sm text-right mt-1">{porcentagemSobras.toFixed(2)}%</div>
            </div>
          </div>
        </div>
        <div className="mt-8 grid gap-8 grid-cols-1 lg:grid-cols-2">
          <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Distribuição de Gastos</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <ChartContainer className="h-[300px] w-full" config={{ /* config */ }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dadosGrafico}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {dadosGrafico.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="w-full max-w-xl mx-auto">
            <CardHeader>
              <CardTitle>Salário x Gastos x Sobras</CardTitle>
            </CardHeader>
            <CardContent className="w-full">
              <ChartContainer className="h-[300px] w-full" config={{ /* config */ }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dadosComparacao}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="#8884d8" barSize={50}>
                      {dadosComparacao.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={CORES[index % CORES.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </CardContent>
      <div className="fixed top-4 right-4 p-3 rounded-full shadow-lg bg-gray-700">
        <ThemeSwitch></ThemeSwitch>
      </div>
    </Card>
  )
}