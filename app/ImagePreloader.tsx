"use client";
import { useEffect } from "react";

const IMAGES_TO_PRELOAD = [
  "/img/chat-hero.png",
  "/img/person-docs.png",
  "/img/chat-mode.png",
  "/img/Send (1).png",
  "/img/Union.png",
  "/img/Overdraft.png",
  "/img/backpack-corner.png",
  "/img/avance.png",
  "/img/widget.png",
  "/img/chat.png",
  "/img/Messenger.png",
  "/img/avatar-sm.png",
  "/img/avatar.png",
  "/img/user-menu/Lock.png",
  "/img/user-menu/Account.png",
  "/img/user-menu/Help.png",
  "/img/user-menu/Messenger.png",
  "/img/vneshtat12/People.png",
  "/img/Внештат 2.0 (22)/Info.png",
  "/img/Внештат 2.0 (22)/Orders.png",
  "/img/Внештат 2.0 (22)/Attachments.png",
  "/img/Внештат 2.0 (23)/Home.png",
  "/img/Внештат 2.0 (23)/New chat.png",
  "/img/Внештат 2.0 (23)/Search.png",
  "/img/Внештат 2.0 (23)/Orders.png",
  "/img/Внештат 2.0 (23)/Widgets.png",
  "/img/Внештат 2.0 (23)/Calendar.png",
];

export default function ImagePreloader() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      IMAGES_TO_PRELOAD.forEach((src) => {
        const img = new window.Image();
        img.src = src;
      });
    }
  }, []);

  return (
    <div style={{ position: "absolute", width: 0, height: 0, overflow: "hidden", pointerEvents: "none", opacity: 0 }} aria-hidden="true">
      {IMAGES_TO_PRELOAD.map((src) => (
        <img key={src} src={src} alt="" />
      ))}
    </div>
  );
}
