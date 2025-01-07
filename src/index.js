import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
let participants = [
  "陈旭东", "黄茂俊", "胡状状", "金瑶", "刘天平", "刘毅", "刘祯", "李亚飞", "李梓雨", "谢武",
  "杨豪", "赵晨越", "李益仪", "陈茜茜", "廖满娥", "李佳路", "袁志锋", "高伟", "丁萍萍", "嵇道明",
  "廖伟强", "郭意如"
];
let originalParticipants = [...participants]; // 保存初始名单
let winners = {}; // 中奖记录
let alreadyWon = new Set(); // 防止重复中奖
let isFirstDrawForFirstPrize = true; // 一等奖第一次抽奖规则

// 绑定抽奖按钮事件
document.querySelectorAll(".draw-btn").forEach(button => {
  button.addEventListener("click", () => handleDraw(button));
});

// 抽奖逻辑
function handleDraw(button) {
  const prize = button.dataset.prize || ""; // 奖项名称
  const limit = parseInt(button.dataset.limit || "0"); // 中奖人数
  const isRedraw = button.textContent === "重新抽奖"; // 判断是否重新抽奖

  // 如果是重新抽奖，清空当前奖项记录并恢复抽奖池
  if (isRedraw) {
    if (winners[prize]) {
      winners[prize].forEach(winner => alreadyWon.delete(winner)); // 移除已中奖者
    }
    participants = [...originalParticipants]; // 恢复抽奖池
    delete winners[prize]; // 清空奖项记录
  }

  // 一等奖第一次抽奖时，固定让李亚飞中奖
  if (prize === "一等奖" && isFirstDrawForFirstPrize) {
    const specialIndex = participants.indexOf("李亚飞");
    if (specialIndex !== -1) {
      const specialWinner = participants.splice(specialIndex, 1)[0]; // 移除李亚飞
      winners[prize] = [specialWinner]; // 固定李亚飞中奖
      alreadyWon.add(specialWinner); // 标记李亚飞已中奖
      isFirstDrawForFirstPrize = false; // 取消固定规则
    }
  }

  // 抽取其他中奖者（特殊规则：幸运奖/三等奖/二等奖不允许抽取李亚飞）
  if (!winners[prize]) winners[prize] = [];
  while (winners[prize].length < limit && participants.length > 0) {
    const randomIndex = Math.floor(Math.random() * participants.length);
    const winner = participants[randomIndex];

    // 跳过已中奖者
    if (alreadyWon.has(winner)) continue;

    // 特殊规则：幸运奖/三等奖/二等奖不允许抽取李亚飞
    if (["幸运奖", "三等奖", "二等奖"].includes(prize) && winner === "李亚飞") {
      continue;
    }

    winners[prize].push(winner); // 添加中奖者
    alreadyWon.add(winner); // 标记为已中奖
    participants.splice(randomIndex, 1); // 从抽奖池中移除中奖者
  }

  // 更新按钮文本和中奖名单表格
  button.textContent = "重新抽奖";
  updateResultTable();
  showFireworks(); // 显示烟花特效
}

// 更新中奖名单表格
function updateResultTable() {
  const resultTable = document.getElementById("resultTable");
  resultTable.innerHTML = ""; // 清空表格内容

  for (const [prize, prizeWinners] of Object.entries(winners)) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${prize}</td><td>${prizeWinners.join(" · ")}</td>`; // 名单用顿号隔开
    resultTable.appendChild(row);
  }
}

// 显示烟花特效
function showFireworks() {
  const fireworksContainer = document.createElement("div");
  fireworksContainer.className = "fireworks";
  document.body.appendChild(fireworksContainer);

  for (let i = 0; i < 10; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";
    firework.style.left = Math.random() * 100 + "vw";
    firework.style.top = Math.random() * 100 + "vh";
    firework.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;

    fireworksContainer.appendChild(firework);

    setTimeout(() => {
      firework.remove();
    }, 1000);
  }

  setTimeout(() => {
    fireworksContainer.remove();
  }, 1000);
}