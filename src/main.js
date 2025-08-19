const { invoke } = window.__TAURI__.core;

// DOM元素
let decibelValueEl;
let noiseLevelEl;
let healthAdviceEl;
let startBtn;
let stopBtn;
let needleEl;

// 检测状态和间隔ID
let isMonitoring = false;
let monitorIntervalId = null;

// 噪音级别和对应的健康建议
const noiseLevels = [
  { range: [0, 30], level: "安静", color: "#4CAF50", advice: "非常安静的环境，适合休息和集中注意力。" },
  { range: [31, 40], level: "轻声", color: "#8BC34A", advice: "安静的环境，适合阅读和学习。" },
  { range: [41, 50], level: "普通", color: "#FFC107", advice: "一般交谈的音量，对大多数人没有影响。" },
  { range: [51, 60], level: "吵闹", color: "#FF9800", advice: "可能会干扰交谈和集中注意力。" },
  { range: [61, 70], level: "较吵", color: "#FF5722", advice: "长时间暴露可能会引起轻微不适。" },
  { range: [71, 80], level: "噪音", color: "#F44336", advice: "可能会影响听力，建议减少暴露时间。" },
  { range: [81, 90], level: "很吵", color: "#D32F2F", advice: "长时间暴露可能导致听力损伤，建议采取防护措施。" },
  { range: [91, Infinity], level: "极吵", color: "#B71C1C", advice: "非常危险的噪音水平，应立即远离该环境。" }
];

// 更新分贝值显示
function updateDecibelDisplay(decibel) {
  // 更新数字显示
  decibelValueEl.textContent = `${Math.round(decibel)} dB`;

  // 更新指针位置 (将分贝值映射到-90度到90度之间)
  const angle = Math.min(Math.max(-90 + (decibel / 120) * 180, -90), 90);
  needleEl.style.transform = `translateX(-50%) rotate(${angle}deg)`;

  // 更新噪音级别和健康建议
  for (const level of noiseLevels) {
    if (decibel >= level.range[0] && decibel <= level.range[1]) {
      noiseLevelEl.textContent = level.level;
      noiseLevelEl.style.backgroundColor = level.color;
      noiseLevelEl.style.color = decibel > 70 ? "white" : "#333";
      healthAdviceEl.textContent = level.advice;
      break;
    }
  }
}

// 开始监测
async function startMonitoring() {
  if (isMonitoring) return;

  isMonitoring = true;
  startBtn.disabled = true;
  stopBtn.disabled = false;
  stopBtn.classList.add("enabled");

  // 请求麦克风权限
    try {
      await invoke("request_microphone_permission");

      // 启动分贝监测
      await invoke("start_decibel_monitoring");

      // 设置定时器定期获取分贝值
      monitorIntervalId = setInterval(async () => {
        try {
          const decibel = await invoke("get_decibel_level");
          updateDecibelDisplay(decibel);
        } catch (error) {
          console.error("获取分贝值失败:", error);
          stopMonitoring();
        }
      }, 500);
    } catch (error) {
      console.error("请求麦克风权限或启动监测失败:", error);
      isMonitoring = false;
      startBtn.disabled = false;
      stopBtn.disabled = true;
      stopBtn.classList.remove("enabled");
    }
}

// 停止监测
async function stopMonitoring() {
  if (!isMonitoring) return;

  isMonitoring = false;
  clearInterval(monitorIntervalId);

  // 停止分贝监测
  try {
    await invoke("stop_decibel_monitoring");
  } catch (error) {
    console.error("停止监测失败:", error);
  }

  startBtn.disabled = false;
  stopBtn.disabled = true;
  stopBtn.classList.remove("enabled");
}

// 页面加载完成后初始化
window.addEventListener("DOMContentLoaded", () => {
  decibelValueEl = document.querySelector("#decibel-value");
  noiseLevelEl = document.querySelector("#noise-level");
  healthAdviceEl = document.querySelector("#health-advice");
  startBtn = document.querySelector("#start-btn");
  stopBtn = document.querySelector("#stop-btn");
  needleEl = document.querySelector("#needle");

  // 绑定按钮事件
  startBtn.addEventListener("click", startMonitoring);
  stopBtn.addEventListener("click", stopMonitoring);
});
