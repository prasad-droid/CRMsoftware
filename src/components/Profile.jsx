import { useEffect, useState } from "react";
import api from '../api'; // axios instance with baseURL and auth if needed

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        setError("Unable to fetch profile. Please login again.");
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  if (error) return <div className="text-red-600">{error}</div>;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 p-2 shadow-lg rounded border bg-white">
      <h2 className="font-semibold mb-4">Your Profile</h2>
      <p><strong>ID:</strong> {profile.id}</p>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Role:</strong> {profile.role}</p>
    </div>
  );
};

export default Profile;
