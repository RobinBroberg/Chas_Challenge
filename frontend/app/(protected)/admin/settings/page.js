export default function SettingsPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/loginpic.png')" }}
    >
      <div className="backdrop-brightness-75 min-h-screen p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Inställningar</h1>
        <p>Hantera systeminställningar och roller.</p>
      </div>
    </div>
  );
}
