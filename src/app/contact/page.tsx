"use client";

import React from "react";
import { Navigation } from "../../components/nav";
import { Github, Linkedin, Mail } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";
import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";

const socials = [
  {
    icon: Github,
    href: "https://github.com/Vitor-Moura48",
    label: "Github",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vitor-moura-3a019721b",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:vitor.gabriel.sm7@gmail.com",
    label: "Email",
  },
  {
    icon: FaDiscord,
    href: "https://discord.com/users/819906706821349416",
    label: "Discord",
  }
];

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="bg-gradient-to-tl from-black via-zinc-600/20 to-black bg-fixed flex flex-col items-center justify-center w-screen h-screen overflow-hidden">
      
      <Navigation />

      <span className="m-16 text-justify " > { t('contact.description') } </span>

      <div className="flex gap-8">
        {socials.map((social) => (
          <Link
            key={social.href}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition duration-200 ease-out hover:scale-110 active:scale-95 text-zinc-500 hover:text-zinc-300"
            aria-label={social.label}
          >
            <social.icon className="w-10 h-10" />
          </Link>
        ))}
      </div>

    </div>
  );
}