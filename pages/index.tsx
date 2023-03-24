import { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import React, { useEffect } from "react";
import { ResponsiveWidth, useLayoutStore } from "@/store";

// Use dynamic import to avoid page hydrated.
// reference: https://github.com/pmndrs/zustand/issues/1145#issuecomment-1316431268
const ConnectionSidebar = dynamic(() => import("@/components/ConnectionSidebar"), {
  ssr: false,
});
const ChatView = dynamic(() => import("@/components/ChatView"), {
  ssr: false,
});

const ChatPage: NextPage = () => {
  const layoutStore = useLayoutStore();

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth < ResponsiveWidth.lg) {
        layoutStore.toggleSidebar(false);
      } else {
        layoutStore.toggleSidebar(true);
      }
    };

    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return (
    <div>
      <Head>
        <title>SQL Chat</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="drawer drawer-mobile w-full h-full">
        <input
          id="connection-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={layoutStore.showSidebar}
          onChange={(e) => layoutStore.toggleSidebar(e.target.checked)}
        />
        <ChatView />
        <ConnectionSidebar />
      </main>
    </div>
  );
};

export default ChatPage;
