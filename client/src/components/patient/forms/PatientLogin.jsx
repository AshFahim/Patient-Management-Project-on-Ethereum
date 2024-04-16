import {
  Button,
  Input,
} from '@nextui-org/react';

export default function PatientLoginForm() {
  const SubmitHandle = async (e) => {
    e.preventDefault();

    console.log(e.target.serial.value);
  };
  return (
    <form className="flex flex-col gap-4" onSubmit={SubmitHandle}>
      <Input
        type="text"
        name="username"
        label="Serial"
        placeholder="Enter your Serial"
      />
      <Button color="primary">Submit</Button>
    </form>
  );
}
