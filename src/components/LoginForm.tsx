import React, { useState } from 'react';
import { UserDetails } from '@/types/user';

type Props = {
  onSubmit: (user: UserDetails) => void;
};

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [user, setUser] = useState<UserDetails>({
    name: '',
    mobile: '',
    company: '',
    address: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Enter Your Details</h2>
      <input name="name" placeholder="Name" value={user.name} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="mobile" placeholder="Mobile No" value={user.mobile} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="company" placeholder="Company/Shop Name" value={user.company} onChange={handleChange} required className="w-full p-2 border rounded" />
      <input name="address" placeholder="Shop Address" value={user.address} onChange={handleChange} required className="w-full p-2 border rounded" />
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Save Details</button>
    </form>
  );
};

export default LoginForm;