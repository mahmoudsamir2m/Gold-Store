"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// ================= Dummy Data =================
const activeOrders = [
  { id: "ORD-101", total: "25,000 EGP", status: "قيد التنفيذ" },
  { id: "ORD-102", total: "12,500 EGP", status: "قيد الشحن" },
];

const completedOrders = [
  { id: "ORD-090", total: "18,000 EGP", status: "تم التنفيذ" },
];

const sellingItems = [
  { id: 1, name: "سبيكة ذهب 10 جرام", price: "35,000 EGP", status: "معروض" },
  { id: 2, name: "جنيه ذهب", price: "27,000 EGP", status: "تم البيع" },
];

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Mahmoud Samir",
    email: "mahmoud@email.com",
    phone: "01000000000",
  });

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      {/* ===== Profile Info ===== */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>البيانات الشخصية</CardTitle>
          <Button
            className="border-yellow-500 text-yellow-600 hover:bg-yellow-600 hover:text-white"
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "حفظ" : "تعديل"}
          </Button>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>الاسم</Label>
            <Input
              disabled={!isEditing}
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>البريد الإلكتروني</Label>
            <Input disabled value={profile.email} />
          </div>
          <div className="space-y-2">
            <Label>رقم الهاتف</Label>
            <Input
              disabled={!isEditing}
              value={profile.phone}
              onChange={(e) =>
                setProfile({ ...profile, phone: e.target.value })
              }
            />
          </div>
        </CardContent>
      </Card>

      {/* ===== Tabs Section ===== */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid grid-cols-3 w-full bg-yellow-500/10">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white hover:bg-yellow-600 hover:text-white"
          >
            طلبات قيد التنفيذ
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white hover:bg-yellow-600 hover:text-white"
          >
            طلبات منفذة
          </TabsTrigger>
          <TabsTrigger
            value="selling"
            className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white hover:bg-yellow-600 hover:text-white"
          >
            المعروض للبيع
          </TabsTrigger>
        </TabsList>

        {/* Active Orders */}
        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات الحالية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.total}
                    </p>
                  </div>
                  <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                    {order.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Orders */}
        <TabsContent value="completed">
          <Card>
            <CardHeader>
              <CardTitle>الطلبات المنفذة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {completedOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{order.id}</p>
                    <p className="text-sm text-muted-foreground">
                      {order.total}
                    </p>
                  </div>
                  <Badge className="bg-yellow-500 text-white hover:bg-yellow-600">
                    {order.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Selling Items */}
        <TabsContent value="selling">
          <Card>
            <CardHeader>
              <CardTitle>المنتجات المعروضة للبيع</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sellingItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.price}
                    </p>
                  </div>
                  <Badge className="border-yellow-500 text-yellow-600 hover:bg-yellow-600 hover:text-white">
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
