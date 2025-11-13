import SimulationChat from '../SimulationChat';

export default function SimulationChatExample() {
  return (
    <div className="p-8 max-w-3xl">
      <SimulationChat
        difficulty="beginner"
        scenario="Password Reset Request"
        onSendMessage={(msg) => console.log('Message sent:', msg)}
      />
    </div>
  );
}
