"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft, AiOutlineMail } from "react-icons/ai";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "رمز التحقق يجب أن يكون 6 أرقام")
    .max(6, "رمز التحقق يجب أن يكون 6 أرقام"),
});

type OTPFormData = z.infer<typeof otpSchema>;

export default function VerifyOTPPage() {
  const router = useRouter();
  const { verifyOTP, isLoading } = useAuth();
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("resetEmail") || "";
    }
    return "";
  });

  useEffect(() => {
    if (!email) {
      router.push("/forgot-password");
    }
  }, [email, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OTPFormData) => {
    try {
      const isValid = await verifyOTP(email, data.otp);
      if (isValid) {
        toast.success("تم التحقق من رمز التحقق بنجاح");
        localStorage.setItem("resetOtp", data.otp);
        router.push("/reset-password");
      } else {
        toast.error("رمز التحقق غير صحيح. حاول مرة أخرى.");
      }
    } catch (error) {
      toast.error("حدث خطأ أثناء التحقق. حاول مرة أخرى.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link
            href="/forgot-password"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <AiOutlineArrowLeft className="w-5 h-5" />
            <span className="font-medium">العودة</span>
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-100 rounded-full mb-6">
            <AiOutlineMail className="w-8 h-8 text-amber-600" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            أدخل رمز التحقق
          </h1>
          <p className="text-gray-600 mb-4">
            تم إرسال رمز التحقق إلى{" "}
            <span className="font-semibold text-gray-900">{email}</span>
          </p>
          <p className="text-sm text-gray-500">
            تحقق من بريدك الإلكتروني وأدخل الرمز المكون من 6 أرقام
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label htmlFor="otp" className="text-gray-700 font-medium">
              رمز التحقق
            </Label>
            <Input
              id="otp"
              type="text"
              placeholder="123456"
              maxLength={6}
              className={`mt-1.5 h-12 bg-gray-50 border-gray-200 focus:border-amber-500 focus:ring-amber-500 text-center text-lg tracking-widest ${
                errors.otp ? "border-red-500" : ""
              }`}
              {...register("otp")}
            />
            {errors.otp && (
              <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full h-12 bg-amber-500 hover:bg-amber-600 text-white font-semibold text-base"
            disabled={isLoading}
          >
            {isLoading ? "جاري التحقق..." : "تحقق من الرمز"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          لم يصلك الرمز؟{" "}
          <button
            onClick={() => toast.info("سيتم إرسال رمز جديد قريباً")}
            className="text-amber-600 hover:text-amber-700 font-semibold"
          >
            أعد الإرسال
          </button>
        </p>
      </div>
    </div>
  );
}
