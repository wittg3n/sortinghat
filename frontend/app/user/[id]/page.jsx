export default function UserProfile({ params }) {
  const { id } = params; // Destructure from params, not params.id

  return <div>User ID is: {id}</div>;
}
