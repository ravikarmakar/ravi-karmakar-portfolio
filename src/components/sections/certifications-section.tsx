"use client";

import { motion } from "framer-motion";
import OrbitingCircles from "@/components/ui/orbiting-circles";
import { CertificationCard } from "@/components/ui/certification-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

const certifications = [
  {
    name: "Certified Developer Associate",
    issuer: "AWS",
    date: "2025",
    id: "aws-cda-101",
    level: "pro",
  },
  {
    name: "Professional Cloud Architect",
    issuer: "Google Cloud",
    date: "2026",
    id: "gcp-pca-502",
    level: "expert",
  },
  {
    name: "Azure Solutions Architect",
    issuer: "Microsoft",
    date: "2025",
    id: "az-305",
    level: "pro",
  },
  {
    name: "Terraform Associate",
    issuer: "HashiCorp",
    date: "2024",
    id: "hc-tf-003",
    level: "foundational",
  },
  {
    name: "Certified Kubernetes Admin",
    issuer: "Cloud Native Computing",
    date: "2026",
    id: "cka-7788",
    level: "expert",
  },
  {
    name: "Front-End Engineer",
    issuer: "Meta",
    date: "2024",
    id: "meta-fe-01",
    level: "certified",
  },
];

export function CertificationsSection() {
  const { ref, isInView } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="certifications" className="relative py-32 md:py-48">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[var(--glow-cyan)]/[0.05] blur-[120px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[var(--glow-violet)]/[0.03] blur-[150px]" />
      </div>

      <div className="mx-auto w-full max-w-6xl px-6">
        <SectionHeading
          title="Certifications"
          subtitle="Validated mastery across modern cloud and infrastructure stacks."
        />

        <div className="group relative mt-20 flex h-[700px] w-full flex-col items-center justify-center">
          {/* Background Text - Lowered Z-Index */}
          <span className="pointer-events-none z-0 whitespace-pre-wrap bg-linear-to-b from-white/20 to-white/5 bg-clip-text text-center text-5xl font-bold leading-none text-transparent md:text-9xl tracking-tighter transition-all duration-700 group-hover:opacity-40">
            Nexus Core
          </span>

          {/* Inner Ring (Pro Certs) - Elevated Z-Index */}
          <OrbitingCircles
            className="size-[40px] border-none bg-transparent z-20"
            duration={25}
            delay={20}
            radius={200}
            pauseOnHover
          >
            <div className="group/item relative z-10 hover:z-50">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--glow-cyan)] to-[var(--glow-violet)] p-px shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all duration-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_50px_rgba(6,182,212,0.5)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black/90 backdrop-blur-3xl text-[12px] font-black tracking-tighter text-white">AWS</div>
              </div>
              <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover/item:opacity-100 whitespace-nowrap z-50 pointer-events-none group-hover/item:pointer-events-auto">
                <CertificationCard {...certifications[0]} />
              </div>
            </div>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[40px] border-none bg-transparent z-20"
            duration={25}
            delay={12.5}
            radius={200}
            pauseOnHover
          >
             <div className="group/item relative z-10 hover:z-50">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[var(--glow-violet)] to-[var(--glow-cyan)] p-px shadow-[0_0_30px_rgba(139,92,246,0.3)] transition-all duration-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_50px_rgba(139,92,246,0.5)]">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-black/90 backdrop-blur-3xl text-[12px] font-black tracking-tighter text-white">GCP</div>
              </div>
               <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover/item:opacity-100 whitespace-nowrap z-50 pointer-events-none group-hover/item:pointer-events-auto">
                <CertificationCard {...certifications[1]} />
              </div>
            </div>
          </OrbitingCircles>

          {/* Outer Ring (Specializations) - Elevated Z-Index */}
          <OrbitingCircles
            className="size-[60px] border-none bg-transparent z-20"
            radius={340}
            duration={40}
            reverse
            pauseOnHover
          >
             <div className="group/item relative z-10 hover:z-50">
              <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 p-2 backdrop-blur-xl shadow-[0_0_30px_rgba(249,115,22,0.2)] transition-all duration-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_50px_rgba(249,115,22,0.4)]">
                <div className="h-full w-full rounded-xl bg-orange-500/20 flex items-center justify-center text-[12px] font-black text-orange-400 border border-orange-500/10">TF</div>
              </div>
              <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover/item:opacity-100 whitespace-nowrap z-50 pointer-events-none group-hover/item:pointer-events-auto">
                <CertificationCard {...certifications[3]} />
              </div>
            </div>
          </OrbitingCircles>
          <OrbitingCircles
            className="size-[60px] border-none bg-transparent z-20"
            radius={340}
            duration={40}
            delay={20}
            reverse
            pauseOnHover
          >
             <div className="group/item relative z-10 hover:z-50">
              <div className="h-20 w-20 rounded-2xl bg-white/5 border border-white/10 p-2 backdrop-blur-xl shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-500 group-hover/item:scale-110 group-hover/item:shadow-[0_0_50px_rgba(59,130,246,0.4)]">
                <div className="h-full w-full rounded-xl bg-blue-500/20 flex items-center justify-center text-[12px] font-black text-blue-400 border border-blue-500/10">CKA</div>
              </div>
              <div className="absolute left-1/2 top-full mt-6 -translate-x-1/2 opacity-0 transition-all duration-300 group-hover/item:opacity-100 whitespace-nowrap z-50 pointer-events-none group-hover/item:pointer-events-auto">
                <CertificationCard {...certifications[4]} />
              </div>
            </div>
          </OrbitingCircles>
        </div>
      </div>
    </section>
  );
}
