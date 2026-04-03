"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export const ContactForm = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("https://formspree.io/f/mgopllqq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(t("contact.error"));
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(t("contact.connectionError"));
      console.error("Erro ao enviar formulário:", error);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="space-y-4">
        {/* Nome e Email em linha */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Nome */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <input
              type="text"
              name="name"
              placeholder={t("contact.name")}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
            />
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <input
              type="email"
              name="email"
              placeholder={t("contact.email")}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-6 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm"
            />
          </motion.div>
        </div>

        {/* Mensagem */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <textarea
            name="message"
            placeholder={t("contact.message")}
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-6 py-3 rounded-xl bg-zinc-800/50 border border-zinc-700 text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 backdrop-blur-sm resize-none"
          />
        </motion.div>

        {/* Botão de envio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex justify-center pt-4"
        >
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="group relative px-10 py-3 rounded-full font-semibold overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all duration-300" />

            {/* Content */}
            <div className="relative flex items-center justify-center gap-2 text-white">
              {status === "idle" && (
                <>
                  <span>{t("contact.send")}</span>
                  <Send className="w-5 h-5" />
                </>
              )}
              {status === "loading" && (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{t("contact.sending")}</span>
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>{t("contact.sent")}</span>
                </>
              )}
              {status === "error" && (
                <>
                  <AlertCircle className="w-5 h-5" />
                  <span>{t("contact.retry")}</span>
                </>
              )}
            </div>
          </button>
        </motion.div>

        {/* Mensagem de erro */}
        {status === "error" && errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Mensagem de sucesso */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm"
          >
            {t("contact.success")}
          </motion.div>
        )}
      </div>
    </motion.form>
  );
};
