"use client";

import React, { useState } from "react";
import { Navigation } from "../../components/nav";
import { Github, Linkedin, Mail, Check } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import Link from "next/link";
import { useTranslation } from "../../hooks/useTranslation";
import { ContactForm } from "../../components/contactForm";

const EMAIL = "vitor.gabriel.sm7@gmail.com";

const socials = [
  {
    icon: Github,
    href: "https://github.com/Vitor-Moura48",
    label: "Github",
    type: "link",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/vitor-moura-3a019721b",
    label: "LinkedIn",
    type: "link",
  },
  {
    icon: FaDiscord,
    href: "https://discord.com/users/819906706821349416",
    label: "Discord",
    type: "link",
  }
];

export default function Contact() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Erro ao copiar email:", err);
    }
  };

  return (
    <div className="bg-gradient-to-tl from-black via-zinc-600/20 to-black bg-fixed flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden py-20">
      
      <Navigation />

      <div className="container mx-auto px-4 max-w-3xl">
        {/* Descrição */}
        <div className="text-center mb-16">
          <p className="text-zinc-400 text-lg">
            {t('contact.description')}
          </p>
        </div>

        {/* Formulário */}
        <div className="mb-16">
          <ContactForm />
        </div>

        {/* Redes Sociais */}
        <div className="text-center">
          <p className="text-zinc-400 mb-8">{t('contact.socials')}</p>
          <div className="flex gap-4 md:gap-8 justify-center items-center">
            {socials.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="transform transition duration-200 ease-out hover:scale-110 active:scale-95 text-zinc-500 hover:text-zinc-300"
                aria-label={social.label}
                title={social.label}
              >
                <social.icon className="w-7 h-7 md:w-10 md:h-10" />
              </Link>
            ))}

            {/* Botão Copiar Email */}
            <button
              onClick={handleCopyEmail}
              className="transform transition duration-200 ease-out hover:scale-110 active:scale-95 text-zinc-500 hover:text-zinc-300"
              title={t('contact.copyEmail')}
              aria-label={t('contact.copyEmail')}
            >
              {copied ? (
                <Check className="w-7 h-7 md:w-10 md:h-10 text-green-400" />
              ) : (
                <Mail className="w-7 h-7 md:w-10 md:h-10" />
              )}
            </button>

            {/* Botão Gmail */}
            <Link
              href={`https://mail.google.com/mail/u/0/?view=cm&to=${EMAIL}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transform transition duration-200 ease-out hover:scale-110 active:scale-95 text-zinc-500 hover:text-zinc-300"
              title={t('contact.openGmail')}
              aria-label={t('contact.openGmail')}
            >
              <SiGmail className="w-7 h-7 md:w-10 md:h-10" />
            </Link>
          </div>

          {/* Toast notification - Topo da tela */}
          {copied && (
            <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 bg-green-500/20 border border-green-500/50 text-green-400 px-6 py-3 rounded-lg text-sm whitespace-nowrap animate-fade-in">
              {t('contact.emailCopied')}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}