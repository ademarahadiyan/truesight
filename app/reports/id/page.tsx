export default function ReportPage({ params }: any) {
  const { id } = params;

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Report ID: {id}</h1>

      <div className="bg-white p-4 rounded shadow">
        <p>Ini adalah halaman report dummy.</p>
        <p>Nanti akan diisi hasil analisa dari API.</p>
      </div>
    </div>
  );
}
