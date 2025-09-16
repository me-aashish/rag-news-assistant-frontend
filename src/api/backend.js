import axios from "axios";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export async function createSession() {
  console.log(BASE_URL);
  const res = await axios.post(`${BASE_URL}/session/new`);
  return res.data.sessionId;
}

export async function fetchHistory(sessionId) {
  const res = await axios.get(`${BASE_URL}/session/${sessionId}/history`);
  return res.data.history;
}

export async function clearSession(sessionId) {
  await axios.post(`${BASE_URL}/session/${sessionId}/clear`);
}

export async function sendMessageREST(sessionId, message) {
  console.log(BASE_URL);

  const res = await axios.post(`${BASE_URL}/chat`, { sessionId, message });
  return res.data;
}

export function connectSocket(sessionId, onToken, onDone) {
  const socket = io(BASE_URL);
  socket.on("connect", () => console.log("Socket connected", socket.id));
  socket.emit("chat", { sessionId, message: "" }); // optional first msg
  socket.on("bot.token", (data) => onToken(data.token));
  socket.on("bot.done", (data) => onDone(data));
  socket.on("error", (err) => console.error("Socket error", err));
  return socket;
}
