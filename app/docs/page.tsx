"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import "../account/account.css";
import "../orders/orders.css";
import "../chat/chat.css";
import "./docs.css";
import Sidebar from "../account/Sidebar";
import Messenger from "../account/Messenger";
import {
  IcCard, IcDots, IcBubble, IcPlus, IcDocMode, IcStop, IcDocSm,
  IcThumbUp, IcThumbDown, IcCopy, IcDownload,
} from "../account/icons";

type Msg = { role: "user"; text: string } | { role: "ai" };

export default function Docs() {
  const [messenger, setMessenger] = useState(false);
  const router = useRouter();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [gen, setGen] = useState(false);
  const [text, setText] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const grow = (el: HTMLTextAreaElement) => { el.style.height = "auto"; el.style.height = Math.min(el.scrollHeight, 200) + "px"; };

  const send = () => {
    if (gen) return;
    const q = text.trim() || "Сформируй договор оказания услуг для поездки в Санкт-Петербург.";
    setMsgs((m) => [...m, { role: "user", text: q }]);
    setText("");
    if (taRef.current) taRef.current.style.height = "auto";
    setGen(true);
    timer.current = setTimeout(() => {
      setMsgs((m) => [...m, { role: "ai" }]);
      setGen(false);
    }, 2300);
  };

  const empty = msgs.length === 0 && !gen;

  return (
    <div className="acc">
      <Sidebar active="chat" />

      <main className="acc-main" style={{ position: "relative" }}>
        <div className="acc-top">
          <div className="acc-balance">
            <span className="b-alfa">Альфа</span>
            <span className="b-div" />
            <span className="b-amount"><IcCard /> 490 000 ₽</span>
            <span className="b-div" />
            <span className="acc-toggle" />
          </div>
          <div className="acc-top-right">
            <button className="acc-iconbtn"><IcDots /></button>
            <button className="acc-iconbtn" onClick={() => setMessenger(true)}><IcBubble /></button>
            <img className="acc-avatar" src="/img/avatar-sm.png" alt="" onClick={() => router.push("/account")} />
          </div>
        </div>

        <div className="cht-scroll">
          {empty && (
            <div className="cht-hero doc-hero">
              <div className="cht-hero-stack">
                <div className="hero-title">Документы</div>
                <img src="/img/person-docs.png" alt="" />
              </div>
              <div className="hero-sub">
                Вы находитесь в режиме работы с документами. Напишите
                в сообщении запрос и чат соберет необходимый документ.
              </div>
            </div>
          )}

          {msgs.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="cht-out-row">
                <button className="cht-copy"><IcCopy /></button>
                <div className="cht-out wide">{m.text}</div>
              </div>
            ) : (
              <div key={i}>
                <div className="cht-ai">Готово! Вот DOC-файл с нужным документом.</div>
                <div className="cht-file">
                  <IcDocSm />
                  <div><div className="f-name">Договор оказания услуг — Санкт-Петербург</div><div className="f-sub">DOC · 16KB</div></div>
                </div>
                <div className="cht-fb">
                  <button><IcThumbUp /></button><button><IcThumbDown /></button>
                  <button><IcCopy /></button><button><IcDownload /></button>
                </div>
              </div>
            )
          )}

          {gen && (
            <div className="cht-gen2-row">
              <div className="cht-progress2">
                <div className="p-text">Формирую документ...</div>
                <div className="p-track"><div className="p-fill" /></div>
              </div>
              <button className="cht-stop" onClick={() => { if (timer.current) clearTimeout(timer.current); setGen(false); setMsgs((m) => [...m, { role: "ai" }]); }}><IcStop /></button>
            </div>
          )}
        </div>
      </main>

      <div className="ord-chatbar">
        <div className="inner">
          <button className="ord-round"><IcPlus /></button>
          <button className="ord-round active"><IcDocMode /></button>
          <textarea
            ref={taRef}
            rows={1}
            placeholder={gen ? "Идет генерация ответа..." : "Напишите свой запрос"}
            value={text}
            disabled={gen}
            onChange={(e) => { setText(e.target.value); grow(e.target); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && !gen) { e.preventDefault(); send(); } }}
          />
          <button className="ord-send" style={{ background: gen ? "#eef1f4" : "var(--blue)" }} disabled={gen} onClick={send}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill={gen ? "#9aa0a8" : "#fff"}><path d="m4 11.5 15-6.5-4 15-3.5-6.5L4 11.5Z" /></svg>
          </button>
        </div>
      </div>

      {messenger && <Messenger onClose={() => setMessenger(false)} />}
    </div>
  );
}
