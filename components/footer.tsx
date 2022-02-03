import { useEffect, useState } from "react";

function useTokyoTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchTokyoTime = async () => {
      const res = await fetch(
        "https://worldtimeapi.org/api/timezone/Asia/Tokyo"
      );
      const data = await res.json();
      const time = new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      }).format(new Date(data.datetime));
      setTime(time);
    };

    if (!!Intl.DateTimeFormat) {
      fetchTokyoTime();
    }
  });

  return time;
}

export default function Footer() {
  const time = useTokyoTime();

  return (
    <footer className="mb-12 mt-20 flex justify-between text-sm text-stone-400">
      <span>2022 © Kei</span>
      {time && (
        <code className="select-none">
          <time>{time}</time>, JP
        </code>
      )}
    </footer>
  );
}
