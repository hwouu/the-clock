// src/utils/notifications.ts

const originalTitle = document.title;
let interval: ReturnType<typeof setInterval> | null = null;

const flashTitle = (newTitle: string) => {
  if (document.hidden) {
    interval = setInterval(() => {
      document.title =
        document.title === originalTitle ? newTitle : originalTitle;
    }, 1000);
  }
};

const clearFlashTitle = () => {
  if (interval) {
    clearInterval(interval);
    interval = null;
    document.title = originalTitle;
  }
};

window.addEventListener("focus", clearFlashTitle);

// 알림 권한 요청
export const requestNotificationPermission = () => {
  if ("Notification" in window && Notification.permission !== "granted") {
    Notification.requestPermission();
  }
};

// 알림 보내기 함수
export const sendNotification = (title: string, body: string) => {
  // 1. 사운드 재생
  const audio = new Audio("/alarm.mp3");
  audio.play().catch((err) => console.error("알림 사운드 재생 실패:", err));

  // 2. 브라우저 알림
  if ("Notification" in window && Notification.permission === "granted") {
    new Notification(title, {
      body,
      icon: "/clock-icon.svg",
    });
  }

  // 3. 탭 제목 변경 (포커스 아웃 상태일 때)
  flashTitle(`⏰ ${title}`);
};
