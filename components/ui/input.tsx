export default function Input(props: any) {
  return (
    <input
      {...props}
      className="border rounded px-3 py-2 w-full focus:ring focus:ring-blue-300 outline-none"
    />
  );
}
