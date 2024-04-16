import {
  Button,
  Input,
} from '@nextui-org/react';

export default function AdminLoginForm() {
  const SubmitHandle = async (e) => {
    e.preventDefault();

    console.log(e.target.username.value, e.target.password.value);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={SubmitHandle}>
      <Input
        type="text"
        name="username"
        label="Username"
        placeholder="Enter your username"
      />
      <Input
        type="password"
        name="password"
        label="Password"
        placeholder="Enter your Password"
      />
      <Button color="primary">Submit</Button>
    </form>
  );
}
