"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../hooks/useTranslation";
import { useLanguage, type Lang } from "../context/LanguageContext";
import { usePathname } from "../hooks/usePathname";

const navigation = [
  { key: 'navigation.home', href: "/" },
  { key: 'navigation.projects', href: "/projects" },
  { key: 'navigation.contact', href: "/contact" },
];

export const Navigation = ( {showback = true }: {showback?: boolean} ) => {

    const pathname = usePathname();
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);

    const {lang, setLang} = useLanguage();
    const { t } = useTranslation();
 
    const toggleLang = () => {
        const newLang: Lang = lang === "en" ? "pt" : "en";
        setLang(newLang);
    };

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur  duration-200 border-b ${
					isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500  border-zinc-800 "
				}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-4 sm:p-6 mx-auto">
				
                    {/* Barra de links */}
                    <nav>
                        <ul className="flex items-center justify-center gap-2 sm:gap-4 animate-fade-in text-sm sm:text-base">
                            
                        {navigation.map((item) => (        
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`duration-500 text-zinc-500 hover:text-zinc-300 ${pathname === item.href ? "text-white! font-bold!" : ""}`}
                            >
                                {t(item.key)}
                            </Link>
                        ))}

                        {/* Botão de idioma */}
                        <button
                            onClick={toggleLang}
                            className="duration-500 text-zinc-500 hover:text-zinc-300"
                        >
                            {lang === "en" ? "EN" : "pt-BR"}
                        </button>

                        </ul>
                    </nav>

                    {/* Botão de voltar */}
                    {showback && (
                        <Link
                            href="/"
                            className="duration-200 text-zinc-300 hover:text-zinc-100"
                        >
                            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </Link>
                    )}

				</div>
			</div>

            <div className="h-16 md:h-24" ></div>

		</header>
	);
};