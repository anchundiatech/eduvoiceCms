"use client";
import { TestimonialRender } from "../voices-hub/testimonial_render";
import { testimonialsData } from "../landing/components/data";
import DashboardLayout from "@/components/dashboard/DashboardLayout";


export default function GestorTestimonial() {
    return (

        <DashboardLayout>
            <div className="p-6">
                <h1 className="text-xl font-semibold">Bienvenido al dashboard</h1>
                <div className="mt-6">
                    <TestimonialRender testimonials={testimonialsData} />
                </div>
            </div>
        </DashboardLayout>
    );
}