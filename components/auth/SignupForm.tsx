"use client";

import Link from "next/link";
import { SignupUserSchema, SignupUser } from "@/models/zod/auth";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import GoogleBtn from "./GoogleBtn";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import { useState } from "react";

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignupUser>({ resolver: zodResolver(SignupUserSchema) });
  const router = useRouter();
  const [passwordVisibility, setPasswordVisibility] = useState<boolean>(false);
  const [confirmVisibility, setConfirmVisibility] = useState<boolean>(false);

  const onSubmit: SubmitHandler<SignupUser> = async (data) => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ ...data, organizacion_slug: slugify(data.organizacion, { lower: true }) }),
    });

    if (res.ok) {
      const resAuth = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resAuth.error) {
        router.push("/home");
      }
    } else {
      if (res.status === 400) {
        const parsedRes = await res.json();
        if (parsedRes.field === "email") {
          setError("root", { message: "Email asociado a otra cuenta" });
        }
        if (parsedRes.field === "organization") {
          setError("root", { message: "Organización asociada a otra cuenta" });
        }
      } else if (res.status === 500) {
        setError("root", { message: "Error interno del servidor" });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-sm flex flex-col gap-4 border-2 border-foreground p-6">
      <div className="flex flex-col gap-1">
        <input className="border" type="text" placeholder="Nombre de usuario" {...register("name")} />
        {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <input className="border" type="text" placeholder="Email" {...register("email")} />
        {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <input className="border" type="text" placeholder="Organización" {...register("organizacion")} />
        {errors.organizacion && <span className="text-xs text-red-500">{errors.organizacion.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col relative">
          <input
            className="border"
            type={passwordVisibility ? "text" : "password"}
            placeholder="Contraseña"
            {...register("password")}
          />
          <button
            type="button"
            className="absolute right-2 top-0 bottom-0"
            onClick={() => setPasswordVisibility(!passwordVisibility)}
          >
            {passwordVisibility ? <LuEyeClosed /> : <LuEye />}
          </button>
        </div>
        {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex flex-col relative">
          <input
            className="border"
            type={confirmVisibility ? "text" : "password"}
            placeholder="Confirmar contraseña"
            {...register("confirm")}
          />
          <button
            type="button"
            className="absolute right-2 top-0 bottom-0"
            onClick={() => setConfirmVisibility(!confirmVisibility)}
          >
            {confirmVisibility ? <LuEyeClosed /> : <LuEye />}
          </button>
        </div>
        {errors.confirm && <span className="text-xs text-red-500">{errors.confirm.message}</span>}
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col gap-1">
          <button disabled={isSubmitting} className="border-2">
            {isSubmitting ? "Cargando..." : "Continuar"}
          </button>
          {errors.root && <span className="text-xs text-red-500">{errors.root.message}</span>}
        </div>
        <span>
          Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-yellow-500">
            Ingresar
          </Link>
        </span>
      </div>
      <hr className="border" />
      <GoogleBtn />
    </form>
  );
}
