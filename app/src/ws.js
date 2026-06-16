import { useWsStore } from '@/stores/wsStore'

const ws = new WebSocket("ws://localhost:7878");

ws.onopen = () => {
  console.log("Connected to server");
};

ws.onmessage = (message) => {
  const wsStore = useWsStore()
  wsStore.message = message.data
};

export default ws;
