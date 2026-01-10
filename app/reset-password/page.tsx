"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft, AiOutlineLock } from "react-icons/ai";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "كلمة المرور يجب أن تكون على الأقل 8 أحرف"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمات المرور غير متطابقة",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const { resetPasswordWithOTP, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("resetEmail");
    const storedOtp = localStorage.getItem("resetOtp");
    if (!storedEmail || !storedOtp) {
      router.push("/forgot-password");
      return;
    }
    setEmail(storedEmail);
    setOtp(storedOtp);
  }, [router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await resetPasswordWithOTP(email, otp, data.password);
      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      localStorage.removeItem("resetEmail");
      localStorage.removeItem("resetOtp");
      router.push("/login");
    } catch (error) {
      toast.error("حدث خطأ أثناء إعادة تعيين كلمة المرور. حاول مرة أخرى.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/verify-otp"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <AiOutlineArrowLeft className="w-5 h-5" />
            <span className="font-medium">العودة</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <AiOutlineLock className="w-8 h-8 text-amber-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إعادة تعيين كلمة المرور
          </h1>
          <p className="text-gray-600">أدخل كلمة المرور الجديدة</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="password" className="text-gray-700 font-medium">
              كلمة المرور الجديدة
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="أدخل كلمة المرور الجديدة"
              className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 ${
                errors.password ? "border-red-500" : ""
              }`}
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="confirmPassword"
              className="text-gray-700 font-medium"
            >
              تأكيد كلمة المرور
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="أعد إدخال كلمة المرور"
              className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 ${
                errors.confirmPassword ? "border-red-500" : ""
              }`}
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? "جاري إعادة التعيين..." : "إعادة تعيين كلمة المرور"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          <Link
            href="/login"
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            العودة لتسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}
